// Импорт компонентов
import "lazysizes";
import "./components/toTopButton.js";
import { initVideoModal } from "./components/modalVideo.js";
import { initGalleryModal } from "./components/modalGallery.js";

import { loadComponent } from "./components/loadComponents.js";
import { MobileMenu } from "./components/mobileMenu.js";
import { initRouter } from "./components/router.js";
window.initVideoModal = initVideoModal;
window.initGalleryModal = initGalleryModal;

// Умная загрузка компонентов header/footer
async function loadLayoutComponents() {
  try {
    if (document.getElementById("header-placeholder")) {
      await loadComponent(
        "header-placeholder",
        "/components/partials/header.html"
      );
    }
    if (document.getElementById("footer-placeholder")) {
      await loadComponent(
        "footer-placeholder",
        "/components/partials/footer.html"
      );
    }
  } catch (error) {
    console.warn("Layout components loading failed:", error);
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", async () => {
  console.log(
    "🚀 Aqvanika loaded in",
    window.location.hostname.includes("github.io")
      ? "GitHub Pages"
      : window.location.hostname === "localhost"
      ? "Local development"
      : "Production",
    "mode"
  );

  // Параллельная загрузка компонентов и инициализация
  await Promise.all([
    loadLayoutComponents(),
    new Promise((resolve) => {
      new MobileMenu();
      resolve();
    }),
  ]);

  initRouter();
});
