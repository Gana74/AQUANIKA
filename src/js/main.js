import { initCarousel } from "./components/carousel.js";
import { initForms } from "./components/forms.js";
import { initSidebar } from "./components/sidebar.js";
import { YClientsAPI } from "./services/yclients.js";
import { WhatsAppService } from "./services/whatsapp.js";
import { MobileMenu } from "./components/mobileMenu.js";

// Инициализация после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM загружен, инициализация компонентов...");

  // Инициализация карусели
  const carousel = document.querySelector(".promo-carousel");
  if (carousel) {
    initCarousel(carousel);
  }

  // Инициализация мобильного меню
  try {
    const mobileMenu = new MobileMenu();
    console.log("Мобильное меню успешно инициализировано");
  } catch (error) {
    console.error("Ошибка при инициализации мобильного меню:", error);
  }

  // Инициализация форм
  initForms();

  // Инициализация боковой панели
  initSidebar();

  // Инициализация YClients
  const yclients = new YClientsAPI("YOUR_API_KEY");

  // Инициализация WhatsApp
  const whatsapp = new WhatsAppService("YOUR_PHONE_NUMBER");

  // Обработчик для кнопки записи
  const bookingButtons = document.querySelectorAll('[data-action="booking"]');
  bookingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      yclients.openBookingWidget();
    });
  });

  // Обработчик для кнопки WhatsApp
  const whatsappButtons = document.querySelectorAll('[data-action="whatsapp"]');
  whatsappButtons.forEach((button) => {
    button.addEventListener("click", () => {
      whatsapp.sendMessage("Здравствуйте! Я хочу записаться на процедуру.");
    });
  });
});
