import { AnimatePresence, motion } from "motion/react";
import { Mail } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { useActiveSection } from "../hooks/useActiveSection";
import { SECTIONS } from "./Header";

/**
 * Téléphone et tablette : bouton « Me contacter » toujours à portée de pouce.
 * Masqué sur l'accueil (les boutons y sont déjà) et à l'approche du bloc Contact.
 * Rendu hors du header : son flou d'arrière-plan fausserait la position « fixed ».
 */
export function FloatingContact() {
  const { t } = useI18n();
  const active = useActiveSection(SECTIONS);
  const show = active !== "home" && active !== "about" && active !== "contact";

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="btn btn-primary fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 !h-12 shadow-[0_14px_34px_-12px_rgb(37_99_235/0.7)] lg:hidden"
        >
          <Mail size={16} aria-hidden="true" />
          {t.nav.cta}
        </motion.a>
      )}
    </AnimatePresence>
  );
}
