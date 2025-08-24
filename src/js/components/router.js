// ==============  router.js  ==============
// чтобы и локально и на GitHub Pages всё работало
// const isDev = import.meta.env.DEV;
// const basePath = isDev ? '' : '/AQUANIKA';
export const basePath = "/AQUANIKA";

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
  "/services/laser": "/pages/laser-epilation.html",
  "/services/brows": "/pages/brows-and-lashes.html",
  "/services/nails": "/pages/manicure-pedicure.html",
  "/services/cosmetology": "/pages/cosmetology.html",
  "/services/hairdressing": "/pages/hairdressing.html",
  "/services/makeup": "/pages/makeup.html",
  "/services/men": "/pages/men-services.html",
};

// Страницы, где нужно показывать боковое меню
const pagesWithSideMenu = [
  "/about",
  "/team",
  "/reviews",
  "/vacancies",
  "/gallery",
];

// ---------------- helpers ----------------
// Загружает любой HTML-чунк
async function loadComponent(path) {
  const url = path.startsWith("/")
    ? `${basePath}${path}`
    : `${basePath}/${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${url}`);
  return res.text();
}

// Заголовки страниц
const pageTitles = {
  "/": "Aqvanika – салон красоты премиум-класса",
  "/about": "О нас – Aqvanika",
  "/team": "Наша команда – Aqvanika",
  "/reviews": "Отзывы – Aqvanika",
  "/vacancies": "Вакансии – Aqvanika",
  "/gallery": "Галерея – Aqvanika",
  "/prices": "Цены – Aqvanika",
  "/promotions": "Акции – Aqvanika",
  "/contacts": "Контакты – Aqvanika",
  "/services/spa": "SPA и массаж – Aqvanika",
  "/services/laser": "Лазерная эпиляция – Aqvanika",
  "/services/brows": "Брови и ресницы – Aqvanika",
  "/services/nails": "Маникюр и педикюр – Aqvanika",
  "/services/cosmetology": "Косметология – Aqvanika",
  "/services/hairdressing": "Парикмахерские услуги – Aqvanika",
  "/services/makeup": "Макияж – Aqvanika",
  "/services/men": "Услуги для мужчин – Aqvanika",
};

// ---------------- routing ----------------
// Определяет актуальный «чистый» маршрут
function getRoute() {
  return window.location.pathname.replace(basePath, "") || "/";
}

// Загружает контент нужной страницы
async function loadPage(route) {
  const htmlPath = routes[route] || routes["/"];
  const showSideMenu = pagesWithSideMenu.includes(route);

  document.title = pageTitles[route] || "Aqvanika";

  const content = await loadComponent(htmlPath);

  if (showSideMenu) {
    const sideMenu = await loadComponent("/components/partials/side-menu.html");
    document.querySelector("main").innerHTML = `
      <div class="page-with-sidebar">
        ${sideMenu}
        <div class="page-content">${content}</div>
      </div>`;

    // динамический импорт скрипта бокового меню
    import(`/js/components/sideMenu.js`)
      .then((m) => m.initSideMenu?.())
      .catch((err) => console.error("sideMenu.js failed:", err));
  } else {
    document.querySelector("main").innerHTML = content;
  }
}

// Переход по истории браузера
function handleLocation() {
  loadPage(getRoute());
}

// Клик по внутренним ссылкам
function handleNavigation(e) {
  const link = e.target.closest("a");
  if (!link) return;

  const url = new URL(link.href);
  if (
    url.origin !== window.location.origin ||
    link.closest(".side-menu") // исключаем боковое меню
  )
    return;

  e.preventDefault();
  const cleanPath = url.pathname.replace(basePath, "") || "/";
  window.history.pushState({}, "", basePath + cleanPath);
  handleLocation();
}

// ---------------- init ----------------
export function initRouter() {
  document.addEventListener("click", handleNavigation);
  window.addEventListener("popstate", handleLocation);
  handleLocation();
}
