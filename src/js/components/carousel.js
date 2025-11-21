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

    // Добавляем ARIA-атрибуты к контейнеру карусели
    this.element.setAttribute("role", "region");
    this.element.setAttribute("aria-label", "Промо-карусель");
    this.element.setAttribute("aria-roledescription", "carousel");
    container.setAttribute("aria-live", "polite");

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
    let clonesBefore =
      slidesPerView === 1 ? 1 : Math.min(slidesPerView, realCount);
    let clonesAfter =
      slidesPerView === 1 ? 1 : Math.min(slidesPerView, realCount);

    // виртуальный индекс (с учётом клонов)
    let currentIndex = realCount > 1 ? clonesBefore : 0;
    let isTransitioning = false;
    let autoplayInterval;

    // Инициализация ARIA-атрибутов для слайдов
    this.initSlideAccessibility(realSlides, realCount);

    // Создаем точки навигации (по реальным слайдам)
    const dots = [];
    if (controls) {
      controls.replaceChildren();
      for (let i = 0; i < realCount; i++) {
        const dot = document.createElement("button");
        dot.className = `promo-carousel__dot ${
          i === 0 ? "promo-carousel__dot--active" : ""
        }`;

        // Исправление доступности: добавляем aria-label и aria-current
        dot.setAttribute("aria-label", `Перейти к слайду ${i + 1}`);
        dot.setAttribute("aria-current", i === 0 ? "true" : "false");

        // Добавляем описание для screen readers
        dot.setAttribute("aria-describedby", `slide-${i + 1}-title`);

        dot.addEventListener("click", () => this.goToSlide(i));
        controls.appendChild(dot);
        dots.push(dot);
      }
    }

    // Создаем кнопки навигации (стрелки)
    const prevButton = document.createElement("button");
    prevButton.className = "promo-carousel__arrow promo-carousel__arrow--prev";
    prevButton.setAttribute("aria-label", "Предыдущий слайд");
    prevButton.setAttribute("type", "button");
    prevButton.innerHTML = `
      <span aria-hidden="true">❮</span>
      <span class="visually-hidden">Предыдущий слайд</span>
    `;
    prevButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.prev();
    });

    const nextButton = document.createElement("button");
    nextButton.className = "promo-carousel__arrow promo-carousel__arrow--next";
    nextButton.setAttribute("aria-label", "Следующий слайд");
    nextButton.setAttribute("type", "button");
    nextButton.innerHTML = `
      <span aria-hidden="true">❯</span>
      <span class="visually-hidden">Следующий слайд</span>
    `;
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
        realCount > 1
          ? (currentIndex - clonesBefore + realCount) % realCount
          : 0;
      dots.forEach((d, idx) => {
        const isActive = idx === activeRealIndex;
        d.classList.toggle("promo-carousel__dot--active", isActive);
        d.setAttribute("aria-current", isActive ? "true" : "false");

        // Обновляем описание для screen readers
        if (isActive) {
          d.setAttribute(
            "aria-label",
            `Текущий слайд ${idx + 1} из ${realCount}`
          );
        } else {
          d.setAttribute(
            "aria-label",
            `Перейти к слайду ${idx + 1} из ${realCount}`
          );
        }
      });
    };

    const updatePosition = (smooth = true) => {
      if (!smooth) {
        const prevTransition = container.style.transition;
        container.style.transition = "none";
        const translateX =
          slidesPerView === 1
            ? `translateX(-${currentIndex * 100}%)`
            : `translateX(-${currentIndex * unitWidthPercent}%)`;
        container.style.transform = translateX;
        void container.offsetWidth; // форсируем reflow
        container.style.transition = prevTransition || "";
      } else {
        const translateX =
          slidesPerView === 1
            ? `translateX(-${currentIndex * 100}%)`
            : `translateX(-${currentIndex * unitWidthPercent}%)`;
        container.style.transform = translateX;
      }

      // Обновляем ARIA-атрибуты слайдов
      this.updateSlideAccessibility(currentIndex, clonesBefore, realCount);
    };

    // Инициализация бесшовного цикла: клоны
    if (realCount > 1) {
      // Создаем необходимое количество клонов для бесшовного режима
      for (let i = 0; i < clonesBefore; i++) {
        const idxFromEnd = realCount - 1 - i;
        const clone = realSlides[idxFromEnd].cloneNode(true);
        this.updateSlideARIA(clone, idxFromEnd, realCount, false);
        container.insertBefore(clone, container.firstChild);
      }
      for (let i = 0; i < clonesAfter; i++) {
        const clone = realSlides[i].cloneNode(true);
        this.updateSlideARIA(clone, i, realCount, false);
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
          currentIndex += realCount;
          updatePosition(false);
        } else if (currentIndex >= rightBoundary) {
          currentIndex -= realCount;
          updatePosition(false);
        }
        updateDots();
      });
    } else {
      updatePosition(false);
    }

    // Методы API
    this.goToSlide = (realIndex) => {
      if (isTransitioning) return;
      if (realCount <= 1) return;
      const targetIndex = realIndex + clonesBefore;
      if (targetIndex === currentIndex) return;
      isTransitioning = true;
      currentIndex = targetIndex;
      updatePosition(true);
      updateDots();
      this.stopAutoplay();
      setTimeout(() => this.startAutoplay(), 5000);
    };

    this.prev = () => {
      if (isTransitioning) return;
      if (realCount <= 1) return;
      isTransitioning = true;
      const step = slidesPerView === 1 ? 1 : 1;
      currentIndex -= step;
      updatePosition(true);
      updateDots();
      this.stopAutoplay();
      setTimeout(() => this.startAutoplay(), 5000);
    };

    this.next = () => {
      if (isTransitioning) return;
      if (realCount <= 1) return;
      isTransitioning = true;
      const step = slidesPerView === 1 ? 1 : 1;
      currentIndex += step;
      updatePosition(true);
      updateDots();
      this.stopAutoplay();
      setTimeout(() => this.startAutoplay(), 5000);
    };

    // Автопереключение слайдов
    this.startAutoplay = () => {
      if (realCount <= 1) return;
      this.stopAutoplay(); // Очищаем существующий интервал
      autoplayInterval = setInterval(() => {
        if (!document.hidden) {
          // Не переключаем когда страница неактивна
          this.next();
        }
      }, 8000);
    };

    this.stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    };

    // Остановка автоплей при взаимодействии
    this.element.addEventListener("mouseenter", () => this.stopAutoplay());
    this.element.addEventListener("mouseleave", () => this.startAutoplay());
    this.element.addEventListener("focusin", () => this.stopAutoplay());
    this.element.addEventListener("focusout", () => this.startAutoplay());
    this.element.addEventListener("touchstart", () => this.stopAutoplay());
    this.element.addEventListener("touchend", () => this.startAutoplay());

    // Обработка видимости страницы для оптимизации производительности
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stopAutoplay();
      } else {
        this.startAutoplay();
      }
    });

    // Клик по миниатюре в компактной галерее ведет на страницу галереи
    if (this.element.classList.contains("promo-carousel--compact")) {
      this.element.addEventListener("click", (e) => {
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
        updatePosition(false);
      }
    };

    // Оптимизация производительности: debounce ресайза
    let resizeTimeout;
    const optimizedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };
    window.addEventListener("resize", optimizedResize);

    // Клавиатурная навигация для доступности
    this.element.addEventListener("keydown", (e) => {
      if (
        e.target.closest(".promo-carousel__dot") ||
        e.target.closest(".promo-carousel__arrow")
      ) {
        return; // Уже обработано нативными обработчиками кнопок
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          this.prev();
          break;
        case "ArrowRight":
          e.preventDefault();
          this.next();
          break;
        case "Home":
          e.preventDefault();
          this.goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          this.goToSlide(realCount - 1);
          break;
      }
    });

    // Обработка свайпов на мобильных устройствах
    let touchStartX = 0;
    let touchEndX = 0;

    this.element.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      this.stopAutoplay();
    });

    this.element.addEventListener("touchmove", (e) => {
      touchEndX = e.touches[0].clientX;
    });

    this.element.addEventListener("touchend", () => {
      const swipeDistance = touchEndX - touchStartX;
      const threshold = slidesPerView === 1 ? 30 : 50;
      if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance > 0) {
          this.prev();
        } else {
          this.next();
        }
      }
      setTimeout(() => this.startAutoplay(), 3000);
    });

    // Запуск
    this.startAutoplay();
  }

  // Новые методы для улучшения доступности
  initSlideAccessibility(slides, totalSlides) {
    slides.forEach((slide, index) => {
      this.updateSlideARIA(slide, index, totalSlides, index === 0);
    });
  }

  updateSlideARIA(slide, index, totalSlides, isActive) {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} из ${totalSlides}`);
    slide.setAttribute("aria-hidden", !isActive ? "true" : "false");

    // Добавляем ID для связи с точками навигации
    const titleId = `slide-${index + 1}-title`;
    slide.id = titleId;

    if (!isActive) {
      slide.setAttribute("inert", "true");
    } else {
      slide.removeAttribute("inert");
    }
  }

  updateSlideAccessibility(currentIndex, clonesBefore, totalSlides) {
    const allSlides = this.element.querySelectorAll(".promo-carousel__slide");
    const realCurrentIndex =
      (currentIndex - clonesBefore + totalSlides) % totalSlides;

    allSlides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      this.updateSlideARIA(slide, realCurrentIndex, totalSlides, isActive);
    });
  }

  // Метод для ручного уничтожения карусели (оптимизация памяти)
  destroy() {
    this.stopAutoplay();
    window.removeEventListener("resize", this.handleResize);
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  }
}

// Функция инициализации
export function initCarousel(element) {
  return new Carousel(element);
}
