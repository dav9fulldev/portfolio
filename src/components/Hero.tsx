import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Award, Download, Mail, MapPin } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { site } from "../config/site";
import { DevpostIcon, GithubIcon, GitlabIcon, LinkedinIcon } from "./Icons";

const ease = [0.22, 1, 0.36, 1] as const;
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

/** Forme organique du portrait (coins asymétriques). */
const BLOB = "58% 42% 46% 54% / 46% 50% 50% 54%";

type Pointer = { x: MotionValue<number>; y: MotionValue<number> };

/**
 * Forme décorative en 3D : elle flotte, pivote doucement et se décale selon la souris
 * (parallaxe : plus « depth » est grand, plus elle semble proche). Figée si animations réduites.
 */
function Float({
  className,
  delay = 0,
  depth = 1,
  spin = "z",
  pointer,
  children,
}: {
  className: string;
  delay?: number;
  depth?: number;
  spin?: "x" | "y" | "z";
  pointer: Pointer;
  children: React.ReactNode;
}) {
  const x = useTransform(pointer.x, (v) => v * 46 * depth);
  const y = useTransform(pointer.y, (v) => v * 46 * depth);
  const rotate = spin === "z" ? { rotate: [0, 14, 0] } : spin === "x" ? { rotateX: [0, 360] } : { rotateY: [0, 360] };
  return (
    <motion.div aria-hidden="true" className={`absolute z-10 ${className}`} style={{ x, y, transformPerspective: 600 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0], ...rotate }}
        transition={{
          opacity: { duration: 0.6, delay: 0.6 + delay },
          scale: { duration: 0.6, delay: 0.6 + delay, ease },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
          rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay },
          rotateX: { duration: 9, repeat: Infinity, ease: "linear", delay },
          rotateY: { duration: 10, repeat: Infinity, ease: "linear", delay },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Position de la souris dans le hero, normalisée entre -0,5 et 0,5 et amortie par un ressort. */
function usePointer() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  useEffect(() => setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches), []);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.6 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);
  const enabled = fine && !reduce;
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };
  return { pointer: { x, y }, handlers: { onPointerMove, onPointerLeave } };
}

