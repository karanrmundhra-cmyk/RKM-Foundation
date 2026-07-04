import Link from "next/link";
import Reveal from "@/components/Reveal";
import ImpactSlider from "@/components/ImpactSlider";

/**
 * Section 4 — WHAT YOUR GIFT DOES. H-03 (approved 4 Jul): the interactive
 * slider is now the single impact ladder — the former three-card tier list
 * duplicated the same amounts/outcomes and was removed. Preset amounts live on
 * as tap-able snap-stops inside the slider.
 */
export function GiftSection() {
  return (
    <section className="section-y">
      <div className="container-c max-w-2xl text-center">
        <Reveal>
          <p className="eyebrow-index justify-center">What Your Gift Does</p>
          <h2 className="display-2 mt-5 text-balance">No vague promises.</h2>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ink/65">
            Here&apos;s exactly what your gift buys.
          </p>
          <div className="text-left">
            <ImpactSlider />
          </div>
          <Link href="/donate-now#donation" className="link-secondary mt-8 inline-block">
            Give any amount you choose &rarr;
          </Link>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ink/65">256-bit secure &middot; Razorpay &middot; instant 80G receipt</p>
        </Reveal>
      </div>
    </section>
  );
}
