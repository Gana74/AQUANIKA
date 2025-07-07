import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  base: "/AQUANIKA/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        // about: resolve(__dirname, "src/about/index.html"),
        // services: resolve(__dirname, "src/services/index.html"),
        // team: resolve(__dirname, "src/team/index.html"),
        // gallery: resolve(__dirname, "src/gallery/index.html"),
        // contacts: resolve(__dirname, "src/contacts/index.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
