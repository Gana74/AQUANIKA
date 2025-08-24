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
      port: 3000,
      open: true,
      // Настройка для правильной работы маршрутизации
      historyApiFallback: {
        rewrites: [{ from: /^\/.*/, to: "/index.html" }],
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
  };

  return config;
});
