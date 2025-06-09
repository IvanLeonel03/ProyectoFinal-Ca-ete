document.addEventListener('DOMContentLoaded', function() {
  Swal.fire({
    title: "Bienvenido a mi sitio web basado en una simulacion de compra de un producto",
    text: "Por favor, haga clic en el botón para continuar con la simulacion de este proyecto final.",
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    }
  });
});