export function Hero() {
  const { t } = useI18n();
  const h = t.hero;
  const { pointer, handlers } = usePointer();
  // Inclinaison 3D du portrait et des badges qui l'accompagnent
  const rotateY = useTransform(pointer.x, (v) => v * 16);
  const rotateX = useTransform(pointer.y, (v) => v * -12);

  const socials = [
    { href: site.github, label: "GitHub", Icon: GithubIcon },
    { href: site.gitlab, label: "GitLab", Icon: GitlabIcon },
    { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: site.devpost, label: "DevPost", Icon: DevpostIcon },
  ].filter((s) => s.href);

  return (
    <section id="home" {...handlers} className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Arrière-plan : vague claire + halos bleu / violet */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-[20%] top-[42%] h-[120%] w-[140%] -rotate-6 rounded-[50%] bg-ink-2 opacity-80" />
        <div className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold/15 blur-[120px]" />
        <div className="absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-electric/10 blur-[120px]" />
      </div>

      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.div {...fade(0.05)} className="flex flex-wrap items-center gap-2">
            <span className="card-shadow inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-2 px-3 py-1.5 text-[0.8rem] font-medium text-paper">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
              </span>
              {h.available}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[0.8rem] text-mute">
              <MapPin size={14} aria-hidden="true" />
              {h.location}
            </span>
          </motion.div>

          <motion.h1 {...fade(0.15)} className="display-hero mt-7 text-[2.55rem] text-paper sm:text-[3.4rem] lg:text-[4.1rem]">
            {h.titleA} <span className="text-gradient">{h.titleB}</span>
          </motion.h1>

          <motion.p {...fade(0.28)} className="mt-6 max-w-xl text-[1.06rem] leading-relaxed text-mute">
            {h.body}
          </motion.p>

          <motion.div {...fade(0.38)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#projects" className="btn btn-primary">
              {h.ctaProjects}
              <ArrowRight size={16} className="arrow" />
            </a>
            <a href="#contact" className="btn btn-ghost">
              <Mail size={16} />
              {h.ctaContact}
            </a>
          </motion.div>

          <motion.ul {...fade(0.46)} aria-label={h.domainsLabel} className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
            {h.domains.map((d, i) => (
              <li key={d} className="eyebrow flex items-center gap-3 !text-[0.7rem] !text-paper/80">
                {i > 0 && <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-electric" />}
                {d}
              </li>
            ))}
          </motion.ul>

          <motion.div {...fade(0.54)} className="mt-8 flex flex-wrap items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-ink-2 text-mute transition-colors hover:border-gold hover:text-gold"
              >
                <Icon size={16} />
              </a>
            ))}
            {site.cv && (
              <a
                href={site.cv}
                download
                className="ml-1 inline-flex h-10 items-center gap-2 rounded-full px-3 text-[0.88rem] font-medium text-paper transition-colors hover:text-gold"
              >
                <Download size={15} />
                {h.ctaCv}
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-[21rem] sm:max-w-[24rem] lg:col-span-5 lg:max-w-none"
          style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
        >
          <Float pointer={pointer} depth={1.4} spin="z" className="-left-3 top-6 sm:-left-8" delay={0}>
            <svg width="38" height="38" viewBox="0 0 38 38" className="text-gold">
              <path d="M19 5 L34 31 H4 Z" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
            </svg>
          </Float>
          <Float pointer={pointer} depth={0.8} spin="x" className="-right-1 -top-3 sm:-right-4" delay={1.2}>
            <span className="block h-9 w-9 rounded-full border-[5px] border-electric/70" />
          </Float>
          <Float pointer={pointer} depth={1.8} spin="z" className="-left-5 bottom-36 sm:-left-12" delay={0.6}>
            <svg width="54" height="22" viewBox="0 0 54 22" className="text-electric">
              <path d="M2 18 L12 4 L22 18 L32 4 L42 18 L52 4" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Float>
          <Float pointer={pointer} depth={1.1} spin="y" className="-right-3 bottom-24 sm:-right-8" delay={1.8}>
            <span className="block h-8 w-8 rotate-12 rounded-md border-[4px] border-gold" />
          </Float>

          <div className="relative p-3 [transform:translateZ(0)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 rotate-6 bg-gradient-to-br from-gold via-electric to-gold opacity-90"
              style={{ borderRadius: BLOB }}
            />
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0b3fa8]" style={{ borderRadius: BLOB }}>
              {site.photo && (
                <img
                  src={site.photo}
                  alt={h.photoAlt}
                  width={1100}
                  height={1324}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-[50%_15%]"
                />
              )}
            </div>
          </div>

          {/* Distinction réelle — posée en avant du portrait (profondeur 3D) */}
          <div className="pointer-events-none absolute inset-0 z-20 [transform:translateZ(60px)]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="absolute -right-2 top-[22%] z-20 flex max-w-[12rem] items-center gap-2 rounded-2xl bg-lime px-3 py-2 text-[#0f172a] shadow-[0_14px_30px_-12px_rgb(15_23_42/0.35)] sm:-right-8"
          >
            <Award size={16} aria-hidden="true" className="shrink-0" />
            <span className="text-[0.78rem] font-semibold leading-tight">{h.award}</span>
          </motion.div>
          </div>

          {/* Poste actuel — également en avant-plan */}
          <div className="pointer-events-none absolute inset-0 z-20 [transform:translateZ(40px)]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease }}
            className="absolute -left-2 bottom-6 z-20 rounded-2xl border border-line bg-ink-2/95 px-4 py-3 shadow-[0_18px_40px_-16px_var(--shadow)] backdrop-blur sm:-left-8"
          >
            <p className="eyebrow !text-[0.6rem]">{h.currently}</p>
            <p className="mt-0.5 text-[0.9rem] font-medium text-paper">{h.currentlyRole}</p>
            <p className="text-[0.82rem] font-semibold text-gold">GIM-UEMOA</p>
          </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
