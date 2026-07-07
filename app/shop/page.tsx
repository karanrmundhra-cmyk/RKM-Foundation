import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EditorialFigure from "@/components/EditorialFigure";
import CTABanner from "@/components/CTABanner";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Shop for a Cause",
  description: "The “Hope” Candle — every candle you buy helps feed, treat, and protect rescued animals in need.",
  alternates: { canonical: "/shop", languages: { en: "/shop", hi: "/hi/shop", "x-default": "/shop" } },
  openGraph: {
    title: "Shop for a Cause — The “Hope” Candle",
    description: "The “Hope” Candle — every candle you buy helps feed, treat, and protect rescued animals in need.",
    type: "website",
    url: "https://rkmfoundation.com/shop",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The “Hope” Candle by RKM Foundation" }],
  },
};

const BADGES = ["Pet-Friendly", "Vegan", "Cruelty-Free", "No Toxins", "Ethically Sourced", "Made in India"];

const IMPACT = [
  { title: "Meals", desc: "Feeds one rescued animal for approximately 15 days." },
  { title: "Vaccinations", desc: "Supports essential vaccinations for one animal in our care." },
  { title: "Medical & Shelter Support", desc: "Helps provide treatment and safe shelter for rescued animals." },
];

const REVIEWS = [
  {
    name: "Gouri D., Mumbai",
    img: "/images/shop/gouri.jpg",
    quote: "My daughter lights it every evening and says a prayer for the animals.",
    body: "My daughter is only eight, but she already understands the value of helping those who cannot speak for themselves. Lighting the “Hope” Candle has become a meaningful ritual for our family.",
  },
  {
    name: "Amit M., Mumbai",
    img: "/images/shop/amit.jpg",
    quote: "This isn't just a candle — it's hope in a jar.",
    body: "I bought a few as gifts during Diwali. The scent is warm and calming, but what makes it special is knowing the purchase helps feed and treat street animals.",
  },
  {
    name: "Sheetal M., Mumbai",
    img: "/images/shop/sheetal.jpg",
    quote: "Finally, a way to give that feels personal.",
    body: "I have donated to NGOs before, but this felt different. I could actually see the animals my purchase helped.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-copper" role="img" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z"/></svg>
      ))}
    </div>
  );
}

