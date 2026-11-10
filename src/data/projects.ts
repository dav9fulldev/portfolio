import type { Lang } from "../i18n/translations";

type L<T = string> = Record<Lang, T>;

export type Cover =
  | { kind: "image"; src: string; position?: string }
  | { kind: "logo"; src: string }
  | { kind: "type"; glyph: "resto" | "griot" | "civic" };

export type Project = {
  slug: string;
  name: string;
  category: L;
  year: string;
  featured?: boolean;
  /** Mise en avant « restauration / hôtellerie » */
  highlight?: L;
  cover: Cover;
  tagline: L;
  problem: L;
  solution: L;
  role: L;
  features: L<string[]>;
  stack: string[];
  status: L;
  /** D'où viennent les informations affichées — transparence vis-à-vis du jury */
  source: L;
  links: { repo?: string; demo?: string; release?: string };
};

export const projects: Project[] = [
  {
    slug: "gertonargent",
    name: "GèrTonArgent",
    category: { fr: "Fintech · Mobile · IA", en: "Fintech · Mobile · AI" },
    year: "2026",
    featured: true,
    cover: { kind: "logo", src: "/projects/gertonargent-logo.png" },
    tagline: {
      fr: "Un « garde du corps financier » qui intervient juste avant la dépense impulsive.",
      en: "A “financial bodyguard” that steps in right before an impulse purchase.",
    },
    problem: {
      fr: "Les dépenses impulsives, notamment via le Mobile Money, sont difficiles à suivre : la plupart des applications de budget constatent après coup au lieu de prévenir.",
      en: "Impulse spending, especially through Mobile Money, is hard to track: most budgeting apps report after the fact instead of preventing it.",
    },
    solution: {
      fr: "Une application mobile qui détecte les flux Mobile Money, analyse le budget en temps réel et s'appuie sur Sika, un assistant vocal hors ligne, pour enregistrer les dépenses sans effort.",
      en: "A mobile app that detects Mobile Money flows, analyses the budget in real time and relies on Sika, an offline voice assistant, to log expenses effortlessly.",
    },
    role: {
      fr: "Projet personnel : conception, application Flutter, services natifs Android et API FastAPI.",
      en: "Personal project: design, Flutter app, native Android services and FastAPI backend.",
    },
    features: {
      fr: [
        "Assistant vocal Sika, utilisable hors ligne",
        "Détection des flux Wave, Orange, MTN et Moov Money",
        "Conseils personnalisés à partir de l'historique de dépenses",
        "Données financières et vocales conservées sur l'appareil",
      ],
      en: [
        "Sika voice assistant, works offline",
        "Detection of Wave, Orange, MTN and Moov Money flows",
        "Personalised advice based on spending history",
        "Financial and voice data kept on the device",
      ],
    },
    stack: ["Flutter", "Dart", "Riverpod", "Kotlin", "Python", "FastAPI", "Docker"],
    status: {
      fr: "En développement — v2.0 documentée (février 2026)",
      en: "In development — v2.0 documented (February 2026)",
    },
    source: { fr: "README et code du dépôt public", en: "Public repository README and code" },
    links: { repo: "https://github.com/dav9fulldev/FintechProject" },
  },
  {
    slug: "restogestion",
    name: "RestoGestion",
    category: { fr: "SaaS · Restauration", en: "SaaS · Food service" },
    year: "—",
    featured: true,
    highlight: { fr: "Restauration", en: "Food service" },
    cover: { kind: "type", glyph: "resto" },
    tagline: {
      fr: "Une solution SaaS pour aider les restaurants à mieux gérer, mieux servir et fidéliser.",
      en: "A SaaS solution helping restaurants run better, serve better and build loyalty.",
    },
    problem: {
      fr: "Beaucoup de restaurants gèrent encore leur activité et leur relation client de manière manuelle et dispersée, ce qui limite le suivi et la fidélisation.",
      en: "Many restaurants still run operations and customer relations manually and in scattered tools, which limits follow-up and loyalty.",
    },
    solution: {
      fr: "Une plateforme de gestion intelligente regroupant la gestion du restaurant, l'interaction avec les clients et des mécanismes de fidélisation, dans une logique de transformation numérique du secteur.",
      en: "A smart management platform bringing together restaurant operations, customer interaction and loyalty mechanisms, as part of the sector's digital transformation.",
    },
    role: {
      fr: "Porteur du projet : conception produit et développement.",
      en: "Project lead: product design and development.",
    },
    features: {
      fr: ["Gestion de l'activité du restaurant", "Interaction avec la clientèle", "Fidélisation des clients"],
      en: ["Restaurant operations management", "Customer interaction", "Customer loyalty"],
    },
    stack: [],
    status: {
      fr: "Projet en cours — code non public",
      en: "Ongoing project — code not public",
    },
    source: {
      fr: "Présentation de l'auteur (dépôt privé, non consultable publiquement)",
      en: "Author's description (private repository, not publicly viewable)",
    },
    links: {},
  },
  {
    slug: "sika-pay",
    name: "SIKA Pay",
    category: { fr: "Fintech · Agent IA · Mobile", en: "Fintech · AI agent · Mobile" },
    year: "2026",
    featured: true,
    cover: { kind: "image", src: "/projects/sika-architecture.jpg", position: "center 30%" },
    tagline: {
      fr: "Un agent de paiement IA qui explique, vérifie et demande avant de payer.",
      en: "An AI payment agent that explains, checks and asks before it pays.",
    },
    problem: {
      fr: "Un assistant IA capable de dépenser de l'argent soulève des questions de confiance : bon produit, bon prix, budget respecté, paiement réellement effectué, résistance aux manipulations.",
      en: "An AI assistant that can spend money raises trust questions: right product, right price, budget respected, payment actually made, resistance to manipulation.",
    },
    solution: {
      fr: "Gemini comprend l'intention et appelle des outils, mais c'est le serveur qui fixe les montants et l'identité, et PayPal qui déplace l'argent. L'utilisateur garde le contrôle à chaque étape.",
      en: "Gemini understands intent and calls tools, but the server sets amounts and identity, and PayPal moves the money. The user stays in control at every step.",
    },
    role: {
      fr: "Projet personnel présenté au PayPal AI Hackathon 2026 : application Flutter, backend FastAPI et intégrations PayPal / Gemini.",
      en: "Personal project submitted to the PayPal AI Hackathon 2026: Flutter app, FastAPI backend and PayPal / Gemini integrations.",
    },
    features: {
      fr: [
        "Agent Gemini avec appel d'outils dans une boucle bornée",
        "Paiements PayPal réels en environnement sandbox (Orders v2)",
        "Autorisations plafonnées par achat, par jour et dans le temps",
        "Comparaison d'offres web et alertes de prix",
        "APK Android signé publié à chaque version",
      ],
      en: [
        "Gemini agent with tool calling in a bounded loop",
        "Real PayPal payments in the sandbox environment (Orders v2)",
        "Authorisations capped per purchase, per day and over time",
        "Web offer comparison and price alerts",
        "Signed Android APK published with each release",
      ],
    },
    stack: ["Flutter", "Dart", "Python", "FastAPI", "PostgreSQL", "Gemini", "PayPal API", "Cloud Run", "Docker"],
    status: {
      fr: "Fonctionnel en sandbox — application Android téléchargeable",
      en: "Working in sandbox — Android app available for download",
    },
    source: { fr: "README, architecture et releases du dépôt public", en: "Public repository README, architecture and releases" },
    links: {
      repo: "https://github.com/dav9fulldev/sika-agent",
      release: "https://github.com/dav9fulldev/sika-agent/releases/latest",
    },
  },
  {
    slug: "storygriot-ai",
    name: "StoryGriot AI",
    category: { fr: "IA · Culture · Hackathon", en: "AI · Culture · Hackathon" },
    year: "2025",
    cover: { kind: "type", glyph: "griot" },
    tagline: {
      fr: "L'IA au service des histoires et des cultures africaines — 2ᵉ prix AbiHack avec Google.",
      en: "AI in service of African stories and cultures — 2nd prize, AbiHack with Google.",
    },
    problem: {
      fr: "La transmission des récits et des cultures africaines, portée historiquement par les griots, trouve encore peu de place dans les outils numériques.",
      en: "Passing on African stories and cultures, historically carried by griots, still has little room in digital tools.",
    },
    solution: {
      fr: "Un projet d'intelligence artificielle conçu en équipe pour valoriser ces histoires, récompensé par le deuxième prix d'AbiHack avec Google.",
      en: "A team-built artificial intelligence project to showcase these stories, awarded second prize at AbiHack with Google.",
    },
    role: { fr: "Membre de l'équipe projet.", en: "Member of the project team." },
    features: {
      fr: ["Projet réalisé en équipe en contexte de hackathon", "Deuxième prix — AbiHack avec Google"],
      en: ["Team project built during a hackathon", "Second prize — AbiHack with Google"],
    },
    stack: [],
    status: { fr: "Projet de hackathon — code non public", en: "Hackathon project — code not public" },
    source: {
      fr: "Présentation de l'auteur (aucun dépôt public)",
      en: "Author's description (no public repository)",
    },
    links: {},
  },
  {
    slug: "alerto",
    name: "ALERTO",
    category: { fr: "Civic tech · PWA · IA", en: "Civic tech · PWA · AI" },
    year: "2026",
    cover: { kind: "logo", src: "/projects/alerto-logo.png" },
    tagline: {
      fr: "Signaler les dégâts en temps de crise, même sans connexion, pendant les 48 premières heures.",
      en: "Report damage during a crisis, even offline, within the critical first 48 hours.",
    },
    problem: {
      fr: "Après une catastrophe, les autorités manquent d'informations géolocalisées et fiables sur les infrastructures touchées, souvent dans des zones sans réseau.",
      en: "After a disaster, authorities lack reliable, geolocated information about damaged infrastructure, often in areas without network coverage.",
    },
    solution: {
      fr: "Une Progressive Web App open source de signalement, fonctionnant hors ligne, avec cartographie en temps réel et classification des dégâts assistée par IA.",
      en: "An open-source reporting Progressive Web App that works offline, with real-time mapping and AI-assisted damage classification.",
    },
    role: {
      fr: "Projet publié sur mon GitHub : frontend React PWA et API FastAPI.",
      en: "Project published on my GitHub: React PWA frontend and FastAPI API.",
    },
    features: {
      fr: [
        "Mode hors ligne (IndexedDB) avec synchronisation automatique",
        "Carte interactive, heatmaps et filtre par pays",
        "Classification des dégâts et détection de doublons par IA",
        "Interface en six langues et tableau de bord des autorités",
      ],
      en: [
        "Offline mode (IndexedDB) with automatic sync",
        "Interactive map, heatmaps and country filter",
        "AI damage classification and duplicate detection",
        "Six-language interface and authority dashboard",
      ],
    },
    stack: ["React", "PWA", "Python", "FastAPI", "MongoDB", "Docker"],
    status: { fr: "Projet open source", en: "Open-source project" },
    source: { fr: "README et code du dépôt public", en: "Public repository README and code" },
    links: { repo: "https://github.com/dav9fulldev/Alerto" },
  },
  {
    slug: "sankofart-residence",
    name: "Sankofart Résidence",
    category: { fr: "Hôtellerie · Web full-stack", en: "Hospitality · Full-stack web" },
    year: "2026",
    highlight: { fr: "Hôtellerie", en: "Hospitality" },
    cover: { kind: "image", src: "/projects/residence.jpg" },
    tagline: {
      fr: "Réservation en ligne de résidences meublées en Côte d'Ivoire, de la vitrine à l'administration.",
      en: "Online booking for furnished residences in Côte d'Ivoire, from storefront to back office.",
    },
    problem: {
      fr: "Un établissement de résidences meublées a besoin de présenter ses logements, recevoir des réservations et suivre leur statut sans passer par des échanges manuels.",
      en: "A furnished-residence business needs to showcase its units, take bookings and track their status without manual back-and-forth.",
    },
    solution: {
      fr: "Un monorepo React + Node.js : catalogue filtrable, réservation avec validation, panneau d'administration et e-mails automatiques au client et à l'administrateur.",
      en: "A React + Node.js monorepo: filterable catalogue, validated booking, admin panel and automatic emails to the guest and the admin.",
    },
    role: {
      fr: "Développement full-stack : frontend React et API Express.",
      en: "Full-stack development: React frontend and Express API.",
    },
    features: {
      fr: [
        "Réservation en ligne avec validation des formulaires",
        "Statuts dynamiques : disponible, occupé, réservé, maintenance",
        "Notifications e-mail via Nodemailer",
        "Limitation de débit, CORS et analyse CodeQL en CI",
      ],
      en: [
        "Online booking with form validation",
        "Dynamic statuses: available, occupied, booked, maintenance",
        "Email notifications via Nodemailer",
        "Rate limiting, CORS and CodeQL analysis in CI",
      ],
    },
    stack: ["React", "Node.js", "Express", "Nodemailer", "GitHub Actions"],
    status: { fr: "En ligne", en: "Live" },
    source: { fr: "README, code et démo publique", en: "Public README, code and live demo" },
    links: { repo: "https://github.com/dav9fulldev/ResidenceMeubl-", demo: "https://residencemeublee.vercel.app" },
  },
];

export type MinorProject = { name: string; desc: L; stack: string[]; repo?: string; note?: L };

export const otherProjects: MinorProject[] = [
  {
    name: "Fraudecta",
    desc: {
      fr: "Détection de documents falsifiés par IA — j'ai développé toute l'interface Vue.js en binôme.",
      en: "AI-based forged-document detection — I built the entire Vue.js interface as part of a pair.",
    },
    stack: ["Vue.js 3", "Vue Router", "Axios"],
    repo: "https://github.com/dav9fulldev/FrontendProjetFraudecta",
  },
  {
    name: "U-Report Cocody",
    desc: {
      fr: "Application web pour faciliter les interactions et les remontées d'informations citoyennes.",
      en: "Web app making citizen interactions and feedback easier.",
    },
    stack: [],
    note: { fr: "Code non public", en: "Code not public" },
  },
];
