import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EditorialFigure from "@/components/EditorialFigure";
import CTABanner from "@/components/CTABanner";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "एक उद्देश्य के लिए खरीदें",
  description: "“होप” कैंडल — आपकी हर खरीद ज़रूरतमंद बचाए गए जानवरों को खिलाने, इलाज और सुरक्षा में मदद करती है।",
  alternates: { canonical: "/hi/shop", languages: { en: "/shop", hi: "/hi/shop", "x-default": "/shop" } },
};

const FONT_HI = '"Noto Sans Devanagari", Inter, system-ui, sans-serif';

const BADGES = ["पेट-फ्रेंडली", "वीगन", "क्रूरता-मुक्त", "विषमुक्त", "नैतिक रूप से प्राप्त", "भारत में निर्मित"];

const IMPACT = [
  { title: "भोजन", desc: "एक बचाए गए जानवर को लगभग 15 दिन तक खिलाता है।" },
  { title: "टीकाकरण", desc: "हमारी देखरेख में एक जानवर के ज़रूरी टीकों में मदद करता है।" },
  { title: "चिकित्सा एवं आश्रय सहायता", desc: "बचाए गए जानवरों के इलाज और सुरक्षित आश्रय में मदद करता है।" },
];

const REVIEWS = [
  {
    name: "गौरी डी., मुंबई",
    img: "/images/shop/gouri.jpg",
    quote: "मेरी बेटी हर शाम इसे जलाती है और जानवरों के लिए प्रार्थना करती है।",
    body: "मेरी बेटी सिर्फ़ आठ साल की है, पर वह पहले से ही उन लोगों की मदद करने का महत्व समझती है जो अपने लिए आवाज़ नहीं उठा सकते। “होप” कैंडल जलाना हमारे परिवार के लिए एक सार्थक रिवाज़ बन गया है।",
  },
  {
    name: "अमित एम., मुंबई",
    img: "/images/shop/amit.jpg",
    quote: "यह सिर्फ़ एक कैंडल नहीं है — यह एक जार में उम्मीद है।",
    body: "मैंने दिवाली पर कुछ उपहार के तौर पर खरीदे। खुशबू गर्म और शांत करने वाली है, पर इसे खास बनाता है यह जानना कि यह खरीद सड़क के जानवरों को खिलाने और इलाज में मदद करती है।",
  },
  {
    name: "शीतल एम., मुंबई",
    img: "/images/shop/sheetal.jpg",
    quote: "आख़िरकार, देने का एक ऐसा तरीका जो व्यक्तिगत लगता है।",
    body: "मैंने पहले भी NGO को दान दिया है, पर यह अलग लगा। मैं वाकई उन जानवरों को देख सकी जिनकी मेरी खरीद ने मदद की।",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-copper" role="img" aria-label="5 में से 5 सितारे">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z"/></svg>
      ))}
    </div>
  );
}

