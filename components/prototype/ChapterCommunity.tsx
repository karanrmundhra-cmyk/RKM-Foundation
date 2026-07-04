"use client";
import { DemoCaption } from "./DemoCaption";
import { Reveal } from "./Reveal";

const PLACEHOLDERS = [
  "A real supporter's words about why they give will live here.",
  "This card will hold an authentic story from someone in our community.",
  "Genuine supporter voices will replace this copy.",
];

/**
 * Ch6 — Community. Testimonials are CLEARLY labelled demo placeholders with
 * lorem filler — no fabricated quotes or names. Includes community.jpg.
 */
export function ChapterCommunity() {
  return (
    <section className="bg-ink py-20 text-snow sm:py-28">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-3 text-copper-light">COMMUNITY</p>
          <h2 className="h-display max-w-2xl text-3xl sm:text-4xl">
            The people behind the rescues.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-snow/70">
            Real supporter voices will appear here.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLACEHOLDERS.map((text, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl bg-white/[0.04] p-7 ring-1 ring-white/10">
                <span className="mb-4 w-fit rounded-full bg-copper/15 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-copper-light ring-1 ring-copper/30">
                  [DEMO] Placeholder supporter story
                </span>
                <blockquote className="flex-1 text-base leading-relaxed text-snow/80">
                  {text}
                </blockquote>
                <figcaption className="mt-5 text-sm text-snow/50">
                  Real supporter voices will appear here.
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="img-hover relative mt-12 aspect-[16/7] bg-white/5">
            <img
              src="/prototype/community.jpg"
              alt="A community gathering supporting animal welfare — demo placeholder photo"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <DemoCaption className="absolute bottom-3 left-3" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
