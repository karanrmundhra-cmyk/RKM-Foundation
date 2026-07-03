import Image from "next/image";
import { TESTIMONIALS } from "@/lib/content";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section className="section-y">
      <div className="container-c">
        <Reveal>
          <p className="eyebrow-index">Testimonials</p>
          <h2 className="display-2 mt-5 max-w-[16ch] text-balance">Don&apos;t take our word for it.</h2>
        </Reveal>
        <div tabIndex={0} role="region" aria-label="Donor testimonials — scroll horizontally" className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-copper-dark sm:-mx-8 sm:px-8 [scrollbar-width:thin]">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name} className="card w-[85%] max-w-sm shrink-0 snap-center p-6 sm:w-[45%] lg:w-[31%]">
              <svg width="26" height="26" viewBox="0 0 24 24" className="text-copper" fill="currentColor" aria-hidden><path d="M10 7H6a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-7Zm11 0h-4a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-7Z" opacity=".25"/><path d="M9 6H5.8A2.8 2.8 0 0 0 3 8.8v3.4A2.8 2.8 0 0 0 5.8 15H7v1.5A2.5 2.5 0 0 1 4.5 19H4v2h.5A4.5 4.5 0 0 0 9 16.5V6Zm11 0h-3.2A2.8 2.8 0 0 0 14 8.8v3.4a2.8 2.8 0 0 0 2.8 2.8H18v1.5a2.5 2.5 0 0 1-2.5 2.5H15v2h.5a4.5 4.5 0 0 0 4.5-4.5V6Z"/></svg>
              <blockquote className="mt-4 text-sm leading-relaxed text-ink/80">&quot;{t.quote}&quot;</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Image src={t.img} alt={t.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-ink/60">{t.place}</div>
                  <div className="text-xs font-medium text-copper-dark">{t.context}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
