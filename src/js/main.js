// Импорт компонентов
import "lazysizes";
import "./components/toTopButton.js";
import { initVideoModal } from "./components/modalVideo.js";
import { initGalleryModal } from "./components/modalGallery.js";
import { initFormsModals } from "./components/formsModals.js";

import { loadComponent } from "./components/loadComponents.js";
import { MobileMenu } from "./components/mobileMenu.js";
import { initRouter } from "./components/router.js";

// Импорт карты
import { initMap, destroyMap } from "./components/map.js";

// Делаем функции видеомодального окна доступными глобально для роутера
window.initVideoModal = initVideoModal;
window.initGalleryModal = initGalleryModal;

// Делаем функции карты доступными глобально для роутера
window.initMap = initMap;
window.destroyMap = destroyMap;

// Делаем initForms доступной для роутера (динамических страниц)
import { initForms } from "./components/forms.js";
window.initForms = initForms;

// Экспортируем утилиты безопасности глобально
import "./components/router.js";
window.sanitizeHTML = window.sanitizeHTML || ((html) => html);

// ========== BREADCRUMBS (Хлебные крошки) ==========

/**
 * Генерирует BreadcrumbList структурированные данные
 */
function generateBreadcrumbs() {
  const currentPath = window.location.pathname;
  const baseUrl = window.location.origin;

  // Используем basePath из роутера для согласованности
  const basePath =
    window.basePath ||
    (window.location.hostname.includes("github.io") ? "/AQUANIKA" : "");

  // Базовая структура для главной страницы
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: `${baseUrl}${basePath}/`,
    },
  ];

  let position = 2;

  // Главная страница
  if (currentPath === `${basePath}/` || currentPath === "/") {
    return createBreadcrumbScript(breadcrumbs);
  }

  // Страницы верхнего уровня
  const topLevelPages = {
    "/about": "О нас",
    "/team": "Наша команда",
    "/reviews": "Отзывы",
    "/price": "Цены",
    "/gallery": "Галерея",
    "/vacancies": "Вакансии",
    "/contacts": "Контакты",
    "/privacy": "Политика конфиденциальности",
  };

  // Услуги верхнего уровня
  const serviceCategories = {
    "/services/spa": "SPA и массаж",
    "/services/epilation": "Эпиляция",
    "/services/brows": "Брови и ресницы",
    "/services/nails": "Маникюр и педикюр",
    "/services/cosmetology": "Уход за кожей",
    "/services/hairdressing": "Парикмахерские услуги",
    "/services/makeup": "Макияж",
    "/services/men": "Для мужчин",
  };

  // Проверяем страницы верхнего уровня
  for (const [path, name] of Object.entries(topLevelPages)) {
    if (currentPath.includes(path)) {
      breadcrumbs.push({
        "@type": "ListItem",
        position: position,
        name: name,
        item: `${baseUrl}/AQUANIKA${path}`,
      });
      return createBreadcrumbScript(breadcrumbs);
    }
  }

  // Обрабатываем услуги с иерархией
  for (const [categoryPath, categoryName] of Object.entries(
    serviceCategories
  )) {
    const servicePages = getServicePages(categoryPath);
    const matchedService = Object.entries(servicePages).find(([servicePath]) =>
      currentPath.includes(servicePath)
    );

    if (currentPath.includes(categoryPath) || matchedService) {
      // Добавляем категорию
      breadcrumbs.push({
        "@type": "ListItem",
        position: position++,
        name: categoryName,
        item: `${baseUrl}/AQUANIKA${categoryPath}`,
      });

      // Добавляем конкретную услугу если попали сразу на нее
      if (matchedService) {
        const [servicePath, serviceName] = matchedService;
        breadcrumbs.push({
          "@type": "ListItem",
          position: position,
          name: serviceName,
          item: `${baseUrl}/AQUANIKA${servicePath}`,
        });
      }

      return createBreadcrumbScript(breadcrumbs);
    }
  }

  return null;
}

/**
 * Возвращает подуслуги для каждой категории
 */
