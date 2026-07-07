import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop Refund & Cancellation Policy",
  description: "Orders, cancellations, returns, and replacements for purchases made through Shop for a Cause on the RKM Foundation website.",
  alternates: { canonical: "/legal/shop-refund-policy", languages: { en: "/legal/shop-refund-policy", hi: "/hi/legal/shop-refund-policy", "x-default": "/legal/shop-refund-policy" } },
};

export default function ShopRefundPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://rkmfoundation.com/" }, { name: "Legal & Governance", url: "https://rkmfoundation.com/legal" }, { name: "Shop Refund & Cancellation Policy", url: "https://rkmfoundation.com/legal/shop-refund-policy" }]} />
      <section className="bg-snow pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="container-c max-w-3xl">
          <p className="eyebrow-index">Legal &amp; Governance</p>
          <h1 className="display-1 mt-6 text-balance">Refund &amp; Cancellation Policy – Shop for a Cause</h1>
        </div>
      </section>

      <section className="py-14">
        <div className="container-c max-w-3xl prose-rkm">
          <p className="mt-4 leading-relaxed text-ink/70">
            This policy explains how orders, cancellations, returns, and replacements are
            handled for purchases made through the Shop for a Cause section of the RKM
            Foundation website. By placing an order, you agree to the terms described below.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">1. About the Shop</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            The Shop for a Cause is operated by RKM Foundation, a registered charitable trust
            based in Mumbai, Maharashtra, India. When you purchase a candle or other product
            from this section, you receive a physical item while also supporting our charitable
            initiatives.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">2. Order Confirmation &amp; Cancellation</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Orders are confirmed only after successful online payment and an order confirmation
            email. Once an order has been placed and payment is completed, cancellations are
            generally not permitted, as products may be processed or dispatched shortly after
            confirmation.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">3. Pricing &amp; Payments</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            All prices are listed in Indian Rupees (INR) and include applicable taxes unless
            stated otherwise. We accept prepaid online payments only, through secure Indian
            payment gateways such as UPI, debit or credit cards, and net banking. Cash on
            Delivery (COD) is not available.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">4. Shipping &amp; Delivery</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            We currently ship within India only. Orders are usually dispatched within 1–3
            working days, and delivery generally occurs within 5–7 working days from dispatch,
            depending on the destination and courier service.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            Delivery timelines are indicative and may vary due to factors beyond our control
            such as courier delays, weather conditions, public holidays, or logistics
            disruptions.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">5. Returns, Replacements &amp; Refunds</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Due to the nature of candles and hygiene considerations, returns are not accepted
            once an order has been delivered.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            If your order arrives damaged during transit or has a clear manufacturing defect,
            please contact us at{" "}
            <a href="mailto:info@rkm.support" className="link-secondary">info@rkm.support</a>{" "}
            within 24 hours of delivery and provide your order number along with photographs of
            the product and outer packaging.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            After verification, we may offer a replacement of the same or an equivalent product,
            subject to availability. Monetary refunds are not issued.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">6. No 80G Tax Benefit on Products</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Purchases made through the Shop for a Cause are treated as product purchases and not
            charitable donations. Therefore, these purchases do not qualify for tax deduction
            under Section 80G of the Income Tax Act, 1961.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            If you wish to make a tax-deductible contribution, please donate through the Donate
            section of our website.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">7. Product Appearance &amp; Variations</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            We make every effort to display accurate product images and descriptions. However,
            minor variations in colour, finish, fragrance intensity, or packaging may occur due
            to lighting conditions, screen settings, or handcrafted production elements. Such
            variations are normal and do not qualify as defects or grounds for replacement.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">8. Safe Use &amp; Liability</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Candles involve an open flame and must be used responsibly. Always follow safety
            instructions provided on the product and packaging, including:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Placing candles on a stable, heat-resistant surface</li>
            <li>Keeping them away from children, pets, and flammable materials</li>
            <li>Never leaving them unattended while burning</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM Foundation is not responsible for injury, loss, or damage caused by improper use
            or failure to follow safety guidelines. To the extent permitted by law, our
            liability for any order is limited to the amount paid for that order.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">9. Intellectual Property</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            All content on this page — including text, images, product designs, and logos —
            belongs to RKM Foundation or is used with permission. This content may not be
            copied, reproduced, or reused for commercial purposes without prior written consent
            from RKM Foundation.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">10. Changes to This Policy</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            We may update this policy from time to time to reflect legal, operational, or
            process changes. The version displayed on the website at the time of your purchase
            will apply to your order.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">11. Governing Law &amp; Jurisdiction</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            This policy is governed by the laws of India, and any disputes shall be subject to
            the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
          </p>

          <p className="mt-8 leading-relaxed text-ink/70">
            Thank you for shopping with purpose. We strive to ensure fairness, transparency, and
            quality in every purchase.
          </p>

          <p className="mt-10">
            <Link href="/legal" className="link-secondary">← Back to Legal &amp; Governance</Link>
          </p>
        </div>
      </section>
    </>
  );
}
