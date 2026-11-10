import { asset } from "../lib/asset";

/**
 * Informations personnelles — modifiez ce fichier pour mettre à jour le site.
 * Un champ laissé vide ("") masque automatiquement le lien correspondant.
 */
export const site = {
  name: "Brou David Yao",
  shortName: "BDY",
  url: "https://dav9fulldev.github.io/portfolio/",
  location: "Abidjan, Côte d'Ivoire",
  email: "broudavid505@gmail.com",
  github: "https://github.com/dav9fulldev",
  gitlab: "https://gitlab.com/engineerDavid",
  linkedin: "https://www.linkedin.com/in/brou-david-yao/",
  devpost: "https://devpost.com/dav9fulldev",
  /** Fichier dans /public. Laisser "" pour masquer le bouton CV. */
  cv: asset("/cv/Brou-David-Yao-CV.pdf"),
  /** Fichier dans /public. Laisser "" pour afficher le monogramme à la place. */
  photo: asset("/images/Photo.png"),
} as const;

export type Site = typeof site;
