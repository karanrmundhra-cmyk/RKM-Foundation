import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Order Could Not Be Completed", robots: { index: false, follow: false } };

export default function ShopOrderFailed() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center">
      <div className="container-c max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M12 8v5m0 3.5v.5" strokeLinecap="round"/><circle cx="12" cy="12" r="9.25"/></svg>
        </div>
        <h1 className="display-2 mt-6 text-balance">Your order could not be completed.</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          Your order could not be processed. No amount has been charged — please try again.
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          Sometimes payments may fail due to network interruptions or bank authorisation issues.
          You can try the checkout again using the same or a different payment method.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/shop" className="btn-dark">Try Again</Link>
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
