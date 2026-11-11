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
    <section id="contact" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-gold">06</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            {c.label}
          </p>
        </Reveal>

        {/* Grand bloc d'appel à l'action — couleurs fixes (blanc sur dégradé) dans les deux thèmes */}
        <Reveal delay={0.05} className="relative z-20 mt-8">
          <div className="relative isolate rounded-[2rem] bg-gradient-to-br from-[#2563eb] via-[#4f46e5] to-[#7c3aed] p-7 text-white shadow-[0_40px_80px_-40px_rgb(37_99_235/0.6)] sm:p-12 lg:p-16">
            <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
              <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[28px] border-white/10" />
              <div className="absolute -bottom-24 right-[18%] hidden h-44 w-44 rotate-12 rounded-[2.5rem] border-[18px] border-[#c5f36b]/40 md:block" />
              <svg className="absolute bottom-10 right-10 hidden text-white/30 md:block" width="90" height="34" viewBox="0 0 90 34">
                <path d="M3 28 L18 6 L33 28 L48 6 L63 28 L78 6" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="display max-w-4xl text-[2.6rem] text-white sm:text-[3.6rem] lg:text-[4.6rem]">
              {c.title} <span className="text-[#c5f36b]">{c.titleB}</span>
            </h2>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/80">{c.body}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <EmailMenu buttonClassName="btn bg-white text-[#0f172a] hover:bg-[#c5f36b]" />
              {site.cv && (
                <a href={site.cv} download className="btn border border-white/40 text-white hover:border-white hover:bg-white/10">
                  <Download size={16} />
                  {c.cv}
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <div className="card-shadow mt-6 grid gap-px overflow-hidden rounded-[1.6rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
          <div className="flex flex-col justify-between gap-6 bg-ink-2 p-6 sm:col-span-2 lg:col-span-1">
            <p className="eyebrow !text-[0.64rem]">E-mail</p>
            <div className="flex items-center justify-between gap-3">
              <span className="select-all truncate text-[0.95rem] text-paper">{site.email}</span>
              <button
                type="button"
                onClick={copy}
                aria-label={copied ? c.copied : c.copy}
                title={copied ? c.copied : c.copy}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong text-mute transition-colors hover:border-gold hover:text-gold"
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
              className="group flex flex-col justify-between gap-6 bg-ink-2 p-6 transition-colors duration-500 hover:bg-deep"
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
