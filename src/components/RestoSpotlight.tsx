import { Check, MessageSquareText, QrCode, ShieldCheck, Sparkles, Star, X } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { projects } from "../data/projects";
import { Reveal } from "./Reveal";

/**
 * Présentation éditoriale de RestoGestion (projet phare pour le Hackathon Restauration VATEL).
 * La partie droite est une ILLUSTRATION codée du concept, explicitement signalée comme telle :
 * le dépôt étant privé, aucune capture d'écran n'est présentée comme réelle.
 */
export function RestoSpotlight({ onOpen }: { onOpen: () => void }) {
  const { t, lang } = useI18n();
  const s = t.spotlight;
  const p = projects.find((x) => x.slug === "restogestion");
  if (!p) return null;

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
              {p.features[lang].map((f) => (
                <li key={f} className="flex gap-3 text-[0.94rem] leading-snug text-paper/85">
                  <span aria-hidden="true" className="mt-[0.5rem] h-1 w-3 shrink-0 bg-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 flex gap-4 rounded-2xl border border-line-strong bg-ink/60 p-5">
              <ShieldCheck size={22} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="eyebrow !text-[0.62rem]">{s.principleTitle}</p>
                <p className="mt-1.5 text-[0.98rem] leading-relaxed text-paper">{s.principle}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" onClick={onOpen} aria-haspopup="dialog" className="btn btn-primary">
                {s.cta}
              </button>
              <p className="text-xs text-mute">{p.status[lang]}</p>
            </div>
          </Reveal>
        </div>

        {/* Illustration du concept */}
        <Reveal delay={0.12} className="lg:col-span-6 lg:self-center">
          <figure className="relative mx-auto max-w-md lg:max-w-none">
            <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]" aria-hidden="true">
              {/* Côté client */}
              <div className="rounded-[1.6rem] border border-line-strong bg-ink p-4 shadow-2xl shadow-black/40">
                <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line-strong" />
                <div className="grid place-items-center rounded-xl bg-paper p-4 text-ink">
                  <QrCode size={64} strokeWidth={1.3} />
                </div>
                <p className="mt-3 text-center text-[0.7rem] text-mute">{s.mock.scan}</p>
                <div className="mt-4 rounded-xl border border-line p-3">
                  <p className="text-[0.75rem] text-paper">{s.mock.rate}</p>
                  <div className="mt-2 flex gap-1 text-gold">
                    {[0, 1, 2, 3].map((i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                    <Star size={14} />
                  </div>
                </div>
                <div className="mt-3 rounded-xl bg-deep p-3">
                  <div className="flex items-baseline justify-between">
                    <span className="display text-3xl text-paper">80</span>
                    <span className="text-[0.62rem] text-mute">{s.mock.points}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                    <div className="h-full w-4/5 rounded-full bg-gold" />
                  </div>
                  <p className="mt-2 text-[0.64rem] text-mute">{s.mock.reward}</p>
                </div>
              </div>

              {/* Côté gérant : copilote avec validation obligatoire */}
              <div className="flex flex-col gap-4 sm:pt-10">
                <div className="rounded-[1.4rem] border border-line-strong bg-ink p-4 shadow-2xl shadow-black/40">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-electric/15 text-[#9cc3ff]">
                      <MessageSquareText size={14} />
                    </span>
                    <span className="text-[0.78rem] font-medium text-paper">{s.mock.copilot}</span>
                  </div>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-paper/85">{s.mock.suggestion}</p>
                  <div className="mt-4 flex gap-2">
                    <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-gold px-3 text-[0.72rem] font-medium text-ink">
                      <Check size={13} /> {s.mock.approve}
                    </span>
                    <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line-strong px-3 text-[0.72rem] text-paper">
                      <X size={13} /> {s.mock.reject}
                    </span>
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-[0.64rem] text-mute">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" /> {s.mock.pending}
                  </p>
                </div>
              </div>
            </div>
            <figcaption className="mt-5 text-center font-mono text-[0.64rem] tracking-wide text-mute">{s.illustration}</figcaption>
          </figure>
        </Reveal>
      </div>
    </article>
  );
}
