import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Two HTML entry points keep the original URLs working:
//   index.html  and  product-detail.html?id=<product-id>
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        detail: resolve(import.meta.dirname, "product-detail.html"),
      },
    },
  },
});