function getServicePages(categoryPath) {
  const services = {
    "/services/spa": {
      "/services/aquanika": 'ПВМ "Акваника"',
      "/services/massage": "Массаж",
      "/services/wrapping": "Обертывание",
    },
    "/services/epilation": {
      "/services/epilation/laser": "Лазерная эпиляция",
      "/services/epilation/sugaring": "Шугаринг",
    },
    "/services/brows": {
      "/services/brows/architecture": "Архитектура бровей",
      "/services/brows/extensions": "Наращивание ресниц",
    },
    "/services/nails": {
      "/services/nails/manicure": "Маникюр",
      "/services/nails/pedicure": "Педикюр",
      "/services/nails/extensions": "Наращивание ногтей",
    },
    "/services/cosmetology": {
      "/services/cosmetology/face-care": "Косметология",
      "/services/cosmetology/injections": "Инъекции",
      "/services/cosmetology/tattoo-removal": "Выведение татуажа",
    },
    "/services/hairdressing": {
      "/services/hairdressing/haircuts": "Стрижки",
      "/services/hairdressing/coloring": "Окрашивание",
      "/services/hairdressing/styling": "Укладки",
    },
    "/services/men": {
      "/services/men/haircut": "Мужская стрижка",
      "/services/men/epilation": "Мужская эпиляция",
      "/services/men/manicure": "Мужской маникюр",
    },
  };

  return services[categoryPath] || {};
}

/**
 * Создает script элемент с structured data
 */
function createBreadcrumbScript(breadcrumbs) {
  // Удаляем старые breadcrumbs если есть
  const oldScript = document.querySelector(
    'script[type="application/ld+json"][data-breadcrumbs]'
  );
  if (oldScript) {
    oldScript.remove();
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs,
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-breadcrumbs", "true");
  script.textContent = JSON.stringify(breadcrumbData, null, 2);

  return script;
}

/**
 * Создает визуальные хлебные крошки на странице
 */
function createVisualBreadcrumbs() {
  const breadcrumbScript = document.querySelector(
    'script[type="application/ld+json"][data-breadcrumbs]'
  );
  if (!breadcrumbScript) return;

  // Защищённый парсинг JSON-LD (на случай, если CSP/минификация повредит содержимое)
  let data;
  try {
    data = JSON.parse(breadcrumbScript.textContent || "");
  } catch (_) {
    return; // Не рисуем визуальные крошки, если данные невалидные
  }
  const items = data.itemListElement;

  const breadcrumbNav = document.createElement("nav");
  breadcrumbNav.setAttribute("aria-label", "Хлебные крошки");
  breadcrumbNav.className = "breadcrumbs";

  // Создаем контейнер для ограничения ширины
  const breadcrumbContainer = document.createElement("div");
  breadcrumbContainer.className = "container";

  const ol = document.createElement("ol");
  ol.className = "breadcrumbs__list";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "breadcrumbs__item";

    if (index === items.length - 1) {
      // Текущая страница - безопасное создание
      const currentSpan = document.createElement("span");
      currentSpan.className = "breadcrumbs__current";
      currentSpan.setAttribute("aria-current", "page");
      currentSpan.textContent = item.name;
      li.appendChild(currentSpan);
    } else {
      // Ссылка - безопасное создание
      const link = document.createElement("a");
      link.href = item.item;
      link.className = "breadcrumbs__link";
      link.textContent = item.name;
      li.appendChild(link);
    }

    ol.appendChild(li);
  });

  breadcrumbContainer.appendChild(ol);
  breadcrumbNav.appendChild(breadcrumbContainer);

  // Вставляем навигацию в начало основного контента
  const main = document.querySelector("main");
  if (main) {
    main.insertBefore(breadcrumbNav, main.firstChild);
  }
}

/**
 * Инициализация хлебных крошек
 */
function initBreadcrumbs() {
  const breadcrumbScript = generateBreadcrumbs();
  if (!breadcrumbScript) return;

  // Всегда пересоздаём визуальные крошки синхронно перед навигацией, чтобы избежать мерцания
  document.head.appendChild(breadcrumbScript);
  createVisualBreadcrumbs();
}

