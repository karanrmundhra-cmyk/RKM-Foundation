"use client";
// Route-level error boundary (§14). Catches render/runtime errors in any page
// segment and shows an on-brand recovery screen instead of a white crash.
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surface the digest in the console for debugging; no PII, never throws.
    if (process.env.NODE_ENV !== "production") console.error(error);
  }, [error]);

  return (
    <section className="bg-snow pb-24 pt-40 text-center">
      <div className="container-c max-w-xl">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="h-display mt-4 text-4xl sm:text-5xl lg:text-6xl">A small hiccup.</h1>
        <p className="mt-5 text-ink/70">
          This page ran into an unexpected error. Your details are safe and nothing was charged.
          <br />
          <span className="font-medium text-ink">Please try again — the mission continues.</span>
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={() => reset()} className="btn-dark">Try again</button>
          <Link href="/" className="btn-light">Return to Home</Link>
          <Link href="/donate-now" className="btn-light">Donate</Link>
        </div>
        <p className="mt-10 text-sm text-ink/60">
          Still stuck? <a className="link-secondary" href="mailto:info@rkm.support">info@rkm.support</a> ·{" "}
          <a className="link-secondary" href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </p>
      </div>
    </section>
  );
}
