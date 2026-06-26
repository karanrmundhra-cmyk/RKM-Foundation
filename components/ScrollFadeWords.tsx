"use client";
import { createElement, useEffect, useRef } from "react";

/**
 * ScrollFadeWords — the editorial "words brighten as you scroll" reveal used by
 * Kanso / Agentura. Each word lights from a soft grey to full ink as the line
 * passes through the viewport.
 *
 * Reliability first: the base render is FULLY LEGIBLE ink (so SSR, no-JS, and
 * reduced-motion users read it normally). Only on a motion-capable, non-touch
 * client does JS dim the not-yet-reached words and brighten them on scroll —
 * and the dimmest state is still readable grey (never invisible). It can never
 * create a blank zone.
 */
export default function ScrollFadeWords({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "h2" | "h3" | "blockquote";
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    if (mqReduce.matches || mqCoarse.matches) return;

    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    const N = spans.length;
    let raf = 0;
    let running = true;
    const MIN = 0.62; // dimmest — kept ≥ WCAG AA contrast (ink at .62 opacity passes 4.5:1)

    const update = () => {
      raf = 0;
      if (!running) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 → 1 as the block travels from 85%→35% of the viewport height
      const start = vh * 0.85;
      const end = vh * 0.35;
      const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      const lit = p * N;
      for (let i = 0; i < N; i++) {
        // soft 1.2-word ramp around the lit frontier
        const o = Math.max(MIN, Math.min(1, MIN + (lit - i + 0.6) / 1.2 * (1 - MIN)));
        spans[i].style.opacity = o.toFixed(3);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    spans.forEach((s) => (s.style.transition = "opacity 120ms linear"));
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [text]);

  return createElement(
    Tag,
    { ref, className },
    words.map((w, i) =>
      createElement("span", { key: i, "data-w": "" }, i < words.length - 1 ? w + " " : w)
    )
  );
}
