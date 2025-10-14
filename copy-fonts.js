import fs from "fs-extra";
import path from "path";

async function copyFonts() {
  try {
    const source = path.join(
      "node_modules",
      "@fortawesome",
      "fontawesome-free",
      "webfonts"
    );
    const destination = path.join("src", "assets", "fonts");

    // Создаем папку назначения если не существует
    await fs.ensureDir(destination);

    // Копируем файлы
    await fs.copy(source, destination);

    console.log("✅ Шрифты Font Awesome скопированы успешно!");
  } catch (error) {
    console.error("❌ Ошибка при копировании шрифтов:", error);
  }
}

copyFonts();
