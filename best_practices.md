# 📘 Project Best Practices

## 1. Project Purpose
Современный статический сайт салона красоты AQUANIKA, собранный Vite, с многостраничной структурой (HTML-шаблоны) и облегчённой SPA-навигацией (history API + динамическая подгрузка контента). Деплой ведётся на GitHub Pages из каталога docs.

## 2. Project Structure
- Root
  - vite.config.js — конфигурация Vite, много-входовая сборка HTML, base="/AQUANIKA/", dev-rewrites, сборка в docs, ручной чанк sideMenu
  - package.json — скрипты dev/build/preview/lint/clean/deploy
  - public/ — статические файлы (favicon, webmanifest, 404.html) копируются как есть
  - docs/ — артефакты сборки (выкладка для GitHub Pages)
  - README.md — инструкции по запуску/сборке
- src/ — исходники (корень dev-сервера)
  - index.html — главная точка входа
  - pages/ — HTML-страницы (многостраничная структура)
  - components/partials/ — HTML-партилы (header, footer, side-menu)
  - js/
    - main.js — инициализация приложения: загрузка layout-компонентов, MobileMenu, запуск роутера
    - components/ — модульные скрипты (router, loadComponents, sideMenu, forms, и т.д.)
  - styles/
    - base/ (reset, variables, typography, media)
    - components/ (UI-блоки: header, footer, buttons, menus, и т.д.)
    - layouts/ (grid, container)
    - pages/ (страничные стили)
    - main.css — основной импортируемый CSS
  - assets/ — изображения/медиа

Роли ключевых директорий/файлов:
- router.js — маршрутизация, вычисление basePath для окружений, загрузка HTML контента, управление history API, поддержка редиректов на GitHub Pages
- loadComponents.js — загрузка header/footer (примечание: содержит собственный способ вычисления basePath, см. рекомендации ниже)
- vite.config.js — определяет:
  - root: "src", base: "/AQUANIKA/", publicDir: "../public"
  - множественные HTML-входы (pages и partials) → чтобы их можно было fetch-ить напрямую из docs
  - dev server rewrites для маршрутов

## 3. Test Strategy
Тесты в репозитории отсутствуют. Рекомендуемый подход:
- Фреймворк: Vitest + jsdom (или happy-dom) для модульных тестов фронтенда без фреймворка
- Структура:
  - src/__tests__/ или рядом с модулем: src/js/components/router.test.js
  - Именование: <имя>.test.js
- Что тестировать:
  - Чистые функции и утилиты (например, вычисление basePath, getRoute)
  - Поведение роутера: формирование URL, реакция на history events, обработка редиректов
  - Инициализация и события UI-компонентов (sideMenu handlers, MobileMenu, toTopButton) через jsdom
- Мокинг:
  - fetch и sessionStorage через встроенные моки Vitest
  - history.pushState/popstate через jsdom-стабы
- Покрытие:
  - Базовые позитивные и негативные сценарии, smoke-тесты навигации

## 4. Code Style
- JavaScript
  - ES-модули, явные именованные экспорты; классы — PascalCase (например, Forms, MobileMenu), переменные/функции — camelCase
  - Асинхронщина: использовать async/await с try/catch; проверять response.ok и формировать внятные ошибки
  - Глобальная поверхность минимальна: window.navigateTo экспортируется осознанно для sideMenu; избегать лишних глобалов
  - Импорты путей: придерживаться единого подхода (см. basePath/alias ниже)
- CSS
  - Организация: base/components/layouts/pages
  - Нейминг: BEM-подобные классы и модификаторы (пример: .form__error, .button--loading, .side-menu__link)
  - Переменные: использовать variables.css для однообразия теминга/отступов/цветов
- HTML
  - Именование файлов — kebab-case (pages), семантическая вёрстка, корректные отно��ительные ссылки с учётом basePath
- Линтинг
  - Скрипты: npm run lint:js, npm run lint:css
  - Рекомендация: добавить конфиги
    - .eslintrc.json (eslint@8): env browser, extends рекомендованный набор, parserOptions sourceType: module
    - .stylelintrc.json: { "extends": "stylelint-config-standard" }

## 5. Common Patterns
- MPA + SPA-навигация: страницы — HTML-файлы, но навигация обрабатывается history API и динамическими fetch-ами
- basePath и среды:
  - vite.config.js: base: "/AQUANIKA/"
  - router.js: вычисляет basePath для GitHub Pages/localhost/прод
  - Рекомендация: централизовать basePath (см. Do’s)
