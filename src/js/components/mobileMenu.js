// Мобильное меню
export class MobileMenu {
  constructor() {
    // Элементы меню
    this.sidebar = document.querySelector(".mobile-nav__sidebar");
    this.slides = document.querySelector(".mobile-nav__slides");
    this.mainSlide = document.querySelector(".mobile-nav__slide-main");
    this.submenuSlide = document.querySelector(".mobile-nav__slide-submenu");
    this.menuBtn = document.querySelector(".mobile-nav__menu-btn");
    this.closeBtn = document.querySelector(".mobile-nav__close");
    this.backBtn = document.querySelector(".mobile-nav__back");
    this.servicesBtn = document.querySelector(".mobile-nav__category-btn");
    this.categoriesList = document.querySelector(".mobile-nav__categories");
    this.subcategoryBtns = document.querySelectorAll(
      ".mobile-nav__subcategory-btn"
    );
    this.submenus = document.querySelectorAll(".mobile-nav__subsubmenu");

    // Состояние меню
    this.isOpen = false;
    this.isSubmenuOpen = false;
    this.isCategoriesOpen = false;

    // Привязка контекста
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleCategories = this.toggleCategories.bind(this);
    this.showSubmenu = this.showSubmenu.bind(this);
    this.hideSubmenu = this.hideSubmenu.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    // Инициализация обработчиков событий
    this.initEventListeners();
  }

  // Инициализация обработчиков событий
  initEventListeners() {
    // Открытие/закрытие меню
    this.menuBtn.addEventListener("click", this.toggleMenu);
    this.closeBtn.addEventListener("click", this.closeMenu);

    // Открытие/закрытие списка категорий
    this.servicesBtn.addEventListener("click", this.toggleCategories);

    // Навигация по подменю
    this.subcategoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        this.showSubmenu(category);
      });
    });

    this.backBtn.addEventListener("click", this.hideSubmenu);

    // Закрытие меню при клике вне его
    document.addEventListener("click", this.handleClickOutside);

    // Добавляем эффекты при наведении и нажатии для всех интерактивных элементов
    this.addInteractiveEffects();
  }

  // Добавление интерактивных эффектов
  addInteractiveEffects() {
    // Получаем все интерактивные элементы
    const interactiveElements = this.sidebar.querySelectorAll("a, button");

    interactiveElements.forEach((element) => {
      // Эффект при наведении
      element.addEventListener("mouseenter", () => {
        element.style.transition = "all 0.2s ease";
        element.style.transform = "translateY(-1px)";
      });

      // Возврат к исходному состоянию
      element.addEventListener("mouseleave", () => {
        element.style.transform = "translateY(0)";
      });

      // Эффект при нажатии
      element.addEventListener("mousedown", () => {
        element.style.transform = "translateY(1px)";
      });

      // Возврат после нажатия
      element.addEventListener("mouseup", () => {
        element.style.transform = "translateY(-1px)";
      });
    });
  }

  // Открытие/закрытие меню
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  // Открытие меню
  openMenu() {
    this.isOpen = true;
    this.sidebar.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  // Закрытие меню
  closeMenu() {
    this.isOpen = false;
    this.isSubmenuOpen = false;
    this.isCategoriesOpen = false;
    this.sidebar.classList.remove("is-open");
    this.slides.classList.remove("show-submenu");
    this.servicesBtn.classList.remove("is-open");
    this.categoriesList.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  // Открытие/закрытие списка категорий
  toggleCategories() {
    this.isCategoriesOpen = !this.isCategoriesOpen;
    this.servicesBtn.classList.toggle("is-open");
    this.categoriesList.classList.toggle("is-open");
  }

  // Показать подменю для выбранной категории
  showSubmenu(category) {
    this.isSubmenuOpen = true;
    this.slides.classList.add("show-submenu");

    // Обновляем заголовок подменю
    const submenuTitle = this.submenuSlide.querySelector(
      ".mobile-nav__submenu-title"
    );
    const categoryBtn = document.querySelector(`[data-category="${category}"]`);
    submenuTitle.textContent = categoryBtn.querySelector("span").textContent;

    // Показываем нужное подменю
    this.submenus.forEach((submenu) => {
      if (submenu.dataset.category === category) {
        submenu.classList.add("is-active");
      } else {
        submenu.classList.remove("is-active");
      }
    });
  }

  // Скрыть подменю
  hideSubmenu() {
    this.isSubmenuOpen = false;
    this.slides.classList.remove("show-submenu");

    // Скрываем все подменю
    this.submenus.forEach((submenu) => {
      submenu.classList.remove("is-active");
    });
  }

  // Обработка клика вне меню
  handleClickOutside(event) {
    if (
      this.isOpen &&
      !this.sidebar.contains(event.target) &&
      !this.menuBtn.contains(event.target)
    ) {
      this.closeMenu();
    }
  }
}
 