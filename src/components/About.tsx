import { useI18n } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Courte présentation, enchaînée directement avec le bloc Contact. */
export function About() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section id="about" className="border-t border-line pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="container-page">
        <SectionHeading index="05" label={a.label} title={a.title} />
        <div className="mt-10 md:ml-[25%] md:pl-2">
          <Reveal>
            <p className="max-w-2xl text-[1.12rem] leading-[1.75] text-paper/90">{a.p1}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-[1.75] text-mute">{a.p2}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
