// Импорт стилей
import "../styles/main.css";
// Импорт логики кнопки "Наверх"
import "./components/toTopButton.js";
// Импорт современного мобильного меню
import { MobileMenu } from "./components/mobileMenu.js";

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  console.log("Сайт загружен");
  // Инициализация мобильного меню
  new MobileMenu();
});
 