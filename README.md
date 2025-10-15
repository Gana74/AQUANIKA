# AQUANIKA — сайт салона красоты

Современный многостраничный сайт салона красоты AQUANIKA на Vite с модульной структурой, адаптивной версткой, ленивой загрузкой изображений и продуманной клиентской маршрутизацией.

## 🚀 Демо

Проект доступен на GitHub Pages: [gana74.github.io/AQUANIKA](https://gana74.github.io/AQUANIKA/)

## 🧰 Технологии

- HTML5
- CSS3 (адаптивная сетка, BEM-подход, модули CSS)
- JavaScript (ES6+ модули)
- Vite 5 (сборка, dev-сервер, оптимизация)
- Font Awesome (иконки)
- lazysizes (ленивая загрузка изображений)

## 📦 Структура проекта (основное)

```
AQUANIKA/
├── src/                      # Исходники
│   ├── assets/               # Изображения, шрифты, видео, иконки
│   ├── components/partials/  # HTML-фрагменты: header, footer, side-menu
│   ├── js/                   # JS-модули (роутер, меню, формы, модалки)
│   ├── pages/                # Отдельные страницы (HTML)
│   ├── styles/               # Стили: base, components, pages
│   ├── index.html            # Главный шаблон
│   └── templates/base.html   # Базовый html-шаблон
├── public/                   # Публичные статические файлы (копируются как есть)
├── docs/                     # Результат production-сборки (для GitHub Pages)
├── vite.config.js            # Конфигурация Vite (включая многовходовую сборку)
├── copy-fonts.js             # Скопировать woff2 из @fortawesome в src/assets/fonts
├── package.json              # Скрипты и зависимости
└── README.md
```

## ⚙️ Требования

- Node.js 18+ (Vite 5 требует минимум Node 18)
- npm 9+ (или совместимая версия с Node 18)

Проверить версии:

```bash
node -v
npm -v
```

## ▶️ Быстрый старт

```bash
git clone https://github.com/Gana74/AQUANIKA.git
cd AQUANIKA
npm install
npm run dev
```

Dev-сервер поднимется на `http://localhost:3000` и автоматически откроет браузер.

## 🧪 Скрипты npm

- `npm run dev` — запуск dev-сервера Vite (порт 3000, открытие браузера)
- `npm run build` — production-сборка в `docs/` (+ копирование шрифтов)
- `npm run preview` — локальный предпросмотр содержимого `docs/`
- `npm run lint:js` — проверка JS через ESLint
- `npm run lint:css` — проверка CSS через Stylelint
- `npm run clean` — очистить `docs/`
- `npm run deploy` — публикация `docs/` на GitHub Pages (ветка `gh-pages` внутри пакета)

## 🏗️ Сборка и деплой

- База проекта для GitHub Pages задана в `vite.config.js` как `base: "/AQUANIKA/"`.
- Выходная директория сборки — `docs/`, что подходит для GitHub Pages в режиме «Deploy from /docs». Либо можно использовать `npm run deploy` для публикации.

Шаги деплоя (вариант 1 — через /docs в main):

1. `npm run build`
2. Закоммитьте и запушьте изменения в `main`
3. В настройках GitHub Pages выберите Source: `GitHub Actions` или `Deploy from a branch` → `main` → `/docs`

Шаги деплоя (вариант 2 — через gh-pages):

1. `npm run build`
2. `npm run deploy`

## 🧭 Маршрутизация и многовходовая сборка

- Многовходовая сборка Rollup настроена в `vite.config.js` (поле `build.rollupOptions.input`) — каждая страница из `src/pages/*.html` попадает как отдельный entry.
- Для локальной разработки включены «rewrites» (historyApiFallback) — можно открывать пути вида `/services/nails/manicure`, которые будут мапиться на соответствующие HTML в `src/pages/`.
- Хедер/футер подгружаются динамически модулем `loadComponents.js` из `src/components/partials/`.

## 🔐 Безопасность

- В `src/index.html` настроены мета-заголовки безопасности: CSP, HSTS, Referrer Policy, X-Content-Type-Options, Permissions-Policy и др.
- Формы отправляются через Formspree; онлайн-запись — через YCLIENTS (открытие во внешнем окне).
- Предусмотрен cookie-баннер (см. `src/js/main.js`).

## 📸 Ассеты и производительность

- Изображения в `src/assets/images/**`; подключена библиотека `lazysizes` для ленивой загрузки.
- Шрифты Font Awesome копируются в `src/assets/fonts` скриптом `copy-fonts.js` (автоматически вызывается при `npm run build`).
- Включена разбивка CSS (`cssCodeSplit: true`) и генерация source maps для отладки.

## 🧹 Качество кода

- ESLint (`npm run lint:js`) — для `src/**/*.js`
- Stylelint (`npm run lint:css`) — для `src/**/*.css`

Рекомендуется запускать линтеры перед коммитом и деплоем.

## ➕ Как добавить новую страницу

1. Создайте файл в `src/pages/your-page.html` (можно взять существующую страницу за основу).
2. Добавьте путь в `vite.config.js` в объект `build.rollupOptions.input`, например:

```js
yourPage: resolve(__dirname, "src/pages/your-page.html"),
```

3. Если страница должна открываться по красивому маршруту (во время dev), добавьте правило в `server.historyApiFallback.rewrites`.
4. Пересоберите проект: `npm run dev` (для локальной проверки) или `npm run build`.

## 🛠️ Типичные проблемы и решения

- Node ниже 18: обновите Node до LTS 18+ (Vite 5 не работает на более старых версиях).
- Белый экран/404 на GitHub Pages: убедитесь, что `base: "/AQUANIKA/"` и деплой ведется из `docs/`, а все ассеты собираются относительно базы.
- Иконки не отображаются: выполните `npm run build` (запустит `copy-fonts.js`) или запустите вручную `node copy-fonts.js`.
- CSP блокирует внешние ресурсы: проверьте мета CSP в `src/index.html` и добавьте нужные источники (например, для API или шрифтов), если меняется интеграция.

## 🤝 Вклад

1. Форк
2. Ветка от `main`
3. Коммиты с понятными сообщениями
4. Pull Request

## 📄 Лицензия

MIT License

## 👤 Автор

- [Gana74](https://github.com/Gana74)
