// productos.js
// Ahora usamos fetch para obtener los productos desde un archivo JSON externo
fetch('productos.json')
  .then(response => response.json())
  .then(productosNike => {
    // Renderizar productos dinámicamente desde productosNike
    const productosContainer = document.getElementById('productos-container');
    productosNike.forEach(producto => {
      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
      col.innerHTML = `
        <div class="product-card h-100">
          <div class="product-card-img" style="background-image: url('${producto.imagen}');"></div>
          <div class="product-card-body">
            <h3 class="product-card-title">${producto.nombre}</h3>
            <h4>$${producto.precio.toLocaleString()}</h4>
            <button class="product-card-btn">Añadir al carrito</button>
          </div>
        </div>
      `;
      productosContainer.appendChild(col);
    });
    initProductosPage();
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });
