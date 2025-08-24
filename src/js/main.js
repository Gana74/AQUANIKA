// Импорт стилей
import "../styles/main.css";

// Импорт компонентов
import { loadComponent } from "./components/loadComponents.js";
import "./components/toTopButton.js";
import { MobileMenu } from "./components/mobileMenu.js";
import { initRouter } from "./components/router.js";

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  console.log("Сайт загружен");

  // Загрузка хедера и футера
  if (document.getElementById("header-placeholder")) {
    loadComponent("header-placeholder", "/AQUANIKA/components/partials/header.html");
  }
  if (document.getElementById("footer-placeholder")) {
    loadComponent("footer-placeholder", "/AQUANIKA/components/partials/footer.html");
  }

  // Инициализация мобильного меню
  new MobileMenu();

  // Инициализация роутера
  initRouter();
});
