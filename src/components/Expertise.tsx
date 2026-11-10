import { BrainCircuit, Server, Smartphone, WalletCards } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Skill = { name: string; level: "mastered" | "practiced" };
const m = (name: string): Skill => ({ name, level: "mastered" });
const p = (name: string): Skill => ({ name, level: "practiced" });

/**
 * Niveaux établis à partir des dépôts publics et du parcours :
 * « mastered » = utilisé sur plusieurs projets ; « practiced » = utilisé sur au moins un projet.
 */
const AREAS: { Icon: typeof Server; skills: Skill[] }[] = [
  {
    Icon: Server,
    skills: [
      m("Python"), m("FastAPI"), m("Node.js"), m("Express"), m("JavaScript"), m("React"), m("API REST"),
      m("Git / GitHub"), p("TypeScript"), p("Vue.js"), p("PostgreSQL"), p("MongoDB"), p("MySQL"), p("Docker"),
      p("GitLab"), p("GitHub Actions"),
    ],
  },
  { Icon: Smartphone, skills: [m("Flutter"), m("Dart"), p("Riverpod"), p("Kotlin · Android natif")] },
  { Icon: BrainCircuit, skills: [m("Gemini API"), p("Function calling"), p("Gemini Live"), p("Vertex AI")] },
  { Icon: WalletCards, skills: [p("PayPal Orders API"), p("Mobile Money"), p("Google Cloud Run")] },
];

export function Expertise() {
  const { t } = useI18n();
  const e = t.expertise;

  return (
    <section id="expertise" className="border-t border-line bg-ink-2/60 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="03" label={e.label} title={e.title} intro={e.intro} />

        <Reveal className="mt-10 flex flex-wrap gap-5 text-sm text-mute md:ml-[25%] md:pl-2">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" /> {e.mastered}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full border border-mute" aria-hidden="true" /> {e.practiced}
          </span>
        </Reveal>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-[1.4rem] border border-line bg-line md:grid-cols-2">
          {AREAS.map(({ Icon, skills }, i) => (
            <li key={i} className="group bg-ink p-7 transition-colors duration-500 hover:bg-[#0d1628] md:p-9">
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
                      className={`chip ${s.level === "mastered" ? "border-gold/45 !text-paper" : "!text-mute"}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${s.level === "mastered" ? "bg-gold" : "border border-mute"}`}
                      />
                      {s.name}
                      <span className="sr-only"> ({s.level === "mastered" ? e.mastered : e.practiced})</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
