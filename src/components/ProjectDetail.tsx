import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Download, Info, Lock, X } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import type { Project } from "../data/projects";
import { ProjectCover } from "./ProjectCover";
import { DevpostIcon, GithubIcon } from "./Icons";

export function ProjectDetail({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const { t, lang } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Piège à focus minimal
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const blocks = [
    { k: t.projects.problem, v: p.problem[lang] },
    { k: t.projects.solution, v: p.solution[lang] },
    { k: t.projects.role, v: p.role[lang] },
  ];

  return (
    <div className="fixed inset-0 z-[60]" role="presentation">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col overflow-y-auto overscroll-contain border-l border-line bg-ink"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink/85 px-5 py-3.5 backdrop-blur md:px-8">
          <p className="eyebrow !text-[0.64rem]">{p.category[lang]}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.projects.close}
            className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-paper transition-colors hover:border-gold hover:text-gold"
          >
            <X size={16} />
          </button>
        </div>

        <div className="group aspect-[16/9] w-full shrink-0">
          <ProjectCover cover={p.cover} name={p.name} large />
        </div>

        <div className="px-5 pb-14 pt-8 md:px-8">
          <h2 id="project-title" className="display text-5xl text-paper md:text-6xl">
            {p.name}
          </h2>
          <p className="mt-4 text-[1.08rem] leading-relaxed text-paper/85">{p.tagline[lang]}</p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {p.links.site && (
              <a href={p.links.site} target="_blank" rel="noopener noreferrer" className="btn btn-primary !h-11">
                {t.projects.site} <ArrowUpRight size={15} className="arrow" />
              </a>
            )}
            {p.links.demo && (
              <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary !h-11">
                {t.projects.demo} <ArrowUpRight size={15} className="arrow" />
              </a>
            )}
            {p.links.release && (
              <a href={p.links.release} target="_blank" rel="noopener noreferrer" className="btn btn-primary !h-11">
                <Download size={15} /> {t.projects.release}
              </a>
            )}
            {p.links.repo && (
              <a href={p.links.repo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !h-11">
                <GithubIcon size={15} /> {t.projects.repo}
              </a>
            )}
            {p.links.devpost && (
              <a href={p.links.devpost} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !h-11">
                <DevpostIcon size={15} /> DevPost
              </a>
            )}
            {p.links.origin && (
              <a href={p.links.origin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !h-11">
                <GithubIcon size={15} /> {t.projects.origin}
              </a>
            )}
            {!p.links.repo && !p.links.devpost && (
              <span className="inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-line-strong px-4 text-sm text-mute">
                <Lock size={14} /> {t.projects.privateRepo}
              </span>
            )}
          </div>

          <dl className="mt-10 divide-y divide-line border-y border-line">
            {blocks.map((b) => (
              <div key={b.k} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="eyebrow !text-[0.64rem] pt-1">{b.k}</dt>
                <dd className="text-[0.98rem] leading-relaxed text-paper/85">{b.v}</dd>
              </div>
            ))}
            <div className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="eyebrow !text-[0.64rem] pt-1">{t.projects.features}</dt>
              <dd>
                <ul className="space-y-2.5">
                  {p.features[lang].map((f) => (
                    <li key={f} className="flex gap-3 text-[0.98rem] leading-relaxed text-paper/85">
                      <span aria-hidden="true" className="mt-[0.6rem] h-1 w-3 shrink-0 bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            {p.stack.length > 0 && (
              <div className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="eyebrow !text-[0.64rem] pt-1">{t.projects.stack}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            <div className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="eyebrow !text-[0.64rem] pt-1">{t.projects.status}</dt>
              <dd className="text-[0.98rem] text-paper/85">{p.status[lang]}</dd>
            </div>
          </dl>

          {p.gallery?.map((src) => (
            <img
              key={src}
              src={src}
              alt={`${p.name} — ${t.projects.visual}`}
              loading="lazy"
              className="mt-8 w-full rounded-2xl border border-line"
            />
          ))}

          <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-mute">
            <Info size={13} className="mt-0.5 shrink-0" />
            {t.projects.source}
            {lang === "fr" ? " : " : ": "}
            {p.source[lang]}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
