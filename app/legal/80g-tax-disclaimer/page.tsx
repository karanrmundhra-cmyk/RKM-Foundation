import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "80G / Tax Benefit Disclaimer",
  description: "General terms applicable to contributions made through the Donate section of the RKM Foundation website, including 80G tax treatment.",
  alternates: { canonical: "/legal/80g-tax-disclaimer", languages: { en: "/legal/80g-tax-disclaimer", hi: "/hi/legal/80g-tax-disclaimer", "x-default": "/legal/80g-tax-disclaimer" } },
};

export default function TaxDisclaimerPage() {
  return (
    <>
      <section className="bg-snow pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="container-c max-w-3xl">
          <p className="eyebrow-index">Legal &amp; Governance</p>
          <h1 className="display-1 mt-6 text-balance">80G / Tax Benefit Disclaimer</h1>
        </div>
      </section>

      <section className="py-14">
        <div className="container-c max-w-3xl prose-rkm">
          <p className="mt-4 leading-relaxed text-ink/70">
            This page explains the general terms applicable to contributions made through the
            Donate section of the RKM Foundation website. By making a donation, you acknowledge
            and accept the statements below.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">1. Voluntary Contributions</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            All amounts given through the Donate section are treated as voluntary charitable
            contributions to RKM Foundation, a registered charitable trust in India. A donation
            is not a payment for goods, services, or any commercial benefit.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">2. Use of Funds</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Donations are used to support RKM Foundation&apos;s charitable programmes and
            operations. Where donors choose a specific pillar or cause, we aim to direct funds
            accordingly. However, if a programme becomes fully funded or operational priorities
            change, RKM Foundation may reallocate donations within its registered charitable
            objectives where the need is greatest.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">3. No Financial or Investment Return</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Donations do not provide any ownership rights, profit share, interest, or other
            financial return. All contributions are irrevocable charitable gifts made to support
            the Foundation&apos;s mission.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">4. No Guarantee of Specific Outcomes</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation works to maximise meaningful impact through its programmes and
            partnerships. However, charitable activities depend on real-world conditions that
            may change. For this reason, we cannot guarantee specific outcomes, beneficiary
            numbers, or timelines for any individual donation.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">5. Compliance &amp; Eligibility</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            It is the donor&apos;s responsibility to ensure that making a donation complies with
            all applicable laws relevant to them, including regulations related to residency,
            source of funds, and taxation.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation currently accepts domestic donations in Indian Rupees (INR) only, as
            the Foundation does not hold FCRA registration for foreign contributions.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">6. Tax Treatment</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation is registered under Sections 12A and 80G of the Income Tax Act, 1961.
            Eligible Indian taxpayers may claim a 50% deduction on qualifying donations, subject
            to limits and conditions prescribed under Indian tax law.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">Tax benefits apply only when:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Our 80G registration is valid on the donation date, and</li>
            <li>The donor provides accurate PAN and required information</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation issues 80G certificates (Form 10BE) after the close of the financial
            year in accordance with statutory timelines.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            Issuance of an 80G certificate does not guarantee that a tax authority will accept
            an individual deduction claim. Donors should consult their tax advisors regarding
            eligibility.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">7. Refunds</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Donations are generally non-refundable. For details regarding limited exceptions in
            cases of verified technical errors, please refer to our{" "}
            <Link href="/legal/donation-refund-policy" className="link-secondary">Refund &amp; Cancellation Policy – Donations</Link>.
          </p>

          <p className="mt-8 leading-relaxed text-ink/70">
            Thank you for supporting RKM Foundation. Your contribution helps us deliver
            responsible, transparent, and compliant impact.
          </p>

          <p className="mt-10">
            <Link href="/legal" className="link-secondary">← Back to Legal &amp; Governance</Link>
          </p>
        </div>
      </section>
    </>
  );
}
