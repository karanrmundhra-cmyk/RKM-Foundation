import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";
import CTABanner from "@/components/CTABanner";
import ScrollFadeWords from "@/components/ScrollFadeWords";
import CsrAccordion from "@/components/CsrAccordion";
import { CSR_PILLARS, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "CSR Partnerships",
  description:
    "Partner with RKM Foundation — a CSR-1 registered implementation partner (80G | 12A) delivering audit-ready animal-welfare programmes you can visit and verify.",
  alternates: { canonical: "/csr", languages: { en: "/csr", hi: "/hi/csr", "x-default": "/csr" } },
};

const WHY = [
  { title: "Fully Compliant", desc: "Schedule VII aligned, with utilisation certificates." },
  { title: "Transparent", desc: "Documented reporting and field updates throughout." },
  { title: "Customised", desc: "Aligned to your CSR policy and geography." },
  { title: "Engaging", desc: "Employee volunteering opportunities built in." },
];

const PROCESS = [
  { title: "Connect", desc: "Share your CSR goals and we schedule a consultation." },
  { title: "Customise", desc: "Programme designed to align with your CSR policy and budget." },
  { title: "Deliver", desc: "We implement, report, and document measurable outcomes." },
];

const DELIVERABLES = [
  "Utilisation certificate",
  "Impact summary",
  "Audit support documentation",
  "Site visit (if required)",
];

const DOWNLOADS = [
  { kind: "PDF", title: "Partnership Overview", desc: "Programme design, compliance, and reporting at a glance.", file: "RKM_Foundation_CSR_Partnership_Overview.pdf" },
  { kind: "ZIP", title: "Registration Certificates", desc: "80G, 12A, and CSR-1 certificates in one bundle.", file: "RKM_Foundation_Registration_Certificates.zip" },
];

