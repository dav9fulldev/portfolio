import { BotMessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { projects } from "../data/projects";
import { Reveal } from "./Reveal";

/**
 * Présentation éditoriale de RestoGestion (projet phare pour le Hackathon Restauration VATEL).
 * À droite : vraie capture de l'application (version de développement, lancée en local),
 * et RestoPilot présenté comme « À venir », conformément à la feuille de route du projet.
 */
export function RestoSpotlight({ onOpen }: { onOpen: () => void }) {
  const { t, lang } = useI18n();
  const s = t.spotlight;
  const p = projects.find((x) => x.slug === "restogestion");
  if (!p) return null;

  // Fonctionnalités déjà développées (✅), sans le marqueur : la fiche détaillée liste tout.
  const built = p.features[lang].filter((f) => f.startsWith("✅")).map((f) => f.replace(/^✅\s*/, "")).slice(0, 6);
  const cover = p.cover.kind === "image" ? p.cover.src : undefined;

  return (
    <article
      aria-labelledby="resto-title"
      className="relative mt-16 overflow-hidden rounded-[1.75rem] border border-gold/25 bg-gradient-to-br from-deep via-ink-2 to-ink"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
      <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-14">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow flex items-center gap-2 !text-gold-soft">
              <Sparkles size={13} aria-hidden="true" /> {s.eyebrow}
            </p>
            <h3 id="resto-title" className="display mt-5 text-[2.3rem] text-paper sm:text-5xl">
              {s.title}
            </h3>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-paper/80">{s.lead}</p>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="eyebrow mt-9 !text-[0.64rem]">{s.featuresTitle}</p>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {built.map((f) => (
                <li key={f} className="flex gap-3 text-[0.94rem] leading-snug text-paper/85">
                  <span aria-hidden="true" className="mt-[0.5rem] h-1 w-3 shrink-0 bg-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" onClick={onOpen} aria-haspopup="dialog" className="btn btn-primary">
                {s.cta}
              </button>
              <p className="max-w-xs text-xs leading-relaxed text-mute">{p.status[lang]}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-6 lg:self-center">
          {cover && (
            <figure>
              <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink shadow-2xl shadow-black/50">
                <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                  <span className="ml-3 truncate font-mono text-[0.62rem] text-mute">restogestion</span>
                </div>
                <img src={cover} alt={s.screenshotAlt} loading="lazy" decoding="async" className="block w-full" />
              </div>
              <figcaption className="mt-3 text-center font-mono text-[0.62rem] tracking-wide text-mute">{s.caption}</figcaption>
            </figure>
          )}

          <div className="mt-6 rounded-2xl border border-line-strong bg-ink/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-[0.95rem] font-medium text-paper">
                <BotMessageSquare size={18} className="text-[#9cc3ff]" aria-hidden="true" /> RestoPilot
              </p>
              <span className="chip border-electric/40 !text-[#9cc3ff]">{s.soon}</span>
            </div>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-paper/80">{s.pilot}</p>
            <p className="mt-4 flex items-start gap-2 border-t border-line pt-4 text-[0.88rem] leading-relaxed text-paper">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              {s.principle}
            </p>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