export default function ShopHiPage() {
  const nonce = headers().get("x-nonce") ?? undefined;
  return (
    <div lang="hi" style={{ fontFamily: FONT_HI }}>
      <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product",
        name: "“होप” कैंडल",
        image: "https://rkmfoundation.com/images/shop/hope-candle.jpg",
        description: "“होप” कैंडल — 100% प्राकृतिक सोया-वैक्स और कॉटन बत्ती वाली, एप्पल-सिनेमन खुशबू वाली कैंडल जो 50 घंटे से अधिक जलती है। आपकी हर खरीद ज़रूरतमंद बचाए गए जानवरों को खिलाने, इलाज और सुरक्षा में मदद करती है।",
        brand: { "@type": "Brand", name: "RKM Foundation" },
        category: "Candle",
        inLanguage: "hi",
        offers: { "@type": "Offer", priceCurrency: "INR", price: "1999", availability: "https://schema.org/InStock", url: "https://rkmfoundation.com/hi/shop", seller: { "@type": "NGO", name: "RKM Foundation" } },
      }) }} />
      <BreadcrumbJsonLd items={[{ name: "होम", url: "https://rkmfoundation.com/hi" }, { name: "शॉप", url: "https://rkmfoundation.com/hi/shop" }]} />
      {/* Hero */}
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">एक उद्देश्य के लिए खरीदें</p>
            <h1 className="display-1 mt-6 text-balance">एक कैंडल जो एक कटोरा भर देती है।</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              इसे घर पर जलाएँ, और कहीं एक बचाए गए जानवर को भोजन, एक टीका, या सोने के लिए एक गर्म कोना मिल जाता है। बस यही पूरा विचार है।
            </p>
          </Reveal>
        </div>
      </section>

      {/* Product */}
      <section className="section-y">
        <div className="container-c grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <EditorialFigure alt="RKM फाउंडेशन की होप कैंडल" ratio="aspect-[4/5]" parallax speed={0.05} ghost="Hope" caption="“होप” कैंडल · एप्पल सिनेमन" />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7 lg:pl-4">
            <p className="eyebrow-index">“होप” कैंडल</p>
            <h2 className="display-2 mt-5 text-balance">50 घंटे जलती है। मदद कहीं ज़्यादा देर तक करती है।</h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/65">
              एप्पल सिनेमन — कुरकुरे सेब और हल्के दालचीनी के मसाले का एक सुकूनदायक मिश्रण जो आपके स्थान को गर्माहट और शांति से भर देता है। 100% प्राकृतिक सोया मोम और साफ़ कॉटन की बत्ती से हाथ से बनी, यह कैंडल 50 घंटे से ज़्यादा धीरे और समान रूप से जलती है।
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65">
              छोटे बैच में उत्पादन गुणवत्ता ऊँची रखता है और साथ ही ज़्यादा धन जानवरों की देखभाल की ओर भेजता है।
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span key={b} className="rounded-full bg-copper/10 px-3 py-1 text-xs font-medium text-[#795719]">{b}</span>
              ))}
            </div>
            <div className="mt-8 flex items-baseline gap-3">
              <span className="display-3 text-[2rem]">₹1,999</span>
              <span className="text-sm text-ink/65">शिपिंग एवं करों सहित</span>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#footer-email" className="btn-copper">जल्द लॉन्च — मुझे सूचित करें</a>
              <Link href="/hi/donate-now" className="btn-light">इसके बजाय दान करें</Link>
            </div>
            <p className="mt-4 text-sm text-ink/60">
              ऑनलाइन चेकआउट जल्द खुलेगा। पहले चाहिए?{" "}
              <a href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer" className="link-secondary">हमें व्हाट्सऐप करें</a>।
            </p>
            <p className="mt-3 text-xs text-ink/65">पूरे भारत में डिलीवरी (5–7 दिन) · सुरक्षित प्रीपेड चेकआउट</p>
          </Reveal>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">आपकी कैंडल का असर</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">यहाँ बताया है आपकी खरीद कैसे मदद करती है।</h2>
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
            <p className="eyebrow-index">एक ऐसा उपहार दें जो लौटकर देता है</p>
            <h2 className="display-2 mt-5 text-balance">किसी ऐसे को जानते हैं जो जानवरों से प्यार करता है?</h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/65">
              उन्हें यह कैंडल एक निजी संदेश के साथ भेजें। हम उन्हें यह दिखाते हुए अपडेट भी भेजेंगे कि उनके उपहार ने ज़रूरतमंद जानवरों को बचाने, खिलाने और स्वस्थ करने में कैसे मदद की।
            </p>
            <div className="mt-8">
              <a href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer" className="btn-dark">यह कैंडल उपहार में दें — उम्मीद जलती रहे</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">जिन्होंने एक जलाई, उनकी ज़ुबानी</p>
            <h2 className="display-2 mt-5 max-w-[18ch] text-balance">मेज़ पर एक कैंडल, और एक जानवर का पेट भरा।</h2>
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
                  <figcaption className="flex items-center gap-3 lg:col-span-4 lg:justify-end">
                    <Image src={r.img} alt={r.name} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                    <span className="font-medium">{r.name}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="उम्मीद जलती रहे।" lead="एक कैंडल खरीदें या सीधे दान करें — किसी भी तरह, एक बचाए गए जानवर को भोजन, एक टीका, या सोने के लिए एक सुरक्षित जगह मिलती है।" />

      {/* Tax fine print */}
      <section className="bg-snow py-14">
        <div className="container-c max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-ink/65">
            <strong className="text-ink/75">कर लाभ पर ध्यान दें:</strong> शॉप से की गई खरीद RKM फाउंडेशन के कार्य में सहयोग करती है, पर इसे उत्पाद खरीद माना जाता है और यह 80G कर लाभ के लिए पात्र नहीं है।
          </p>
        </div>
      </section>
    </div>
  );
}
