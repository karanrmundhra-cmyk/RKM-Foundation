import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EditorialFigure from "@/components/EditorialFigure";

export const metadata: Metadata = {
  title: "ब्लॉग",
  description: "RKM फाउंडेशन से उम्मीद की कहानियाँ — बचाव, स्वस्थ होना, और उन्हें संभव बनाने वाले लोग।",
  alternates: { canonical: "/hi/blog", languages: { en: "/blog", hi: "/hi/blog", "x-default": "/blog" } },
};

export default function BlogHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">ब्लॉग</p>
            <h1 className="display-1 mt-6 text-balance" style={{ lineHeight: 1.2 }}>उम्मीद की कहानियाँ।</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              बचाव, स्वस्थ होना, और RKM फाउंडेशन के पीछे की दयालुता के शांत कार्य।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">विशेष · संस्थापक की कहानी</p>
          </Reveal>
          <Link href="/hi/blog/the-dog-who-started-it-all" className="group mt-8 grid items-center gap-x-16 gap-y-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <EditorialFigure src="/images/site/dog.jpg" alt="RKM फाउंडेशन की देखभाल में एक बचाया गया कुत्ता" ratio="aspect-[4/3]" parallax speed={0.05} priority />
            </Reveal>
            <Reveal delay={100} className="lg:col-span-6">
              <h2 className="display-2 text-balance transition-colors group-hover:text-copper-dark">वह कुत्ता जिससे सब शुरू हुआ</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
                कैसे टोबलर नाम के एक पग ने करुणा पर बने एक फाउंडेशन को प्रेरित किया।
              </p>
              <span className="link-secondary mt-7 inline-block">कहानी पढ़ें →</span>
            </Reveal>
          </Link>
          <Reveal className="mt-16 border-t border-ink/10 pt-8">
            <p className="text-sm text-ink/65">मैदान से और कहानियाँ जल्द ही आ रही हैं।</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink section-y text-white">
        <div className="container-c max-w-4xl text-center">
          <Reveal>
            <h2 className="display-2 mx-auto max-w-[20ch] text-balance">कहीं न कहीं, कोई जानवर इंतज़ार कर रहा है।</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">वह आपका नाम नहीं जानता। उसे बस किसी के साथ खड़े होने की ज़रूरत है। आज, वह आप हो सकते हैं।</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/hi/donate-now#donation" className="btn-copper">अभी दान करें</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