// Делаем функции breadcrumbs доступными глобально для роутера
window.initBreadcrumbs = initBreadcrumbs;
window.generateBreadcrumbs = generateBreadcrumbs;

// Глобальная переменная basePath для согласованности с роутером
window.basePath = window.location.hostname.includes("github.io")
  ? "/AQUANIKA"
  : "";

// ========== ЮРИДИЧЕСКИЕ ФУНКЦИИ ДЛЯ СООТВЕТСТВИЯ РФ ==========

// Cookie banner — безопасная программная разметка без innerHTML
function injectCookieBannerStyles() {
  if (document.getElementById("cookieBannerStyles")) return;
  const style = document.createElement("style");
  style.id = "cookieBannerStyles";
  style.textContent = `
  .cookie-banner { 
    position: fixed; 
    left: 16px; 
    right: 16px; 
    bottom: 16px; 
    z-index: 1100; 
    display: flex; 
    gap: 16px; 
    align-items: flex-start; 
    padding: 16px; 
    background: var(--color-background, #fff); 
    color: var(--color-dark, #222); 
    border: 1px solid var(--color-border, #e0e0e0); 
    border-radius: 12px; 
    box-shadow: var(--shadow-lg, 0 10px 30px rgba(0,0,0,.15)); 
    max-width: 960px; 
    margin: 0 auto; 
  }
  .cookie-banner__text { 
    flex: 1; 
    line-height: 1.5; 
    font-size: 14px; 
  }
  .cookie-banner__actions { 
    display: flex; 
    gap: 12px; 
    flex-wrap: wrap; 
  }
  .cookie-banner__link { 
    color: var(--color-secondary, #a78b3d); 
    text-decoration: underline; 
  }
  .cookie-banner__btn { 
    white-space: nowrap; 
  }
  .consent-checkbox {
    margin: 10px 0;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 4px;
    border: 1px solid #e9ecef;
  }
  .consent-checkbox label {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 13px;
    cursor: pointer;
    line-height: 1.4;
  }
  .consent-checkbox input[type="checkbox"] {
    margin-top: 2px;
    flex-shrink: 0;
  }
  .form-consent {
    margin: 15px 0;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #007bff;
  }
  .form-consent label {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 14px;
    cursor: pointer;
    line-height: 1.4;
  }
  .form-consent input[type="checkbox"] {
    margin-top: 2px;
    flex-shrink: 0;
  }
  @media (max-width: 640px){ 
    .cookie-banner{ 
      flex-direction: column; 
      gap: 12px; 
      padding: 12px; 
    }
    .cookie-banner__actions {
      width: 100%;
      justify-content: stretch;
    }
    .cookie-banner__btn {
      flex: 1;
      min-width: 120px;
    }
  }`;

  document.head.appendChild(style);
}

function buildCookieBanner() {
  if (document.getElementById("cookieBanner")) return;

  const banner = document.createElement("div");
  banner.id = "cookieBanner";
  banner.className = "cookie-banner";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Уведомление об использовании cookies");

  const text = document.createElement("p");
  text.className = "cookie-banner__text";

  const span1 = document.createElement("span");
  span1.textContent = "Мы используем файлы cookie для улучшения работы сайта. ";

  const link = document.createElement("a");
  link.className = "cookie-banner__link";
  link.href = "/privacy";
  link.textContent = "Подробнее в Политике конфиденциальности";
  link.setAttribute("rel", "noopener");
  link.setAttribute("target", "_self");

  const span2 = document.createElement("span");
  span2.textContent = ".";

  text.append(span1, link, span2);

  const actions = document.createElement("div");
  actions.className = "cookie-banner__actions";

  const rejectBtn = document.createElement("button");
  rejectBtn.className = "button button--secondary cookie-banner__btn";
  rejectBtn.type = "button";
  rejectBtn.textContent = "Отклонить";
  rejectBtn.addEventListener("click", () => {
    try {
      localStorage.setItem("cookieConsent", "rejected");
    } catch (_) {}
    banner.remove();
  });

  const acceptBtn = document.createElement("button");
  acceptBtn.className = "button button--primary cookie-banner__btn";
  acceptBtn.type = "button";
  acceptBtn.textContent = "Принять";
  acceptBtn.addEventListener("click", () => {
    try {
      localStorage.setItem("cookieConsent", "accepted");
      localStorage.setItem("cookieConsentDate", new Date().toISOString());
    } catch (_) {}
    banner.remove();
    initAnalytics();
  });

  actions.append(rejectBtn, acceptBtn);
  banner.append(text, actions);
  document.body.appendChild(banner);
}

