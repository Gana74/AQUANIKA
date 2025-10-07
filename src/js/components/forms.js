// Формы
export class Forms {
  constructor() {
    this.init();
  }

  init() {
    console.log("Инициализация форм");
    const forms = document.querySelectorAll('form:not([data-form-initialized="true"])');

    forms.forEach((form) => {
      form.addEventListener("submit", handleSubmit);
      form.dataset.formInitialized = "true";
    });

    // Обработчик отправки формы
    async function handleSubmit(e) {
      e.preventDefault();

      const form = e.target;
      const submitButton = form.querySelector('[type="submit"]');
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Валидация формы
      if (!validateForm(form)) {
        return;
      }

      try {
        // Показываем состояние загрузки
        submitButton.classList.add("button--loading");
        submitButton.disabled = true;

        // Отправляем данные
        const response = await sendFormData(form);

        // Показываем сообщение об успехе
        showMessage(form, "Сообщение отправлено успешно!", "success");
        form.reset();
      } catch (error) {
        // Показываем сообщение об ошибке
        showMessage(form, "Произошла ошибка. Попробуйте позже.", "error");
        console.error("Form submission error:", error);
      } finally {
        // Возвращаем кнопку в исходное состояние
        submitButton.classList.remove("button--loading");
        submitButton.disabled = false;
      }
    }

    // Валидация формы
    function validateForm(form) {
      const inputs = form.querySelectorAll("input, textarea");
      let isValid = true;

      inputs.forEach((input) => {
        // Очищаем предыдущие ошибки
        clearError(input);

        // Проверяем обязательные поля
        if (input.required && !input.value.trim()) {
          showError(input, "Это поле обязательно для заполнения");
          isValid = false;
        }

        // Валидация email
        if (input.type === "email" && input.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            showError(input, "Введите корректный email");
            isValid = false;
          }
        }

        // Валидация телефона
        if (input.type === "tel" && input.value) {
          const phoneRegex = /^\+?[0-9\s-()]{10,}$/;
          if (!phoneRegex.test(input.value)) {
            showError(input, "Введите корректный номер телефона");
            isValid = false;
          }
        }
      });

      return isValid;
    }

    // Показать ошибку валидации
    function showError(input, message) {
      const errorElement = document.createElement("div");
      errorElement.className = "form__error";
      errorElement.textContent = message;

      input.classList.add("input--error");
      input.parentNode.appendChild(errorElement);
    }

    // Очистить ошибку валидации
    function clearError(input) {
      const errorElement = input.parentNode.querySelector(".form__error");
      if (errorElement) {
        errorElement.remove();
      }
      input.classList.remove("input--error");
    }

    // Показать сообщение после отправки
    function showMessage(form, message, type) {
      const messageElement = document.createElement("div");
      messageElement.className = `form__message form__message--${type}`;
      messageElement.textContent = message;

      // Удаляем предыдущее сообщение
      const oldMessage = form.querySelector(".form__message");
      if (oldMessage) {
        oldMessage.remove();
      }

      form.appendChild(messageElement);

      // Удаляем сообщение через 5 секунд
      setTimeout(() => {
        messageElement.remove();
      }, 5000);
    }

    // Отправка данных формы
    async function sendFormData(form) {
      const action = form.getAttribute("action") || "/api/send-form";
      const method = (form.getAttribute("method") || "POST").toUpperCase();
      const formData = new FormData(form);

      if (action.includes("formspree.io")) {
        const response = await fetch(action, {
          method,
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        try {
          return await response.json();
        } catch (_) {
          return {};
        }
      }

      const json = Object.fromEntries(formData.entries());
      const response = await fetch(action, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    }
  }
}

// Функция инициализации
export function initForms() {
  console.log("Запуск инициализации форм");
  return new Forms();
}
