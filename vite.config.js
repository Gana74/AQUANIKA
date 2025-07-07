import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/AQUANIKA/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
