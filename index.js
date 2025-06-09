// Función para inicializar la página del carrito y manejar eventos
function initCarritoPage() {
  // Elementos del DOM
  const carritoBody = document.getElementById('carrito-body');
  const carritoTotal = document.getElementById('carrito-total');
  const finalizarBtn = document.getElementById('finalizar-compra');
  if (!carritoBody || !carritoTotal || !finalizarBtn) return;

  // Obtiene el carrito desde localStorage o retorna un array vacío
  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carritoNike')) || [];
  }
  // Guarda el carrito en localStorage
  function guardarCarrito(carrito) {
    localStorage.setItem('carritoNike', JSON.stringify(carrito));
  }
  // Renderiza el carrito en la tabla
  function renderizarCarrito() {
    const carrito = obtenerCarrito();
    carritoBody.innerHTML = '';
    let total = 0;
    if (carrito.length === 0) {
      carritoBody.innerHTML = '<tr><td colspan="5" class="text-center">Tu carrito está vacío.</td></tr>';
    } else {
      carrito.forEach(function(producto, idx) {
        total += producto.precio * producto.cantidad;
        carritoBody.innerHTML += '<tr>' +
          '<td><img src="' + producto.imagen + '" alt="' + producto.nombre + '" width="60" class="rounded"></td>' +
          '<td>' + producto.nombre + '</td>' +
          '<td>' + producto.cantidad + '</td>' +
          '<td>$' + producto.precio.toLocaleString() + '</td>' +
          '<td><button class="btn btn-danger btn-sm eliminar-producto" data-idx="' + idx + '">Eliminar</button></td>' +
        '</tr>';
      });
    }
    carritoTotal.textContent = '$' + total.toLocaleString();
  }
  // Evento para eliminar productos del carrito
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('eliminar-producto')) {
      var idx = e.target.getAttribute('data-idx');
      var carrito = obtenerCarrito();
      carrito.splice(idx, 1);
      guardarCarrito(carrito);
      renderizarCarrito();
    }
  });
  // El botón finalizar solo abre el modal, la compra se confirma en el formulario
  renderizarCarrito();
}

// Función para inicializar la página de productos y manejar eventos
function initProductosPage() {
  var botonesAgregar = document.querySelectorAll('.product-card-btn');
  if (!botonesAgregar.length) return;
  // Obtiene el carrito desde localStorage o retorna un array vacío
  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carritoNike')) || [];
  }
  // Guarda el carrito en localStorage
  function guardarCarrito(carrito) {
    localStorage.setItem('carritoNike', JSON.stringify(carrito));
  }
  // Evento para agregar productos al carrito
  botonesAgregar.forEach(function(btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.product-card');
      var nombre = card.querySelector('.product-card-title').textContent.trim();
      var precioTexto = card.querySelector('h4').textContent.replace(/[^\d]/g, '');
      var precio = parseInt(precioTexto, 10);
      var imgDiv = card.querySelector('.product-card-img');
      var bgImg = imgDiv.style.backgroundImage;
      var imagen = bgImg.slice(5, -2);
      var carrito = obtenerCarrito();
      var idx = carrito.findIndex(function(p) { return p.nombre === nombre; });
      if (idx !== -1) {
        carrito[idx].cantidad += 1;
      } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1, imagen: imagen });
      }
      guardarCarrito(carrito);
      Swal.fire({
        icon: 'success',
        title: '¡Agregado al carrito!',
        text: nombre + ' se añadió al carrito.',
        timer: 1200,
        showConfirmButton: false
      });
    });
  });
}


