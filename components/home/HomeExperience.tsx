"use client";
import Reveal from "@/components/Reveal";
import CTABanner from "@/components/CTABanner";
import { HeroMotion } from "@/components/prototype-v2/HeroMotion";
import { ToblerStory } from "@/components/prototype-v2/ToblerStory";
import { WhatWeDo } from "@/components/prototype-v2/WhatWeDo";
import { GiftSection } from "@/components/prototype-v2/GiftSection";
import { WhyTrust } from "@/components/prototype-v2/WhyTrust";
import { useReducedMotionFlag, useIsMobile } from "@/components/prototype-v2/useMotionGates";
import { useLenisScrollTrigger } from "@/components/prototype-v2/useLenis";

/**
 * Production homepage experience. SAME copy / theme / structure / images as the
 * static homepage, with the approved motion layer (GSAP ScrollTrigger parallax,
 * pinned Tobler story, card choreography, ₹ count-ups, trust stagger).
 *
 * Header & Footer come from the root layout. Lenis smooth-scroll + GSAP/
 * ScrollTrigger are DYNAMICALLY imported inside the hooks/sections, so they stay
 * out of the initial bundle. All motion is reduced-motion + mobile gated; every
 * section's content is always in the DOM (SSR / JS-off readable).
 */
export function HomeExperience() {
  const reduce = useReducedMotionFlag();
  const isMobile = useIsMobile();
  const smoothEnabled = reduce === false && isMobile === false;
  useLenisScrollTrigger(smoothEnabled);

  return (
    <>
      {/* Scroll-cue keyframe — scoped, motion-safe (paused under reduced motion) */}
      <style>{`@keyframes scrollcue{0%{transform:translateY(0);opacity:.9}50%{transform:translateY(6px);opacity:.3}100%{transform:translateY(0);opacity:.9}}`}</style>

      {/* Donor mental model: what → why → trust → impact → act */}

      {/* 1. HERO — what + why */}
      <HeroMotion />

      {/* 2. WHAT WE DO */}
      <WhatWeDo />

      {/* 3. THE STORY — why we exist */}
      <ToblerStory />

      {/* 4. WHY TRUST US */}
      <WhyTrust />

      {/* 5. WHAT YOUR GIFT DOES — impact */}
      <GiftSection />

      {/* 6. DONATE CTA */}
      <Reveal>
        <CTABanner />
      </Reveal>
    </>
  );
}
