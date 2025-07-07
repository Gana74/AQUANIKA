import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => {
  const config = {
    root: "src",
    base: command === "serve" ? "/" : "/AQUANIKA/",
    build: {
      outDir: "../docs",
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
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
  };

  return config;
});
