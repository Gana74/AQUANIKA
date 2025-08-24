// loadComponents.js - улучшенная версия
async function loadComponent(elementId, componentPath) {
  try {
    // Создаем абсолютный путь с учетом базового URL
    const basePath = "/AQUANIKA/"; // или используй window.location.origin + '/AQUANIKA/'
    const fullPath = `${basePath}${componentPath}`;

    const response = await fetch(fullPath);
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

// Загружаем компоненты при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "components/partials/header.html");
  loadComponent("footer-placeholder", "components/partials/footer.html");
});

export { loadComponent };
