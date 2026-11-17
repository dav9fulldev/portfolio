import {
  siAlpinedotjs,
  siAndroid,
  siAndroidstudio,
  siClaude,
  siDocker,
  siExpress,
  siFastapi,
  siFigma,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siGithubactions,
  siGitlab,
  siGooglecloud,
  siGooglegemini,
  siJavascript,
  siJira,
  siKeycloak,
  siKotlin,
  siKubernetes,
  siApachekafka,
  siLaravel,
  siMariadb,
  siMongodb,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siRender,
  siSpringboot,
  siSqlite,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";
import { useI18n } from "../i18n/LanguageContext";
import { siKrakend } from "../data/customIcons";

type Category = "backend" | "frontend" | "mobile" | "data" | "ai" | "cloud" | "tools";
type Tech = { icon: SimpleIcon & { transform?: string }; name?: string; category: Category };
// La catégorie reste renseignée pour un futur regroupement, même si les bandes ne l'affichent plus.

/** Technologies réellement utilisées dans les projets et le parcours (voir projets et CV). */
const TECHS: Tech[] = [
  { icon: siPython, category: "backend" },
  { icon: siFastapi, category: "backend" },
  { icon: siOpenjdk, name: "Java", category: "backend" },
  { icon: siSpringboot, category: "backend" },
  { icon: siNodedotjs, category: "backend" },
  { icon: siExpress, category: "backend" },
  { icon: siPhp, category: "backend" },
  { icon: siLaravel, category: "backend" },
  { icon: siJavascript, category: "frontend" },
  { icon: siTypescript, category: "frontend" },
  { icon: siReact, category: "frontend" },
  { icon: siVuedotjs, category: "frontend" },
  { icon: siTailwindcss, category: "frontend" },
  { icon: siAlpinedotjs, category: "frontend" },
  { icon: siVite, category: "frontend" },
  { icon: siFlutter, category: "mobile" },
  { icon: siKotlin, category: "mobile" },
  { icon: siAndroid, category: "mobile" },
  { icon: siPostgresql, category: "data" },
  { icon: siMysql, category: "data" },
  { icon: siMariadb, category: "data" },
  { icon: siMongodb, category: "data" },
  { icon: siSqlite, category: "data" },
  { icon: siGooglegemini, name: "Gemini", category: "ai" },
  { icon: siClaude, category: "ai" },
  { icon: siFirebase, category: "ai" },
  { icon: siDocker, category: "cloud" },
  { icon: siKubernetes, category: "cloud" },
  { icon: siApachekafka, name: "Kafka", category: "cloud" },
  { icon: siKrakend, category: "cloud" },
  { icon: siGooglecloud, category: "cloud" },
  { icon: siGithubactions, category: "cloud" },
  { icon: siVercel, category: "cloud" },
  { icon: siRender, category: "cloud" },
  { icon: siKeycloak, category: "cloud" },
  { icon: siGit, category: "tools" },
  { icon: siGithub, category: "tools" },
  { icon: siGitlab, category: "tools" },
  { icon: siPostman, category: "tools" },
  { icon: siFigma, category: "tools" },
  { icon: siJira, category: "tools" },
  { icon: siAndroidstudio, category: "tools" },
];

/** Logos peu lisibles sur la tuile sombre : forcés en clair même si leur couleur passe le seuil. */
const FORCE_LIGHT = new Set(["keycloak"]);

/** Les logos de marque trop sombres (GitHub, Express, Vercel, MariaDB…) passent en clair sur la tuile sombre. */
function iconColor(icon: SimpleIcon) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(icon.hex.slice(i, i + 2), 16) / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.2 || FORCE_LIGHT.has(icon.slug) ? "#f5f3ee" : `#${icon.hex}`;
}

const ROWS = [TECHS.slice(0, 21), TECHS.slice(21)];

/** Logo + nom d'une technologie, en pastille compacte. */
function Pill({ icon, name }: Tech) {
  return (
    <li className="mr-3 flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-ink-2 py-1.5 pl-1.5 pr-4">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#111c30]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path d={icon.path} fill={iconColor(icon)} transform={icon.transform} />
        </svg>
      </span>
      <span className="whitespace-nowrap text-[0.88rem] font-medium text-paper">{name ?? icon.title}</span>
    </li>
  );
}

/**
 * Deux bandes défilantes en sens opposés (pause au survol, figées si animations réduites).
 * La liste est dupliquée pour une boucle continue ; la copie est masquée aux lecteurs d'écran.
 */
export function TechMarquee() {
  const { t } = useI18n();
  const s = t.technologies;
  return (
    <div className="mt-14">
      <p className="eyebrow md:ml-[25%] md:pl-2">{s.title}</p>
      <ul className="sr-only">
        {TECHS.map((x) => (
          <li key={x.icon.slug}>{x.name ?? x.icon.title}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="mt-6 space-y-3">
        {ROWS.map((row, r) => (
          <div key={r} className="marquee">
            <ul className={`marquee-track ${r === 1 ? "reverse" : ""}`} style={{ ["--marquee-duration" as string]: `${row.length * 3}s` }}>
              {[...row, ...row].map((x, i) => (
                <Pill key={`${x.icon.slug}-${i}`} {...x} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-mute/80 md:ml-[25%] md:pl-2">{s.note}</p>
    </div>
  );
}
