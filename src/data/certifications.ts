import { asset } from "../lib/asset";
import type { Lang } from "../i18n/translations";

export type Certification = {
  title: string;
  issuer: string;
  /** Formateur ou organisateur, tel qu'il figure sur le certificat */
  by: string;
  date: Record<Lang, string>;
  /** Durée indiquée sur le certificat */
  hours?: number;
  file: string;
  /** Mise en avant (certificat d'excellence, programme sélectif…) */
  highlight?: boolean;
};

// Données recopiées des certificats PDF (public/certificates), du plus récent au plus ancien.
export const certifications: Certification[] = [
  {
    title: "Mastering Microservices Architecture and Design Patterns",
    issuer: "Udemy",
    by: "Rahul Rajat Singh",
    date: { fr: "Juillet 2026", en: "July 2026" },
    hours: 11,
    file: asset("/certificates/microservices-architecture.pdf"),
  },
  {
    title: "Flutter & Dart : maîtrisez les API REST",
    issuer: "Udemy",
    by: "Sidiki Sako",
    date: { fr: "Mai 2026", en: "May 2026" },
    hours: 4,
    file: asset("/certificates/flutter-dart-api-rest.pdf"),
  },
  {
    title: "Spring Boot : créez une API REST",
    issuer: "Udemy",
    by: "IBC Academy · Inès Blain",
    date: { fr: "Avril 2026", en: "April 2026" },
    hours: 2,
    file: asset("/certificates/spring-boot-api-rest.pdf"),
  },
  {
    title: "Git et GitLab : de débutant à professionnel",
    issuer: "Udemy",
    by: "Evan Boissonnot",
    date: { fr: "Mars 2026", en: "March 2026" },
    hours: 8.5,
    file: asset("/certificates/git-gitlab.pdf"),
  },
  {
    title: "Git : les bases indispensables",
    issuer: "Udemy",
    by: "Dirane Willy Tafen",
    date: { fr: "Février 2026", en: "February 2026" },
    hours: 3.5,
    file: asset("/certificates/git.pdf"),
  },
  {
    title: "Introduction to Cloud Computing",
    issuer: "Udemy",
    by: "Xavier Corbett",
    date: { fr: "Février 2026", en: "February 2026" },
    hours: 1,
    file: asset("/certificates/cloud-computing.pdf"),
  },
  {
    title: "Programmation orientée objet en Java",
    issuer: "Udemy",
    by: "Mohamed Hichem Zayani",
    date: { fr: "Février 2026", en: "February 2026" },
    hours: 5,
    file: asset("/certificates/java-oop.pdf"),
  },
  {
    title: "Certificat d'excellence — Bootcamp UniPod IA",
    issuer: "UniPod Guinée · PNUD · METI · timbuktoo",
    by: "Projet GèrTonArgent · Conakry, 1 mois",
    date: { fr: "Décembre 2025", en: "December 2025" },
    file: asset("/certificates/unipod-ai-bootcamp.pdf"),
    highlight: true,
  },
  {
    title: "Certificat de réussite — Académie des Jeunes Développeurs Full Stack",
    issuer: "GRowing Consulting · ProActive Swiss",
    by: "Développement web full stack & soft skills · Abidjan",
    date: { fr: "Juin 2025", en: "June 2025" },
    file: asset("/certificates/proactive-academie-full-stack.jpg"),
    highlight: true,
  },
];
