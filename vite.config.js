import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  base: "/AQUANIKA/",
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
        header: resolve(__dirname, "src/components/partials/header.html"),
        footer: resolve(__dirname, "src/components/partials/footer.html"),
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
        { from: /^\/header/, to: "/components/partials/header.html" },
        { from: /^\/footer/, to: "/components/partials/footer.html" },
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
