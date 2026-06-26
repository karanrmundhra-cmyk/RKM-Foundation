import Reveal from "@/components/Reveal";
import EditorialFigure from "@/components/EditorialFigure";

/**
 * Section 3 — WHAT WE DO. V3 editorial rebuild.
 * From a 4-card grid → numbered editorial rows ("01 — RESCUE"): an oversized
 * word, a short statement, and a parallax image, alternating sides for rhythm.
 * Content always renders visible (Reveal is enhancement only). Photography is
 * provisional — clearly-labelled placeholders until real field photos exist.
 */

const ROWS = [
  { word: "Rescue", label: "On the street", desc: "We go wherever an animal is hurt — the street, the gutter, anywhere.", src: "/images/site/street.jpg", alt: "A rescued street dog in RKM Foundation's care" },
  { word: "Feed", label: "Every single day", desc: "Warm meals every day, for every animal in our care.", src: "/images/site/feed.jpg", alt: "A happy, well-fed rescued dog" },
  { word: "Heal", label: "With trusted vets", desc: "Wounds dressed, surgeries funded — full vet care until they're whole.", src: "/images/site/heal.jpg", alt: "A rescued dog receiving veterinary care at the RKM shelter" },
  { word: "Shelter", label: "A place to rest", desc: "A safe, quiet place to rest and recover.", src: "/images/site/rest.jpg", alt: "A rescued dog resting at the RKM Foundation shelter" },
];

export function WhatWeDo() {
  return (
    <section className="bg-snow section-y">
      <div className="container-c">
        <Reveal>
          <p className="eyebrow-index">What We Do</p>
          <h2 className="display-2 mt-5 xl:whitespace-nowrap">Four ways we show up for animals.</h2>
        </Reveal>

        <div className="mt-10 sm:mt-14">
          {ROWS.map((r, i) => {
            const imageLeft = i % 2 === 1;
            return (
              <div
                key={r.word}
                className={`grid items-center gap-y-8 gap-x-14 border-t border-ink/[0.07] py-16 sm:py-24 ${imageLeft ? "lg:grid-cols-[13fr_11fr]" : "lg:grid-cols-[11fr_13fr]"} ${i === ROWS.length - 1 ? "border-b" : ""}`}
              >
                {/* Image */}
                <Reveal
                  delay={80}
                  className={imageLeft ? "lg:order-1" : "lg:order-2"}
                >
                  <EditorialFigure src={r.src} alt={r.alt} ratio="aspect-[16/10]" parallax speed={0.07} ghost={`0${i + 1}`} />
                </Reveal>

                {/* Text */}
                <Reveal className={imageLeft ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6"}>
                  <div className="flex items-baseline gap-4">
                    <span className="text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink/65">{r.label}</span>
                  </div>
                  <h3 className="editorial-word mt-3 text-ink">{r.word}</h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/65">{r.desc}</p>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
