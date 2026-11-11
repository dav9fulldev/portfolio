import { BrainCircuit, Database, Monitor, Server, Smartphone } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CarouselNav, SLIDE, TRACK, useCarousel } from "./Carousel";

type Level = "mastered" | "practiced" | "discovered";
type Skill = { name: string; level: Level };
const m = (name: string): Skill => ({ name, level: "mastered" });
const p = (name: string): Skill => ({ name, level: "practiced" });

/**
 * Niveaux établis à partir des dépôts publics, de DevPost et du parcours :
 * mastered = utilisé sur plusieurs projets ; practiced = au moins un projet vérifiable ;
 * discovered = notions acquises sans projet à montrer (niveau disponible, inutilisé pour l'instant).
 */
const AREAS: { Icon: typeof Server; skills: Skill[]; span: string }[] = [
  { Icon: Server, span: "lg:col-span-2", skills: [m("Python"), m("FastAPI"), m("Node.js"), m("Express.js"), m("API REST"), m("Java"), m("Spring Boot")] },
  { Icon: Smartphone, span: "lg:col-span-2", skills: [m("Flutter"), m("Dart"), p("Riverpod"), p("Kotlin · Android")] },
  { Icon: Monitor, span: "lg:col-span-2", skills: [m("JavaScript"), m("React"), p("TypeScript"), p("Vue.js"), p("Tailwind CSS")] },
  { Icon: BrainCircuit, span: "lg:col-span-3", skills: [m("Gemini API"), p("Agents & function calling"), p("Speech-to-Text"), p("PayPal API"), p("Mobile Money")] },
  { Icon: Database, span: "lg:col-span-3", skills: [m("Git"), m("GitHub"), p("PostgreSQL"), p("MySQL / MariaDB"), p("MongoDB"), p("Docker"), p("Postman"), p("GitLab"), p("GitHub Actions"), p("Google Cloud Run")] },
];

const DOT: Record<Level, string> = {
  mastered: "bg-gold",
  practiced: "border border-paper/60",
  discovered: "border border-dashed border-mute",
};
const CHIP: Record<Level, string> = {
  mastered: "border-gold/45 !text-paper",
  practiced: "",
  discovered: "border-dashed !text-mute",
};

export function Expertise() {
  const { t } = useI18n();
  const e = t.expertise;
  const carousel = useCarousel<HTMLUListElement>();

  return (
    <section id="expertise" className="border-t border-line bg-deep/40 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="03" label={e.label} title={e.title} intro={e.intro} />

        <Reveal className="mt-10 flex flex-wrap gap-5 text-sm text-mute md:ml-[25%] md:pl-2">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" /> {e.mastered}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full border border-paper/60" aria-hidden="true" /> {e.practiced}
          </span>
        </Reveal>

        <ul
          ref={carousel.ref}
          onScroll={carousel.onScroll}
          aria-roledescription={e.carousel}
          className={`${TRACK} mt-10 md:grid md:grid-cols-2 md:gap-px md:overflow-hidden md:rounded-[1.4rem] md:border md:border-line md:bg-line lg:grid-cols-6`}
        >
          {AREAS.map(({ Icon, skills, span }, i) => (
            <li
              key={i}
              aria-roledescription={e.slide}
              aria-label={`${i + 1} / ${AREAS.length} : ${e.areas[i].t}`}
              className={`${SLIDE} ${span} ${i === AREAS.length - 1 ? "md:col-span-2" : ""} card-shadow group relative rounded-[1.4rem] border border-line bg-ink-2 p-7 transition-colors duration-500 hover:bg-ink-2 md:rounded-none md:border-0 md:p-9`}
            >
              <Reveal delay={(i % 2) * 0.06}>
                <div className="flex items-center justify-between">
                  <Icon size={22} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
                  <span className="font-mono text-xs text-mute">0{i + 1}</span>
                </div>
                <h3 className="display mt-8 text-[2rem] leading-tight text-paper">{e.areas[i].t}</h3>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-mute">{e.areas[i].d}</p>
                <ul className="mt-7 flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <li
                      key={s.name}
                      className={`chip ${CHIP[s.level]}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${DOT[s.level]}`}
                      />
                      {s.name}
                      <span className="sr-only"> ({e[s.level]})</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>

        <CarouselNav names={e.areas.map((a) => a.t)} active={carousel.active} goTo={carousel.goTo} labels={e} />
      </div>
    </section>
  );
}
