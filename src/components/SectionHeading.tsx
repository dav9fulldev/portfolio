import { Reveal } from "./Reveal";

type Props = { index: string; label: string; title: string; intro?: string };

export function SectionHeading({ index, label, title, intro }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <Reveal className="md:col-span-3">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-gold">{index}</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          {label}
        </p>
      </Reveal>
      <div className="md:col-span-9">
        <Reveal delay={0.05}>
          <h2 className="display text-[2.4rem] text-paper sm:text-5xl lg:text-[3.6rem]">{title}</h2>
        </Reveal>
        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-mute">{intro}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
