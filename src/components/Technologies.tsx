import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  siAlpinedotjs,
  siAndroid,
  siAndroidstudio,
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
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Category = "backend" | "frontend" | "mobile" | "data" | "ai" | "cloud" | "tools";
type Tech = { icon: SimpleIcon & { transform?: string }; name?: string; category: Category };

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

const FILTERS: ("all" | Category)[] = ["all", "backend", "frontend", "mobile", "data", "ai", "cloud", "tools"];

export function Technologies() {
  const { t } = useI18n();
  const s = t.technologies;
  const [filter, setFilter] = useState<"all" | Category>("all");
  const shown = filter === "all" ? TECHS : TECHS.filter((x) => x.category === filter);

  return (
    <section id="technologies" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="04" label={s.label} title={s.title} intro={s.intro} />

        <Reveal className="mt-10 md:ml-[25%] md:pl-2">
          <div role="group" aria-label={s.filterLabel} className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`h-9 rounded-full border px-4 text-[0.85rem] transition-colors ${
                  filter === f
                    ? "border-paper bg-paper text-ink"
                    : "border-line-strong text-mute hover:border-gold hover:text-paper"
                }`}
              >
                {f === "all" ? s.all : s.categories[f]}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.ul layout className="mt-10 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map(({ icon, name, category }) => (
              <motion.li
                layout
                key={icon.slug}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-ink-2/60 p-3.5 transition-colors duration-300 hover:border-line-strong hover:bg-ink-2"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#111c30] transition-transform duration-300 group-hover:scale-105">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
                    <path d={icon.path} fill={iconColor(icon)} transform={icon.transform} />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[1rem] font-medium text-paper">{name ?? icon.title}</span>
                  <span className="block truncate text-[0.82rem] text-mute">{s.categories[category]}</span>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="mt-6 text-xs text-mute/80 md:ml-[25%] md:pl-2">{s.note}</p>
      </div>
    </section>
  );
}
