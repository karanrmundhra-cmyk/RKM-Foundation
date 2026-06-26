import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Subscription Confirmed",
  description: "Welcome to the RKM Foundation community.",
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmedPage() {
  return (
    <section className="bg-snow pb-24 pt-32 sm:pt-40">
      <div className="container-c max-w-xl text-center">
        <Reveal>
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="display-2 mt-6 text-balance">
            Welcome to the RKM Foundation community.
          </h1>
          <p className="mt-4 leading-relaxed text-ink/70">
            You’re all set. We’ll share stories of hope, field updates, and ways to make a
            difference — straight to your inbox.
          </p>
          <div className="mt-8">
            <Link href="/" className="btn-dark">Back to Home</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
