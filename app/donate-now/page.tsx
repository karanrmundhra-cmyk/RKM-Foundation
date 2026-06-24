import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import DonateWidget from "@/components/DonateWidget";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import ScrollFadeWords from "@/components/ScrollFadeWords";
import { TESTIMONIALS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate",
  description: "Your generosity helps turn care into meaningful action for rescued animals. 80G tax benefits, instant receipts, full transparency.",
  openGraph: { title: "Donate to RKM Foundation", description: "Your gift feeds, heals, and shelters rescued animals across India. 80G tax benefits, instant receipts, full transparency.", type: "website" },
  alternates: { canonical: "/donate-now", languages: { en: "/donate-now", hi: "/hi/donate-now", "x-default": "/donate-now" } },
};

const GIFTS = [
  { amt: 2500, does: "Two weeks of meals for a rescued animal" },
  { amt: 5000, does: "A month of food & care for 2–3 animals" },
  { amt: 10000, does: "Emergency medical treatment" },
];

export default function DonatePage() {
  return (
    <>
      <section className="bg-snow pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="container-c grid items-start gap-x-16 gap-y-10 lg:grid-cols-12">
          {/* Editorial left column — below the widget on mobile so the form is reached first */}
          <Reveal className="order-2 lg:order-1 lg:col-span-6">
            <p className="eyebrow-index">Donate</p>
            <h1 className="display-2 mt-5 text-balance">
              Your generosity turns care into <span className="text-copper-dark">action.</span>
            </h1>
            <ScrollFadeWords
              as="p"
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink"
              text="Every rupee goes straight to the animals — a meal, a vet’s visit, a safe place to heal. And we’ll send you photos from the field, so you see exactly what it changed."
            />

            {/* Ruled gift list (de-carded) */}
            <dl className="mt-8 border-t border-ink/12">
              {GIFTS.map((g) => (
                <div key={g.amt} className="flex items-baseline gap-6 border-b border-ink/12 py-5">
                  <dt className="display-3 w-[5ch] shrink-0 text-[1.6rem] text-copper-dark"><CountUp to={g.amt} prefix="₹" /></dt>
                  <dd className="text-ink/70">{g.does}</dd>
                </div>
              ))}
            </dl>

            {/* Emotion before the ask + peer proof at the decision point (§8/§9).
                Uses the real Tobler origin story + a real monthly donor's words. */}
            <div className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-ink/10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-dark">Why this matters</p>
              <p className="mt-3 leading-relaxed text-ink/75">
                RKM Foundation began with one dog — Tobler — and the strangers we kept meeting at the
                vet, carrying in animals that weren&apos;t theirs because they couldn&apos;t walk past them.
                Your gift is how that care keeps going.
              </p>
              <Link href="/blog/the-dog-who-started-it-all" className="link-secondary mt-3 inline-block text-sm">
                Read Tobler&apos;s story →
              </Link>
              <figure className="mt-6 border-t border-ink/10 pt-5">
                <blockquote className="text-sm leading-relaxed text-ink/80">&ldquo;{TESTIMONIALS[0].quote}&rdquo;</blockquote>
                <figcaption className="mt-2 text-xs font-semibold text-ink/60">
                  {TESTIMONIALS[0].name} · {TESTIMONIALS[0].place} · {TESTIMONIALS[0].context}
                </figcaption>
              </figure>
            </div>

            <p className="mt-6 text-sm text-ink/60">
              Prefer another way?{" "}
              <Link href="/other-ways-to-give" className="link-secondary">Give time, materials, or skills →</Link>
            </p>
          </Reveal>

          {/* Donation widget — flow unchanged. First on mobile. */}
          <Reveal delay={120} className="order-1 lg:order-2 lg:col-span-6">
            <div id="donation" className="scroll-mt-28">
              <Suspense fallback={<div className="card h-96 animate-pulse" />}>
                <DonateWidget />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
