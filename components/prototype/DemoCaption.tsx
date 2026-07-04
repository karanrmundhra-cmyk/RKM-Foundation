"use client";

/**
 * Small, always-visible disclaimer rendered near placeholder imagery so the
 * founder can never mistake a demo asset for real photography.
 */
export function DemoCaption({ className = "" }: { className?: string }) {
  return (
    <p
      className={`pointer-events-none select-none text-[0.625rem] font-medium uppercase tracking-[0.18em] text-copper-light/80 ${className}`}
    >
      DEMO ASSET — placeholder for real photography
    </p>
  );
}
