# Технические спецификации

## Технологический стек

### Frontend

- HTML5 (Semantic)
- CSS3 (Flexbox/Grid)
- JavaScript (ES6+)

### Сборка проекта

- Webpack/Vite
- Babel для транспиляции
- PostCSS для обработки CSS
- Минификация и оптимизация

## Структура компонентов

### Header

```html
<header class="header">
  <div class="header__logo">...</div>
  <nav class="header__nav">...</nav>
  <div class="header__contacts">...</div>
</header>
```

### Карусель акций

```html
<section class="promo-carousel">
  <div class="promo-carousel__container">
    <div class="promo-carousel__slide">...</div>
  </div>
  <div class="promo-carousel__controls">...</div>
</section>
```

### Карточка услуги

```html
<article class="service-card">
  <div class="service-card__image">...</div>
  <div class="service-card__content">
    <h3 class="service-card__title">...</h3>
    <p class="service-card__description">...</p>
    <div class="service-card__price">...</div>
    <button class="service-card__button">...</button>
  </div>
</article>
```

## Адаптивность

### Брейкпоинты

```css
/* Mobile */
@media (min-width: 320px) {
  /* Стили для мобильных */
}

/* Tablet */
@media (min-width: 768px) {
  /* Стили для планшетов */
}

/* Desktop */
@media (min-width: 1200px) {
  /* Стили для десктопа */
}
```

### Grid система

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
```

## Интеграции

### yclients

```javascript
class YClientsService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.yclients.com/api/v1/";
  }

  async getServices() {
    // Получение списка услуг
  }

  async getMasters() {
    // Получение списка мастеров
  }

  async bookAppointment(data) {
    // Создание записи
  }
}
```

### WhatsApp

```javascript
class WhatsAppService {
  constructor(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  sendMessage(text) {
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
  }
}
```

## Оптимизация

### Lazy Loading

```javascript
const lazyImages = document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => imageObserver.observe(img));
```

### Минификация

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};
```

## SEO

### Метатеги

```html
<meta
  name="description"
  content="Салон красоты Aqvanika - профессиональный уход за красотой. Уникальная технология подводно-вакуумного массажа. Запишитесь онлайн!"
/>
<meta
  name="keywords"
  content="салон красоты, подводно-вакуумный массаж, косметология, маникюр, педикюр, стрижки"
/>
```

### Schema.org разметка

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Aqvanika",
    "description": "Салон красоты с уникальной технологией подводно-вакуумного массажа",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "...",
      "addressLocality": "...",
      "postalCode": "..."
    },
    "openingHours": "Mo-Su 09:00-21:00",
    "telephone": "..."
  }
</script>
```

## Безопасность

### Формы

```javascript
class FormValidator {
  static sanitizeInput(input) {
    return input.replace(/<[^>]*>/g, "");
  }

  static validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static validatePhone(phone) {
    return /^\+?[\d\s-()]{10,}$/.test(phone);
  }
}
```

### API запросы

```javascript
class ApiService {
  static async request(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }
}
```
