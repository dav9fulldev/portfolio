/**
 * Refait les captures d'écran des projets en ligne, pour que le portfolio suive leur design actuel.
 * Lancé par GitHub Actions avant chaque build (et chaque jour) : les images de public/projects
 * sont remplacées dans l'espace de build uniquement, rien n'est commité.
 * Si un site ne répond pas, l'image déjà présente dans le dépôt est gardée : le build ne casse jamais.
 *
 * Usage : node scripts/capture-covers.mjs
 * (PW_MODULE permet d'indiquer un autre module Playwright, par ex. playwright-core en local.)
 */
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "projects");

/** Sites capturés : même fichier que la couverture actuelle de chaque projet. */
const SITES = [
  {
    file: "residence.jpg",
    url: "https://residencemeublee.vercel.app",
    // Bandeau affiché pendant le réveil du serveur (hébergement gratuit) : on attend qu'il disparaisse.
    waitGone: ["Connexion au serveur"],
  },
  {
    file: "ureport-cocody.jpg",
    url: "https://ureport-cocody.vercel.app/",
    // Écran de chargement de l'application, puis fenêtre de consentement aux cookies (refusée : choix minimal).
    waitGone: ["Chargement"],
    dismiss: { button: /essentiels uniquement/i, gone: "Respect de votre vie" },
  },
  { file: "paymechap.jpg", url: "https://paymechap.com" },
];

const { chromium } = await import(process.env.PW_MODULE ?? "playwright");
const browser = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {});
let failures = 0;

for (const site of SITES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  try {
    await page.goto(site.url, { waitUntil: "load", timeout: 60_000 });
    // Certains sites gardent une connexion ouverte (chat, temps réel) : « networkidle » n'est pas exigé.
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
    // La page doit être prête : sinon on garde l'ancienne image plutôt que de publier un écran de chargement.
    for (const text of site.waitGone ?? []) {
      await page.waitForFunction((t) => !document.body.innerText.includes(t), text, { timeout: 90_000 }).catch(() => {
        throw new Error(`page pas prête (« ${text} » toujours affiché)`);
      });
    }
    // Fenêtre à fermer (cookies…) : on clique, puis on vérifie que son texte a bien disparu.
    if (site.dismiss) {
      const button = page.getByRole("button", { name: site.dismiss.button }).first();
      await button.waitFor({ state: "visible", timeout: 15_000 }).catch(() => {});
      await button.click({ timeout: 5_000 }).catch(() => {});
      await page
        .waitForFunction((t) => !document.body.innerText.includes(t), site.dismiss.gone, { timeout: 10_000 })
        .catch(() => {
          throw new Error(`fenêtre « ${site.dismiss.gone} » toujours affichée`);
        });
    }
    // Laisse le temps aux compteurs animés, aux animations d'apparition et aux images de se terminer.
    await page.waitForTimeout(6000);
    const blockers = [...(site.waitGone ?? []), ...(site.dismiss ? [site.dismiss.gone] : [])];
    const back = await page.evaluate((list) => list.find((t) => document.body.innerText.includes(t)), blockers);
    if (back) throw new Error(`« ${back} » de nouveau affiché`);
    await page.screenshot({ path: join(OUT, site.file), type: "jpeg", quality: 82 });
    console.log(`✓ ${site.file} ← ${site.url}`);
  } catch (err) {
    failures++;
    console.warn(`⚠ ${site.url} : capture impossible, l'ancienne image est conservée (${err.message.split("\n")[0]})`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(failures ? `${failures} capture(s) conservée(s) telle(s) quelle(s).` : "Toutes les captures sont à jour.");
