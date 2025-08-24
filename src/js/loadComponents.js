import { getAssetPath } from "./utils/paths.js";

// Функция для загрузки компонентов
async function loadComponents() {
  try {
    // Загрузка хедера
    const headerResponse = await fetch(
      getAssetPath("/components/partials/header.html")
    );
    const headerContent = await headerResponse.text();
    document.querySelector("header").innerHTML = headerContent;

    // Загрузка футера
    const footerResponse = await fetch(
      getAssetPath("/components/partials/footer.html")
    );
    const footerContent = await footerResponse.text();
    document.querySelector("footer").innerHTML = footerContent;

    // Инициализация роутера после загрузки компонентов
    const { initRouter } = await import("./components/router.js");
    initRouter();

    console.log("Компоненты загружены");
  } catch (error) {
    console.error("Ошибка загрузки компонентов:", error);
  }
}

// Экспортируем функцию
export { loadComponents };
