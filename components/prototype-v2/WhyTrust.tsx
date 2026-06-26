import Reveal from "@/components/Reveal";

/**
 * Section 5 — WHY TRUST. V3 editorial rebuild (light). Same copy + cert links.
 * Larger headline, more air, asymmetric intro, restrained certificate row.
 * Content always renders visible (Reveal is enhancement only).
 */

const TRUST = [
  { title: "You see where it goes", desc: "Photos and videos from the field after every campaign." },
  { title: "Registered & tax-deductible", desc: "A registered trust under 12A, 80G & CSR. Every gift gets a receipt." },
  { title: "Come see for yourself", desc: "Join a feeding drive or visit the shelter. Our doors are open." },
];

const CERTS = [
  { label: "12A Registered", file: "RKM_Foundation_12A_Certificate.pdf" },
  { label: "80G Tax Benefits", file: "RKM_Foundation_80G_Certificate.pdf" },
  { label: "CSR Eligible", file: "RKM_Foundation_CSR_Certificate.pdf" },
  { label: "DARPAN Registered", file: "RKM_Foundation_Darpan_Registration.pdf" },
];

export function WhyTrust() {
  return (
    <section className="bg-snow section-y-lg">
      <div className="container-c">
        <Reveal>
          <p className="eyebrow-index">Why Trust RKM Foundation</p>
          <h2 className="display-2 mt-5 max-w-[18ch] text-balance">Give with confidence. See the change you create.</h2>
        </Reveal>

        <div className="mt-20 grid gap-x-16 gap-y-14 sm:grid-cols-2">
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={i * 70}>
              <div className="flex gap-5">
                <span className="mt-1 text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                <div>
                  <h3 className="display-3 text-[1.35rem] sm:text-[1.5rem]">{t.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-ink/65">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Registered & Transparent band */}
        <Reveal className="mt-24 border-t border-ink/[0.07] pt-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow-index">Registered &amp; Transparent</p>
              <h3 className="display-3 mt-4">Every rupee is accounted for.</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/65">
                Reg. E-30560 — every certificate is downloadable.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">
              {CERTS.map((c) => (
                <a
                  key={c.label}
                  href={`/downloads/${c.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.label} — download certificate PDF`}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink/75 ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:text-copper-dark hover:ring-copper/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                >
                  {c.label}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden className="transition-transform group-hover:translate-y-0.5 motion-reduce:transform-none"><path d="M12 4v12m0 0 4-4m-4 4-4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
