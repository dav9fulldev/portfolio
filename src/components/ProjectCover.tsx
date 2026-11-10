import { BookOpenText, UtensilsCrossed, Megaphone } from "lucide-react";
import type { Cover } from "../data/projects";

const glyphs = {
  resto: { Icon: UtensilsCrossed, word: "Resto", sub: "SaaS · Restaurants" },
  griot: { Icon: BookOpenText, word: "Griot", sub: "AI · Storytelling" },
  civic: { Icon: Megaphone, word: "Civic", sub: "Web" },
} as const;

/**
 * Visuel d'un projet. Les images sont de vraies captures ou de vrais logos tirés des dépôts ;
 * pour les projets sans visuel public, une composition typographique (jamais une fausse capture).
 */
export function ProjectCover({ cover, name, large = false }: { cover: Cover; name: string; large?: boolean }) {
  if (cover.kind === "image") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-deep">
        <img
          src={cover.src}
          alt={`${name} — aperçu`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
          style={{ objectPosition: cover.position ?? "center top" }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
      </div>
    );
  }

  if (cover.kind === "phone") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-deep">
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/20 blur-3xl" />
        <img
          src={cover.src}
          alt={`${name} — capture de l'application`}
          loading="lazy"
          decoding="async"
          className={`absolute left-1/2 -translate-x-1/2 rounded-[1.6rem] border border-line-strong shadow-2xl shadow-(color:--shadow) transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 ${
            large ? "top-[10%] w-[34%]" : "top-[12%] w-[32%]"
          }`}
        />
      </div>
    );
  }

  if (cover.kind === "logo") {
    return (
      <div className="relative grid h-full w-full place-items-center overflow-hidden bg-deep">
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
        <img
          src={cover.src}
          alt={`Logo ${name}`}
          loading="lazy"
          decoding="async"
          className={`relative rounded-[22%] shadow-2xl shadow-(color:--shadow) transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.03] ${
            large ? "w-32 md:w-40" : "w-24 md:w-28"
          }`}
        />
      </div>
    );
  }

  const g = glyphs[cover.glyph];
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-deep p-6 md:p-8">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full border border-gold/25" />
      <div aria-hidden="true" className="absolute -right-4 -bottom-4 h-40 w-40 rounded-full border border-gold/15" />
      <g.Icon aria-hidden="true" className="relative self-end text-gold" size={large ? 30 : 24} strokeWidth={1.4} />
      <div className="relative">
        <p
          aria-hidden="true"
          className={`display text-paper/95 transition-transform duration-700 group-hover:translate-x-1 ${
            large ? "text-7xl md:text-8xl" : "text-6xl"
          }`}
        >
          {g.word}
          <span className="text-gold">.</span>
        </p>
        <p className="eyebrow mt-2 !text-[0.62rem]">{g.sub}</p>
      </div>
    </div>
  );
}
