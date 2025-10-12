// Карусель с бесшовным циклом
export class Carousel {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    const container = this.element.querySelector(".promo-carousel__container");
    const realSlides = Array.from(
      this.element.querySelectorAll(".promo-carousel__slide")
    );
    const controls = this.element.querySelector(".promo-carousel__controls");

    if (!container || !realSlides.length) return;

    let realCount = realSlides.length;
    const isCompact = this.element.classList.contains(
      "promo-carousel--compact"
    );

    const getSlidesPerView = () => {
      if (!isCompact) return 1;
      const w = window.innerWidth || 1920;
      if (w <= 480) return 1;
      if (w <= 768) return 2;
      if (w <= 1200) return 3;
      return 4;
    };

    let slidesPerView = getSlidesPerView();
    let unitWidthPercent = 100 / slidesPerView; // ширина одного шага

    // Количество клонов до/после для бесшовного цикла
    // Для мобильных устройств (slidesPerView = 1) используем меньше клонов
    let clonesBefore =
      slidesPerView === 1 ? 1 : Math.min(slidesPerView, realCount);
    let clonesAfter =
      slidesPerView === 1 ? 1 : Math.min(slidesPerView, realCount);

    // виртуальный индекс (с учётом клонов)
    let currentIndex = realCount > 1 ? clonesBefore : 0;
    let isTransitioning = false;
    let autoplayInterval;

    // Создаем точки навигации (по реальным слайдам)
    const dots = [];
    if (controls) {
      controls.replaceChildren();
      for (let i = 0; i < realCount; i++) {
        const dot = document.createElement("button");
        dot.className = `promo-carousel__dot ${
          i === 0 ? "promo-carousel__dot--active" : ""
        }`;
        dot.addEventListener("click", () => this.goToSlide(i));
        controls.appendChild(dot);
        dots.push(dot);
      }
    }

