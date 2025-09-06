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
      element.innerHTML = html;
    } else {
      console.warn(`Элемент с ID ${elementId} не найден`);
    }
  } catch (error) {
    console.error(`Ошибка при загрузке компонента ${componentPath}:`, error);
  }
}

export { loadComponent };
