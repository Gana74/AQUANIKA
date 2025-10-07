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

// Cookie banner — безопасная программная разметка без innerHTML
function injectCookieBannerStyles() {
  if (document.getElementById("cookieBannerStyles")) return;
  const style = document.createElement("style");
  style.id = "cookieBannerStyles";
  style.textContent = `
  .cookie-banner { position: fixed; left: 16px; right: 16px; bottom: 16px; z-index: 1100; display: flex; gap: 16px; align-items: flex-start; padding: 16px; background: var(--color-background, #fff); color: var(--color-dark, #222); border: 1px solid var(--color-border, #e0e0e0); border-radius: 12px; box-shadow: var(--shadow-lg, 0 10px 30px rgba(0,0,0,.15)); max-width: 960px; margin: 0 auto; }
  .cookie-banner__text { flex: 1; line-height: 1.5; font-size: 14px; }
  .cookie-banner__actions { display: flex; gap: 12px; flex-wrap: wrap; }
  .cookie-banner__link { color: var(--color-secondary, #a78b3d); text-decoration: underline; }
  .cookie-banner__btn { white-space: nowrap; }
  @media (max-width: 640px){ .cookie-banner{ flex-direction: column; gap: 12px; padding: 12px; } }
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
  span1.textContent =
    "Мы обрабатываем cookies, чтобы пользоваться сайтом было удобнее. Вы можете запретить обработку cookies в настройках браузера. Пожалуйста, ознакомьтесь с ";
  const link = document.createElement("a");
  link.className = "cookie-banner__link";
  link.href = "/privacy";
  link.textContent = "политикой конфиденциальности";
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
  acceptBtn.textContent = "Понятно";
  acceptBtn.addEventListener("click", () => {
    try {
      localStorage.setItem("cookieConsent", "accepted");
    } catch (_) {}
    banner.remove();
  });

  actions.append(acceptBtn);
  banner.append(text, actions);
  document.body.appendChild(banner);
}

function initCookieBanner() {
  try {
    if (localStorage.getItem("cookieConsent") === "accepted") return;
  } catch (_) {}
  injectCookieBannerStyles();
  buildCookieBanner();
}

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

  // Инициализируем модальные формы (sidebar, контакты, моб.меню)
  try {
    initFormsModals();
  } catch (e) {
    console.warn("initFormsModals failed", e);
  }

  // Баннер cookies
  try {
    initCookieBanner();
  } catch (e) {
    console.warn("initCookieBanner failed", e);
  }

  initRouter();
});
