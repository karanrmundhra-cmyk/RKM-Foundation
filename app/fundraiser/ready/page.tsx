import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Your Fundraiser Is Ready", robots: { index: false, follow: false } };

export default function FundraiserReady() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center">
      <div className="container-c max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="display-2 mt-6 text-balance">Your fundraiser is ready.</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          Your fundraiser page has been created successfully. Share your page with friends and
          family to start receiving support for rescued animals.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="btn-copper">Share on WhatsApp</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="btn-light">LinkedIn</a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="btn-light">Facebook</a>
        </div>
        <p className="mt-8 leading-relaxed text-ink/70">
          Donations made through your fundraiser go directly to RKM Foundation and support rescued
          animals receiving food, treatment, and safe shelter. Donors receive an instant receipt,
          and you&apos;ll be able to track the progress of your fundraiser.
        </p>
        <div className="mt-8">
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
