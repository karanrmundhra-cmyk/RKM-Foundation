import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";

export const metadata: Metadata = {
  title: "Create Your Fundraiser",
  description: "Start a fundraiser to help rescued animals receive food, medical care, and safe shelter.",
};

const FIELDS = [
  { name: "title", label: "Fundraiser Title", placeholder: "Example: Help Feed Rescued Animals" },
  { name: "name", label: "Your Name", required: true, half: true },
  { name: "email", label: "Email Address", type: "email", required: true, half: true, hint: "We'll send your fundraiser link and updates here." },
  { name: "phone", label: "Mobile Number", type: "tel", required: true, half: true, placeholder: "+91" },
  { name: "occasion", label: "Occasion (Optional)", half: true, options: ["Birthday", "Anniversary", "Fitness Challenge", "Memorial Tribute", "Other"] },
  { name: "message", label: "Fundraiser Message (Optional)", textarea: true, placeholder: "Tell people why this cause matters to you. Example: “Every step I run in this marathon is for rescued animals who deserve care and protection.”" },
  { name: "goal", label: "Fundraiser Goal", options: ["₹25,000", "₹50,000 — Most Chosen", "₹75,000", "Custom"], hint: "You can start with any goal. Many fundraisers exceed their target once friends and family begin supporting the cause." },
  { name: "duration", label: "Campaign Duration", required: true, options: ["30 Days", "60 Days", "90 Days"] },
];

const NEXT = [
  "You'll receive a unique fundraiser page to share with friends and family.",
  "Donations go directly to RKM Foundation.",
  "Donors receive instant receipts and tax benefits where applicable.",
  "You can track your fundraiser's progress.",
];

export default function CreateFundraiserPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">Start Something Beautiful</p>
            <h1 className="display-1 mt-6 text-balance">Create your fundraiser.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              Help rescued animals get food, medical care, and shelter. Every rupee raised goes
              directly to RKM Foundation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">Your Details</p>
            <h2 className="display-2 mt-5 text-balance">Set it up in a minute.</h2>
          </Reveal>
          <p className="mt-10 border-t border-ink/10 pt-6 text-sm leading-relaxed text-ink/60">Funds go to the shelter we run — food, vet care, and a safe place to sleep. Donors get instant receipts, and 80G certificates where applicable.</p>
          <Reveal className="mt-10">
            <FormShell
              formType="fundraiser-create"
              fields={FIELDS}
              submitLabel="Create My Fundraiser"
              successMessage="Your fundraiser request is in! We'll set up your page and send your unique link within 1–2 business days."
              note="Each fundraiser is reviewed before it goes live, and pages use approved photographs from the RKM Foundation shelter."
            />
          </Reveal>
        </div>
      </section>

      {/* How it helps — ruled list */}

      {/* What happens next — ruled list */}
      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">What Happens Next</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">Once you submit.</h2>
          </Reveal>
          <div className="mt-12 border-t border-ink/12">
            {NEXT.map((n, i) => (
              <Reveal key={n} delay={i * 60}>
                <div className="flex items-baseline gap-5 border-b border-ink/12 py-5">
                  <span className="text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                  <p className="leading-relaxed text-ink/70">{n}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="text-sm text-ink/60">
              Have questions?{" "}
              <a href="mailto:info@rkm.support" className="link-secondary">info@rkm.support</a>
              {" · "}
              <a href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer" className="link-secondary">WhatsApp</a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
