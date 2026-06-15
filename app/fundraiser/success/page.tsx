import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Fundraiser Goal Reached", robots: { index: false, follow: false } };

export default function FundraiserSuccess() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center">
      <div className="container-c max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="display-2 mt-6 text-balance">This fundraiser has reached its goal.</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          Because of you and everyone who supported this campaign, rescued animals will receive
          food, treatment, and safe shelter. Thank you for being part of this moment.
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          All donations raised go directly to RKM Foundation and support rescued animals receiving
          care through our programmes. Supporters may receive updates showing how these
          contributions are helping animals in need.
        </p>
        <p className="mt-6 text-sm font-medium text-ink/80">Continue spreading the hope.</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a href="https://wa.me/?text=Our%20fundraiser%20has%20successfully%20reached%20its%20goal!%20Because%20of%20the%20support%20from%20friends%20and%20family%2C%20rescued%20animals%20will%20receive%20food%2C%20treatment%2C%20and%20safe%20shelter%20through%20RKM%20Foundation." target="_blank" rel="noopener noreferrer" className="btn-copper">Share This Fundraiser</a>
          <Link href="/" className="btn-light">Return to Home</Link>
        </div>
        <p className="mt-10 text-sm text-ink/60">
          Have questions?{" "}
          <a href="mailto:info@rkm.support" className="link-secondary">info@rkm.support</a>
          {" · "}
          <a href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer" className="link-secondary">WhatsApp</a>
        </p>
      </div>
    </section>
  );
}
