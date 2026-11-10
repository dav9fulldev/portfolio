import { asset } from "../lib/asset";
import type { Lang } from "../i18n/translations";

type L<T = string> = Record<Lang, T>;

export type Cover =
  | { kind: "image"; src: string; position?: string }
  | { kind: "logo"; src: string }
  | { kind: "phone"; src: string }
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
  /** Visuels supplémentaires affichés dans la fiche détaillée */
  gallery?: string[];
  tagline: L;
  problem: L;
  solution: L;
  role: L;
  features: L<string[]>;
  stack: string[];
  status: L;
  /** D'où viennent les informations affichées — transparence vis-à-vis du jury */
  source: L;
  links: { repo?: string; demo?: string; release?: string; devpost?: string };
};

export const projects: Project[] = [
  {
    slug: "gertonargent",
    name: "GèrTonArgent",
    category: { fr: "Fintech · Mobile · IA", en: "Fintech · Mobile · AI" },
    year: "2026",
    featured: true,
    cover: { kind: "logo", src: asset("/projects/gertonargent-logo.png") },
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
    category: { fr: "SaaS · Restauration · IA", en: "SaaS · Food service · AI" },
    year: "2026",
    featured: true,
    highlight: { fr: "Restauration", en: "Food service" },
    cover: { kind: "type", glyph: "resto" },
    tagline: {
      fr: "Le SaaS qui aide restaurants, maquis et fast-foods à mieux gérer, mieux écouter leurs clients et les faire revenir.",
      en: "The SaaS that helps restaurants, maquis and fast-food outlets run better, listen to their customers and bring them back.",
    },
    problem: {
      fr: "Dans beaucoup d'établissements, la gestion repose sur des outils manuels et dispersés, les avis clients ne sont pas collectés, et la fidélisation dépend de la seule mémoire du gérant.",
      en: "In many outlets, management relies on manual, scattered tools, customer feedback is never collected, and loyalty depends solely on the manager's memory.",
    },
    solution: {
      fr: "Une plateforme SaaS qui relie le client à l'établissement par QR code (avis, fidélité, récompenses) et donne au gérant des outils de gestion et un copilote intelligent. Principe clé : toute action proposée par le copilote doit être validée par le gérant avant d'être exécutée.",
      en: "A SaaS platform that connects customers to the outlet through QR codes (feedback, loyalty, rewards) and gives the manager management tools and a smart copilot. Key principle: every action the copilot proposes must be approved by the manager before it runs.",
    },
    role: {
      fr: "Porteur du projet : identification du besoin, conception produit et développement.",
      en: "Project lead: problem discovery, product design and development.",
    },
    features: {
      fr: [
        "Interaction client par QR code, sans application à installer",
        "Collecte simplifiée des avis clients",
        "Programme de fidélité et gestion des récompenses",
        "Outils de gestion pour le restaurateur",
        "Copilote intelligent : propose, le gérant valide, puis l'action s'exécute",
      ],
      en: [
        "Customer interaction via QR code, no app to install",
        "Simplified customer feedback collection",
        "Loyalty programme and rewards management",
        "Management tools for the restaurant owner",
        "Smart copilot: it proposes, the manager approves, then the action runs",
      ],
    },
    stack: [],
    status: {
      fr: "En cours de développement — code non public. Les fonctionnalités ci-dessus décrivent le concept du produit.",
      en: "In development — code not public. The features above describe the product concept.",
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
    cover: { kind: "phone", src: asset("/projects/sika-app.jpg") },
    gallery: [asset("/projects/sika-architecture.jpg")],
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
      devpost: "https://devpost.com/software/sika-fzlh9s",
      release: "https://github.com/dav9fulldev/sika-agent/releases/latest",
    },
  },
  {
    slug: "storygriot-ai",
    name: "StoryGriot AI",
    category: { fr: "IA · Patrimoine culturel · Hackathon", en: "AI · Cultural heritage · Hackathon" },
    year: "2025",
    cover: { kind: "image", src: asset("/projects/storygriot.jpg") },
    tagline: {
      fr: "Préserver les traditions orales grâce à l'IA — 2ᵉ prix AbiHack, AI Hackathon powered by Google.",
      en: "Preserving oral traditions with AI — 2nd place at AbiHack, AI Hackathon powered by Google.",
    },
    problem: {
      fr: "Contes, récits et savoirs transmis oralement disparaissent avec les anciennes générations, faute d'être enregistrés et rendus accessibles.",
      en: "Folktales, narratives and knowledge passed on orally disappear with older generations because they are never recorded or made accessible.",
    },
    solution: {
      fr: "Inspirée de la tradition des griots d'Afrique de l'Ouest, une plateforme qui transforme l'enregistrement audio d'une histoire en expérience multimédia : transcription, traduction, illustrations et lecture synchronisée.",
      en: "Inspired by the West African griot tradition, a platform that turns the audio recording of a story into a multimedia experience: transcription, translation, illustrations and synchronised playback.",
    },
    role: {
      fr: "Membre d'une équipe de trois développeurs (avec Gosse Yannick Gbaka et Georges Kennel Kassi).",
      en: "Member of a three-developer team (with Gosse Yannick Gbaka and Georges Kennel Kassi).",
    },
    features: {
      fr: [
        "Transcription horodatée via Google Cloud Speech-to-Text",
        "Enrichissement du contexte culturel avec Gemini",
        "Traduction en swahili, anglais, français, espagnol et arabe",
        "Illustrations générées par paragraphe et lecture audio synchronisée",
        "Pipeline de traitement en 7 étapes, de l'envoi à la publication",
      ],
      en: [
        "Timestamped transcription with Google Cloud Speech-to-Text",
        "Cultural context enrichment with Gemini",
        "Translation into Swahili, English, French, Spanish and Arabic",
        "Per-paragraph generated illustrations and synchronised audio playback",
        "7-step processing pipeline, from upload to publication",
      ],
    },
    stack: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Gemini", "Speech-to-Text"],
    status: { fr: "Prototype primé — 2ᵉ place", en: "Award-winning prototype — 2nd place" },
    source: {
      fr: "Page DevPost du projet (dépôts hébergés par les coéquipiers)",
      en: "Project DevPost page (repositories hosted by teammates)",
    },
    links: {
      devpost: "https://devpost.com/software/storygriot-ai",
      repo: "https://github.com/YannickGbaka/ai-griot-frontend",
    },
  },
  {
    slug: "alerto",
    name: "ALERTO",
    category: { fr: "Civic tech · PWA · IA", en: "Civic tech · PWA · AI" },
    year: "2026",
    cover: { kind: "logo", src: asset("/projects/alerto-logo.png") },
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
    cover: { kind: "image", src: asset("/projects/residence.jpg") },
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
