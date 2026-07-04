"use client";
import Link from "next/link";
import { useState } from "react";

/**
 * ImpactSlider — interactive "drag to see what your gift does" control.
 *
 * Enhancement, not a dependency: it renders a real default value (₹5,000 + its
 * impact line) on first paint, so without JS the content is fully visible and
 * legible. Dragging updates the amount + impact line live (announced to screen
 * readers via aria-live). No auto-animation, so nothing to gate for reduced
 * motion. The native range input is keyboard- and touch-accessible.
 *
 * Reuses existing gift copy — no new claims, no fabricated numbers.
 */

const MIN = 1000;
const MAX = 25000;
const STEP = 500;
const DEFAULT = 5000;

function impactFor(amount: number): string {
  if (amount < 2500) return "Warm meals for a rescued animal this week.";
  if (amount < 5000) return "Two weeks of warm meals for a rescued animal getting back on its feet.";
  if (amount < 10000) return "A full month of food and care for 2–3 animals in our shelter.";
  if (amount < 25000) return "Emergency medical treatment — the surgery or care that saves a life.";
  return "A month of food, care, and treatment for animals across the shelter.";
}

export default function ImpactSlider() {
  const [amount, setAmount] = useState(DEFAULT);
  const pct = ((amount - MIN) / (MAX - MIN)) * 100;
  const formatted = amount.toLocaleString("en-IN");

  return (
    <div className="mt-8 rounded-[1.25rem] bg-snow p-6 ring-1 ring-ink/[0.08] sm:p-7">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-copper-dark">Drag to see your impact</p>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="display-2 text-[2.5rem] leading-none text-copper-dark sm:text-[3rem]">₹{formatted}</span>
        {amount >= MAX && <span className="text-xs font-medium text-ink/65">+</span>}
      </div>

      <p aria-live="polite" className="mt-3 min-h-[3rem] max-w-md text-base leading-relaxed text-ink/70">
        {impactFor(amount)}
      </p>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Quick amounts">
        {[2500, 5000, 10000].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setAmount(v)}
            aria-pressed={amount === v}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold ring-1 transition-colors ${amount === v ? "bg-copper-dark text-white ring-copper-dark" : "bg-white text-ink/70 ring-ink/15 hover:ring-copper hover:text-copper-dark"}`}
          >
            ₹{v.toLocaleString("en-IN")}
          </button>
        ))}
      </div>
      <input
        type="range"
        min={MIN}
        max={MAX}
        step={STEP}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        aria-label="Donation amount in rupees"
        aria-valuetext={`₹${formatted}`}
        className="impact-range mt-5 w-full"
        style={{ ["--pct" as string]: `${pct}%` }}
      />
      <div className="mt-1.5 flex justify-between text-[0.7rem] font-medium text-ink/65">
        <span>₹{MIN.toLocaleString("en-IN")}</span>
        <span>₹{MAX.toLocaleString("en-IN")}+</span>
      </div>

      <Link href="/donate-now#donation" className="btn-copper mt-6 w-full justify-center">
        Give ₹{formatted}
      </Link>
    </div>
  );
}
