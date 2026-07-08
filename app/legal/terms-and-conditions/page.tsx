import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that apply when you use the RKM Foundation website, donate, fundraise, volunteer, or shop.",
  alternates: { canonical: "/legal/terms-and-conditions", languages: { en: "/legal/terms-and-conditions", hi: "/hi/legal/terms-and-conditions", "x-default": "/legal/terms-and-conditions" } },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <section className="bg-snow pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="container-c max-w-3xl">
          <p className="eyebrow-index">Legal &amp; Governance</p>
          <h1 className="display-1 mt-6 text-balance">Terms &amp; <em className="accent">Conditions</em></h1>
        </div>
      </section>

      <section className="py-14">
        <div className="container-c max-w-3xl prose-rkm">
          <p className="mt-4 leading-relaxed text-ink/70">
            By accessing or using the RKM Foundation website — including visiting any page,
            making a donation, starting a fundraiser, volunteering, or purchasing a product —
            you agree to these Terms &amp; Conditions.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">1. About RKM Foundation</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a registered charitable trust based in
            Mumbai, Maharashtra, India. Our website enables donations, CSR partnerships,
            volunteering, fundraising initiatives, and the purchase of cause-related products
            such as candles.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">2. Website Use &amp; Eligibility</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>You must be 18 years or older and legally capable of entering into a contract under Indian law.</li>
            <li>You agree to use this website only for lawful purposes and in a manner that does not harm RKM Foundation, its beneficiaries, or other users.</li>
            <li>You will not attempt to hack, disrupt, copy, scrape, or misuse any part of the website or its systems.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">3. Donations</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Donations made through our Donate page are voluntary, non-commercial contributions made to support charitable work.</li>
            <li>Donations are generally non-refundable, except in limited cases of verified technical errors as described in our <Link href="/legal/donation-refund-policy" className="link-secondary">Donation Refund &amp; Cancellation Policy</Link>.</li>
            <li>Donations may be directed toward a specific pillar or cause; however, RKM Foundation may reallocate funds within its charitable objectives if a project is fully funded or programme needs change.</li>
            <li>Donations do not create any ownership, profit share, or financial return for the donor.</li>
            <li>RKM Foundation currently accepts domestic donations in Indian Rupees (INR) only, as the Foundation does not hold FCRA registration for foreign contributions.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">4. Shop for a Cause</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Purchases made through the Shop for a Cause section are product orders and not donations.</li>
            <li>Such purchases do not qualify for tax deduction under Section 80G of the Income Tax Act.</li>
            <li>Orders, pricing, shipping, returns, and replacements are governed by the <Link href="/legal/shop-refund-policy" className="link-secondary">Refund &amp; Cancellation Policy – Shop for a Cause</Link>.</li>
            <li>Cash on Delivery (COD) is not available.</li>
            <li>Product images are representative. Minor variations in colour, packaging, fragrance, or finish may occur.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">5. 80G / Tax Benefits</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>RKM Foundation is registered under Sections 12A and 80G of the Income Tax Act, 1961.</li>
            <li>Eligible Indian taxpayers may claim a 50% deduction on qualifying donations, subject to statutory limits and conditions.</li>
            <li>Tax benefits are available only if our 80G registration is valid on the donation date and your PAN and required details are correctly provided.</li>
            <li>We issue 80G certificates (Form 10BE) after the close of the financial year in accordance with statutory timelines.</li>
            <li>Acceptance of any tax deduction claim remains subject to the decision of the tax authorities, and donors should consult their own tax advisors.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">6. Accounts, Information &amp; Security</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>You agree that all information provided through the website (for donations, shop orders, CSR enquiries, or volunteering) is true, accurate, and current.</li>
            <li>You are responsible for maintaining the confidentiality of any login credentials and for all activity conducted under your account.</li>
            <li>Misuse, impersonation, fraudulent activity, or submission of false information may lead to suspension or restriction of access to our services.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">7. Intellectual Property</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>All content on this website — including text, images, logos, graphics, and designs — belongs to RKM Foundation or is used with permission.</li>
            <li>You may view or share this content for personal, non-commercial purposes only.</li>
            <li>You may not copy, reproduce, modify, distribute, or use any content for commercial purposes without prior written consent from RKM Foundation.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">8. Third-Party Services &amp; Links</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>We use third-party providers (such as payment gateways, courier services, and analytics platforms) to operate and improve our services.</li>
            <li>Our website may contain links to external websites or platforms operated by third parties.</li>
            <li>We are not responsible for the content, policies, or security practices of those external websites.</li>
            <li>Your use of such websites is governed by their own terms and policies.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">9. Privacy &amp; Cookies</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Our handling of personal information is described in our <Link href="/legal/privacy-policy" className="link-secondary">Privacy Policy</Link>.</li>
            <li>We use cookies and similar technologies as explained in our <Link href="/legal/website-disclaimer-cookie-policy" className="link-secondary">Cookie &amp; Tracking Notice</Link>.</li>
            <li>By using this website, you consent to such data practices, subject to your browser settings.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">10. No Guarantee of Outcomes</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Social programmes and charitable initiatives often involve variables beyond our control.</li>
            <li>While we strive to maximise meaningful impact, RKM Foundation does not guarantee specific outcomes, numbers of beneficiaries, or timelines from any individual donation, fundraiser, or project.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">11. Limitation of Liability</h2>
          <p className="mt-4 leading-relaxed text-ink/70">To the fullest extent permitted by law:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>RKM Foundation and its trustees, employees, volunteers, and partners shall not be liable for any indirect, incidental, consequential, or special damages arising from your use of the website, donations, or purchases.</li>
            <li>Our total liability for any claim relating to a donation, order, or use of the website shall be limited to the amount paid by you for the relevant transaction, if applicable.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">12. Indemnity</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            You agree to indemnify and hold harmless RKM Foundation, its trustees, employees,
            volunteers, and partners from any claims, losses, damages, or legal costs arising from:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Your breach of these Terms</li>
            <li>Your misuse of the website</li>
            <li>Your violation of any applicable law or third-party rights</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">13. Changes to the Website or Terms</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>RKM Foundation may update or modify the website, its services, or these Terms from time to time.</li>
            <li>The version of the Terms published on the website at the time of your use or transaction will apply.</li>
            <li>Continued use of the website after changes are posted constitutes acceptance of the updated Terms.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">14. Chargebacks &amp; Payment Disputes</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            If a payment made to RKM Foundation is disputed with your bank or payment provider:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>We may provide supporting documentation (including receipts and transaction records) to the payment provider to verify the transaction.</li>
            <li>If a payment is reversed by the bank, any associated benefits such as tax certificates or order fulfilment may be cancelled.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">15. Governing Law &amp; Jurisdiction</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            These Terms &amp; Conditions are governed by the laws of India. Any disputes arising
            in connection with this website shall be subject to the exclusive jurisdiction of
            the courts in Mumbai, Maharashtra.
          </p>

          <p className="mt-8 leading-relaxed text-ink/70">
            Thank you for engaging with RKM Foundation. Your cooperation helps us maintain a
            safe and compliant platform for all.
          </p>

          <p className="mt-10">
            <Link href="/legal" className="link-secondary">← Back to Legal &amp; Governance</Link>
          </p>
        </div>
      </section>
    </>
  );
}
