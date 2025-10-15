// Импорт компонентов
import "lazysizes";
import "./components/toTopButton.js";
import { initVideoModal } from "./components/modalVideo.js";
import { initGalleryModal } from "./components/modalGallery.js";
import { initFormsModals } from "./components/formsModals.js";

import { loadComponent } from "./components/loadComponents.js";
import { MobileMenu } from "./components/mobileMenu.js";
import { initRouter } from "./components/router.js";
window.initVideoModal = initVideoModal;
window.initGalleryModal = initGalleryModal;

// Делаем initForms доступной для роутера (динамических страниц)
import { initForms } from "./components/forms.js";
window.initForms = initForms;

// Экспортируем утилиты безопасности глобально
import /* re-exported in router */ "./components/router.js";
window.sanitizeHTML = window.sanitizeHTML || ((html) => html);

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
  }
  `;
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

  actions.append(acceptBtn, rejectBtn);
  banner.append(text, actions);
  document.body.appendChild(banner);
}

// Инициализация аналитики (после согласия)

function initAnalytics() {
  console.log("📊 Инициализация аналитики (после согласия пользователя)");

  // Здесь можно добавить Яндекс.Метрику или другие российские системы
  // Пример для Яндекс.Метрики:
  /*
  if (typeof ym !== 'undefined') {
    ym(12345678, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true
    });
  }
  */
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

// Проверка юридических требований при загрузке
function checkLegalRequirements() {
  const requirements = {
    privacyPage: !!document.querySelector('a[href*="privacy"]'),
    formsWithConsent: document.querySelectorAll(
      'input[name="personal-data-consent"]'
    ).length,
    cookieBanner: !!document.getElementById("cookieBanner"),
    hasLegalInfo: !!document.querySelector(
      '.legal-info, [class*="requisites"], [class*="реквизиты"]'
    ),
  };

  console.log("📋 Проверка юридических требований:", requirements);

  if (!requirements.privacyPage) {
    console.warn("⚠️ Не найдена ссылка на политику конфиденциальности");
  }

  if (!requirements.hasLegalInfo) {
    console.warn("⚠️ Не найдена юридическая информация (реквизиты)");
  }

  return requirements;
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

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", async () => {
  console.log(
    "🚀 AQUANIKA loaded in",
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

  try {
    checkLegalRequirements();
  } catch (e) {
    console.warn("Legal requirements check failed", e);
  }
  // ========== КОНЕЦ ИНИЦИАЛИЗАЦИИ ЮРИДИЧЕСКИХ ФУНКЦИЙ ==========

  initRouter();
});

// Экспортируем юридические функции для использования в других модулях
export {
  initCookieBanner,
  addConsentToForms,
  initFormValidation,
  checkLegalRequirements,
};
