import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { useActiveSection } from "../hooks/useActiveSection";

export const SECTIONS = ["home", "about", "projects", "expertise", "journey", "contact"] as const;

export function Header() {
  const { t, lang, toggle } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTIONS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const LangButton = ({ className = "" }: { className?: string }) => (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.nav.switchTo}
      title={t.nav.switchTo}
      className={`inline-flex h-9 items-center rounded-full border border-line-strong px-1 font-mono text-[0.7rem] tracking-wider transition-colors hover:border-gold ${className}`}
    >
      {(["fr", "en"] as const).map((l) => (
        <span
          key={l}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            lang === l ? "bg-paper text-ink" : "text-mute"
          }`}
        >
          {l}
        </span>
      ))}
    </button>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        {t.nav.skip}
      </a>
      <div className="container-page flex h-16 items-center justify-between md:h-[4.5rem]">
        <a href="#home" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/60 font-display text-[0.95rem] text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
            B
          </span>
          <span className="font-mono text-[0.74rem] tracking-[0.22em] text-paper">BROU DAVID YAO</span>
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`relative rounded-full px-3.5 py-2 text-[0.88rem] transition-colors ${
                active === id ? "text-paper" : "text-mute hover:text-paper"
              }`}
            >
              {t.nav[id]}
              {active === id && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </a>
          ))}
          <LangButton className="ml-3" />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LangButton />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-paper"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Navigation mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-ink lg:hidden"
          >
            <ul className="container-page flex flex-col pt-6">
              {SECTIONS.map((id, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.5 }}
                  className="border-b border-line"
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className={`display text-[2rem] ${active === id ? "text-gold" : "text-paper"}`}>
                      {t.nav[id]}
                    </span>
                    <span className="font-mono text-xs text-mute">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
