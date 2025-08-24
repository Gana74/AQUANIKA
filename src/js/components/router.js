// Объект с маршрутами и соответствующими путями к страницам
const BASE_PATH = "/AQUANIKA";

export const routes = {
  "/": `${BASE_PATH}/pages/home.html`,
  "/about": `${BASE_PATH}/pages/about.html`,
  "/team": `${BASE_PATH}/pages/team.html`,
  "/reviews": `${BASE_PATH}/pages/reviews.html`,
  "/vacancies": `${BASE_PATH}/pages/vacancies.html`,
  "/gallery": `${BASE_PATH}/pages/gallery.html`,
  "/services/spa": `${BASE_PATH}/pages/spa-and-massage.html`,
};

// Страницы, на которых должно отображаться боковое меню
const pagesWithSideMenu = [
  "/about",
  "/team",
  "/reviews",
  "/vacancies",
  "/gallery",
];

// Функция для загрузки компонента
async function loadComponent(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error("Ошибка загрузки компонента:", error);
    return "";
  }
}

// Заголовки страниц
const pageTitles = {
  "/": "Aqvanika - Салон красоты премиум класса",
  "/about": "О нас - Aqvanika",
  "/team": "Наша команда - Aqvanika",
  "/reviews": "Отзывы - Aqvanika",
  "/vacancies": "Вакансии - Aqvanika",
  "/gallery": "Галерея - Aqvanika",
  "/prices": "Цены - Aqvanika",
  "/promotions": "Акции - Aqvanika",
  "/contacts": "Контакты - Aqvanika",
  "/services/spa": "SPA и массаж - Aqvanika",
  "/services/laser": "Лазерная эпиляция - Aqvanika",
  "/services/brows": "Брови и ресницы - Aqvanika",
  "/services/nails": "Маникюр и педикюр - Aqvanika",
  "/services/cosmetology": "Косметология - Aqvanika",
  "/services/hairdressing": "Парикмахерские услуги - Aqvanika",
  "/services/makeup": "Макияж - Aqvanika",
  "/services/men": "Услуги для мужчин - Aqvanika",
};

// Функция для загрузки содержимого страницы
async function loadPage(path) {
  try {
    const currentPath = window.location.pathname;
    const shouldShowSideMenu = pagesWithSideMenu.includes(currentPath);

    // Обновляем заголовок страницы
    document.title = pageTitles[currentPath] || "Aqvanika";

    // Загружаем содержимое страницы
    const pageContent = await loadComponent(path);

    // Если нужно показать боковое меню
    if (shouldShowSideMenu) {
      const sideMenu = await loadComponent(
        `${BASE_PATH}/components/partials/side-menu.html`
      );
      document.querySelector("main").innerHTML = `
        <div class="page-with-sidebar">
          ${sideMenu}
          <div class="page-content">
            ${pageContent}
          </div>
        </div>
      `;

      // Инициализируем функционал бокового меню
      import("./sideMenu.js").then((module) => {
        module.initSideMenu();
      });
    } else {
      document.querySelector("main").innerHTML = pageContent;
    }
  } catch (error) {
    console.error("Ошибка загрузки страницы:", error);
    document.querySelector("main").innerHTML = "<h1>Страница не найдена</h1>";
  }
}

// Обработчик изменения URL
function handleLocation() {
  const path = window.location.pathname;
  const route = routes[path] || routes["/"];
  loadPage(route);
}

// Обработчик клика по ссылкам
function handleNavigation(e) {
  if (
    e.target.matches("a") &&
    e.target.href.startsWith(window.location.origin) &&
    !e.target.closest(".side-menu") // Игнорируем клики в боковом меню
  ) {
    e.preventDefault();
    const url = new URL(e.target.href);
    window.history.pushState({}, "", url.pathname);
    handleLocation();
  }
}

// Инициализация маршрутизации
export function initRouter() {
  // Обработка клика по ссылкам
  document.addEventListener("click", handleNavigation);

  // Обработка кнопок браузера "вперед/назад"
  window.addEventListener("popstate", handleLocation);

  // Загрузка начальной страницы
  handleLocation();
}
