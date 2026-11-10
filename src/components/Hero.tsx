import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { site } from "../config/site";
import { DevpostIcon, GithubIcon, GitlabIcon, LinkedinIcon } from "./Icons";

const ease = [0.22, 1, 0.36, 1] as const;
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

export function Hero() {
  const { t } = useI18n();

  const socials = [
    { href: site.github, label: "GitHub", Icon: GithubIcon },
    { href: site.gitlab, label: "GitLab", Icon: GitlabIcon },
    { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: site.devpost, label: "DevPost", Icon: DevpostIcon },
  ].filter((s) => s.href);

  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Arrière-plan : grille fine qui s'estompe + halo unique */}
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] -z-10 h-[36rem] w-[36rem] rounded-full bg-electric/10 blur-[120px]"
      />

      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.p {...fade(0.05)} className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            {...fade(0.15)}
            className="display mt-7 text-[2.9rem] text-paper sm:text-6xl lg:text-[5.1rem]"
          >
            {t.hero.titleA} <em className="text-gold not-italic sm:italic">{t.hero.titleB}</em>
          </motion.h1>

          <motion.p {...fade(0.28)} className="mt-7 font-mono text-[0.78rem] tracking-wide text-gold-soft/90">
            {t.hero.sub}
          </motion.p>

          <motion.p {...fade(0.34)} className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-mute">
            {t.hero.body}
          </motion.p>

          <motion.div {...fade(0.44)} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary">
              {t.hero.ctaProjects}
              <ArrowRight size={16} className="arrow" />
            </a>
            {site.cv && (
              <a href={site.cv} download className="btn btn-ghost">
                <Download size={16} />
                {t.hero.ctaCv}
              </a>
            )}
            <a href="#contact" className="btn btn-ghost">
              <Mail size={16} />
              {t.hero.ctaContact}
            </a>
          </motion.div>

          <motion.ul {...fade(0.52)} className="mt-10 flex items-center gap-2" aria-label="Réseaux">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex h-10 items-center gap-2 rounded-full border border-line px-3.5 text-sm text-mute transition-colors hover:border-line-strong hover:text-paper"
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{label}</span>
                  <ArrowUpRight size={13} className="hidden opacity-0 transition-opacity group-hover:opacity-100 sm:block" />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease }}
          className="relative mx-auto w-full max-w-[22rem] lg:col-span-5 lg:max-w-none lg:pl-10"
        >
          <figure className="relative">
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] border border-gold/40" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#0b3fa8]">
              {site.photo ? (
                <img
                  src={site.photo}
                  alt={t.hero.photoAlt}
                  width={1100}
                  height={1324}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-[50%_15%]"
                />
              ) : (
                <div className="grid h-full place-items-center bg-deep font-display text-8xl text-gold">BDY</div>
              )}
              {/* Légende posée sur la photo : couleurs fixes (sombres) quel que soit le thème */}
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0b1220]/95 via-[#0b1220]/60 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div>
                  <p className="eyebrow !text-[0.62rem] !text-[#f5f3ee]/70">{t.hero.currently}</p>
                  <p className="mt-1 text-[0.95rem] text-[#f5f3ee]">{t.hero.currentlyRole}</p>
                  <p className="text-sm text-[#d9c39a]">GIM-UEMOA</p>
                </div>
                <p className="flex items-center gap-1 text-xs text-[#f5f3ee]/75">
                  <MapPin size={12} /> Abidjan
                </p>
              </figcaption>
            </div>
          </figure>
          <p className="mt-8 flex items-center gap-3 font-mono text-[0.62rem] tracking-[0.3em] text-mute/80">
            <span aria-hidden="true" className="h-px flex-1 bg-line-strong" />
            {t.hero.signature.toUpperCase()}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
