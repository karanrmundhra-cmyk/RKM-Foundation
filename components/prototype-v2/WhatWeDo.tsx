import Reveal from "@/components/Reveal";
import EditorialFigure from "@/components/EditorialFigure";

/**
 * Section 3 — WHAT WE DO.
 * Four ways we show up — Rescue · Feed · Heal · Shelter — in a single row
 * (4-column grid on desktop; 2 columns on tablet; stacked on mobile).
 * Content always renders visible (Reveal is enhancement only).
 */

const ROWS = [
  { word: "Rescue", label: "On the street", desc: "We go wherever an animal is hurt — the street, the gutter, anywhere.", src: "/images/site/street.jpg", alt: "A rescued street dog in RKM Foundation's care" },
  { word: "Feed", label: "Every single day", desc: "Warm meals every day, for every animal in our care.", src: "/images/site/feed.jpg", alt: "A happy, well-fed rescued dog" },
  { word: "Heal", label: "With trusted vets", desc: "Wounds dressed, surgeries funded — full vet care until they're whole.", src: "/images/site/heal-run.jpg", alt: "A happy, healthy dog running outdoors" },
  { word: "Shelter", label: "A place to rest", desc: "A safe, quiet place to rest and recover.", src: "/images/site/shelter-cat.jpg", alt: "A cat resting safely indoors" },
];

export function WhatWeDo() {
  return (
    <section className="bg-snow section-y">
      <div className="container-c">
        <Reveal>
          <p className="eyebrow-index">What We Do</p>
          <h2 className="display-2 mt-5 xl:whitespace-nowrap">Four ways we show up for animals.</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-12 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {ROWS.map((r, i) => (
            <Reveal key={r.word} delay={i * 80} className="flex flex-col">
              <EditorialFigure src={r.src} alt={r.alt} ratio="aspect-[4/5]" parallax speed={0.05} ghost={`0${i + 1}`} />
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink/65">{r.label}</span>
              </div>
              <h3 className="mt-2 font-semibold leading-[0.95] tracking-[-0.02em] text-ink" style={{ fontSize: "clamp(1.85rem, 1.1rem + 1.6vw, 2.6rem)" }}>{r.word}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">{r.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
