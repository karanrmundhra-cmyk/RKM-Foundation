import Link from "next/link";
import Reveal from "@/components/Reveal";

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
