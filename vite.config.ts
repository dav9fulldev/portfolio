import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Site déployé à la racine de https://dav9fulldev.github.io/
// Pour un dépôt « projet » GitHub Pages, remplacer base par "/<nom-du-depot>/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
