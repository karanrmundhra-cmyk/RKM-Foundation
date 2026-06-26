"use client";
import Image from "next/image";
import { useState } from "react";
import { CSR_PILLARS } from "@/lib/content";

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/15 text-copper-dark transition-colors group-hover:border-copper/40">
      <span className="absolute h-[2px] w-3 rounded bg-current" />
      <span className={`absolute h-3 w-[2px] rounded bg-current transition-transform duration-300 ${open ? "scale-y-0" : "scale-y-100"}`} />
    </span>
  );
}

export default function CsrAccordion() {
  const [open, setOpen] = useState<number>(0); // first pillar open by default

  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-ink/12 bg-white">
      {CSR_PILLARS.map((p, i) => {
        const isOpen = open === i;
        return (
          <div key={p.name} className={`border-b border-ink/10 last:border-b-0 ${isOpen ? "bg-snow" : ""}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`pillar-${i}-panel`}
              className="group flex w-full items-center gap-4 px-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/40 sm:gap-6 sm:px-7"
            >
              <span className="text-sm font-semibold tabular-nums text-copper-dark">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">
                <span className="display-3 block text-[1.25rem] leading-tight sm:text-[1.55rem]">{p.name}</span>
                {!isOpen && p.copy && (
                  <span className="mt-1 hidden text-sm text-ink/65 sm:block">{p.copy}</span>
                )}
              </span>
              <span className="hidden text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink/65 sm:block">{p.schedule}</span>
              <PlusMinus open={isOpen} />
            </button>

            <div
              id={`pillar-${i}-panel`}
              role="region"
              aria-label={p.name}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="grid gap-6 px-5 pb-8 sm:px-7 lg:grid-cols-2 lg:items-center lg:gap-10">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink/5 lg:order-2">
                    <Image
                      src={p.img}
                      alt={`${p.name} — RKM Foundation CSR pillar`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="lg:order-1">
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-copper-dark sm:hidden">{p.schedule}</p>
                    {p.copy && <p className="mt-1 text-lg font-medium leading-snug text-ink sm:mt-0">{p.copy}</p>}
                    <p className="mt-4 leading-relaxed text-ink/70">{p.desc}</p>
                    {p.impact && p.impact.length > 0 && (
                      <div className="mt-6">
                        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-ink/65">Impact areas</p>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {p.impact.map((x) => (
                            <li key={x} className="rounded-full bg-copper/10 px-3 py-1 text-xs font-medium text-[#795719]">{x}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {p.note && (
                      <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink/65">
                        <span className="font-semibold text-ink/65">Why this clause: </span>{p.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