export default function CSRPage() {
  return (
    <>
      {/* Hero — facts kept high: eligibility line + CTA visible without scrolling */}
      <section className="bg-snow pb-14 pt-28 sm:pb-20 sm:pt-32">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">CSR Partnerships · CSR-1 · 80G · 12A</p>
            <h1 className="display-2 mt-5 text-balance">CSR funds that end up where you can see them.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
              A CSR-1 registered implementation partner (80G | 12A). We run animal-welfare
              programmes your team can visit, audit, and report on with confidence.
            </p>
            <div className="mt-8">
              <Link href="#consultation" className="btn-copper">Request Partnership Consultation</Link>
            </div>
            <p className="mt-4 text-sm text-ink/60">An NGO doing good work on the ground? <Link href="/partner-with-us" className="link-secondary">See Partner With Us →</Link></p>
          </Reveal>
        </div>
      </section>

      {/* Why corporates choose — numbered editorial rows */}
      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">Why Corporates Choose RKM</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">Compliant on paper. Visible on the ground.</h2>
          </Reveal>
          <div className="mt-16 grid gap-x-16 gap-y-12 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <div className="flex gap-5">
                  <span className="mt-1 text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                  <div>
                    <h3 className="display-3 text-[1.35rem] sm:text-[1.5rem]">{w.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-ink/65">{w.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship opportunity */}
      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal className="max-w-3xl">
            <p className="eyebrow-index">Ongoing Opportunity</p>
            <h2 className="display-2 mt-5 text-balance">Animal Welfare (Schedule VII).</h2>
            <ScrollFadeWords
              as="p"
              className="mt-7 max-w-2xl text-lg leading-relaxed text-ink"
              text="A permanent shelter for 30 rescued dogs and cats — a real place your team can walk through. Partners may contribute fully or partially; the detailed plan is shared during consultation."
            />
            <div className="mt-9">
              <Link href="#consultation" className="btn-dark">Discuss This Opportunity</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Seven pillars — ruled editorial rows */}
      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">Design a Programme Across Any Pillar</p>
            <h2 className="display-2 mt-5 max-w-[14ch] text-balance">Seven Pillars of Hope.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
              Each pillar maps to Schedule VII of the Companies Act, 2013 — so your CSR contribution
              stays fully compliant while putting your money where it matters to you.
            </p>
          </Reveal>
          <Reveal><CsrAccordion /></Reveal>
          <Reveal className="mt-10">
            <p className="max-w-2xl text-lg leading-relaxed text-ink/70">
              Many partners combine pillars — animal welfare with environment, or community support
              with health. We design around your policy.{" "}
              <Link href="#consultation" className="link-secondary">Start a conversation →</Link>
            </p>
          </Reveal>
          <Reveal className="mt-6">
            <p className="max-w-3xl text-xs leading-relaxed text-ink/65">
              Pillar mappings indicate the Schedule VII category each programme is designed around.
              CSR-eligible activities are undertaken in India in accordance with the Companies (CSR Policy)
              Rules, 2014; the final clause classification is confirmed with your team during programme design.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process + timeline */}
      <section className="bg-snow section-y">
        <div className="container-c grid gap-x-16 gap-y-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow-index">Simple Partnership Process</p>
            <h2 className="display-2 mt-5 text-balance">From first call to a project you can visit.</h2>
            <div className="mt-10">
              {PROCESS.map((p, i) => (
                <div key={p.title} className={`flex gap-5 border-t border-ink/12 py-6 ${i === PROCESS.length - 1 ? "border-b" : ""}`}>
                  <span className="text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                  <div>
                    <h3 className="display-3 text-[1.3rem]">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/65">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow-index">Timeline &amp; Deliverables</p>
            <h2 className="display-2 mt-5 text-balance">Paperwork your finance team will thank you for.</h2>
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-ink/65">Typical project planning timeline</p>
            <p className="display-2 mt-2 text-copper-dark">2–6 weeks</p>
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-ink/65">Deliverables may include</p>
            <ul className="mt-3 border-t border-ink/12">
              {DELIVERABLES.map((d) => (
                <li key={d} className="flex items-center gap-3 border-b border-ink/12 py-3.5 text-ink/70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0 text-copper-dark" aria-hidden>
                    <path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Downloads — ruled rows */}
      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">Downloads</p>
            <h2 className="display-2 mt-5 text-balance">Partnership information.</h2>
          </Reveal>
          <div className="mt-12 border-t border-ink/12">
            {DOWNLOADS.map((d, i) => (
              <Reveal key={d.file} delay={i * 70}>
                <a href={`/downloads/${d.file}`} className="group grid items-center gap-x-8 gap-y-2 border-b border-ink/12 py-7 transition-colors hover:text-copper-dark lg:grid-cols-12">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-copper-dark lg:col-span-1">{d.kind}</span>
                  <h3 className="display-3 text-[1.4rem] lg:col-span-4">{d.title}</h3>
                  <p className="leading-relaxed text-ink/65 lg:col-span-6">{d.desc}</p>
                  <span className="text-sm font-semibold lg:col-span-1 lg:text-right">Download →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation form — flow unchanged */}
      <section id="consultation" className="bg-snow section-y scroll-mt-24">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">Request a Consultation</p>
            <h2 className="display-2 mt-5 text-balance">Tell us your CSR goals. We&apos;ll build the programme.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
              Kindly share your details below, and our team will reach out to take the discussion forward.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <FormShell
              formType="csr"
              fields={[
                { name: "name", label: "Full Name", required: true, half: true, placeholder: "Enter your full name" },
                { name: "phone", label: "Contact Number", type: "tel", required: true, half: true, placeholder: "Enter your mobile number" },
                { name: "email", label: "Email ID", type: "email", required: true, half: true, placeholder: "Enter your email address" },
                { name: "company", label: "Company Name", required: true, half: true, placeholder: "Enter your company name" },
                { name: "pillar", label: "Pillar of Interest", options: [...CSR_PILLARS.map((p) => p.name), "Multi-pillar"] },
                { name: "budget", label: "Indicative CSR Budget", options: ["Under ₹5 Lakh", "₹5–25 Lakh", "₹25 Lakh–1 Crore", "Above ₹1 Crore", "Prefer to discuss"] },
                { name: "message", label: "Message", textarea: true, placeholder: "Tell us about your CSR goals" },
              ]}
              submitLabel="Submit Enquiry"
              successMessage="Thank you for reaching out. Our team will review your request and contact you shortly."
              note="Your information is confidential. See our Privacy Policy."
            />
          </Reveal>
          <Reveal delay={160} className="mt-8">
            <p className="text-sm text-ink/60">
              Have questions? Email{" "}
              <a href={`mailto:${SITE.email}`} className="link-secondary">{SITE.email}</a>{" "}
              or message us on{" "}
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="link-secondary">WhatsApp</a>.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABanner title="Put your CSR where you can see it." lead="Animal welfare, fully compliant, and visitable. Let's build a programme around your policy." />
    </>
  );
}
