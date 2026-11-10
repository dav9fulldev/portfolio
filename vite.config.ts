import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Site servi par GitHub Pages sur https://dav9fulldev.github.io/portfolio/
// (dépôt « projet » dav9fulldev/portfolio). Pour un domaine racine (Vercel, Netlify…),
// lancer le build avec BASE_PATH=/ .
export default defineConfig({
  base: process.env.BASE_PATH || "/portfolio/",
  plugins: [react(), tailwindcss()],
});