export default function ShopPage() {
  const nonce = headers().get("x-nonce") ?? undefined;
  return (
    <>
      <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product",
        name: "The “Hope” Candle",
        image: "https://rkmfoundation.com/images/shop/hope-candle.jpg",
        description: "100% natural soy-wax candle with a cotton wick and an apple-cinnamon scent, burning slowly and evenly for over 50 hours. Every candle helps feed, treat, and protect rescued animals across India.",
        brand: { "@type": "Brand", name: "RKM Foundation" },
        category: "Candle",
        offers: { "@type": "Offer", priceCurrency: "INR", price: "1999", availability: "https://schema.org/PreOrder", url: "https://rkmfoundation.com/shop", seller: { "@type": "NGO", name: "RKM Foundation" } },
      }) }} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://rkmfoundation.com/" }, { name: "Shop", url: "https://rkmfoundation.com/shop" }]} />
      {/* Hero */}
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">Shop for a Cause</p>
            <h1 className="display-1 mt-6 text-balance">A candle that fills a bowl.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              Light it at home, and somewhere a rescued animal gets a meal, a vaccine, or a warm
              corner to sleep. That&apos;s the whole idea.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Product — single-product editorial feature */}
      <section className="section-y">
        <div className="container-c grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <EditorialFigure src="/images/shop/hope-candle.jpg" alt="The “Hope” Candle by RKM Foundation — 100% natural soy wax, apple cinnamon" ratio="aspect-square" parallax speed={0.05} caption="The “Hope” Candle · Apple Cinnamon" />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7 lg:pl-4">
            <p className="eyebrow-index">The &ldquo;Hope&rdquo; Candle</p>
            <h2 className="display-2 mt-5 text-balance">Burns for 50 hours. Helps for far longer.</h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/65">
              Apple Cinnamon — a comforting blend of crisp apple and gentle cinnamon spice that fills
              your space with warmth and calm. Handcrafted using 100% natural soy wax and a clean
              cotton wick, the candle burns slowly and evenly for over 50 hours.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65">
              Small-batch production keeps quality high while directing more funds toward animal care.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span key={b} className="rounded-full bg-copper/10 px-3 py-1 text-xs font-medium text-[#795719]">{b}</span>
              ))}
            </div>
            <div className="mt-8 flex items-baseline gap-3">
              <span className="display-3 text-[2rem]">₹1,999</span>
              <span className="text-sm text-ink/65">Inclusive of shipping &amp; taxes</span>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#footer-email" className="btn-copper">Launching Soon — Notify Me</a>
              <Link href="/donate-now" className="btn-light">Donate Instead</Link>
            </div>
            <p className="mt-4 text-sm text-ink/60">
              Online checkout opens soon. Want one earlier?{" "}
              <a href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer" className="link-secondary">WhatsApp us</a>.
            </p>
            <p className="mt-3 text-xs text-ink/65">Ships across India (5–7 days) · Secure prepaid checkout</p>
          </Reveal>
        </div>
      </section>

      {/* Your candle in action — numbered rows */}
      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">Your Candle in Action</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">Here&apos;s how your purchase helps.</h2>
          </Reveal>
          <div className="mt-14">
            {IMPACT.map((it, i) => (
              <Reveal key={it.title} delay={i * 70}>
                <div className={`grid items-baseline gap-x-8 gap-y-2 border-t border-ink/10 py-8 lg:grid-cols-12 ${i === IMPACT.length - 1 ? "border-b" : ""}`}>
                  <div className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">0{i + 1}</div>
                  <h3 className="display-3 text-[1.4rem] lg:col-span-4">{it.title}</h3>
                  <p className="leading-relaxed text-ink/65 lg:col-span-7">{it.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gift */}
      <section className="section-y">
        <div className="container-c">
          <Reveal className="max-w-3xl">
            <p className="eyebrow-index">Give a Gift That Gives Back</p>
            <h2 className="display-2 mt-5 text-balance">Know someone who loves animals?</h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/65">
              Send them this candle with a personalised message. We&apos;ll also send them updates
              showing how their gift helped rescue, feed, and heal animals in need.
            </p>
            <div className="mt-8">
              <a href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer" className="btn-dark">Gift This Candle — Keep Hope Burning</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews — editorial pull-quotes */}
      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">From People Who Lit One</p>
            <h2 className="display-2 mt-5 max-w-[18ch] text-balance">A candle on the table, an animal fed.</h2>
          </Reveal>
          <div className="mt-16 border-t border-ink/12">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={(i % 2) * 80}>
                <figure className="grid gap-x-12 gap-y-5 border-b border-ink/12 py-12 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <Stars />
                    <blockquote className="mt-4 text-2xl font-medium leading-snug tracking-tight text-ink/90 sm:text-[1.75rem]">&ldquo;{r.quote}&rdquo;</blockquote>
                    <p className="mt-4 max-w-xl leading-relaxed text-ink/60">{r.body}</p>
                  </div>
                  <figcaption className="flex flex-col items-start gap-3 lg:col-span-4 lg:items-end lg:self-start">
                    <Image src={r.img} alt={r.name} width={80} height={80} className="h-20 w-20 shrink-0 rounded-full object-cover ring-1 ring-ink/10" />
                    <span className="font-medium lg:text-right">{r.name}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Keep hope burning." lead="Buy a candle or give directly — either way, a rescued animal gets a meal, a vaccine, or a safe place to sleep." />

      {/* Tax fine print */}
      <section className="bg-snow py-14">
        <div className="container-c max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-ink/65">
            <strong className="text-ink/75">Note on tax benefits:</strong> Shop purchases support the
            work of RKM Foundation but are treated as product purchases and do not qualify for 80G tax
            benefits.
          </p>
        </div>
      </section>
    </>
  );
}
