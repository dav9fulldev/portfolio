import { BrainCircuit, ChevronDown, Globe, Smartphone } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const ICONS = [Globe, Smartphone, BrainCircuit];

/** Pour les clients freelance : ce que je réalise (avec un projet réel en exemple) et les questions fréquentes. */
export function Services() {
  const { t } = useI18n();
  const s = t.services;

  return (
    <section id="services" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="04" label={s.label} title={s.title} intro={s.intro} />

        <ul className="mt-14 grid gap-3 md:grid-cols-3">
          {s.items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <li key={it.t}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="card-shadow flex h-full flex-col rounded-[1.4rem] border border-line bg-ink-2 p-7">
                    <Icon size={22} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
                    <h3 className="display mt-6 text-[1.9rem] leading-tight text-paper">{it.t}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">{it.d}</p>
                    <p className="mt-auto pt-6 font-mono text-[0.72rem] tracking-wide text-gold-soft">
                      {s.example} · {it.ex}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* Questions fréquentes : réponses repliées pour garder la section courte */}
        <div className="mt-20 md:grid md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-3">
            <h3 className="eyebrow">{s.faqTitle}</h3>
          </Reveal>
          <div className="mt-6 divide-y divide-line border-y border-line md:col-span-9 md:mt-0">
            {s.faq.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.02rem] font-medium text-paper [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-mute transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="max-w-2xl pb-5 text-[0.96rem] leading-relaxed text-mute">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
