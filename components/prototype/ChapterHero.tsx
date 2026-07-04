"use client";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DemoCaption } from "./DemoCaption";
import { useReducedMotionFlag } from "./useReducedMotionFlag";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Ch1 — full-screen hero. Slow image scale/parallax via GSAP (motion only),
 * sequential headline reveal via Framer, scroll-cue chevron that fades on
 * scroll. Reduced-motion: everything static, content fully present.
 */
export function ChapterHero() {
  const reduceFM = useReducedMotion();
  const reduceFlag = useReducedMotionFlag();
  const imgRef = useRef<HTMLImageElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceFlag !== false) return; // only animate when motion allowed
    let cleanup = () => {};
    let cancelled = false;
    (async () => {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      const gsap = gsapMod.default ?? gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (imgRef.current) {
          gsap.fromTo(
            imgRef.current,
            { scale: 1.08, yPercent: 0 },
            {
              scale: 1.18,
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: imgRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
        if (cueRef.current) {
          gsap.to(cueRef.current, {
            opacity: 0,
            ease: "none",
            scrollTrigger: { start: "top top", end: "+=300", scrub: true },
          });
        }
      });
      cleanup = () => ctx.revert();
    })();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduceFlag]);

  const lines = ["They can't ask for help.", "You can give it."];

  return (
    <section className="relative flex h-[100svh] min-h-[600px] w-full items-end overflow-hidden bg-ink">
      {/* Image layer */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src="/prototype/hero.jpg"
          alt="A street dog looks toward the camera in soft duotone light"
          className="h-full w-full object-cover will-change-transform"
          decoding="async"
        />
        {/* Cinematic darkening gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />
        {/* copper micro-accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-content px-5 pb-24 sm:px-8 sm:pb-28">
        <p className="eyebrow mb-5 text-copper-light">ANIMAL WELFARE · INDIA</p>
        <h1 className="h-display max-w-3xl text-4xl text-snow sm:text-6xl lg:text-7xl">
          {lines.map((line, i) => (
            <span
              key={i}
              className="proto-rise block"
              style={{ animationDelay: `${0.2 + i * 0.18}s` }}
            >
              {i === 1 ? <span className="text-copper-light">{line}</span> : line}
            </span>
          ))}
        </h1>
        <DemoCaption className="mt-6" />
      </div>

      {/* Scroll cue */}
      <div
        ref={cueRef}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
        aria-hidden="true"
      >
        <div className={`flex flex-col items-center gap-2 text-snow/60 ${reduceFM ? "" : "motion-safe:animate-bounce"}`}>
          <span className="text-[0.625rem] uppercase tracking-[0.2em]">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
