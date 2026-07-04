"use client";
import Link from "next/link";

/**
 * Persistent prototype top bar: brand + a clear "DEMO PROTOTYPE" pill and a
 * link back to the live site. Sits above all chapters, fixed.
 */
export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-content items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-tight text-snow">
            RKM Foundation
          </span>
          <span className="rounded-full bg-copper/15 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-copper-light ring-1 ring-copper/40">
            Demo Prototype — not the live site
          </span>
        </div>
        <Link
          href="/"
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-snow/70 transition-colors hover:text-copper-light focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
        >
          ← Back to live site
        </Link>
      </div>
    </header>
  );
}
