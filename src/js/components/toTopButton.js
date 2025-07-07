// Логика для кнопки "Наверх"
// Появление кнопки при прокрутке и плавный скролл вверх

document.addEventListener("DOMContentLoaded", () => {
  const toTopButton = document.getElementById("toTopButton");
  if (!toTopButton) return;

  // Показываем/скрываем кнопку при прокрутке
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      toTopButton.classList.add("show");
    } else {
      toTopButton.classList.remove("show");
    }
  });

  // Плавная прокрутка наверх при клике
  toTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
