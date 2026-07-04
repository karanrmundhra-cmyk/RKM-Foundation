import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import DonateWidget from "@/components/DonateWidget";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "दान करें",
  description: "आपकी उदारता बचाए गए जानवरों के लिए देखभाल को सार्थक कार्य में बदलती है। 80G कर लाभ, तुरंत रसीद, पूरी पारदर्शिता।",
  alternates: { canonical: "/hi/donate-now", languages: { en: "/donate-now", hi: "/hi/donate-now", "x-default": "/donate-now" } },
};

export default function DonateHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      {/* Warm up the Razorpay checkout origin so the payment modal opens fast (§8). */}
      <link rel="preconnect" href="https://checkout.razorpay.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://checkout.razorpay.com" />
      <section className="bg-snow pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="container-c grid items-start gap-x-16 gap-y-10 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-6">
            <p className="eyebrow-index">दान करें</p>
            <h1 className="display-2 mt-5 text-balance" style={{ lineHeight: 1.2 }}>
              आपकी उदारता देखभाल को <span className="text-copper-dark">कार्य में</span> बदलती है।
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">
              हर रुपया सीधे जानवरों तक पहुँचता है — एक भोजन, पशु-चिकित्सक की जाँच, ठीक होने के लिए एक सुरक्षित जगह। और हम आपको मैदान से तस्वीरें भेजेंगे, ताकि आप ठीक-ठीक देख सकें कि इसने क्या बदला।
            </p>


            <p className="mt-6 text-sm text-ink/60">
              कोई और तरीका पसंद है?{" "}
              <Link href="/hi/other-ways-to-give" className="link-secondary">समय, सामग्री या कौशल दें →</Link>
            </p>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2 lg:col-span-6">
            <div id="donation" className="scroll-mt-28">
              <Suspense fallback={<div className="card h-96 animate-pulse" />}>
                <DonateWidget />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
