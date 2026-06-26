import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Disclaimer & Cookie Policy",
  description: "General disclaimers for the RKM Foundation website and how we use cookies and tracking technologies.",
  alternates: { canonical: "/legal/website-disclaimer-cookie-policy", languages: { en: "/legal/website-disclaimer-cookie-policy", hi: "/hi/legal/website-disclaimer-cookie-policy", "x-default": "/legal/website-disclaimer-cookie-policy" } },
};

export default function WebsiteDisclaimerCookiePolicyPage() {
  return (
    <>
      <section className="bg-snow pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="container-c max-w-3xl">
          <p className="eyebrow-index">Legal &amp; Governance</p>
          <h1 className="display-1 mt-6 text-balance">Website Disclaimer &amp; Cookie Policy</h1>
        </div>
      </section>

      <section className="py-14">
        <div className="container-c max-w-3xl prose-rkm">
          <p className="mt-4 leading-relaxed text-ink/70">
            The information on the RKM Foundation website is provided for general information
            and charitable fundraising purposes only. By using this website, you acknowledge
            and agree to the terms of this Disclaimer.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">1. No Professional Advice</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Nothing on this website is intended to constitute professional, legal, financial,
            tax, or medical advice. You should consult qualified professionals before making
            decisions based on any information provided on this website.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">2. Accuracy &amp; Updates</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            We make reasonable efforts to keep the information on this website accurate and up
            to date. However, we do not guarantee that all content, figures, descriptions, or
            programme details are complete, current, or error-free.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            Our programmes, partnerships, and initiatives may evolve over time, and information
            may be updated without prior notice.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">3. Use at Your Own Risk</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Your use of this website and its content is at your own risk. RKM Foundation is not
            responsible for any loss or damage arising from:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Reliance on information published on this website</li>
            <li>Technical issues, interruptions, or errors</li>
            <li>Temporary unavailability of the website or its services</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">4. Links to Other Websites</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Our website may contain links to third-party websites or platforms for purposes such
            as payment processing, information sharing, or social media engagement. These
            websites are operated independently and are governed by their own policies and
            terms. RKM Foundation does not control or endorse their content, security practices,
            or privacy policies and is not responsible for them.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">5. Donations, Products &amp; Outcomes</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Donations and &quot;Shop for a Cause&quot; purchases support the charitable activities of
            RKM Foundation. While we strive to create meaningful impact, we do not guarantee
            specific outcomes, timelines, or results from any individual donation, fundraiser,
            or project.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            Similarly, product purchases from the Shop for a Cause section support charitable
            initiatives but remain commercial product transactions and not charitable donations.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">6. Limitation of Liability</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            To the fullest extent permitted by law, RKM Foundation and its trustees, employees,
            volunteers, and partners shall not be liable for any indirect, incidental,
            consequential, or special damages arising from your use of this website. This
            includes, but is not limited to:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Loss of data</li>
            <li>Loss of income</li>
            <li>Loss of goodwill</li>
            <li>Technical disruptions</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">7. Changes to This Disclaimer</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            We may update this Website Disclaimer from time to time. Any changes will be
            reflected on this page. Continued use of the website after updates are posted
            constitutes acceptance of the revised terms.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">Cookie &amp; Tracking Notice</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation uses cookies and similar technologies on this website to improve
            your browsing experience and understand how visitors use our pages.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">What Are Cookies?</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Cookies are small text files stored on your browser when you visit a website. They
            help the site remember your preferences and ensure certain functions operate
            properly.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">What We Use Cookies For</h2>
          <p className="mt-4 leading-relaxed text-ink/70">We use cookies primarily to:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Keep the website functioning smoothly (session and security cookies)</li>
            <li>Remember basic preferences such as form inputs or navigation choices</li>
            <li>Understand how visitors interact with the website through analytics tools</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            These insights help us improve the website and provide a better experience for
            visitors. We do not use cookies to store sensitive information such as payment
            details, and we do not sell or trade visitor data.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">Managing Cookies</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            You can control or disable cookies through your browser settings. Please note that
            disabling cookies may affect the functionality of certain parts of the website.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            For more information about how we collect and use personal information, please refer
            to our <Link href="/legal/privacy-policy" className="link-secondary">Privacy Policy</Link>.
          </p>

          <p className="mt-8 leading-relaxed text-ink/70">
            Thank you for visiting our website. We aim to provide a transparent and secure
            digital experience for every visitor.
          </p>

          <p className="mt-10">
            <Link href="/legal" className="link-secondary">← Back to Legal &amp; Governance</Link>
          </p>
        </div>
      </section>
    </>
  );
}
