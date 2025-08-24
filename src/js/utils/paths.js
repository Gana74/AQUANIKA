// Определяем, запущен ли сайт на GitHub Pages
export const isGitHubPages = window.location.hostname.includes("github.io");

// Базовый путь для сайта
export const BASE_PATH = isGitHubPages ? "/AQUANIKA" : "";

// Функция для получения правильного пути к ресурсу
export function getAssetPath(path) {
  return `${BASE_PATH}${path}`;
}

// Функция для получения пути без BASE_PATH
export function stripBasePath(path) {
  if (path.startsWith(BASE_PATH)) {
    return path.substring(BASE_PATH.length) || "/";
  }
  return path;
}

// Функция для добавления BASE_PATH к пути
export function addBasePath(path) {
  if (path.startsWith("/")) {
    return `${BASE_PATH}${path}`;
  }
  return path;
}
