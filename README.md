# Portfolio — Brou David Yao

Portfolio professionnel bilingue (FR / EN) de **Brou David Yao**, ingénieur développeur junior (Full-Stack & Mobile · Fintech · IA) à Abidjan.

**En ligne :** https://dav9fulldev.github.io/

## Stack

- [Vite 7](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) (tokens de design dans `src/index.css`)
- [Motion](https://motion.dev) pour les animations (désactivées si l'utilisateur réduit les animations)
- [Lucide](https://lucide.dev) pour les icônes
- Polices : Instrument Serif, Geist, Geist Mono (Google Fonts)

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # vérification TypeScript + build de production dans dist/
npm run preview    # sert dist/ sur http://localhost:4173
```

Node 20 ou plus récent recommandé.

## Personnaliser

| Quoi | Où |
| --- | --- |
| E-mail, GitHub, GitLab, **LinkedIn**, CV, photo | `src/config/site.ts` (un champ vide masque le lien) |
| Tous les textes FR / EN (menu, sections, parcours…) | `src/i18n/translations.ts` |
| Projets (descriptions bilingues, stack, liens, visuels) | `src/data/projects.ts` |
| Compétences et niveaux | `src/components/Expertise.tsx` (`AREAS`) |
| CV | `public/cv/Brou-David-Yao-CV.pdf` |
| Photo | `public/images/brou-david-yao.jpg` |
| Visuels de projets | `public/projects/` |
| Métadonnées SEO, Open Graph, JSON-LD | `index.html`, `public/og-image.png` |
| Sitemap / robots | `public/sitemap.xml`, `public/robots.txt` |

La langue par défaut est le français. On peut forcer la langue via `?lang=en`. Chaque projet a un lien direct : `/#projects/<slug>` (ex. `/#projects/restogestion`).

## Structure

```
src/
├── App.tsx                 # assemblage des sections + page 404
├── config/site.ts          # informations personnelles
├── i18n/                   # dictionnaires FR/EN + contexte de langue
├── data/projects.ts        # contenu des projets
├── hooks/useActiveSection.ts
└── components/             # Header, Hero, About, Projects, ProjectDetail, Expertise, Journey, Contact, Footer…
```

## Déploiement

### GitHub Pages (configuration actuelle)

Le site est publié depuis la branche `gh-pages` du dépôt `dav9fulldev/dav9fulldev.github.io` :

```bash
npm run deploy     # build + publication de dist/ sur la branche gh-pages
```

Le build copie `index.html` en `404.html` pour que les URL inconnues affichent la page 404 du site.
Pour publier dans un dépôt « projet » (ex. `github.com/dav9fulldev/portfolio`), mettre `base: "/portfolio/"` dans `vite.config.ts` et adapter les URL absolues de `index.html`, `robots.txt` et `sitemap.xml`.

### Vercel (alternative)

1. Importer le dépôt sur https://vercel.com/new
2. Framework : **Vite** — Build : `npm run build` — Output : `dist`
3. Déployer, puis mettre à jour `site.url`, la balise `canonical`, l'Open Graph, `robots.txt` et `sitemap.xml` avec le nouveau domaine.

## Contact

Aucun service d'envoi n'est configuré : le contact passe par e-mail (`mailto:`). Pour ajouter un formulaire (Formspree, Web3Forms…), voir `.env.example`.

## Principes de contenu

Toutes les informations proviennent des dépôts publics (README, code, releases) ou du parcours fourni par l'auteur. Les projets dont le code n'est pas public (RestoGestion, StoryGriot AI, U-Report Cocody) sont signalés comme tels, et aucune statistique n'est inventée.
