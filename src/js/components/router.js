// ==============  router.js  ==============
// Умное определение basePath для всех окружений
export const basePath = (() => {
  // Если GitHub Pages
  if (window.location.hostname.includes("github.io")) {
    return "/AQUANIKA";
  }
  // Если локальная разработка с Vite
  if (window.location.hostname === "localhost") {
    return "/AQUANIKA";
  }
  // Для продакшена на собственном домене
  return "";
})();

// Флаг для определения типа окружения
export const isGitHubPages = window.location.hostname.includes("github.io");
export const isLocal = window.location.hostname === "localhost";

// Маршруты: ключ — «чистый» pathname, значение — файл страницы
export const routes = {
  "/": "/pages/home.html",
  "/about": "/pages/about.html",
  "/team": "/pages/team.html",
  "/reviews": "/pages/reviews.html",
  "/vacancies": "/pages/vacancies.html",
  "/gallery": "/pages/gallery.html",
  "/prices": "/pages/prices.html",
  "/promotions": "/pages/promotions.html",
  "/contacts": "/pages/contacts.html",

  "/services/spa": "/pages/spa-and-massage.html",
  "/services/aquanika": "/pages/aquanika-massage.html",
  "/services/massage": "/pages/massage.html",
  "/services/wrapping": "/pages/wrapping.html",

  "/services/epilation": "/pages/epilation.html",
  "/services/epilation/laser": "/pages/laser-epilation.html",
  "/services/epilation/sugaring": "/pages/sugaring.html",

  "/services/brows": "/pages/brows-and-lashes.html",
  "/services/brows/architecture": "/pages/brows-architecture.html",
  "/services/brows/extensions": "/pages/brows-extensions.html",
  "/services/nails": "/pages/manicure-pedicure.html",
  "/services/nails/manicure": "/pages/manicure.html",
  "/services/nails/pedicure": "/pages/pedicure.html",
  "/services/nails/extensions": "/pages/nails-extensions.html",
  "/services/cosmetology": "/pages/cosmetology.html",
  "/services/cosmetology/face-care": "/pages/face-care.html",
  "/services/cosmetology/injections": "/pages/injections.html",
  "/services/cosmetology/tattoo-removal": "/pages/tattoo-removal.html",
  "/services/hairdressing": "/pages/hairdressing.html",
  "/services/hairdressing/haircuts": "/pages/haircuts.html",
  "/services/hairdressing/coloring": "/pages/hair-coloring.html",
  "/services/hairdressing/styling": "/pages/hair-styling.html",
  "/services/makeup": "/pages/makeup.html",
  "/services/men": "/pages/men-services.html",
  "/services/men/haircut": "/pages/men-haircut.html",
  "/services/men/massage": "/pages/men-massage.html",
  "/services/men/manicure": "/pages/men-manicure.html",
};

// Страницы, где нужно показывать боковое меню
const pagesWithSideMenu = [
  "/about",
  "/team",
  "/reviews",
  "/vacancies",
  "/gallery",
];

// Заголовки страниц
const pageTitles = {
  "/": "Aquanika – салон красоты премиум-класса",
  "/about": "О нас – Aquanika",
  "/team": "Наша команда – Aquanika",
  "/reviews": "Отзывы – Aquanika",
  "/vacancies": "Вакансии – Aquanika",
  "/gallery": "Галерея – Aquanika",
  "/prices": "Цены – Aquanika",
  "/promotions": "Акции – Aquanika",
  "/contacts": "Контакты – Aquanika",
  "/services/spa": "SPA и массаж – Aquanika",
  "/services/aquanika": "Подводно-вакуумный массаж 'Акваника' – Aquanika",
  "/services/massage": "Массаж – Aquanika",
  "/services/wrapping": "Обертывания – Aquanika",

  "/services/epilation": "Эпиляция – Aquanika",
  "/services/epilation/laser": "Лазерная эпиляция – Aquanika",
  "/services/epilation/sugaring": "Шугаринг – Aquanika",
  "/services/brows": "Брови и ресницы – Aquanika",
  "/services/brows/architecture": "Брови — Архитектура – Aquanika",
  "/services/brows/extensions": "Ресницы — Наращивание – Aquanika",
  "/services/nails": "Ногтевой сервис – Aquanika",
  "/services/nails/manicure": "Маникюр – Aquanika",
  "/services/nails/pedicure": "Педикюр – Aquanika",
  "/services/nails/extensions": "Наращивание ногтей – Aquanika",
  "/services/cosmetology": "Косметология – Aquanika",
  "/services/cosmetology/face-care": "Косметология — Уход за лицом – Aquanika",
  "/services/cosmetology/injections": "Косметология — Инъекции – Aquanika",
  "/services/cosmetology/tattoo-removal":
    "Косметология — Выведение татуажа – Aquanika",
  "/services/hairdressing": "Парикмахерские услуги – Aquanika",
  "/services/hairdressing/haircuts": "Стрижки – Aquanika",
  "/services/hairdressing/coloring": "Окрашивание – Aquanika",
  "/services/hairdressing/styling": "Укладки – Aquanika",
  "/services/makeup": "Макияж – Aquanika",
  "/services/men": "Услуги для мужчин – Aquanika",
  "/services/men/haircut": "Для мужчин — Стрижка – Aquanika",
  "/services/men/massage": "Для мужчин — Массаж – Aquanika",
  "/services/men/manicure": "Для мужчин — Маникюр – Aquanika",
};

