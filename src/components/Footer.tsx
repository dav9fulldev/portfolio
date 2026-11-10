import { ArrowUp } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { site } from "../config/site";
import { DevpostIcon, GithubIcon, GitlabIcon, LinkedinIcon } from "./Icons";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const socials = [
    { href: site.github, label: "GitHub", Icon: GithubIcon },
    { href: site.gitlab, label: "GitLab", Icon: GitlabIcon },
    { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: site.devpost, label: "DevPost", Icon: DevpostIcon },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[0.78rem] tracking-[0.22em] text-paper">BROU DAVID YAO</p>
          <p className="mt-2 text-sm text-mute">{t.footer.tagline}</p>
          <p className="mt-6 text-xs text-mute/70">
            © {year} Brou David Yao. {t.footer.rights}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-mute transition-colors hover:border-line-strong hover:text-paper"
            >
              <Icon size={16} />
            </a>
          ))}
          <a
            href="#home"
            aria-label={t.footer.top}
            title={t.footer.top}
            className="ml-2 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink transition-colors hover:bg-gold"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
