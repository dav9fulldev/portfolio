import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** Classes de la piste : carrousel horizontal sur téléphone, à compléter par la mise en page md+. */
export const TRACK =
  "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-1 pt-1 [scrollbar-width:none] md:mx-0 md:snap-none md:p-0 [&::-webkit-scrollbar]:hidden";
/** Classes d'une diapositive sur téléphone. */
export const SLIDE = "w-[86%] shrink-0 snap-start md:w-auto";

/** Suit la diapositive visible d'une piste défilante et permet d'y naviguer. */
export function useCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(0);

  const step = () => {
    const el = ref.current;
    const first = el?.firstElementChild as HTMLElement | null;
    return el && first ? first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : 0;
  };
  const onScroll = useCallback(() => {
    const el = ref.current;
    const s = step();
    if (!el || !s) return;
    setActive(Math.max(0, Math.min(Math.round(el.scrollLeft / s), el.children.length - 1)));
  }, []);
  const goTo = useCallback((i: number) => {
    ref.current?.scrollTo({ left: i * step(), behavior: "smooth" });
  }, []);

  return { ref, active, onScroll, goTo };
}

type NavProps = {
  names: string[];
  active: number;
  goTo: (i: number) => void;
  labels: { goTo: string; prev: string; next: string };
};

/** Points, compteur et flèches : affichés sur téléphone uniquement. */
export function CarouselNav({ names, active, goTo, labels }: NavProps) {
  const n = names.length;
  const btn =
    "grid h-10 w-10 place-items-center rounded-full border border-line-strong text-paper transition-colors disabled:opacity-35";
  return (
    <div className="mt-5 flex items-center justify-between md:hidden">
      <div className="flex items-center gap-1.5">
        {names.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${labels.goTo} : ${name}`}
            aria-current={active === i}
            className="grid h-6 place-items-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-gold" : "w-1.5 bg-line-strong"}`}
            />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="mr-1 font-mono text-[0.74rem] text-mute">
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={labels.prev} className={btn}>
          <ArrowLeft size={16} />
        </button>
        <button type="button" onClick={() => goTo(active + 1)} disabled={active === n - 1} aria-label={labels.next} className={btn}>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
