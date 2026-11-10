import { useI18n } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section id="about" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="01" label={a.label} title={a.title} />

        <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6 md:col-start-4">
            <Reveal>
              <p className="text-[1.12rem] leading-[1.75] text-paper/90">{a.p1}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-6 text-[1.02rem] leading-[1.75] text-mute">{a.p2}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="md:col-span-3">
            <dl className="divide-y divide-line border-y border-line">
              {a.facts.map((f) => (
                <div key={f.k} className="py-4">
                  <dt className="eyebrow !text-[0.64rem]">{f.k}</dt>
                  <dd className="mt-1.5 text-[0.92rem] leading-snug text-paper">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-20 md:grid md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-3">
            <p className="eyebrow">{a.principlesTitle}</p>
          </Reveal>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 md:col-span-9 md:mt-0">
            {a.principles.map((p, i) => (
              <li key={p.t} className="group bg-ink p-6 transition-colors duration-500 hover:bg-ink-2 md:p-7">
                <Reveal delay={i * 0.06}>
                  <span className="font-mono text-xs text-gold">0{i + 1}</span>
                  <h3 className="display mt-6 text-[1.7rem] text-paper">{p.t}</h3>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-mute">{p.d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
