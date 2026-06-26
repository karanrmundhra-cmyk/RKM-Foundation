"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import EditorialFigure from "@/components/EditorialFigure";
import ScrollFadeWords from "@/components/ScrollFadeWords";

/**
 * Section 2 — THE STORY (showcase). SAME light theme, EXACT production copy.
 *
 * Motion path (desktop, motion allowed): GSAP ScrollTrigger PINNED section
 * (~280vh). As the viewer scrolls the image side cross-fades through three real
 * shelter/animal images (subtle scale), while the text side progresses:
 * paragraph -> blockquote pull-quote (emphasis) -> attribution + link.
 *
 * Fallback (reduced-motion / mobile): the EXACT existing static 2-column layout,
 * no pin, no transforms — using the production <Reveal>. Content is identical in
 * both branches and always present in the DOM.
 */

const IMAGES = [
  { src: "/images/site/care.jpg", alt: "Tobler, the dog who inspired RKM Foundation" },
  { src: "/images/site/dog.jpg", alt: "A rescued dog recovering in RKM's care" },
  { src: "/images/pillars/my-people.jpeg", alt: "The RKM team caring for rescued animals" },
];

function StoryText() {
  return (
    <>
      <p className="eyebrow-index">How It Started</p>
      <h2 className="display-2 mt-5 text-balance">It started with our dog, Tobler.</h2>
      <ScrollFadeWords
        as="p"
        className="mt-7 max-w-xl text-xl leading-relaxed text-ink sm:text-2xl"
        text="When Tobler fell ill, we spent long nights at the vet clinic. What stayed with us was the strangers who kept coming in — carrying a hurt dog or cat they’d found, then learning the treatment cost more than they had."
      />
      <blockquote data-story="quote" className="mt-8 max-w-lg text-2xl font-medium leading-snug tracking-tight text-ink/90 sm:text-3xl">
        &ldquo;These weren&apos;t even their animals. People just couldn&apos;t walk past one that
        was hurt. We figured the least we could do was help with the part they couldn&apos;t.&rdquo;
      </blockquote>
      <p data-story="attr" className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink/65">— The Mundhra family</p>
      <Link data-story="attr" href="/blog/the-dog-who-started-it-all" className="link-secondary mt-7 inline-block text-sm">Read Tobler&apos;s full story →</Link>
    </>
  );
}

/** Static editorial layout — asymmetric, oversized pull-quote, parallax image. */
function StaticStory() {
  return (
    <section className="section-y-lg">
      <div className="container-c grid items-center gap-12 lg:grid-cols-[9fr_11fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <EditorialFigure src={IMAGES[0].src} alt={IMAGES[0].alt} ratio="aspect-[4/5]" parallax speed={0.06} caption="The animals we care for" />
        </Reveal>
        <Reveal delay={100} className="order-1 lg:order-2 lg:pl-4">
          <StoryText />
        </Reveal>
      </div>
    </section>
  );
}

export function ToblerStory() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Reliability over animation: the story always uses the static two-column
  // reveal layout. The pinned-scroll path below is retained but disabled so a
  // rapid scroll can never leave this section blank. (Punch list P2/P4.)
  const enabled = false;

  useEffect(() => {
    if (!enabled || !rootRef.current) return;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !rootRef.current) return;
      const gsap = gsapMod.default ?? gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context((self) => {
        const root = self!.selector!;
        const imgs = root("[data-story-img]") as HTMLElement[];
        const para = root("[data-story='para']")[0];
        const quote = root("[data-story='quote']")[0];
        const attrs = root("[data-story='attr']") as HTMLElement[];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-story-pin]",
            start: "top top",
            end: "+=2400",
            scrub: 0.6,
            pin: "[data-story-pin]",
            anticipatePin: 1,
          },
        });

        // Text progression
        tl.from(para, { opacity: 0, y: 24, duration: 1, ease: "power2.out" }, 0.05)
          .from(quote, { opacity: 0, y: 24, duration: 1, ease: "power2.out" }, 0.45)
          .to(quote, { scale: 1.015, transformOrigin: "left center", duration: 0.6, ease: "power1.out" }, 0.9)
          .from(attrs, { opacity: 0, y: 16, stagger: 0.12, duration: 0.8, ease: "power2.out" }, 1.1);

        // Image cross-fade (img[1], img[2] fade in over the base image) + subtle scale
        if (imgs[1]) tl.fromTo(imgs[1], { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1, ease: "power1.inOut" }, 0.55);
        if (imgs[2]) tl.fromTo(imgs[2], { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1, ease: "power1.inOut" }, 1.15);
      }, rootRef);

      cleanup = () => ctx.revert();
    })();

    return () => { cancelled = true; cleanup(); };
  }, [enabled]);

  // Until we know the gates (null), render the safe static layout so content is
  // always in the DOM (JS-off / SSR). Switch to the pinned build only when enabled.
  if (!enabled) return <StaticStory />;

  return (
    <div ref={rootRef}>
      <section data-story-pin className="flex min-h-screen items-center py-24 sm:py-32">
        <div className="container-c grid w-full items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="img-hover relative aspect-[4/5]">
              {IMAGES.map((im, i) => (
                <img
                  key={im.src}
                  data-story-img
                  src={im.src}
                  alt={im.alt}
                  className="absolute inset-0 h-full w-full object-cover will-change-transform"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <StoryText />
          </div>
        </div>
      </section>
    </div>
  );
}
