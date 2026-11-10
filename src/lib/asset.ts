/** Préfixe un fichier de /public avec la base de déploiement (ex. "/portfolio/"). */
export function asset(path: string): string {
  if (!path || /^https?:\/\//.test(path)) return path;
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}
