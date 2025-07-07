# Aqvanika - Сайт салона красоты

Современный адаптивный сайт для салона красоты Aqvanika с интеграцией онлайн-записи и WhatsApp.

## Технологии

- HTML5 Semantic
- CSS3 (Flexbox/Grid)
- ES6 JavaScript
- Vite (сборка)
- YClients API (онлайн-запись)
- WhatsApp API (коммуникация)

## Требования

- Node.js 18+
- npm 9+

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/aqvanika.git
cd aqvanika
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` в корне проекта и добавьте необходимые переменные окружения:
```env
VITE_YCLIENTS_API_KEY=your_api_key
VITE_WHATSAPP_PHONE=your_phone_number
```

## Разработка

Запуск сервера разработки:
```bash
npm run dev
```

Сервер будет доступен по адресу: http://localhost:3000

## Сборка

Для создания production-сборки:
```bash
npm run build
```

Результат сборки будет находиться в директории `dist/`.

## Структура проекта

```
aqvanika/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── styles/
│   │   ├── base/
│   │   ├── components/
│   │   ├── layouts/
│   │   └── pages/
│   ├── js/
│   │   ├── components/
│   │   ├── services/
│   │   └── utils/
│   └── pages/
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## Основные функции

- Адаптивный дизайн (Mobile First)
- Онлайн-запись через YClients
- Интеграция с WhatsApp
- Карусель акций и предложений
- Каталог услуг с фильтрацией
- Галерея работ
- Отзывы клиентов
- Формы обратной связи

## Контакты

По всем вопросам обращайтесь:
- Email: info@aqvanika.ru
- WhatsApp: +7 (XXX) XXX-XX-XX 