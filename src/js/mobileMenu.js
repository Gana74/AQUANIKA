class MobileMenu {
  constructor() {
    this.menuBtn = document.querySelector(".mobile-menu-btn");
    this.mobileNav = document.querySelector(".mobile-nav");
    this.categoryBtns = document.querySelectorAll(".mobile-nav__category-btn");
    this.subcategoryBtns = document.querySelectorAll(
      ".mobile-nav__subcategory-btn"
    );
    this.subsubcategoryBtns = document.querySelectorAll(
      ".mobile-nav__subsubcategory-btn"
    );
    // Новый слайд для подподкатегории
    this.slideContainer = document.querySelector(".mobile-nav__slides");
    this.slideSubsubmenu = document.querySelector(
      ".mobile-nav__slide-subsubmenu[data-subcategory='pvm']"
    );
    this.btnBackSubsubmenu = document.querySelector(
      ".mobile-nav__back-subsubmenu"
    );
    this.btnPvm = document.querySelector(
      ".mobile-nav__subsubcategory-btn[data-subcategory='pvm']"
    );
    this.slideSubmenu = document.querySelector(".mobile-nav__slide-submenu");

    this.init();
  }

  init() {
    // Обработчик для кнопки меню
    this.menuBtn.addEventListener("click", () => this.toggleMenu());

    // Обработчики для категорий
    this.categoryBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.toggleCategory(e));
    });

    // Обработчики для подкатегорий
    this.subcategoryBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.toggleSubcategory(e));
    });

    // Удалены все переменные и обработчики, связанные с подподкатегорией ПВМ "Акваника"
  }

  toggleMenu() {
    this.mobileNav.classList.toggle("active");
    this.menuBtn.classList.toggle("active");
  }

  toggleCategory(e) {
    const btn = e.currentTarget;
    const category = btn.dataset.category;
    const submenu = document.querySelector(
      `.mobile-nav__submenu[data-category="${category}"]`
    );

    // Закрываем другие открытые категории
    this.categoryBtns.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.classList.remove("active");
        const otherCategory = otherBtn.dataset.category;
        document
          .querySelector(
            `.mobile-nav__submenu[data-category="${otherCategory}"]`
          )
          ?.classList.remove("active");
      }
    });

    btn.classList.toggle("active");
    submenu.classList.toggle("active");
  }

  toggleSubcategory(e) {
    const btn = e.currentTarget;
    const subcategory = btn.dataset.subcategory;
    const subsubmenu = document.querySelector(
      `.mobile-nav__subsubmenu[data-category="${subcategory}"]`
    );

    // Закрываем другие открытые подкатегории
    this.subcategoryBtns.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.classList.remove("active");
        const otherSubcategory = otherBtn.dataset.subcategory;
        document
          .querySelector(
            `.mobile-nav__subsubmenu[data-category="${otherSubcategory}"]`
          )
          ?.classList.remove("active");
      }
    });

    btn.classList.toggle("active");
    subsubmenu.classList.toggle("active");
  }

  // Удалены все переменные и обработчики, связанные с подподкатегорией ПВМ "Акваника"

  toggleSubsubcategory(e) {
    const btn = e.currentTarget;
    const subcategory = btn.dataset.subcategory;
    const subsubsubmenu = document.querySelector(
      `.mobile-nav__subsubsubmenu[data-subcategory="${subcategory}"]`
    );

    // Закрываем другие открытые подподкатегории
    this.subsubcategoryBtns.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.classList.remove("active");
        const otherSubcategory = otherBtn.dataset.subcategory;
        document
          .querySelector(
            `.mobile-nav__subsubsubmenu[data-subcategory="${otherSubcategory}"]`
          )
          ?.classList.remove("active");
      }
    });

    btn.classList.toggle("active");
    subsubsubmenu.classList.toggle("active");
  }
}

export default MobileMenu;
