import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donation Refund & Cancellation Policy",
  description: "How refunds and cancellations are handled for donations made through the RKM Foundation website.",
  alternates: { canonical: "/legal/donation-refund-policy", languages: { en: "/legal/donation-refund-policy", hi: "/hi/legal/donation-refund-policy", "x-default": "/legal/donation-refund-policy" } },
};

export default function DonationRefundPolicyPage() {
  return (
    <>
      <section className="bg-snow pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="container-c max-w-3xl">
          <p className="eyebrow-index">Legal &amp; Governance</p>
          <h1 className="display-1 mt-6 text-balance">Refund &amp; Cancellation Policy – Donations</h1>
        </div>
      </section>

      <section className="py-14">
        <div className="container-c max-w-3xl prose-rkm">
          <p className="mt-4 leading-relaxed text-ink/70">
            This policy explains how refunds and cancellations are handled for financial
            contributions made through the Donate section of the RKM Foundation website. By
            making a donation, you agree to the terms described below.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">1. Nature of Donations</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Donations to RKM Foundation, a registered charitable trust based in Mumbai,
            Maharashtra, India, are voluntary contributions made to support charitable
            programmes and beneficiaries. A donation is not a payment for goods or services.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">2. Non-Refundable Donations</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            All successful donations to RKM Foundation are generally non-refundable. Once a
            donation is completed, we do not issue refunds, reverse transactions, or convert
            donations into product purchases.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            This policy allows us to plan programmes responsibly and honour commitments made to
            communities and partner organisations.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">3. Limited Exceptions (Technical Errors Only)</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            In rare situations, a correction may be considered for clear technical errors, such as:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Duplicate donations charged for the same amount and payment reference</li>
            <li>A verified payment gateway error resulting in multiple charges</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            If such an issue occurs, please email us at{" "}
            <a href="mailto:info@rkm.support" className="link-secondary">info@rkm.support</a>{" "}
            within 24 hours of the transaction and provide:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Your full name</li>
            <li>Donation amount and date</li>
            <li>Transaction or payment reference ID</li>
            <li>Screenshot of the charge from your bank or payment application</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            After verification with the payment gateway provider, we may reverse the extra
            charge only. All decisions will be made at the sole discretion of RKM Foundation.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">4. 80G Tax Benefits &amp; Refunds</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation is registered under Sections 12A and 80G of the Income Tax Act, 1961.
            Eligible donors may claim a 50% deduction on qualifying donations, subject to
            statutory limits.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            We are required to report donations to the Income Tax Department through Form 10BD
            and issue Form 10BE certificates to eligible donors after the end of the financial
            year. Due to these regulatory requirements:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>If a donation has been reported in Form 10BD and/or used to claim 80G tax benefit, it cannot be refunded under any circumstance.</li>
            <li>If you are uncertain about retaining a donation, please avoid claiming the 80G deduction in your tax return.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">5. Donation Amount &amp; Payment Methods</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            The minimum online donation amount is specified on the Donate page of our website.
            Donations are accepted in Indian Rupees (INR) through Indian payment methods,
            including:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>UPI</li>
            <li>Net banking</li>
            <li>Debit or credit cards</li>
            <li>Bank transfers from an Indian account</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation currently does not accept foreign contributions, as the Foundation
            does not hold FCRA registration.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">6. Donation Receipts &amp; Certificates</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            An instant email receipt is issued after a successful donation. Eligible donors who
            provide valid PAN details will receive their 80G certificate (Form 10BE) after the
            end of the financial year, typically by 31 May, in accordance with statutory
            timelines.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            If you have not received your receipt or certificate, please contact us at{" "}
            <a href="mailto:info@rkm.support" className="link-secondary">info@rkm.support</a>{" "}
            with your transaction details.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">7. Chargebacks &amp; Disputes</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            If a donation transaction is disputed directly with your bank or payment provider
            (a chargeback):
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>RKM Foundation may provide supporting documentation such as receipts and transaction logs to verify the nature of the donation.</li>
            <li>If a payment is reversed by the bank, any associated 80G eligibility for that amount will lapse, and the donor must not claim a tax deduction for that reversed donation.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">8. Changes to This Policy</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation may update this Donation Refund &amp; Cancellation Policy from time to
            time to reflect legal, operational, or regulatory changes. The version of the policy
            in force at the time of your donation will apply to that transaction.
          </p>

          <p className="mt-8 leading-relaxed text-ink/70">
            Thank you for your generosity. Your trust enables us to carry forward our mission
            with integrity and accountability.
          </p>

          <p className="mt-10">
            <Link href="/legal" className="link-secondary">← Back to Legal &amp; Governance</Link>
          </p>
        </div>
      </section>
    </>
  );
}
