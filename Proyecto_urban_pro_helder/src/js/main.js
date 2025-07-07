


export function loadView(view) {
  fetch(`../html/${view}.html`)
    .then(response => response.text())
    .then(html => {
      document.getElementById("main-content").innerHTML = html;
      lucide.createIcons(); // <- Re-inicializa íconos cada vez
    })
    .catch(err => console.error("Error cargando vista:", err));
}

// Eventos para navegación
document.addEventListener("DOMContentLoaded", () => {
  loadView("home"); // Cargar vista principal al iniciar

  document.getElementById("nav-home")?.addEventListener("click", () => loadView("home"));
  document.getElementById("favoritesBtn")?.addEventListener("click", () => loadView("favorites"));
  document.getElementById("cart-toggle")?.addEventListener("click", () => loadView("carrito"));
});
