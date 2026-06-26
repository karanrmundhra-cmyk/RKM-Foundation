import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How RKM Foundation collects, uses, stores, and safeguards your personal information.",
  alternates: { canonical: "/legal/privacy-policy", languages: { en: "/legal/privacy-policy", hi: "/hi/legal/privacy-policy", "x-default": "/legal/privacy-policy" } },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-snow pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="container-c max-w-3xl">
          <p className="eyebrow-index">Legal &amp; Governance</p>
          <h1 className="display-1 mt-6 text-balance">Privacy Policy</h1>
        </div>
      </section>

      <section className="py-14">
        <div className="container-c max-w-3xl prose-rkm">
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) values your trust and is committed to
            protecting your personal information. This Privacy Policy explains how we collect,
            use, store, and safeguard information when you visit our website, make a donation,
            volunteer, shop for a cause, participate in a fundraiser, or otherwise interact with us.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            By using our website or sharing your information with us, you agree to this Privacy
            Policy and our <Link href="/legal/terms-and-conditions" className="link-secondary">Terms &amp; Conditions</Link>.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">1. Who We Are</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation is a registered charitable trust in India. Through our website and
            digital platforms, we raise funds, share impact updates, manage donations, enable
            volunteering and CSR partnerships, and offer cause-related products.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">This Privacy Policy applies to:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Our website and donation pages</li>
            <li>&quot;Shop for a Cause&quot; product pages</li>
            <li>Fundraiser, volunteer, CSR, and enquiry forms</li>
            <li>Newsletter subscriptions and communication channels</li>
            <li>Any other online services operated by RKM Foundation</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">2. Information You Provide</h2>
          <p className="mt-4 leading-relaxed text-ink/70">When you interact with us, you may voluntarily provide:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Contact details: name, email address, mobile number, postal address</li>
            <li>Donation details: donation amount, date, payment method, PAN (for 80G compliance)</li>
            <li>CSR / partnership details: organisation name, designation, and official contact information</li>
            <li>Volunteer details: skills, interests, availability, or other profile information</li>
            <li>Shop orders: delivery address and contact number</li>
            <li>Newsletter subscription details</li>
            <li>Any other information you choose to share through forms, emails, or messages</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            This may include &quot;personal information&quot; and, where applicable, &quot;sensitive
            personal data&quot; as defined under applicable Indian IT laws.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            You may choose not to provide certain information; however, this may limit our
            ability to process donations, issue tax certificates, fulfil orders, or respond to
            your request.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">3. Information Collected Automatically</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            When you browse our website, we may automatically collect limited technical
            information such as:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>IP address, browser type, device type, and operating system</li>
            <li>Pages visited, time spent, links clicked, and general usage patterns</li>
            <li>Approximate location (city or state level only)</li>
            <li>Cookie and similar tracking data</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            This information helps us improve website performance, security, and user experience.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">4. How We Use Your Information</h2>
          <p className="mt-4 leading-relaxed text-ink/70">We use your information only for legitimate purposes, including to:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Process donations, fundraisers, and shop orders</li>
            <li>Issue receipts, acknowledgements, and invoices</li>
            <li>File statutory tax reports and generate Form 10BD and Form 10BE</li>
            <li>Share impact updates, donor communications, and newsletters</li>
            <li>Respond to enquiries, feedback, or support requests</li>
            <li>Manage CSR partnerships, volunteering, and events</li>
            <li>Improve our programmes, website, and communications</li>
            <li>Comply with legal, accounting, and regulatory obligations</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            We do not sell, rent, or trade your personal information.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">5. When We Share Information</h2>
          <p className="mt-4 leading-relaxed text-ink/70">We may share limited information only with trusted parties, including:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Payment gateways and banks for secure transaction processing</li>
            <li>Courier partners for delivering products purchased from our shop</li>
            <li>Auditors, accountants, and professional advisors under confidentiality</li>
            <li>IT and analytics service providers who help us operate and improve our systems</li>
            <li>Government authorities or regulators when required by law</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            All such parties are required to use your information only for the specified purpose
            and to maintain appropriate confidentiality and security.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">6. Cookies &amp; Tracking Technologies</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Our website may use cookies and similar technologies to improve your browsing
            experience and understand how our pages are used. For more details, please refer to
            our <Link href="/legal/website-disclaimer-cookie-policy" className="link-secondary">Website Disclaimer &amp; Cookie Policy</Link>.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">7. Data Security</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            We use reasonable technical and organisational safeguards to protect your personal
            information, including:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>SSL encryption on our website</li>
            <li>Secure, access-controlled internal systems</li>
            <li>PCI-DSS–compliant payment gateways for card and UPI transactions</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            We do not store your card, UPI, or banking details on our servers. All payment
            information is processed securely and directly by trusted payment gateway providers.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            While we take data security seriously and follow industry-standard practices, no
            digital system can guarantee absolute protection.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">8. Data Retention</h2>
          <p className="mt-4 leading-relaxed text-ink/70">We retain personal information only for as long as necessary to:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Meet legal, tax, and accounting requirements</li>
            <li>Fulfil the purpose for which the data was collected</li>
            <li>Resolve disputes and maintain accurate records</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            When information is no longer required, it is securely deleted or anonymised.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">9. Your Choices &amp; Rights</h2>
          <p className="mt-4 leading-relaxed text-ink/70">You may:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Request details of the personal information we hold about you</li>
            <li>Ask for corrections to inaccurate or outdated data</li>
            <li>Opt out of non-essential communications such as newsletters</li>
            <li>Withdraw consent where applicable, subject to legal and regulatory limits</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            To exercise these rights, please contact us at{" "}
            <a href="mailto:info@rkm.support" className="link-secondary">info@rkm.support</a>.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">10. Children&apos;s Information</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation does not knowingly collect personal information from children without
            appropriate consent where required by law. Where programmes involve minors, we work
            with responsible partners and follow safeguarding principles to protect children&apos;s
            privacy and well-being.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">11. Third-Party Links</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Our website may contain links to third-party websites or platforms. Their privacy
            practices are independent of RKM Foundation, and we are not responsible for their
            content or policies. Please review their privacy policies before sharing personal
            information.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">12. Updates to This Policy</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            We may update this Privacy Policy from time to time. Any changes will be reflected
            on this page with an updated revision date. Continued use of our website after
            changes are posted means you accept the revised Policy.
          </p>

          <p className="mt-8 leading-relaxed text-ink/70">
            Thank you for trusting RKM Foundation. We are committed to protecting your
            information with care and responsibility.
          </p>

          <p className="mt-10">
            <Link href="/legal" className="link-secondary">← Back to Legal &amp; Governance</Link>
          </p>
        </div>
      </section>
    </>
  );
}