// Инициализация аналитики (после согласия)
function initAnalytics() {
  // Универсальная загрузка скрипта Метрики (однократно)
  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return; // Уже подключено
      }
    }
    (k = e.createElement(t)),
      (a = e.getElementsByTagName(t)[0]),
      (k.async = 1),
      (k.src = r),
      a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  // ВАШ ID счетчика
  const YM_ID = 105193701;

  // Инициализация с defer:true для SPA
  ym(YM_ID, "init", {
    defer: true,
    webvisor: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    ecommerce: "dataLayer",
  });

  // Экспортируем хелперы глобально один раз
  if (!window.__ymHelpersInstalled) {
    window.__ymHelpersInstalled = true;

    // Безопасный hit
    window.ymHit = function ymHit(url, options) {
      try {
        if (typeof ym !== "function") return;
        const finalUrl = url || window.location.href;
        const {
          title = document.title,
          referer,
          params,
          callback,
          ctx,
        } = options || {};
        ym(YM_ID, "hit", finalUrl, {
          title,
          referer,
          params,
          callback,
          ctx,
        });
      } catch (e) {
        console.warn("Yandex.Metrica hit error:", e);
      }
    };

    // Достижение цели
    window.ymGoal = function ymGoal(name, params) {
      try {
        if (typeof ym !== "function") return;
        ym(YM_ID, "reachGoal", name, params);
      } catch (e) {
        console.warn("Yandex.Metrica reachGoal error:", e);
      }
    };

    // Параметры визита/пользователя
    window.ymParams = function ymParams(obj) {
      try {
        if (typeof ym !== "function") return;
        ym(YM_ID, "params", obj);
      } catch (e) {
        console.warn("Yandex.Metrica params error:", e);
      }
    };

    // Деинициализация
    window.ymDestruct = function ymDestruct() {
      try {
        if (typeof ym !== "function") return;
        ym(YM_ID, "destruct");
      } catch (e) {
        console.warn("Yandex.Metrica destruct error:", e);
      }
    };

    // Авто-отправка hit для SPA: первичная загрузка + навигация
    (function setupSpaHits() {
      let lastUrl = window.location.href;

      // Первичный просмотр
      window.ymHit(lastUrl, { referer: document.referrer || undefined });

      const wrapHistoryMethod = (type) => {
        const orig = history[type];
        return function (...args) {
          const result = orig.apply(this, args);
          const newUrl = window.location.href;
          if (newUrl !== lastUrl) {
            window.ymHit(newUrl, { referer: lastUrl });
            lastUrl = newUrl;
          }
          return result;
        };
      };

      try {
        history.pushState = wrapHistoryMethod("pushState");
        history.replaceState = wrapHistoryMethod("replaceState");
      } catch (e) {
        console.warn("History interception failed", e);
      }

      window.addEventListener("popstate", () => {
        const newUrl = window.location.href;
        if (newUrl !== lastUrl) {
          window.ymHit(newUrl, { referer: lastUrl });
          lastUrl = newUrl;
        }
      });
    })();
  }
}