- Динамический импорт: sideMenu.js подгружается по необходимости
- Dev rewrites: в vite.config.js прописаны правила соответствия путей страницам для локальной разработки
- Разбиение CSS/JS: cssCodeSplit включён; manualChunks выделяет sideMenu
- Паттерн загрузки layout-компонентов (header/footer) перед инициализацией роутера
- Обработка сбоев: fallback на главную при ошибках загрузки, логирование предупреждений

## 6. Do's and Don'ts
- ✅ Всегда обновляйте все точки при добавлении новой страницы:
  - router.js: routes, pageTitles, при необходимости pagesWithSideMenu
  - vite.config.js: rollupOptions.input (новая HTML-страница/partials), server.historyApiFallback.rewrites
  - components/partials: ссылки в header/footer/side-menu
- ✅ Централизуйте вычисление basePath
  - Используйте единственный источник правды (например, экспорт basePath из router.js) для всех fetch/путей
  - Избегайте ручного конструирования через window.location.origin в модулях
- ✅ Проверяйте res.ok у всех fetch и сообщайте понятные ошибки
- ✅ Сохраняйте единый стиль именования файлов: 
  - JS: придерживаться camelCase для имён файлов модулей (mobileMenu.js, sideMenu.js) либо перейти на единый kebab-case — важно не смешивать
  - HTML/CSS: kebab-case
- ✅ Изолируйте обработчики событи��; удаляйте/переинициализируйте листенеры при повторной подгрузке контента (пример: sideMenu.removeEventListener перед addEventListener)
- ✅ Держите public/ только для неизменяемых ассетов, которые должны копироваться как есть
- ✅ Для GitHub Pages убедитесь, что:
  - base в vite.config.js корректный
  - public/404.html обеспечивает SPA-редирект (и синхронизирован с handleRedirects)
- ❌ Не хардкодьте абсолютные URL без учёта base (например, window.location.origin + "/AQUANIKA/") — используйте basePath
- ❌ Не модифицируйте DOM через innerHTML для пользовательского ввода без явной санации
- ❌ Не добавляйте маршруты только в одном месте; отсутствие синхронизации между router.js и vite rewrites сломает локальную навигацию
- ❌ Не полагайтесь на /api/send-form без серверной части/прокси — предусмотрите конфиг/мок

## 7. Tools & Dependencies
- Основные инструменты
  - Vite ^5 — dev/build/preview (требует Node.js >= 18)
  - gh-pages — публикация каталога docs на GitHub Pages (npm run deploy)
  - ESLint, Stylelint — линтинг исходников CSS/JS
- Скрипты
  - npm run dev — запуск локального dev-сервера (порт 3000, auto-open)
  - npm run build — сборка в docs с сорсмапами и разделением ассетов
  - npm run preview — предпросмотр сборки
  - npm run lint:js — проверка JS
  - npm run lint:css — проверка CSS
  - npm run clean — очистка docs
  - npm run deploy — публикация в gh-pages из docs
- Конфигурации
  - vite.config.js: множественные HTML-входы (pages + partials), rewrites для dev, manualChunks для sideMenu, assetsInclude для SVG, собственный pre-plugin для импорта SVG как строки
  - Рекомендация: использовать import.meta.env.BASE_URL / Vite env-переменные для base, если потребуется гибкость

## 8. Other Notes
- Для генерации нового кода:
  - Новые страницы размещайте в src/pages, стиль — kebab-case
  - Обновляйте одновременно router.js, vite.config.js (inputs + rewrites) и partials (меню/шапка/подвал)
  - Для загрузки HTML используйте функции, учитывающие basePath из одного места
  - При добавлении новых partials, чтобы их можно было запрашивать через fetch после сборки, добавьте их как HTML-входы в rollupOptions.input
- Формы
  - Сейчас sendFormData указывает на /api/send-form; без бэкенда используйте мок/заглушку, либо настройте прокси в dev-сервере Vite
- SVG/ассеты
  - Благодаря кастомному svg-loader и assetsInclude, SVG можно импортировать как модули; для инлайна используйте импорт, для статики — public или assets
- Доступность/SEO
  - Поддерживайте alt для изображений, aria-атрибуты для интерактивных элементов, корректные теги заголовков
- Производительность
  - Сохраняйте ленивую инициализацию «тяжёлых» модулей (пример: динамический импорт sideMenu)
  - Следите за размером страниц; переисп��льзуйте стили/компоненты
