// Функция для загрузки HTML-компонентов
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(`Ошибка при загрузке компонента ${componentPath}:`, error);
  }
}

// Загружаем компоненты при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  // Используем относительные пути или пути с учетом базового URL
  loadComponent("header-placeholder", "./components/partials/header.html");
  loadComponent("footer-placeholder", "./components/partials/footer.html");
});

// Экспортируем функцию для возможного использования в других модулях
export { loadComponent };