// Добавление согласия в формы обратной связи
function addConsentToForms() {
  const forms = document.querySelectorAll("form:not([data-no-consent])");

  forms.forEach((form) => {
    // Проверяем, нет ли уже чекбокса согласия
    if (!form.querySelector('input[name="personal-data-consent"]')) {
      const consentDiv = document.createElement("div");
      consentDiv.className = "form-consent";

      const consentLabel = document.createElement("label");
      const consentCheckbox = document.createElement("input");
      consentCheckbox.type = "checkbox";
      consentCheckbox.name = "personal-data-consent";
      consentCheckbox.required = true;

      const consentText = document.createElement("span");

      const textNode1 = document.createTextNode(
        "Я согласен на обработку моих персональных данных в соответствии с "
      );
      const link = document.createElement("a");
      link.href = "/privacy";
      link.target = "_blank";
      link.textContent = "Политикой конфиденциальности";
      link.style.color = "#007bff";
      const textNode2 = document.createTextNode("");

      consentText.appendChild(textNode1);
      consentText.appendChild(link);
      consentText.appendChild(textNode2);

      consentLabel.appendChild(consentCheckbox);
      consentLabel.appendChild(consentText);
      consentDiv.appendChild(consentLabel);

      // Находим кнопку отправки и вставляем перед ней
      const submitBtn = form.querySelector(
        'button[type="submit"], input[type="submit"]'
      );
      if (submitBtn) {
        submitBtn.parentNode.insertBefore(consentDiv, submitBtn);
      } else {
        form.appendChild(consentDiv);
      }
    }
  });
}

// Валидация форм с согласием
function initFormValidation() {
  document.addEventListener("submit", function (e) {
    const form = e.target;

    // Пропускаем формы без необходимости согласия
    if (form.hasAttribute("data-no-consent")) return;

    const consentCheckbox = form.querySelector(
      'input[name="personal-data-consent"]'
    );

    if (consentCheckbox && !consentCheckbox.checked) {
      e.preventDefault();
      alert(
        "Для отправки формы необходимо согласие на обработку персональных данных"
      );
      consentCheckbox.focus();
      consentCheckbox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

function initCookieBanner() {
  try {
    if (localStorage.getItem("cookieConsent") === "accepted") {
      initAnalytics(); // Если уже было согласие, инициализируем аналитику
      return;
    }
  } catch (_) {}

  injectCookieBannerStyles();
  buildCookieBanner();
}

// ========== КОНЕЦ ЮРИДИЧЕСКИХ ФУНКЦИЙ ==========

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

// Инициализация карты на странице контактов
function initContactsPage() {
  const currentPath = window.location.pathname;
  const isContactsPage =
    currentPath.includes("/contacts") || document.getElementById("map");

  if (isContactsPage) {
    // Даем время DOM для обновления после роутинга
    setTimeout(() => {
      initMap();
    }, 100);
  } else {
    // Уничтожаем карту при переходе с контактов
    destroyMap();
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", async () => {
  // Инициализация приложения

  // ========== ИНИЦИАЛИЗАЦИЯ BREADCRUMBS ==========
  try {
    initBreadcrumbs();
  } catch (e) {
    console.warn("Breadcrumbs initialization failed", e);
  }
  // ========== КОНЕЦ BREADCRUMBS ==========

  // Параллельная загрузка компонентов и инициализация
  await Promise.all([
    loadLayoutComponents(),
    new Promise((resolve) => {
      new MobileMenu();
      resolve();
    }),
  ]);

  // Инициализируем модальные формы (sidebar, контакты, моб.меню)
  try {
    initFormsModals();
  } catch (e) {
    console.warn("initFormsModals failed", e);
  }

  // ========== ИНИЦИАЛИЗАЦИЯ ЮРИДИЧЕСКИХ ФУНКЦИЙ ==========
  try {
    initCookieBanner();
  } catch (e) {
    console.warn("initCookieBanner failed", e);
  }

  try {
    addConsentToForms();
    initFormValidation();
  } catch (e) {
    console.warn("Form consent initialization failed", e);
  }

  // ========== КОНЕЦ ИНИЦИАЛИЗАЦИИ ЮРИДИЧЕСКИХ ФУНКЦИЙ ==========

  // Инициализация карты на начальной загрузке
  initContactsPage();

  // Инициализация роутера
  initRouter();
});

// Обработка изменений маршрута для карты
window.addEventListener("popstate", () => {
  setTimeout(() => {
    initContactsPage();
  }, 50);
});

// Экспортируем юридические функции для использования в других модулях
export {
  initCookieBanner,
  addConsentToForms,
  initFormValidation,
  initMap,
  destroyMap,
};