    // Создаем кнопки навигации (стрелки)
    const prevButton = document.createElement("button");
    prevButton.className = "promo-carousel__arrow promo-carousel__arrow--prev";
    prevButton.setAttribute("aria-label", "Предыдущие фото");
    prevButton.textContent = "❮";
    prevButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.prev();
    });

    const nextButton = document.createElement("button");
    nextButton.className = "promo-carousel__arrow promo-carousel__arrow--next";
    nextButton.setAttribute("aria-label", "Следующие фото");
    nextButton.textContent = "❯";
    nextButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.next();
    });

    this.element.appendChild(prevButton);
    this.element.appendChild(nextButton);

    // Помощники
    const updateDots = () => {
      if (!dots.length) return;
      const activeRealIndex =
        realCount > 1 ? (currentIndex - 1 + realCount) % realCount : 0;
      dots.forEach((d, idx) => {
        d.classList.toggle(
          "promo-carousel__dot--active",
          idx === activeRealIndex
        );
      });
    };

    const updatePosition = (smooth = true) => {
      if (!smooth) {
        const prevTransition = container.style.transition;
        container.style.transition = "none";
        // Для мобильных устройств используем точное позиционирование
        const translateX =
          slidesPerView === 1
            ? `translateX(-${currentIndex * 100}%)`
            : `translateX(-${currentIndex * unitWidthPercent}%)`;
        container.style.transform = translateX;
        // форсируем reflow
        void container.offsetWidth;
        container.style.transition = prevTransition || "";
      } else {
        // Для мобильных устройств используем точное позиционирование
        const translateX =
          slidesPerView === 1
            ? `translateX(-${currentIndex * 100}%)`
            : `translateX(-${currentIndex * unitWidthPercent}%)`;
        container.style.transform = translateX;
      }
    };

    // Инициализация бесшовного цикла: клоны
    if (realCount > 1) {
      // Создаем необходимое количество клонов для бесшовного режима
      // Сначала клоны конца в начало
      for (let i = 0; i < clonesBefore; i++) {
        const idxFromEnd = realCount - 1 - i;
        const clone = realSlides[idxFromEnd].cloneNode(true);
        container.insertBefore(clone, container.firstChild);
      }
      // Затем клоны начала в конец
      for (let i = 0; i < clonesAfter; i++) {
        const clone = realSlides[i].cloneNode(true);
        container.appendChild(clone);
      }

      // Стартуем с первого реального слайда (виртуальный индекс = clonesBefore)
      updatePosition(false);

      // Перехват конца анимации для "перескока" с клонов на реальные
      container.addEventListener("transitionend", () => {
        isTransitioning = false;
        const leftBoundary = clonesBefore;
        const rightBoundary = clonesBefore + realCount;
        if (currentIndex < leftBoundary) {
          // ушли в левые клоны — переносим вправо на realCount позиций
          currentIndex += realCount;
          updatePosition(false);
        } else if (currentIndex >= rightBoundary) {
          // ушли в правые клоны — переносим влево на realCount позиций
          currentIndex -= realCount;
          updatePosition(false);
        }
        updateDots();
      });
    } else {
      // Один слайд — позиция нулевая
      updatePosition(false);
    }

    // Методы API
    this.goToSlide = (realIndex) => {
      if (isTransitioning) return;
      if (realCount <= 1) return;
      const targetIndex = realIndex + clonesBefore; // c учётом клонов
      if (targetIndex === currentIndex) return;
      isTransitioning = true;
      currentIndex = targetIndex;
      updatePosition(true);
      updateDots();
    };

    this.prev = () => {
      if (isTransitioning) return;
      if (realCount <= 1) return;
      isTransitioning = true;
      // Для мобильных устройств (slidesPerView = 1) переключаем точно на 1 слайд
      const step = slidesPerView === 1 ? 1 : 1;
      currentIndex -= step;
      updatePosition(true);
      updateDots();
    };

    this.next = () => {
      if (isTransitioning) return;
      if (realCount <= 1) return;
      isTransitioning = true;
      // Для мобильных устройств (slidesPerView = 1) переключаем точно на 1 слайд
      const step = slidesPerView === 1 ? 1 : 1;
      currentIndex += step;
      updatePosition(true);
      updateDots();
    };

    // Автопереключение слайдов
    this.startAutoplay = function () {
      if (realCount <= 1) return;
      autoplayInterval = setInterval(() => this.next(), 8000);
    };

    this.stopAutoplay = function () {
      clearInterval(autoplayInterval);
    };

    // Остановка автоплей при взаимодействии
    this.element.addEventListener("mouseenter", () => this.stopAutoplay());
    this.element.addEventListener("mouseleave", () => this.startAutoplay());
    this.element.addEventListener("touchstart", () => this.stopAutoplay());
    this.element.addEventListener("touchend", () => this.startAutoplay());

    // Клик по миниатюре в компактной галерее ведет на страницу галереи
    if (this.element.classList.contains("promo-carousel--compact")) {
      this.element.addEventListener("click", (e) => {
        // Игнорируем клики по стрелкам и точкам
        if (
          e.target.closest(".promo-carousel__arrow") ||
          e.target.closest(".promo-carousel__controls")
        )
          return;
        if (e.target.closest("picture") || e.target.closest("img")) {
          if (typeof window.navigateTo === "function") {
            window.navigateTo("/gallery");
          } else {
            window.location.href = "/gallery";
          }
        }
      });
    }

    // Обработка ресайза для пересчёта slidesPerView и ширины шага
    const handleResize = () => {
      const newSpv = getSlidesPerView();
      if (newSpv !== slidesPerView) {
        slidesPerView = newSpv;
        unitWidthPercent = 100 / slidesPerView;
        // При смене режима, чтобы не "прыгало" — обновим позицию без анимации
        updatePosition(false);
      }
    };
    window.addEventListener("resize", handleResize);

    // Запуск
    this.startAutoplay();

    // Обработка свайпов на мобильных устройствах
    let touchStartX = 0;
    let touchEndX = 0;

    this.element.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    this.element.addEventListener("touchmove", (e) => {
      touchEndX = e.touches[0].clientX;
    });

    this.element.addEventListener("touchend", () => {
      const swipeDistance = touchEndX - touchStartX;
      // Уменьшаем порог для более чувствительных свайпов на мобильных
      const threshold = slidesPerView === 1 ? 30 : 50;
      if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance > 0) {
          this.prev();
        } else {
          this.next();
        }
      }
    });
  }
}

// Функция инициализации
export function initCarousel(element) {
  return new Carousel(element);
}
