import { defineConfig } from "vite";
import { resolve } from "path";
import { copyFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { join } from "path";

export default defineConfig({
  root: "src",
  base: "/",
  publicDir: "../public",
  optimizeDeps: {
    include: ["**/*.svg"],
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: false,
    assetsDir: "assets",
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Удаляет console.log, console.warn, console.info
        drop_debugger: true,
        pure_funcs: ["console.log"], // Дополнительно удаляет console.log
        passes: 2, // Множественные проходы для лучшей оптимизации
      },
      format: {
        comments: false, // Удаляет комментарии
      },
      mangle: {
        safari10: true, // Исправляет проблемы с Safari 10
      },
    },
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        home: resolve(__dirname, "src/fragments/home.html"),
        about: resolve(__dirname, "src/fragments/about.html"),
        team: resolve(__dirname, "src/fragments/team.html"),
        reviews: resolve(__dirname, "src/fragments/reviews.html"),
        vacancies: resolve(__dirname, "src/fragments/vacancies.html"),
        gallery: resolve(__dirname, "src/fragments/gallery.html"),
        price: resolve(__dirname, "src/fragments/price.html"),
        contacts: resolve(__dirname, "src/fragments/contacts.html"),
        privacy: resolve(__dirname, "src/fragments/privacy.html"),

        spa: resolve(__dirname, "src/fragments/spa-and-massage.html"),
        aquanika: resolve(__dirname, "src/fragments/aquanika-massage.html"),
        massage: resolve(__dirname, "src/fragments/massage.html"),
        wrapping: resolve(__dirname, "src/fragments/wrapping.html"),
        cosmetology: resolve(__dirname, "src/fragments/cosmetology.html"),
        cosmetologyFace: resolve(__dirname, "src/fragments/face-care.html"),
        cosmetologyInjections: resolve(
          __dirname,
          "src/fragments/injections.html"
        ),

        cosmetologyTattooRemoval: resolve(
          __dirname,
          "src/fragments/tattoo-removal.html"
        ),
        nails: resolve(__dirname, "src/fragments/manicure-pedicure.html"),
        nailsManicure: resolve(__dirname, "src/fragments/manicure.html"),
        nailsPedicure: resolve(__dirname, "src/fragments/pedicure.html"),
        nailsExtensions: resolve(
          __dirname,
          "src/fragments/nails-extensions.html"
        ),
        brows: resolve(__dirname, "src/fragments/brows-and-lashes.html"),
        browsArchitecture: resolve(
          __dirname,
          "src/fragments/brows-architecture.html"
        ),
        browsExtensions: resolve(
          __dirname,
          "src/fragments/brows-extensions.html"
        ),
        epilation: resolve(__dirname, "src/fragments/epilation.html"),
        laser: resolve(__dirname, "src/fragments/laser-epilation.html"),
        sugaring: resolve(__dirname, "src/fragments/sugaring.html"),
        hairdressing: resolve(__dirname, "src/fragments/hairdressing.html"),
        haircuts: resolve(__dirname, "src/fragments/haircuts.html"),
        hairColoring: resolve(__dirname, "src/fragments/hair-coloring.html"),
        hairStyling: resolve(__dirname, "src/fragments/hair-styling.html"),
        haircare: resolve(__dirname, "src/fragments/hair-care.html"),
        makeup: resolve(__dirname, "src/fragments/makeup.html"),
        men: resolve(__dirname, "src/fragments/men-services.html"),
        menHaircut: resolve(__dirname, "src/fragments/men-haircut.html"),
        menEpilation: resolve(__dirname, "src/fragments/men-epilation.html"),
        menManicure: resolve(__dirname, "src/fragments/men-manicure.html"),

        header: resolve(__dirname, "src/components/partials/header.html"),
        footer: resolve(__dirname, "src/components/partials/footer.html"),
        sideMenu: resolve(__dirname, "src/components/partials/side-menu.html"),
      },
      output: {
        // Оптимизация имен файлов для кэширования
        entryFileNames: "assets/js/[name]-[hash].js",
        chunkFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        // Разделение кода для лучшей производительности
        manualChunks: (id) => {
          // Разделение vendor библиотек
          if (id.includes("node_modules")) {
            if (id.includes("lazysizes")) {
              return "vendor-lazysizes";
            }
            return "vendor";
          }
          // Разделение больших компонентов
          if (id.includes("components/map.js")) {
            return "map";
          }
          if (id.includes("components/router.js")) {
            return "router";
          }
          if (id.includes("components/sideMenu.js")) {
            return "sideMenu";
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: "/index.html" },
        { from: /^\/home/, to: "/fragments/home.html" },
        { from: /^\/about/, to: "/fragments/about.html" },
        { from: /^\/team/, to: "/fragments/team.html" },
        { from: /^\/reviews/, to: "/fragments/reviews.html" },
        { from: /^\/vacancies/, to: "/fragments/vacancies.html" },
        { from: /^\/gallery/, to: "/fragments/gallery.html" },
        { from: /^\/services\/spa/, to: "/fragments/spa-and-massage.html" },
        {
          from: /^\/services\/aquanika/,
          to: "/fragments/aquanika-massage.html",
        },
        { from: /^\/services\/massage/, to: "/fragments/massage.html" },
        { from: /^\/services\/wrapping/, to: "/fragments/wrapping.html" },
        {
          from: /^\/services\/cosmetology$/,
          to: "/fragments/cosmetology.html",
        },
        {
          from: /^\/services\/cosmetology\/face-care/,
          to: "/fragments/face-care.html",
        },
        {
          from: /^\/services\/cosmetology\/injections/,
          to: "/fragments/injections.html",
        },
        {
          from: /^\/services\/cosmetology\/tattoo-removal/,
          to: "/fragments/tattoo-removal.html",
        },
        {
          from: /^\/services\/nails$/,
          to: "/fragments/manicure-pedicure.html",
        },
        {
          from: /^\/services\/nails\/manicure/,
          to: "/fragments/manicure.html",
        },
        {
          from: /^\/services\/nails\/pedicure/,
          to: "/fragments/pedicure.html",
        },
        {
          from: /^\/services\/nails\/extensions/,
          to: "/fragments/nails-extensions.html",
        },
        { from: /^\/services\/brows$/, to: "/fragments/brows-and-lashes.html" },
        {
          from: /^\/services\/brows\/architecture/,
          to: "/fragments/brows-architecture.html",
        },

        {
          from: /^\/services\/brows\/extensions/,
          to: "/fragments/brows-extensions.html",
        },
        { from: /^\/services\/epilation$/, to: "/fragments/epilation.html" },
        {
          from: /^\/services\/epilation\/laser/,
          to: "/fragments/laser-epilation.html",
        },
        {
          from: /^\/services\/epilation\/sugaring/,
          to: "/fragments/sugaring.html",
        },
        {
          from: /^\/services\/hairdressing$/,
          to: "/fragments/hairdressing.html",
        },
        {
          from: /^\/services\/hairdressing\/haircuts/,
          to: "/fragments/haircuts.html",
        },
        {
          from: /^\/services\/hairdressing\/coloring/,
          to: "/fragments/hair-coloring.html",
        },
        {
          from: /^\/services\/hairdressing\/styling/,
          to: "/fragments/hair-styling.html",
        },
        { from: /^\/services\/haircare$/, to: "/fragments/hair-care.html" },
        { from: /^\/services\/makeup$/, to: "/fragments/makeup.html" },
        { from: /^\/services\/men$/, to: "/fragments/men-services.html" },
        {
          from: /^\/services\/men\/haircut/,
          to: "/fragments/men-haircut.html",
        },
        {
          from: /^\/services\/men\/epilation/,
          to: "/fragments/men-epilation.html",
        },
        {
          from: /^\/services\/men\/manicure/,
          to: "/fragments/men-manicure.html",
        },
        { from: /^\/services\/price$/, to: "/fragments/price.html" },
        { from: /^\/header/, to: "/components/partials/header.html" },
        { from: /^\/footer/, to: "/components/partials/footer.html" },
        { from: /^\/side-menu/, to: "/components/partials/side-menu.html" },
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  assetsInclude: ["**/*.svg"],
  plugins: [
    {
      name: "svg-loader",
      enforce: "pre",
      transform(code, id) {
        if (id.endsWith(".svg")) {
          return {
            code: `export default ${JSON.stringify(code)}`,
            map: null,
          };
        }
      },
    },
    // Плагин для копирования fragments и изображений в dist после сборки
    {
      name: "copy-fragments-and-images",
      closeBundle() {
        const srcFragments = resolve(__dirname, "src/fragments");
        const distFragments = resolve(__dirname, "dist/fragments");
        const srcImages = resolve(__dirname, "src/assets/images");
        const distImages = resolve(__dirname, "dist/assets/images");

        function copyRecursive(src, dest) {
          mkdirSync(dest, { recursive: true });
          const entries = readdirSync(src, { withFileTypes: true });

          for (const entry of entries) {
            const srcPath = join(src, entry.name);
            const destPath = join(dest, entry.name);

            if (entry.isDirectory()) {
              copyRecursive(srcPath, destPath);
            } else {
              copyFileSync(srcPath, destPath);
            }
          }
        }

        try {
          // Копируем html-фрагменты
          copyRecursive(srcFragments, distFragments);
          console.log("✅ Fragments скопированы в dist/fragments/");

          // Копируем изображения с сохранением структуры папок,
          // чтобы пути вида /assets/images/... работали в проде
          copyRecursive(srcImages, distImages);
          console.log("✅ Images скопированы в dist/assets/images/");
        } catch (error) {
          console.error(
            "❌ Ошибка при копировании fragments или images:",
            error
          );
        }
      },
    },
  ],
});
