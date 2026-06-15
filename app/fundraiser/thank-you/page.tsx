import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Thank You — Fundraiser Donation", robots: { index: false, follow: false } };

export default function FundraiserThankYou() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center">
      <div className="container-c max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="display-2 mt-6 text-balance">Thank you — your donation was successful.</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          Your contribution has been received with gratitude. If your gift was made through our
          donation page, your 80G receipt will arrive by email shortly. Any questions? Just contact us.
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          Your donation will support rescued animals at RKM Foundation&apos;s shelter — and we&apos;ll
          send you photos of the animals your fundraiser is feeding and healing.
        </p>
        <p className="mt-6 text-sm font-medium text-ink/80">
          Help spread the word and inspire others to support rescued animals.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a href="https://wa.me/?text=I%20just%20supported%20a%20fundraiser%20helping%20rescued%20animals%20at%20RKM%20Foundation.%20Every%20contribution%20helps%20provide%20food%2C%20treatment%2C%20and%20safe%20shelter." target="_blank" rel="noopener noreferrer" className="btn-light">Share on WhatsApp</a>
          <Link href="/" className="btn-dark">Return to Home</Link>
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
