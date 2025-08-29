import { routes, basePath } from "./router.js";

// Управление боковым меню
export function initSideMenu() {
  // Определение текущей страницы
  const currentPath = window.location.pathname.replace(basePath, "") || "/";
  const sideMenuLinks = document.querySelectorAll(".side-menu__link");
  const mainContent = document.querySelector("main");

  // Добавление класса active для текущей страницы и обработчиков событий
  sideMenuLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }

    // Удаляем старые обработчики перед добавлением новых
    link.removeEventListener("click", handleSideMenuClick);
    // Добавляем обработчик клика для каждой ссылки
    link.addEventListener("click", handleSideMenuClick);
  });

  // Добавление класса для контента
  if (mainContent) {
    mainContent.classList.add("with-side-menu");
    // Настраиваем поведение для мобильных устройств
    setupMobileMenu(mainContent);
  }
}

// Показ/скрытие меню на мобильных устройствах
function setupMobileMenu(mainContent) {
  const sideMenu = document.querySelector(".side-menu");
  if (sideMenu) {
    const mediaQuery = window.matchMedia("(max-width: 992px)");

    function handleScreenChange(e) {
      if (e.matches) {
        // Мобильная версия
        mainContent.classList.remove("with-side-menu");
      } else {
        // Десктопная версия
        mainContent.classList.add("with-side-menu");
      }
    }

    mediaQuery.addListener(handleScreenChange);
    handleScreenChange(mediaQuery);
  }
}

// Обработчик клика по ссылкам в боковом меню
function handleSideMenuClick(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const pageContent = document.querySelector(".page-content");

  // Обновляем URL без перезагрузки страницы
  window.history.pushState({}, "", href);

  // Удаляем класс active со всех ссылок
  document.querySelectorAll(".side-menu__link").forEach((link) => {
    link.classList.remove("active");
  });

  // Добавляем класс active текущей ссылке
  this.classList.add("active");

  // Загружаем новый контент через роутер
  if (routes[href]) {
    // Используем глобальную функцию navigateTo
    if (typeof window.navigateTo === 'function') {
      window.navigateTo(href);
    } else {
      // Fallback: перезагружаем страницу
      window.location.href = `${basePath}${href}`;
    }
  } else {
    console.error("Маршрут не найден:", href);
    if (pageContent) {
      pageContent.innerHTML = "<h1>Страница не найдена</h1>";
    }
  }
}