// ---------------- helpers ----------------
// Умная загрузка компонентов для всех окружений
async function loadComponent(path) {
  // Всегда добавляем basePath для абсолютных путей
  let url = path;
  if (path.startsWith("/")) {
    url = `${basePath}${path}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${url}`);
  return res.text();
}

// Извлекает только содержимое основной части страницы, исключая теги из <head>
function extractPageContent(html) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    // Предпочитаем содержимое <main>
    const mainEl = doc.querySelector("main");
    if (mainEl) return mainEl.innerHTML;
    // Fallback на <body>
    if (doc.body) return doc.body.innerHTML;
  } catch (e) {
    console.warn("HTML parse failed, using raw content", e);
  }
  // Если парсинг не удался — возвращаем как есть
  return html;
}

// ---------------- routing ----------------
// Определяет актуальный «чистый» маршрут
export function getRoute() {
  let path = window.location.pathname;

  // Убираем basePath если он присутствует
  if (basePath && path.startsWith(basePath)) {
    path = path.slice(basePath.length);
  }

  return path || "/";
}

// Загружает контент нужной страницы
export async function loadPage(route) {
  const htmlPath = routes[route] || routes["/"];
  const showSideMenu = pagesWithSideMenu.includes(route);

  document.title = pageTitles[route] || "Aquanika";

  try {
    const rawContent = await loadComponent(htmlPath);
    const pageContent = extractPageContent(rawContent);

    if (showSideMenu) {
      const sideMenu = await loadComponent(
        "/components/partials/side-menu.html"
      );
      document.querySelector("main").innerHTML = `
        <div class="page-with-sidebar">
          ${sideMenu}
          <div class="page-content">${pageContent}</div>
        </div>`;

      // Динамический импорт sideMenu.js
      try {
        const sideMenuModule = await import("./sideMenu.js");
        if (sideMenuModule.initSideMenu) {
          sideMenuModule.initSideMenu();
        } else if (
          sideMenuModule.default &&
          sideMenuModule.default.initSideMenu
        ) {
          sideMenuModule.default.initSideMenu();
        }
      } catch (err) {
        console.warn("sideMenu.js not available:", err);
      }
    } else {
      document.querySelector("main").innerHTML = pageContent;
    }

    // Инициализация компонентов после загрузки страницы
    initPageComponents();
  } catch (error) {
    console.error("Ошибка загрузки страницы:", error);
    // Fallback на главную страницу
    if (route !== "/") {
      navigateTo("/");
    }
  }
}

// Функция для программного перехода
export function navigateTo(path) {
  const cleanPath = path.startsWith("/") ? path : "/" + path;
  const fullPath = basePath + cleanPath;
  window.history.pushState({}, "", fullPath);
  handleLocation();
}

// Сделайте navigateTo доступной глобально для использования в sideMenu.js
window.navigateTo = navigateTo;

// Переход по истории браузера
function handleLocation() {
  loadPage(getRoute());
}

// Клик по внутренним ссылкам
function handleNavigation(e) {
  const link = e.target.closest("a");
  if (!link) return;

  const url = new URL(link.href);
  if (url.origin !== window.location.origin || link.closest(".side-menu"))
    return;

  e.preventDefault();
  navigateTo(url.pathname.replace(basePath, "") || "/");
}

// Функция для обработки редиректов
export function handleRedirects() {
  // Для GitHub Pages - проверяем sessionStorage
  if (isGitHubPages) {
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath) {
      console.log("GitHub Pages редирект:", redirectPath);
      sessionStorage.removeItem("redirectPath");
      if (routes[redirectPath]) {
        navigateTo(redirectPath);
        return true;
      }
    }
  }

  // Для всех окружений - проверяем текущий URL
  const currentPath = window.location.pathname;
  let cleanPath = currentPath;

  if (basePath && currentPath.startsWith(basePath)) {
    cleanPath = currentPath.slice(basePath.length);
  }

  // Если путь не корневой и не заканчивается на .html, но есть в маршрутах
  if (cleanPath !== "/" && !cleanPath.endsWith(".html") && routes[cleanPath]) {
    console.log("Прямой переход по ссылке:", cleanPath);
    navigateTo(cleanPath);
    return true;
  }

  return false;
}

// Инициализация компонентов страницы
function initPageComponents() {
  // Инициализация каруселей, форм и других компонентов
  if (typeof window.initCarousels === "function") {
    window.initCarousels();
  }
  if (typeof window.initForms === "function") {
    window.initForms();
  }
  // Инициализация видео-модалки после вставки контента страницы
  if (typeof window.initVideoModal === "function") {
    window.initVideoModal();
  }
}

// ---------------- init ----------------
export function initRouter() {
  // Обрабатываем редиректы
  const hasRedirect = handleRedirects();

  if (!hasRedirect) {
    // Инициализируем обычный роутинг
    document.addEventListener("click", handleNavigation);
    window.addEventListener("popstate", handleLocation);
    handleLocation();
  }
}

// Экспорт для использования в других модулях
export default {
  basePath,
  routes,
  getRoute,
  loadPage,
  navigateTo,
  handleRedirects,
  initRouter,
};
