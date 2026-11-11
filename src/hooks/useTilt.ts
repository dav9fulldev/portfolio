import { useEffect } from "react";

/**
 * Inclinaison 3D des cartes « .tilt » : un seul écouteur pour tout le document.
 * La carte survolée reçoit --rx / --ry (angles) et --gx / --gy (position du reflet).
 * Inactif sur écran tactile et si l'utilisateur réduit les animations.
 */
export function useTilt(maxDeg = 6) {
  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok || reduce) return;

    let current: HTMLElement | null = null;
    const reset = (el: HTMLElement) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.classList.remove("is-tilting");
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".tilt") as HTMLElement | null;
      if (current && current !== el) reset(current);
      current = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.classList.add("is-tilting");
      el.style.setProperty("--ry", `${(px - 0.5) * 2 * maxDeg}deg`);
      el.style.setProperty("--rx", `${(0.5 - py) * 2 * maxDeg}deg`);
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
    };
    const onLeaveWindow = () => current && reset(current);
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, [maxDeg]);
}
