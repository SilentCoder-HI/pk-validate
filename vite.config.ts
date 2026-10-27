import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  root: "playground",
  plugins: [react(), tailwindcss()],
  server: { host: "127.0.0.1" },
  build: {
    outDir: "../dist-demo",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, "playground/index.html"),
        playground: resolve(__dirname, "playground/playground.html"),
        about: resolve(__dirname, "playground/about.html"),
        docs: resolve(__dirname, "playground/docs.html"),
      },
    },
  },
});