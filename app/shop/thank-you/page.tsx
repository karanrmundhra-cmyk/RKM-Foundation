import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Thank You — Order Confirmed", robots: { index: false, follow: false } };

export default function ShopThankYou() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center">
      <div className="container-c max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="display-2 mt-6 text-balance">Thank you — your order has been confirmed.</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          Our team will be in touch by email to confirm your order details and share your tax
          invoice. If you have any questions in the meantime, please contact us.
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          Your order will be processed and dispatched within 1–3 working days, and we&apos;ll let
          you know once it has shipped.
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
