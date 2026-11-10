/**
 * Informations personnelles — modifiez ce fichier pour mettre à jour le site.
 * Un champ laissé vide ("") masque automatiquement le lien correspondant.
 */
export const site = {
  name: "Brou David Yao",
  shortName: "BDY",
  url: "https://dav9fulldev.github.io/",
  location: "Abidjan, Côte d'Ivoire",
  email: "broudavid505@gmail.com",
  github: "https://github.com/dav9fulldev",
  gitlab: "https://gitlab.com/engineerDavid",
  /** À compléter : URL complète de votre profil LinkedIn. */
  linkedin: "",
  /** Fichier dans /public. Laisser "" pour masquer le bouton CV. */
  cv: "/cv/Brou-David-Yao-CV.pdf",
  /** Fichier dans /public. Laisser "" pour afficher le monogramme à la place. */
  photo: "/images/brou-david-yao.jpg",
} as const;

export type Site = typeof site;
