import Link from "next/link";
import Reveal from "@/components/Reveal";

/**
 * CsrPillarShowcase — mounts the APPROVED, LOCKED CSR pillar slider.
 *
 * The slider is the self-contained, sign-off'd file served by
 * `app/api/csr-showcase/route.ts` (byte-for-byte identical to
 * `CSR Slider/CSR-Pillar-Showcase.html`). It ships its own inline CSS/JS and
 * expects a full viewport (`position:fixed; inset:0; body{overflow:hidden}`).
 * Embedding it verbatim in an <iframe> is the only faithful integration: the
 * iframe gives it its own document + viewport, so it fills the frame (a section)
 * rather than the whole page, and its inline script runs in its own context.
 * NOTHING inside the slider is modified.
 *
 * It is served from `/api/csr-showcase` (not `/public`) because the middleware's
 * strict nonce CSP — which would block the slider's inline <script> — excludes
 * `/api/*`; the route sets its own scoped CSP. See CSR Slider/09_INTEGRATION_MERGE_PLAN.md.
 *
 * The lead-in copy + compliance note below live in the page DOM (crawlable,
 * localisable); the per-pillar Schedule VII detail is carried by the slider.
 * The iframe sits in a contained, hairline-framed "gallery" plate (no viewport-
 * width tricks) so it reads as a deliberate showcase with zero horizontal-scroll.
 */
type CsrPillarShowcaseProps = {
  eyebrow: string;
  heading: string;
  intro: string;
  iframeTitle: string;
  note: string;
  ctaHref: string;
  ctaLabel: string;
};

export default function CsrPillarShowcase({
  eyebrow,
  heading,
  intro,
  iframeTitle,
  note,
  ctaHref,
  ctaLabel,
}: CsrPillarShowcaseProps) {
  return (
    <section className="section-y" aria-labelledby="pillars-heading">
      <div className="container-c">
        <Reveal className="max-w-3xl">
          <p className="eyebrow-index">{eyebrow}</p>
          <h2 id="pillars-heading" className="display-2 mt-5 max-w-[14ch] text-balance">
            {heading}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">{intro}</p>
        </Reveal>

        {/* Contained gallery plate for the locked slider — hairline frame,
            no full-bleed / no 100vw, so it never introduces horizontal scroll. */}
        <div className="mt-12 overflow-hidden border border-ink/12 bg-snow">
          <iframe
            src="/api/csr-showcase"
            title={iframeTitle}
            loading="lazy"
            className="block w-full border-0"
            style={{ height: "min(86vh, 860px)", minHeight: 600 }}
          />
        </div>

        <Reveal className="mt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-ink/65">{note}</p>
        </Reveal>
        <Reveal className="mt-6">
          <Link href={ctaHref} className="link-secondary">
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
