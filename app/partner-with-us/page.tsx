import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";
import CTABanner from "@/components/CTABanner";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "RKM Foundation backs grassroots organisations already doing the work on the ground. Tell us about your initiative.",
  alternates: { canonical: "/partner-with-us", languages: { en: "/partner-with-us", hi: "/hi/partner-with-us", "x-default": "/partner-with-us" } },
};

const NEXT_STEPS = [
  "We will review the information you shared.",
  "If your initiative aligns with our work, we may reach out for further details.",
  "If approved, funds are disbursed directly to the partner organisation for the agreed project.",
];

const FORM_SECTIONS = [
  { title: "About Your Organisation", desc: "Who you are, where you are registered, and how we can reach you." },
  { title: "About the Project or Initiative", desc: "The cause you are addressing, the support needed, and who will benefit." },
];

export default function PartnerWithUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">Partner With Us</p>
            <h1 className="display-1 mt-6 text-balance">You do the work. We help bring the support.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              We back grassroots organisations already in the field — raising awareness, rallying
              support, and connecting donors with credible work that&apos;s already changing things.
            </p>
            <p className="mt-4 text-sm text-ink/60">A company exploring CSR partnership? <Link href="/csr" className="link-secondary">See CSR Partnerships →</Link></p>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="section-y">
        <div className="container-c grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow-index">How We Work</p>
            <h2 className="display-2 mt-5 text-balance">We back work that&apos;s already happening.</h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-7 lg:pt-2">
            <p className="max-w-xl text-lg leading-relaxed text-ink/65">
              We partner with organisations already doing the hard work in their communities. Through
              these collaborations we help highlight your initiative, fund specific projects, and put
              credible grassroots work in front of people who want to support it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="bg-snow section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">Partnership Enquiry</p>
            <h2 className="display-2 mt-5 text-balance">Tell us about your work.</h2>
            <div className="mt-10 border-t border-ink/12">
              {FORM_SECTIONS.map((s, i) => (
                <div key={s.title} className="grid items-baseline gap-x-8 gap-y-1 border-b border-ink/12 py-5 lg:grid-cols-12">
                  <div className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">0{i + 1}</div>
                  <h3 className="font-semibold lg:col-span-4">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/60 lg:col-span-7">{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <FormShell
              formType="partner"
              fields={[
                { name: "org_name", label: "Organisation Name", required: true, half: true, placeholder: "Enter your organisation's name" },
                { name: "reg_number", label: "Registration Number", half: true, placeholder: "Trust / society / Section 8 registration no." },
                { name: "org_address", label: "Organisation Address", placeholder: "Enter your organisation's address" },
                { name: "contact_person", label: "Contact Person", required: true, half: true, placeholder: "Full name" },
                { name: "email", label: "Email Address", type: "email", required: true, half: true, placeholder: "Enter your email address" },
                { name: "phone", label: "Phone Number", type: "tel", half: true, placeholder: "Enter your phone number" },
                { name: "cause_description", label: "Brief Description of the Cause", textarea: true, required: true, hint: "What problem are you addressing? Who will benefit?" },
                { name: "funding_required", label: "Funding Required", half: true, hint: "₹", placeholder: "Approximate amount" },
                { name: "beneficiaries", label: "Estimated Beneficiaries", half: true, placeholder: "e.g. 120 animals, 50 families" },
              ]}
              submitLabel="Submit Partnership Request"
              successMessage="Thank you — we review partnership enquiries within 5–7 working days."
            />
          </Reveal>
        </div>
      </section>

      {/* What happens next */}
      <section className="section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">What Happens Next</p>
            <h2 className="display-2 mt-5 text-balance">Once you submit this form.</h2>
          </Reveal>
          <div className="mt-12">
            {NEXT_STEPS.map((s, i) => (
              <Reveal key={s} delay={i * 70}>
                <div className={`flex gap-5 border-t border-ink/12 py-6 ${i === NEXT_STEPS.length - 1 ? "border-b" : ""}`}>
                  <span className="text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                  <p className="leading-relaxed text-ink/70">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="max-w-xl text-lg leading-relaxed text-ink/70">
              We have deep respect for the work organisations like yours do, day in and day out.
            </p>
            <p className="mt-6 text-sm text-ink/60">
              Have questions? Email{" "}
              <a href={`mailto:${SITE.email}`} className="link-secondary">{SITE.email}</a>{" "}
              or message us on{" "}
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="link-secondary">WhatsApp</a>.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABanner title="Good work deserves to be seen." lead="If your organisation is changing things on the ground, we'd be glad to help bring the support." />
    </>
  );
}
