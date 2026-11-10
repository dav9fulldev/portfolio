import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { ArrowUpRight, Globe, Lock, Plus } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { otherProjects, projects, type Project } from "../data/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ProjectCover } from "./ProjectCover";
import { ProjectDetail } from "./ProjectDetail";
import { DevpostIcon, GithubIcon } from "./Icons";
import { RestoSpotlight } from "./RestoSpotlight";

// Composition éditoriale : alternance de largeurs sur une grille de 12 colonnes.
// RestoGestion dispose de sa propre présentation éditoriale (RestoSpotlight), au-dessus de la grille.
const SPANS = ["lg:col-span-6", "lg:col-span-6", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
const ORDER = ["paymechap", "sika-pay", "storygriot-ai", "sankofart-residence", "alerto"];
const HASH_PREFIX = "#projects/";

export function Projects() {
  const { t, lang } = useI18n();
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const ordered = ORDER.map((s) => projects.find((p) => p.slug === s)).filter((p): p is Project => !!p);
  const current = projects.find((p) => p.slug === openSlug) ?? null;

  // Lien profond : /#projects/<slug> ouvre directement la fiche projet.
  useEffect(() => {
    const read = () => {
      const h = window.location.hash;
      setOpenSlug(h.startsWith(HASH_PREFIX) ? h.slice(HASH_PREFIX.length) : null);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const open = useCallback((slug: string) => {
    history.replaceState(null, "", `${HASH_PREFIX}${slug}`);
    setOpenSlug(slug);
  }, []);
  const close = useCallback(() => {
    history.replaceState(null, "", "#projects");
    setOpenSlug(null);
  }, []);

  return (
    <section id="projects" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="02" label={t.projects.label} title={t.projects.title} intro={t.projects.intro} />

        <RestoSpotlight onOpen={() => open("restogestion")} />

        <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {ordered.map((p, i) => {
            const large = i < 2;
            return (
              <li key={p.slug} className={`${SPANS[i]} ${i === ORDER.length - 1 ? "md:col-span-2" : ""}`}>
                <Reveal delay={(i % 2) * 0.08} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-line bg-ink-2 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-line-strong">
                    <div className={`relative ${large ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
                      <ProjectCover cover={p.cover} name={p.name} large={large} />
                      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        {p.featured && (
                          <span className="chip border-gold/50 bg-ink/70 !text-gold-soft backdrop-blur">{t.projects.featured}</span>
                        )}
                        {p.highlight && (
                          <span className="chip border-electric/40 bg-ink/70 !text-[#9cc3ff] backdrop-blur">
                            {p.highlight[lang]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <p className="eyebrow !text-[0.64rem]">
                        {p.category[lang]}
                        {p.year !== "—" && <span className="text-mute/60"> · {p.year}</span>}
                      </p>
                      <h3 className={`display mt-3 text-paper ${large ? "text-[2.4rem] md:text-5xl" : "text-[2.1rem]"}`}>
                        {p.name}
                      </h3>
                      <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-mute">{p.tagline[lang]}</p>

                      {p.stack.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t.projects.stack}>
                          {p.stack.slice(0, large ? 6 : 4).map((s) => (
                            <li key={s} className="chip">
                              {s}
                            </li>
                          ))}
                          {p.stack.length > (large ? 6 : 4) && (
                            <li className="chip text-mute">+{p.stack.length - (large ? 6 : 4)}</li>
                          )}
                        </ul>
                      )}

                      <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                        {/* Bouton étiré : toute la carte ouvre la fiche */}
                        <button
                          type="button"
                          onClick={() => open(p.slug)}
                          className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-paper after:absolute after:inset-0 after:content-['']"
                          aria-haspopup="dialog"
                        >
                          <span className="grid h-8 w-8 place-items-center rounded-full border border-line-strong transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                            <Plus size={15} />
                          </span>
                          {t.projects.details}
                          <span className="sr-only">: {p.name}</span>
                        </button>

                        {p.links.repo ? (
                          <a
                            href={p.links.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-10 inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-paper"
                          >
                            <GithubIcon size={15} />
                            {t.projects.repo}
                          </a>
                        ) : p.links.site ? (
                          <a
                            href={p.links.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-10 inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-paper"
                          >
                            <Globe size={15} />
                            {t.projects.site}
                          </a>
                        ) : p.links.devpost ? (
                          <a
                            href={p.links.devpost}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-10 inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-paper"
                          >
                            <DevpostIcon size={15} />
                            DevPost
                          </a>
                        ) : (
                          <span className="relative inline-flex items-center gap-1.5 text-xs text-mute/80">
                            <Lock size={12} />
                            {t.projects.privateRepo}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-20 md:grid md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-3">
            <p className="eyebrow">{t.projects.others}</p>
          </Reveal>
          <ul className="mt-6 border-t border-line md:col-span-9 md:mt-0">
            {otherProjects.map((o) => {
              const inner = (
                <>
                  <div className="min-w-0">
                    <p className="display text-[1.7rem] text-paper">{o.name}</p>
                    <p className="mt-1 text-[0.94rem] text-mute">{o.desc[lang]}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {o.stack.map((s) => (
                      <span key={s} className="chip hidden md:inline-flex">
                        {s}
                      </span>
                    ))}
                    {o.repo ? (
                      <ArrowUpRight size={18} className="text-mute transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-mute/80">
                        <Lock size={12} /> {o.note?.[lang]}
                      </span>
                    )}
                  </div>
                </>
              );
              return (
                <li key={o.name} className="border-b border-line">
                  <Reveal>
                    {o.repo ? (
                      <a
                        href={o.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-6 py-6"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center justify-between gap-6 py-6">{inner}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <AnimatePresence>{current && <ProjectDetail key={current.slug} project={current} onClose={close} />}</AnimatePresence>
    </section>
  );
}
