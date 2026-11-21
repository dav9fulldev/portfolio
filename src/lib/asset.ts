/** Préfixe un fichier de /public avec la base de déploiement (ex. "/portfolio/"). */
export function asset(path: string): string {
  if (!path || /^https?:\/\//.test(path)) return path;
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}

/**
 * Pour les captures de sites en ligne, refaites à chaque publication sous le même nom de fichier :
 * l'identifiant du build dans l'adresse oblige les navigateurs à recharger la nouvelle image.
 */
export function liveAsset(path: string): string {
  return `${asset(path)}?v=${import.meta.env.VITE_BUILD_ID ?? "dev"}`;
}
