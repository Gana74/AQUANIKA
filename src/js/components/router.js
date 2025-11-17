// ==============  router.js  ==============
// Умное определение basePath для всех окружений
export const basePath = (() => {
  if (window.location.hostname.includes("github.io")) {
    return "/AQUANIKA";
  }
  // if (window.location.hostname === "localhost") {
  //   return "/AQUANIKA";
  // }
  return "";
})();

export const isGitHubPages = window.location.hostname.includes("github.io");
export const isLocal = window.location.hostname === "localhost";

// Маршруты
export const routes = {
  "/": "/pages/home.html",
  "/about": "/pages/about.html",
  "/team": "/pages/team.html",
  "/reviews": "/pages/reviews.html",
  "/vacancies": "/pages/vacancies.html",
  "/gallery": "/pages/gallery.html",
  "/price": "/pages/price.html",
  "/contacts": "/pages/contacts.html",
  "/privacy": "/pages/privacy.html",
  "/404": "/404.html", // Добавлен маршрут для 404 страницы

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
  "/services/hairdressing/hair-care": "/pages/hair-care.html",

  "/services/makeup": "/pages/makeup.html",

  "/services/men": "/pages/men-services.html",
  "/services/men/haircut": "/pages/men-haircut.html",
  "/services/men/epilation": "/pages/men-epilation.html",
  "/services/men/manicure": "/pages/men-manicure.html",
};

// Страницы с боковым меню
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
  "/contacts": "Контакты – Aquanika",
  "/price": "Прайс-лист",
  "/privacy": "Политика конфиденциальности",
  "/404": "Страница не найдена – Aquanika", // Добавлен заголовок для 404

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
  "/services/hairdressing/hair-care": "Уход за волосами – Aquanika",
  "/services/makeup": "Макияж – Aquanika",
  "/services/men": "Услуги для мужчин – Aquanika",
  "/services/men/haircut": "Для мужчин — Стрижка – Aquanika",
  "/services/men/epilation": "Для мужчин — Эпиляция – Aquanika",
  "/services/men/manicure": "Для мужчин — Маникюр – Aquanika",
};

// ---------------- БЕЗОПАСНЫЕ HELPERS ----------------

// Безопасное создание элементов
function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  // Установка атрибутов
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "className") {
      element.className = value;
    } else if (key === "textContent") {
      element.textContent = value;
    } else if (key === "innerHTML") {
      // ВАЖНО: никогда не используем innerHTML в продакшене
      console.warn("Потенциально опасное использование innerHTML");
    } else if (key.startsWith("on")) {
      // Запрещаем обработчики событий извне
      console.warn("Потенциально опасные обработчики событий запрещены");
    } else {
      element.setAttribute(key, value);
    }
  });

  // Добавление детей
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });

  return element;
}

// Безопасное создание ссылки
function createSafeLink(href, text, className = "", target = "_self") {
  const link = createElement(
    "a",
    {
      href: href,
      className: className,
      target: target,
      rel: target === "_blank" ? "noopener noreferrer" : "",
    },
    [text]
  );

  return link;
}

// Безопасная загрузка компонентов
async function loadComponent(path) {
  let url = path;
  if (path.startsWith("/")) {
    url = `${basePath}${path}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${url}`);
  return res.text();
}

// Безопасное извлечение контента страницы
function extractPageContentSafely(html) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Полностью безопасное извлечение - только текстовые узлы и разрешенные элементы
    const mainEl = doc.querySelector("main");
    if (mainEl) {
      return Array.from(mainEl.childNodes);
    }

    return Array.from(doc.body?.childNodes || []);
  } catch (e) {
    console.warn("Safe HTML parse failed, using fallback", e);
    return [document.createTextNode("Контент временно недоступен")];
  }
}

