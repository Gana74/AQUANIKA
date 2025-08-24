import fs from "fs-extra";
import path from "path";

async function copyStaticFiles() {
  try {
    // Создаем необходимые директории
    await fs.ensureDir("src/public/assets/icons");
    await fs.ensureDir("src/public/components/partials");
    await fs.ensureDir("src/public/pages");

    // Копируем компоненты
    await fs.copy("src/components/partials", "src/public/components/partials");

    // Копируем страницы
    await fs.copy("src/pages", "src/public/pages");

    // Копируем иконки
    await fs.copy("src/assets/icons", "src/public/assets/icons");

    console.log("Статические файлы успешно скопированы в public");
  } catch (err) {
    console.error("Ошибка при копировании файлов:", err);
  }
}

copyStaticFiles();
