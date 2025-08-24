import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  base: "/AQUANIKA/", // Всегда используем правильный base
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
        about: resolve(__dirname, "src/pages/about.html"),
        team: resolve(__dirname, "src/pages/team.html"),
        reviews: resolve(__dirname, "src/pages/reviews.html"),
        vacancies: resolve(__dirname, "src/pages/vacancies.html"),
        gallery: resolve(__dirname, "src/pages/gallery.html"),
        spa: resolve(__dirname, "src/pages/spa-and-massage.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: "/index.html" },
        { from: /^\/about/, to: "/pages/about.html" },
        { from: /^\/team/, to: "/pages/team.html" },
        { from: /^\/reviews/, to: "/pages/reviews.html" },
        { from: /^\/vacancies/, to: "/pages/vacancies.html" },
        { from: /^\/gallery/, to: "/pages/gallery.html" },
        { from: /^\/services\/spa/, to: "/pages/spa-and-massage.html" },
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
