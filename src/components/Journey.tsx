import { Award, ChevronDown, FileText, Maximize2 } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { certifications } from "../data/certifications";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

// Certificats mis en avant (programmes sélectifs) en cartes ; formations en ligne en liste repliable.
const MAIN = certifications.filter((c) => c.highlight);
const COURSES = certifications.filter((c) => !c.highlight);
const COURSE_HOURS = COURSES.reduce((sum, c) => sum + (c.hours ?? 0), 0);

export function Journey() {
  const { t, lang } = useI18n();
  const j = t.journey;
  const hours = (h: number) => String(h).replace(".", lang === "fr" ? "," : ".");

  return (
    <section id="journey" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="02" label={j.label} title={j.title} />

        <ol className="relative mt-16 md:ml-[25%] md:pl-2">
          <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-gold/70 via-line-strong to-transparent" />
          {j.items.map((it, i) => (
            <li key={it.t} className="relative pb-12 pl-10 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[0.45rem] h-[11px] w-[11px] rounded-full border ${
                  i === 0 ? "border-gold bg-gold shadow-[0_0_0_5px_color-mix(in_srgb,var(--gold)_18%,transparent)]" : "border-gold/70 bg-ink"
                }`}
              />
              <Reveal delay={i * 0.05}>
                <div className="grid gap-2 md:grid-cols-[11rem_1fr] md:gap-8">
                  <p className="font-mono text-[0.74rem] tracking-wide text-gold-soft">{it.date}</p>
                  <div className="flex gap-5">
                    <div className="min-w-0 flex-1">
                      <h3 className="display text-[1.85rem] leading-tight text-paper">{it.t}</h3>
                      <p className="mt-1 text-[0.92rem] text-paper/70">{it.org}</p>
                      <p className="mt-3 max-w-xl text-[0.96rem] leading-relaxed text-mute">{it.d}</p>
                    </div>
                    {/* Vignette : la photo entière s'ouvre dans un nouvel onglet */}
                    {it.photo && (
                      <a
                        href={it.photo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${j.photoOpen} : ${it.photoAlt}`}
                        className="group relative mt-1 block h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-line sm:h-28 sm:w-28"
                      >
                        <img
                          src={it.photo}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute bottom-1.5 right-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/55 text-white">
                          <Maximize2 size={12} aria-hidden="true" />
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Certifications : programmes en cartes, formations en ligne repliées */}
        <div className="mt-24 md:grid md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-3">
            <p className="eyebrow">{j.certLabel}</p>
            <h3 className="display mt-3 text-[1.9rem] leading-tight text-paper">{j.certTitle}</h3>
          </Reveal>

          <div className="mt-8 md:col-span-9 md:mt-0">
            <ul className="grid gap-3 sm:grid-cols-2">
              {MAIN.map((c, i) => (
                <li key={c.file}>
                  <Reveal delay={i * 0.05} className="h-full">
                    <a
                      href={c.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${c.title} — ${j.certView}`}
                      className="group flex h-full flex-col justify-between gap-4 rounded-2xl border border-gold/50 bg-gold/10 p-5 transition-colors duration-500 hover:border-gold"
                    >
                      <div>
                        <p className="flex items-center gap-2 font-mono text-[0.72rem] tracking-wide text-gold">
                          <Award size={13} aria-hidden="true" className="shrink-0" />
                          {c.date[lang]}
                        </p>
                        <p className="mt-2 text-[1.02rem] font-medium leading-snug text-paper">{c.title}</p>
                        <p className="mt-1 text-[0.85rem] text-mute">{c.issuer}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-paper/80 transition-colors group-hover:text-gold">
                        <FileText size={14} aria-hidden="true" />
                        {j.certView}
                      </span>
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={0.1}>
              <details className="group mt-3 rounded-2xl border border-line bg-ink-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="block text-[1rem] font-medium text-paper">
                      {COURSES.length} {j.certMore} · Udemy
                    </span>
                    <span className="mt-1 block text-[0.85rem] text-mute">
                      {hours(COURSE_HOURS)} {j.certHours} · Spring Boot, Microservices, Flutter, Java, Git, Cloud
                    </span>
                  </span>
                  <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-mute transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <ul className="divide-y divide-line border-t border-line">
                  {COURSES.map((c) => (
                    <li key={c.file}>
                      <a
                        href={c.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${c.title} — ${j.certView}`}
                        className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-deep"
                      >
                        <span className="min-w-0">
                          <span className="block text-[0.92rem] text-paper">{c.title}</span>
                          <span className="block font-mono text-[0.72rem] tracking-wide text-mute">
                            {c.date[lang]}
                            {c.hours ? ` · ${hours(c.hours)} h` : ""}
                          </span>
                        </span>
                        <FileText size={15} aria-hidden="true" className="shrink-0 text-mute" />
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
