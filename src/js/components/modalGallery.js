// Инициализация фильтра и модалки для галереи

export function initGalleryModal() {
  const root = document;
  const container = root.getElementById("galleryMasonry");

  if (!container) return;

  // Фильтрация по категориям
  const filterButtons = root.querySelectorAll(".gallery-filter .filter-button");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      const items = container.querySelectorAll(".gallery-item");
      items.forEach((item) => {
        const cat = item.getAttribute("data-category");
        const show = filter === "all" || cat === filter;
        item.style.display = show ? "" : "none";
      });
    });
  });

  // Модальное окно
  const modal = root.getElementById("galleryModal");
  if (!modal) return;

  const modalImg = modal.querySelector(".gallery-modal__image");
  const caption = modal.querySelector(".gallery-modal__caption");
  const btnClose = modal.querySelector(".gallery-modal__close");
  const btnPrev = modal.querySelector(".gallery-modal__prev");
  const btnNext = modal.querySelector(".gallery-modal__next");

  let currentIndex = -1;
  const getVisibleItems = () =>
    Array.from(container.querySelectorAll(".gallery-item")).filter(
      (it) => it.style.display !== "none"
    );

  function openAt(index) {
    const items = getVisibleItems();
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;
    const img = items[currentIndex].querySelector("img");
    modalImg.src = img.src;
    modalImg.alt = img.alt || "";
    caption.textContent = img.alt || "";
    modal.classList.add("is-open");
  }

  container.addEventListener("click", (e) => {
    // Проверяем клик на изображении или на gallery-item в целом
    let img = e.target.closest("img");
    let galleryItem = e.target.closest(".gallery-item");

    // Если кликнули не на изображение, но на элемент галереи, ищем изображение внутри
    if (!img && galleryItem) {
      img = galleryItem.querySelector("img");
    }

    if (!img || !galleryItem) return;

    const items = getVisibleItems();
    const index = items.indexOf(galleryItem);
    openAt(index);
  });

  btnClose.addEventListener("click", () => modal.classList.remove("is-open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("is-open");
  });

  btnPrev.addEventListener("click", () => openAt(currentIndex - 1));
  btnNext.addEventListener("click", () => openAt(currentIndex + 1));
  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") modal.classList.remove("is-open");
    if (e.key === "ArrowLeft") openAt(currentIndex - 1);
    if (e.key === "ArrowRight") openAt(currentIndex + 1);
  });
}
