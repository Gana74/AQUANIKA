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
  "/services/aquanika": "/pages/aquanika-massage.html",
  "/services/massage": "/pages/massage.html",
  "/services/wrapping": "/pages/wrapping.html",
  "/services/laser": "/pages/laser-epilation.html",
  "/services/laser/bikini": "/pages/laser-bikini.html",
  "/services/laser/legs": "/pages/laser-legs.html",
  "/services/laser/arms": "/pages/laser-arms.html",
  "/services/brows": "/pages/brows-and-lashes.html",
  "/services/brows/architecture": "/pages/brows-architecture.html",
  "/services/brows/tinting": "/pages/brows-tinting.html",
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
  "/services/makeup/day": "/pages/makeup-day.html",
  "/services/makeup/evening": "/pages/makeup-evening.html",
  "/services/makeup/wedding": "/pages/makeup-wedding.html",
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
  "/services/aquanika": "Подводно-вакуумный массаж 'Акваника' – Aqvanika",
  "/services/massage": "Массаж – Aqvanika",
  "/services/wrapping": "Обертывания – Aqvanika",
  "/services/laser": "Лазерная эпиляция – Aqvanika",
  "/services/laser/bikini": "Лазерная эпиляция — Бикини – Aqvanika",
  "/services/laser/legs": "Лазерная эпиляция — Ноги – Aqvanika",
  "/services/laser/arms": "Лазерная эпиляция — Руки – Aqvanika",
  "/services/brows": "Брови и ресницы – Aqvanika",
  "/services/brows/architecture": "Брови — Архитектура – Aqvanika",
  "/services/brows/tinting": "Брови — Окрашивание – Aqvanika",
  "/services/brows/extensions": "Ресницы — Наращивание – Aqvanika",
  "/services/nails": "Маникюр и педикюр – Aqvanika",
  "/services/nails/manicure": "Маникюр – Aqvanika",
  "/services/nails/pedicure": "Педикюр – Aqvanika",
  "/services/nails/extensions": "Наращивание ногтей – Aqvanika",
  "/services/cosmetology": "Косметология – Aqvanika",
  "/services/cosmetology/face-care": "Косметология — Уход за лицом – Aqvanika",
  "/services/cosmetology/injections": "Косметология — Инъекции – Aqvanika",
  "/services/cosmetology/tattoo-removal":
    "Косметология — Выведение татуажа – Aqvanika",
  "/services/hairdressing": "Парикмахерские услуги – Aqvanika",
  "/services/hairdressing/haircuts": "Стрижки – Aqvanika",
  "/services/hairdressing/coloring": "Окрашивание – Aqvanika",
  "/services/hairdressing/styling": "Укладки – Aqvanika",
  "/services/makeup": "Макияж – Aqvanika",
  "/services/makeup/day": "Макияж — Дневной – Aqvanika",
  "/services/makeup/evening": "Макияж — Вечерний – Aqvanika",
  "/services/makeup/wedding": "Макияж — Свадебный – Aqvanika",
  "/services/men": "Услуги для мужчин – Aqvanika",
  "/services/men/haircut": "Для мужчин — Стрижка – Aqvanika",
  "/services/men/massage": "Для мужчин — Массаж – Aqvanika",
  "/services/men/manicure": "Для мужчин — Маникюр – Aqvanika",
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
