import { createHash } from "node:crypto";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Ajoute une Content-Security-Policy (balise meta) au build de production uniquement :
 * en développement, Vite injecte des scripts inline (HMR) qu'elle bloquerait.
 * Les scripts inline du HTML (thème) sont autorisés par leur empreinte SHA-256,
 * calculée automatiquement : modifier le script ne casse donc pas la politique.
 */
function contentSecurityPolicy(): Plugin {
  return {
    name: "csp-meta",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const hashes = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g)]
          .map((m) => `'sha256-${createHash("sha256").update(m[1]).digest("base64")}'`);
        const policy = [
          "default-src 'self'",
          `script-src 'self' ${hashes.join(" ")}`,
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data:",
          "frame-src https://www.youtube-nocookie.com",
          "connect-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'none'",
          "upgrade-insecure-requests",
        ].join("; ");
        return html.replace(
          '<meta charset="UTF-8" />',
          `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${policy}" />`,
        );
      },
    },
  };
}

// Site servi par GitHub Pages sur https://dav9fulldev.github.io/portfolio/
// (dépôt « projet » dav9fulldev/portfolio). Pour un domaine racine (Vercel, Netlify…),
// lancer le build avec BASE_PATH=/ .
export default defineConfig({
  base: process.env.BASE_PATH || "/portfolio/",
  plugins: [react(), tailwindcss(), contentSecurityPolicy()],
});
