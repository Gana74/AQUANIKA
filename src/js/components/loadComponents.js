import { basePath } from "./router.js";
// loadComponents.js
async function loadComponent(elementId, componentPath) {
  try {
    // Формируем URL с учётом централизованного basePath
    const url = componentPath.startsWith("/")
      ? `${basePath}${componentPath}`
      : `${basePath}/${componentPath}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      // Санитизация и безопасная вставка без прямого innerHTML на живой узел
      try {
        const safe = window.sanitizeHTML ? window.sanitizeHTML(html) : html;
        const tpl = document.createElement("template");
        tpl.innerHTML = safe;
        element.replaceChildren();
        element.append(tpl.content.cloneNode(true));
        try {
          window.secureExternalLinks?.(element);
        } catch (_) {}
      } catch (_) {
        const fallbackTpl = document.createElement("template");
        fallbackTpl.innerHTML = html;
        element.replaceChildren();
        element.append(fallbackTpl.content.cloneNode(true));
      }
    } else {
      console.warn(`Элемент с ID ${elementId} не найден`);
    }
  } catch (error) {
    console.error(`Ошибка при загрузке компонента ${componentPath}:`, error);
  }
}

export { loadComponent };
