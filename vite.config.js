import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  base: "/AQUANIKA/",
  publicDir: "../public",
  optimizeDeps: {
    include: ["**/*.svg"],
  },
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    sourcemap: true,
    assetsDir: "assets",
    cssCodeSplit: true,
    minify: true,
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        home: resolve(__dirname, "src/pages/home.html"),
        about: resolve(__dirname, "src/pages/about.html"),
        team: resolve(__dirname, "src/pages/team.html"),
        reviews: resolve(__dirname, "src/pages/reviews.html"),
        vacancies: resolve(__dirname, "src/pages/vacancies.html"),
        gallery: resolve(__dirname, "src/pages/gallery.html"),
        spa: resolve(__dirname, "src/pages/spa-and-massage.html"),
        aquanika: resolve(__dirname, "src/pages/aquanika-massage.html"),
        massage: resolve(__dirname, "src/pages/massage.html"),
        wrapping: resolve(__dirname, "src/pages/wrapping.html"),
        cosmetology: resolve(__dirname, "src/pages/cosmetology.html"),
        cosmetologyFace: resolve(__dirname, "src/pages/face-care.html"),
        cosmetologyInjections: resolve(__dirname, "src/pages/injections.html"),
        cosmetologyTattooRemoval: resolve(
          __dirname,
          "src/pages/tattoo-removal.html"
        ),
        nails: resolve(__dirname, "src/pages/manicure-pedicure.html"),
        nailsManicure: resolve(__dirname, "src/pages/manicure.html"),
        nailsPedicure: resolve(__dirname, "src/pages/pedicure.html"),
        nailsExtensions: resolve(__dirname, "src/pages/nails-extensions.html"),
        brows: resolve(__dirname, "src/pages/brows-and-lashes.html"),
        browsArchitecture: resolve(
          __dirname,
          "src/pages/brows-architecture.html"
        ),
        browsExtensions: resolve(__dirname, "src/pages/brows-extensions.html"),
        laser: resolve(__dirname, "src/pages/laser-epilation.html"),
        hairdressing: resolve(__dirname, "src/pages/hairdressing.html"),
        haircuts: resolve(__dirname, "src/pages/haircuts.html"),
        hairColoring: resolve(__dirname, "src/pages/hair-coloring.html"),
        hairStyling: resolve(__dirname, "src/pages/hair-styling.html"),
        makeup: resolve(__dirname, "src/pages/makeup.html"),
        makeupDay: resolve(__dirname, "src/pages/makeup-day.html"),
        makeupEvening: resolve(__dirname, "src/pages/makeup-evening.html"),
        makeupWedding: resolve(__dirname, "src/pages/makeup-wedding.html"),
        men: resolve(__dirname, "src/pages/men-services.html"),
        menHaircut: resolve(__dirname, "src/pages/men-haircut.html"),
        menMassage: resolve(__dirname, "src/pages/men-massage.html"),
        menManicure: resolve(__dirname, "src/pages/men-manicure.html"),
        header: resolve(__dirname, "src/components/partials/header.html"),
        footer: resolve(__dirname, "src/components/partials/footer.html"),
        sideMenu: resolve(__dirname, "src/components/partials/side-menu.html"),
      },
      output: {
        manualChunks: {
          sideMenu: ["./src/js/components/sideMenu.js"],
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
        { from: /^\/home/, to: "/pages/home.html" },
        { from: /^\/about/, to: "/pages/about.html" },
        { from: /^\/team/, to: "/pages/team.html" },
        { from: /^\/reviews/, to: "/pages/reviews.html" },
        { from: /^\/vacancies/, to: "/pages/vacancies.html" },
        { from: /^\/gallery/, to: "/pages/gallery.html" },
        { from: /^\/services\/spa/, to: "/pages/spa-and-massage.html" },
        { from: /^\/services\/aquanika/, to: "/pages/aquanika-massage.html" },
        { from: /^\/services\/massage/, to: "/pages/massage.html" },
        { from: /^\/services\/wrapping/, to: "/pages/wrapping.html" },
        { from: /^\/services\/cosmetology$/, to: "/pages/cosmetology.html" },
        {
          from: /^\/services\/cosmetology\/face-care/,
          to: "/pages/face-care.html",
        },
        {
          from: /^\/services\/cosmetology\/injections/,
          to: "/pages/injections.html",
        },
        {
          from: /^\/services\/cosmetology\/tattoo-removal/,
          to: "/pages/tattoo-removal.html",
        },
        { from: /^\/services\/nails$/, to: "/pages/manicure-pedicure.html" },
        { from: /^\/services\/nails\/manicure/, to: "/pages/manicure.html" },
        { from: /^\/services\/nails\/pedicure/, to: "/pages/pedicure.html" },
        {
          from: /^\/services\/nails\/extensions/,
          to: "/pages/nails-extensions.html",
        },
        { from: /^\/services\/brows$/, to: "/pages/brows-and-lashes.html" },
        {
          from: /^\/services\/brows\/architecture/,
          to: "/pages/brows-architecture.html",
        },
      
        {
          from: /^\/services\/brows\/extensions/,
          to: "/pages/brows-extensions.html",
        },
        { from: /^\/services\/laser$/, to: "/pages/laser-epilation.html" },
        { from: /^\/services\/hairdressing$/, to: "/pages/hairdressing.html" },
        {
          from: /^\/services\/hairdressing\/haircuts/,
          to: "/pages/haircuts.html",
        },
        {
          from: /^\/services\/hairdressing\/coloring/,
          to: "/pages/hair-coloring.html",
        },
        {
          from: /^\/services\/hairdressing\/styling/,
          to: "/pages/hair-styling.html",
        },
        { from: /^\/services\/makeup$/, to: "/pages/makeup.html" },
        { from: /^\/services\/makeup\/day/, to: "/pages/makeup-day.html" },
        {
          from: /^\/services\/makeup\/evening/,
          to: "/pages/makeup-evening.html",
        },
        {
          from: /^\/services\/makeup\/wedding/,
          to: "/pages/makeup-wedding.html",
        },
        { from: /^\/services\/men$/, to: "/pages/men-services.html" },
        { from: /^\/services\/men\/haircut/, to: "/pages/men-haircut.html" },
        { from: /^\/services\/men\/massage/, to: "/pages/men-massage.html" },
        { from: /^\/services\/men\/manicure/, to: "/pages/men-manicure.html" },
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
  ],
});
