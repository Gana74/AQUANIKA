// Карусель
export class Carousel {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    // Получаем элементы контейнера, слайдов и кнопок управления
    const container = this.element.querySelector(".promo-carousel__container");
    const slides = this.element.querySelectorAll(".promo-carousel__slide");
    const controls = this.element.querySelector(".promo-carousel__controls");

    let currentSlide = 0;
    let isTransitioning = false;
    let autoplayInterval;

    // Создаем точки навигации
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = `promo-carousel__dot ${
        index === 0 ? "promo-carousel__dot--active" : ""
      }`;
      dot.addEventListener("click", () => this.goToSlide(index));
      controls.appendChild(dot);
    });

    // Создаем кнопки навигации
    // const prevButton = document.createElement("button");
    // prevButton.className = "promo-carousel__arrow promo-carousel__arrow--prev";
    // prevButton.innerHTML = "←";
    // prevButton.addEventListener("click", () => this.prev());

    // const nextButton = document.createElement("button");
    // nextButton.className = "promo-carousel__arrow promo-carousel__arrow--next";
    // nextButton.innerHTML = "→";
    // nextButton.addEventListener("click", () => this.next());

    // this.element.appendChild(prevButton);
    // this.element.appendChild(nextButton);

    // Функция перехода к слайду
    this.goToSlide = function (index) {
      if (isTransitioning || index === currentSlide) return;

      isTransitioning = true;
      const dots = controls.querySelectorAll(".promo-carousel__dot");

      // Обновляем активную точку
      dots[currentSlide].classList.remove("promo-carousel__dot--active");
      dots[index].classList.add("promo-carousel__dot--active");

      // Анимируем переход
      container.style.transform = `translateX(-${index * 100}%)`;
      currentSlide = index;

      // Сбрасываем флаг анимации
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    };

    // Функция перехода к предыдущему слайду
    this.prev = function () {
      const index = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
      this.goToSlide(index);
    };

    // Функция перехода к следующему слайду
    this.next = function () {
      const index = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
      this.goToSlide(index);
    };

    // Автопереключение слайдов
    this.startAutoplay = function () {
      autoplayInterval = setInterval(() => this.next(), 10000);
    };

    this.stopAutoplay = function () {
      clearInterval(autoplayInterval);
    };

    // Обработчики событий для остановки автопереключения при взаимодействии
    this.element.addEventListener("mouseenter", () => this.stopAutoplay());
    this.element.addEventListener("mouseleave", () => this.startAutoplay());
    this.element.addEventListener("touchstart", () => this.stopAutoplay());
    this.element.addEventListener("touchend", () => this.startAutoplay());

    // Запускаем автопереключение
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
      if (Math.abs(swipeDistance) > 50) {
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
