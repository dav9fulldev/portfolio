import { useI18n } from "../i18n/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Journey() {
  const { t } = useI18n();
  const j = t.journey;

  return (
    <section id="journey" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="04" label={j.label} title={j.title} />

        <ol className="relative mt-16 md:ml-[25%] md:pl-2">
          <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-gold/70 via-line-strong to-transparent" />
          {j.items.map((it, i) => (
            <li key={it.t} className="relative pb-12 pl-10 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[0.45rem] h-[11px] w-[11px] rounded-full border ${
                  i === 0 ? "border-gold bg-gold shadow-[0_0_0_5px_rgb(198_166_107/0.15)]" : "border-gold/70 bg-ink"
                }`}
              />
              <Reveal delay={i * 0.05}>
                <div className="grid gap-2 md:grid-cols-[11rem_1fr] md:gap-8">
                  <p className="font-mono text-[0.74rem] tracking-wide text-gold-soft">{it.date}</p>
                  <div>
                    <h3 className="display text-[1.85rem] leading-tight text-paper">{it.t}</h3>
                    <p className="mt-1 text-[0.92rem] text-paper/70">{it.org}</p>
                    <p className="mt-3 max-w-xl text-[0.96rem] leading-relaxed text-mute">{it.d}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