// Усиление безопасности внешних ссылок
function secureExternalLinks(root = document) {
  const links = root.querySelectorAll('a[target="_blank"]');
  links.forEach((a) => {
    const rel = (a.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
    if (!rel.includes("noopener")) rel.push("noopener");
    if (!rel.includes("noreferrer")) rel.push("noreferrer");
    a.setAttribute("rel", rel.join(" "));
  });
}

// ---------------- БЕЗОПАСНЫЙ ROUTING ----------------

// Определяет актуальный маршрут
export function getRoute() {
  let path = window.location.pathname;
  if (basePath && path.startsWith(basePath)) {
    path = path.slice(basePath.length);
  }
  return path || "/";
}

// Проверка существования маршрута
export function isValidRoute(route) {
  return routes.hasOwnProperty(route);
}

// Безопасная вставка контента
function safelyInsertContent(container, contentNodes) {
  container.replaceChildren(); // Очищаем безопасно

  contentNodes.forEach((node) => {
    // Клонируем узлы для безопасности
    const clonedNode = node.cloneNode(true);
    container.appendChild(clonedNode);
  });
}

// Загружает контент безопасно
export async function loadPage(route) {
  // Проверяем существование маршрута
  if (!isValidRoute(route) && route !== "/") {
    console.warn(`🚨 Маршрут не найден: ${route}, показываем страницу 404`);
    route = "/404";
  }

  const htmlPath = routes[route] || routes["/"];
  const showSideMenu = pagesWithSideMenu.includes(route);

  document.title = pageTitles[route] || "Aquanika";

  try {
    const rawContent = await loadComponent(htmlPath);
    const pageContentNodes = extractPageContentSafely(rawContent);

    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    if (showSideMenu) {
      // Загрузка side menu безопасно
      await loadSideMenuSafely(mainEl, pageContentNodes);
    } else {
      // Прямая вставка контента
      safelyInsertContent(mainEl, pageContentNodes);
    }

    // Инициализация компонентов после загрузки
    await initPageComponents();

    // Безопасный скроллинг
    handleSafeScrolling(showSideMenu);
  } catch (error) {
    console.error("Ошибка загрузки страницы:", error);
    // При ошибке загрузки показываем 404
    if (route !== "/404") {
      navigateTo("/404");
    }
  }
}

// Безопасная загрузка side menu
async function loadSideMenuSafely(mainEl, pageContentNodes) {
  try {
    const sideMenuContent = await loadComponent(
      "/components/partials/side-menu.html"
    );
    const sideMenuNodes = extractPageContentSafely(sideMenuContent);

    const wrapper = createElement("div", {
      className: "page-with-sidebar container",
    });

    // Создаем контейнер для side menu
    const sideMenuContainer = createElement("div", {
      className: "side-menu-container",
    });
    safelyInsertContent(sideMenuContainer, sideMenuNodes);
    wrapper.appendChild(sideMenuContainer);

    // Создаем контейнер для контента
    const contentContainer = createElement("div", {
      className: "page-content",
    });
    safelyInsertContent(contentContainer, pageContentNodes);
    wrapper.appendChild(contentContainer);

    // Очищаем и вставляем
    mainEl.replaceChildren();
    mainEl.appendChild(wrapper);

    // Динамический импорт sideMenu.js
    try {
      const sideMenuModule = await import("./sideMenu.js");
      const initFn =
        sideMenuModule.initSideMenu ||
        (sideMenuModule.default && sideMenuModule.default.initSideMenu);
      if (initFn) initFn();
    } catch (err) {
      console.warn("sideMenu.js not available:", err);
    }
  } catch (error) {
    console.error("Ошибка загрузки side menu:", error);
    // Fallback - показываем только контент
    safelyInsertContent(mainEl, pageContentNodes);
  }
}

// Безопасный скроллинг
function handleSafeScrolling(showSideMenu) {
  const { hash } = window.location;

  if (hash) {
    const tryScrollToHash = () => {
      const id = hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (!tryScrollToHash()) {
      requestAnimationFrame(() => {
        if (!tryScrollToHash()) {
          setTimeout(tryScrollToHash, 50);
        }
      });
    }
  } else if (showSideMenu) {
    const pageContentContainer = document.querySelector(".page-content");
    if (pageContentContainer) {
      setTimeout(() => {
        pageContentContainer.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } else {
    window.scrollTo(0, 0);
  }
}

// Функция для программного перехода
export function navigateTo(path) {
  const raw = path.startsWith("/") ? path : "/" + path;
  const hashIndex = raw.indexOf("#");
  const pathnameOnly = hashIndex >= 0 ? raw.slice(0, hashIndex) : raw;
  const hash = hashIndex >= 0 ? raw.slice(hashIndex) : "";
  const fullPath = basePath + pathnameOnly + hash;
  window.history.pushState({}, "", fullPath);
  handleLocation();
}

// Обработчик навигации
function handleNavigation(e) {
  const link = e.target.closest("a");
  if (!link) return;

  const url = new URL(link.href);
  if (url.origin !== window.location.origin || link.closest(".side-menu"))
    return;

  // Обработка якорей
  const currentPath = window.location.pathname;
  const linkPath = url.pathname;
  if (link.hash && linkPath === currentPath) {
    e.preventDefault();
    const id = link.hash.slice(1);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = link.hash;
    }
    return;
  }

  e.preventDefault();
  const relativePath = linkPath.replace(basePath, "") || "/";
  navigateTo(relativePath + (url.hash || ""));
}

// Обработка редиректов
export function handleRedirects() {
  if (isGitHubPages) {
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath) {
      sessionStorage.removeItem("redirectPath");
      if (routes[redirectPath]) {
        navigateTo(redirectPath);
        return true;
      }
    }
  }

  const currentPath = window.location.pathname;
  let cleanPath = currentPath;

  if (basePath && currentPath.startsWith(basePath)) {
    cleanPath = currentPath.slice(basePath.length);
  }

  if (cleanPath !== "/" && !cleanPath.endsWith(".html") && routes[cleanPath]) {
    navigateTo(cleanPath);
    return true;
  }

  return false;
}

// Безопасная инициализация компонентов
async function initPageComponents() {
  // Инициализация других компонентов
  if (typeof window.initCarousels === "function") {
    window.initCarousels();
  }
  if (typeof window.initForms === "function") {
    window.initForms();
  }
  if (typeof window.initVideoModal === "function") {
    window.initVideoModal();
  }
  if (typeof window.initGalleryModal === "function") {
    window.initGalleryModal();
  }

  // Безопасная инициализация каруселей
  try {
    const carousels = document.querySelectorAll(".promo-carousel");
    if (carousels.length) {
      import("./carousel.js").then((m) => {
        const init = m.initCarousel || (m.default && m.default.initCarousel);
        if (!init) return;
        carousels.forEach((el) => {
          if (!el.dataset.inited) {
            init(el);
            el.dataset.inited = "true";
          }
        });
      });
    }
  } catch (e) {
    console.warn("Carousel init failed", e);
  }

  // Усиление безопасности внешних ссылок
  try {
    secureExternalLinks(document);
  } catch (e) {
    console.warn("secureExternalLinks failed", e);
  }

  // Инициализация карты, если на странице есть контейнер карты
  try {
    const hasMapContainer = !!document.getElementById("map");
    if (hasMapContainer && typeof window.initMap === "function") {
      window.initMap();
    } else if (!hasMapContainer && typeof window.destroyMap === "function") {
      window.destroyMap();
    }
  } catch (e) {
    console.warn("Map init/destroy failed", e);
  }
}

// Обработчик изменения location
function handleLocation() {
  loadPage(getRoute()).then(() => {
    // После загрузки контента синхронно перестраиваем крошки, чтобы избежать исчезновения
    try {
      if (
        window.initBreadcrumbs &&
        typeof window.initBreadcrumbs === "function"
      ) {
        window.initBreadcrumbs();
      }
    } catch (_) {}
  });
}

// Инициализация роутера
export function initRouter() {
  const hasRedirect = handleRedirects();

  if (!hasRedirect) {
    document.addEventListener("click", handleNavigation);
    window.addEventListener("popstate", handleLocation);
    handleLocation();
  }
}

// Глобальные экспорты
window.navigateTo = navigateTo;
window.secureExternalLinks = secureExternalLinks;

// Экспорт по умолчанию
export default {
  basePath,
  routes,
  getRoute,
  isValidRoute,
  loadPage,
  navigateTo,
  handleRedirects,
  initRouter,
};
