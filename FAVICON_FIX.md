# Исправление проблемы с Favicon и Webmanifest

## Проблема
При запуске проекта в режиме разработки (`npm run dev`) возникала ошибка:
```
Manifest: Line: 1, column: 1, Syntax error. webmanifest:1
```

## Причина
Vite в режиме разработки использует папку `src` как корневую, но favicon файлы находились в папке `public`, которая доступна только при сборке.

## Решение

### 1. Создание папки для favicon в src
```bash
mkdir -p src/assets/favicon
```

### 2. Копирование favicon файлов
```bash
copy public\favicon.* src\assets\favicon\
copy public\webmanifest src\assets\favicon\
copy "public\apple-touch-icon.png" "src\assets\favicon\"
```

### 3. Создание правильного webmanifest.json
Файл `webmanifest` был переименован в `webmanifest.json` с правильным JSON форматом.

### 4. Обновление путей в HTML
В `src/index.html` пути к favicon файлам изменены с абсолютных на относительные:
```html
<!-- Было -->
<link rel="manifest" href="/webmanifest" />

<!-- Стало -->
<link rel="manifest" href="./assets/favicon/webmanifest.json" />
```

### 5. Обновление Vite конфигурации
Добавлен параметр `copyPublicDir: true` для корректной сборки.

## Структура файлов после исправления

```
src/
  assets/
    favicon/
      favicon.ico
      favicon.svg
      favicon-96x96.png
      apple-touch-icon.png
      webmanifest.json
```

## Проверка
1. Запустите проект: `npm run dev`
2. Откройте консоль браузера - ошибки с webmanifest должны исчезнуть
3. Favicon должен отображаться корректно

## Примечание
При сборке проекта (`npm run build`) favicon файлы из папки `public` будут скопированы в `docs/`, что обеспечит корректную работу в продакшене.
