"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { HoverLift } from "@/components/Motion";
import { useReducedMotionFlag, useIsMobile } from "./useMotionGates";

/**
 * Section 1 — HERO. Markup + classes identical to production (bg-ink dark hero,
 * already dark in prod). Motion added:
 *  - GSAP scroll parallax on the dog image (yPercent + scale on scroll-out)
 *  - scroll-linked fade/lift of the hero content as you leave it
 *  - deliberate staggered entrance (existing StaggerGroup/Item)
 *  - CTA micro-lift (HoverLift) + a gentle fading scroll cue
 * Reduced-motion / mobile: no GSAP, static final state. Content always in DOM.
 */
export function HeroMotion() {
  const reduce = useReducedMotionFlag();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const enabled = reduce === false && isMobile === false;

  useEffect(() => {
    if (!enabled) return;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !sectionRef.current) return;
      const gsap = gsapMod.default ?? gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (imgRef.current) {
          gsap.to(imgRef.current, {
            yPercent: 14,
            scale: 1.08,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
          });
        }
        if (contentRef.current) {
          // Subtle upward drift as the hero leaves. No opacity fade — an
          // immediateRender end-state was leaving the headline invisible on load.
          gsap.fromTo(
            contentRef.current,
            { yPercent: 0 },
            {
              yPercent: -8,
              ease: "none",
              immediateRender: false,
              scrollTrigger: { trigger: sectionRef.current, start: "30% top", end: "bottom top", scrub: true },
            }
          );
        }
      }, sectionRef);

      cleanup = () => ctx.revert();
    })();

    return () => { cancelled = true; cleanup(); };
  }, [enabled]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[96svh] items-end overflow-hidden bg-ink text-white">
      {/* LCP image: prioritised fetch. Kept as a plain <img> (not next/image)
          because GSAP animates this exact element via imgRef + the hero-zoom CSS. */}
      <img
        ref={imgRef}
        src="/images/site/dog.jpg"
        alt="A rescued dog cared for by RKM Foundation"
        fetchPriority="high"
        decoding="async"
        className="hero-zoom absolute inset-0 h-full w-full object-cover opacity-[0.85] will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/0" />

      {/* Edge-pinned metadata labels — editorial corner micro-type */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-28 hidden justify-between px-8 lg:flex">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/40">Registered Charitable Trust</span>
        <span className="text-right text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/40">Est. 2014 · Thane, India</span>
      </div>
      <div ref={contentRef} className="container-c relative pb-28 pt-40 will-change-transform sm:pb-32">
        {/* Hero content renders statically (always visible) — the only motion here is
            the subtle GSAP image parallax. A guaranteed-visible headline matters more
            than an entrance animation. */}
        <p className="eyebrow-index !text-copper-light before:!bg-copper-light/70">Animal Welfare · India</p>
        <h1 className="display-1 mt-6 max-w-[15ch] text-balance">
          They can&apos;t ask for help.{" "}
          <span className="text-copper-light">You can give it.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
          Every day we rescue, feed, heal, and shelter animals living on India&apos;s streets —
          and we&apos;ll show you the exact life your kindness changed.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <HoverLift>
            <Link href="/donate-now#donation" className="btn-copper">Donate Now</Link>
          </HoverLift>
          <HoverLift>
            <Link href="/fundraiser" className="btn bg-white/10 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20">Start a Fundraiser</Link>
          </HoverLift>
        </div>
        <p className="mt-7 text-xs uppercase tracking-[0.18em] text-white/55">
          12A · 80G · CSR — donations are tax deductible
        </p>
      </div>

      {/* Fading scroll cue — decorative, hidden from AT, paused for reduced-motion */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <span className="flex h-9 w-6 items-start justify-center rounded-full p-1 ring-1 ring-white/40">
          <span className="h-2 w-1 rounded-full bg-white/70 motion-safe:animate-[scrollcue_1.8s_ease-in-out_infinite] motion-reduce:opacity-60" />
        </span>
      </div>
    </section>
  );
}
