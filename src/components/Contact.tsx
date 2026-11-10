import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { site } from "../config/site";
import { Reveal } from "./Reveal";
import { EmailMenu } from "./EmailMenu";
import { DevpostIcon, GithubIcon, GitlabIcon, LinkedinIcon } from "./Icons";

/** Dernier segment d'une URL de profil : « https://github.com/dav9fulldev » → « @dav9fulldev ». */
const handle = (url: string) => "@" + url.replace(/\/+$/, "").split("/").pop();

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(c.copy, site.email);
    }
  };

  const links = [
    { label: "GitHub", value: handle(site.github), href: site.github, Icon: GithubIcon },
    { label: "GitLab", value: handle(site.gitlab), href: site.gitlab, Icon: GitlabIcon },
    { label: "LinkedIn", value: handle(site.linkedin), href: site.linkedin, Icon: LinkedinIcon },
    { label: "DevPost", value: handle(site.devpost), href: site.devpost, Icon: DevpostIcon },
  ].filter((l) => l.href);

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-line py-24 md:py-36">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent)]" />
      <div className="container-page">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-gold">06</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            {c.label}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display mt-8 max-w-4xl text-[2.9rem] text-paper sm:text-6xl lg:text-[5.4rem]">{c.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-mute">{c.body}</p>
        </Reveal>

        <Reveal delay={0.15} className="relative z-20 mt-10 flex flex-wrap items-center gap-3">
          <EmailMenu />
          {site.cv && (
            <a href={site.cv} download className="btn btn-ghost">
              <Download size={16} />
              {c.cv}
            </a>
          )}
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[1.4rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
          <div className="flex flex-col justify-between gap-6 bg-ink p-6 sm:col-span-2 lg:col-span-1">
            <p className="eyebrow !text-[0.64rem]">E-mail</p>
            <div className="flex items-center justify-between gap-3">
              <span className="select-all truncate text-[0.95rem] text-paper">{site.email}</span>
              <button
                type="button"
                onClick={copy}
                aria-label={copied ? c.copied : c.copy}
                title={copied ? c.copied : c.copy}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong text-mute transition-colors hover:border-gold hover:text-gold"
              >
                {copied ? <Check size={14} className="text-gold" /> : <Copy size={14} />}
              </button>
            </div>
            <span aria-live="polite" className="sr-only">
              {copied ? c.copied : ""}
            </span>
          </div>
          {links.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between gap-6 bg-ink p-6 transition-colors duration-500 hover:bg-ink-2"
            >
              <span className="flex items-center justify-between">
                <span className="eyebrow !text-[0.64rem]">{label}</span>
                <ArrowUpRight size={16} className="text-mute transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
              </span>
              <span className="flex items-center gap-2.5 text-[0.95rem] text-paper">
                <Icon size={16} className="text-mute" />
                <span className="truncate">{value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
