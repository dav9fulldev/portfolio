import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Copy, Mail, MonitorSmartphone } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { site } from "../config/site";

/**
 * Bouton « M'écrire » : un simple lien mailto: ne fait rien quand aucune application
 * de messagerie n'est configurée (cas fréquent avec un webmail). On propose donc
 * Gmail, Outlook, l'application par défaut, ou la copie de l'adresse.
 */
export function EmailMenu() {
  const { t } = useI18n();
  const c = t.contact;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const to = encodeURIComponent(site.email);
  const subject = encodeURIComponent(c.subject);
  const options = [
    { label: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}`, external: true, Icon: Mail },
    { label: "Outlook", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}`, external: true, Icon: Mail },
    { label: c.mailApp, href: `mailto:${site.email}?subject=${subject}`, external: false, Icon: MonitorSmartphone },
  ];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1400);
    } catch {
      window.prompt(c.copy, site.email);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        className="btn btn-primary"
      >
        <Mail size={16} />
        {c.email}
        <ChevronDown size={15} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-30 mt-2 w-64 overflow-hidden rounded-2xl border border-line-strong bg-ink p-1.5 shadow-2xl shadow-(color:--shadow)"
          >
            <p className="eyebrow px-3 pb-1.5 pt-2 !text-[0.6rem]">{c.openWith}</p>
            {options.map(({ label, href, external, Icon }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.92rem] text-paper transition-colors hover:bg-ink-2"
              >
                <Icon size={16} className="text-mute" />
                {label}
              </a>
            ))}
            <div className="my-1 h-px bg-line" />
            <button
              type="button"
              onClick={copy}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[0.92rem] text-paper transition-colors hover:bg-ink-2"
            >
              {copied ? <Check size={16} className="text-gold" /> : <Copy size={16} className="text-mute" />}
              <span className="min-w-0">
                {copied ? c.copied : c.copy}
                <span className="block truncate text-xs text-mute">{site.email}</span>
              </span>
            </button>
            <span aria-live="polite" className="sr-only">
              {copied ? c.copied : ""}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
