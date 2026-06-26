import Link from "next/link";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import ImpactSlider from "@/components/ImpactSlider";
import { HoverLift } from "@/components/Motion";

/**
 * Section 4 — WHAT YOUR GIFT DOES. V3 editorial rebuild.
 * From three equal cards → an asymmetric layout: a sticky left headline column
 * and the gift tiers as a spacious, ruled list with oversized ₹ numerals.
 * CountUp renders the real value from first paint (reduced-motion safe).
 */

const GIFTS = [
  { value: 2500, outcome: "Two weeks of warm meals for a rescued animal getting back on its feet.", cta: "Give ₹2,500" },
  { value: 5000, outcome: "A full month of food and care for 2–3 animals in our shelter.", cta: "Give ₹5,000" },
  { value: 10000, outcome: "Emergency medical treatment — the surgery or care that saves a life.", cta: "Give ₹10,000" },
];

export function GiftSection() {
  return (
    <section className="section-y">
      <div className="container-c grid gap-x-12 gap-y-12 lg:grid-cols-12">
        {/* Left — sticky headline column */}
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-28">
            <p className="eyebrow-index">What Your Gift Does</p>
            <h2 className="display-2 mt-5 text-balance">No vague promises.</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">
              Here&apos;s exactly what your money buys — and we&apos;ll show you the life it changed.
            </p>
            <ImpactSlider />
            <Link href="/donate-now#donation" className="link-secondary mt-6 inline-block">
              Give any amount you choose →
            </Link>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ink/65">256-bit secure · Razorpay · instant 80G receipt</p>
          </Reveal>
        </div>

        {/* Right — ruled tier list */}
        <div className="lg:col-span-7">
          {GIFTS.map((g, i) => (
            <Reveal key={g.value} delay={i * 70}>
              <div className={`grid grid-cols-1 items-center gap-x-8 gap-y-4 border-t border-ink/12 py-9 sm:grid-cols-[auto_1fr_auto] ${i === GIFTS.length - 1 ? "border-b" : ""}`}>
                <div className="display-3 text-copper-dark sm:min-w-[5ch]">
                  <CountUp to={g.value} prefix="₹" duration={1.1} />
                </div>
                <p className="text-base leading-relaxed text-ink/70">{g.outcome}</p>
                <HoverLift>
                  <Link href="/donate-now#donation" className="btn-dark whitespace-nowrap">{g.cta}</Link>
                </HoverLift>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
