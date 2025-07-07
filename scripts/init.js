const fs = require("fs");
const path = require("path");

// Создаем необходимые директории
const directories = [
  "src/assets/images",
  "src/assets/icons",
  "src/assets/fonts",
  "src/styles/base",
  "src/styles/components",
  "src/styles/layouts",
  "src/styles/pages",
  "src/js/components",
  "src/js/services",
  "src/js/utils",
  "src/pages",
  "public",
];

directories.forEach((dir) => {
  const fullPath = path.join(__dirname, "..", dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Создаем .env из .env.example, если его нет
const envExample = path.join(__dirname, "..", ".env.example");
const envFile = path.join(__dirname, "..", ".env");

if (fs.existsSync(envExample) && !fs.existsSync(envFile)) {
  fs.copyFileSync(envExample, envFile);
  console.log("Created .env file from .env.example");
}

console.log("Project initialization completed!");
