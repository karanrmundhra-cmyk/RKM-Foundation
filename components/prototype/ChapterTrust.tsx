"use client";
import { Reveal } from "./Reveal";

const CREDENTIALS = [
  { label: "12A", value: "47522" },
  { label: "80G", value: "CITE80G9792014-152016-17" },
  { label: "CSR", value: "CSR00089305" },
  { label: "DARPAN / Reg", value: "E-30560" },
  { label: "PAN", value: "AACTR4271L" },
];

/**
 * Ch5 — Trust & transparency. Real registrations rendered as elegant
 * monospace credential chips on ink. All values are real; no placeholders.
 * Reveal degrades to static under reduced-motion.
 */
export function ChapterTrust() {
  return (
    <section className="bg-ink py-20 text-snow sm:py-28">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-3 text-copper-light">CREDENTIALS</p>
          <h2 className="h-display max-w-2xl text-3xl sm:text-4xl">
            Registered. Audited. Accountable.
          </h2>
        </Reveal>

        <ul className="mt-12 flex flex-wrap gap-4">
          {CREDENTIALS.map((c, i) => (
            <Reveal as="li" key={c.label} delay={i * 0.06}>
              <div className="rounded-xl bg-white/[0.04] px-5 py-4 ring-1 ring-white/10">
                <div className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-copper-light">
                  {c.label}
                </div>
                <div className="mt-1 font-mono text-sm text-snow/90">
                  {c.value}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-base text-snow/70">
            Eligible donations receive 80G tax benefits, and we issue 10BD/10BE
            statements as required — so every contribution is documented and
            accountable.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
