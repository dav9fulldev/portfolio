# Portfolio — Brou David Yao

Portfolio professionnel bilingue (FR / EN) de **Brou David Yao**, ingénieur développeur junior (Full-Stack & Mobile · Fintech · IA) à Abidjan.

**En ligne :** https://dav9fulldev.github.io/portfolio/

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

### GitHub Pages — automatique via `master`

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) :

- sur chaque **Pull Request vers `master`** : installe, vérifie le typage et construit le site (contrôle, sans publication) ;
- sur chaque **merge / push sur `master`** : construit puis publie directement sur GitHub Pages (sans branche `gh-pages`) : https://dav9fulldev.github.io/portfolio/.

Processus : créer une branche → ouvrir une PR vers `master` → vérifier que le check « Build & deploy » est vert → merger. Le site est en ligne 1 à 2 minutes plus tard.

Prérequis (déjà en place) : *Settings → Pages → Source : GitHub Actions*. Les branches de PR sont supprimées automatiquement après le merge : seule `master` reste.

Redéploiement manuel : onglet *Actions → Build & deploy → Run workflow* sur `master`.

Le build copie `index.html` en `404.html` pour que les URL inconnues affichent la page 404 du site.

### Changer d'URL

La base `/portfolio/` est définie dans `vite.config.ts`. Pour un domaine racine (Vercel, Netlify, domaine personnalisé), construire avec `BASE_PATH=/ npm run build`, puis mettre à jour `site.url` (`src/config/site.ts`), les URL absolues de `index.html` (canonical, Open Graph, JSON-LD), `public/robots.txt` et `public/sitemap.xml`.

### Vercel (alternative)

1. Importer le dépôt sur https://vercel.com/new
2. Framework : **Vite** — Build : `BASE_PATH=/ npm run build` — Output : `dist`
3. Mettre à jour les URL absolues comme indiqué ci-dessus.

## Contact

Aucun service d'envoi n'est configuré : le contact passe par e-mail (`mailto:`). Pour ajouter un formulaire (Formspree, Web3Forms…), voir `.env.example`.

## Principes de contenu

Toutes les informations proviennent des dépôts publics (README, code, releases) ou du parcours fourni par l'auteur. StoryGriot AI est documenté à partir de sa page DevPost. Les projets dont le code n'est pas public (RestoGestion, U-Report Cocody) sont signalés comme tels. L'illustration de RestoGestion est une représentation du concept, explicitement indiquée comme n'étant pas une capture d'écran. Aucune statistique n'est inventée.

## Reste à personnaliser

- **RestoGestion** : préciser dans `src/data/projects.ts` les fonctionnalités déjà développées et celles encore prévues, ajouter la stack et, dès que possible, une vraie capture d'écran (remplacer `cover` par `{ kind: "image", src: asset("/projects/restogestion.jpg") }`).
- **U-Report Cocody** : ajouter un lien (dépôt ou démo) et la stack si le projet devient public.
- **GIM-UEMOA** : ajuster la description du poste dans `src/i18n/translations.ts` (section `journey`) si vous souhaitez détailler vos missions.
- **CV** : remplacer `public/cv/Brou-David-Yao-CV.pdf` à chaque mise à jour.
