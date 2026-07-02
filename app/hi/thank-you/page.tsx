import type { Metadata } from "next";
import Link from "next/link";
import ComplianceForm from "@/components/ComplianceForm";

export const metadata: Metadata = { title: "धन्यवाद", robots: { index: false, follow: false } };

export default function ThankYouHi() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center" lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <div className="container-c max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="display-2 mt-6 text-balance">आपकी दयालुता के लिए धन्यवाद।</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          आपका दान प्राप्त हो गया है। एक रसीद आपके इनबॉक्स में आ रही है — और जल्द ही, उन जानवरों की कहानियाँ भी जिनकी आपकी उदारता मदद कर रही है।
        </p>
        <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink/65 ring-1 ring-ink/10">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="text-copper-dark"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
          आपका दान सुरक्षित है — Razorpay द्वारा सुरक्षित, 256-बिट एन्क्रिप्टेड
        </p>
        <div className="mt-8"><ComplianceForm /></div>
        <div className="card mx-auto mt-6 max-w-md p-6 text-left">
          <p className="text-sm font-bold uppercase tracking-wider text-copper-dark">इसे बनाए रखें</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/80">
            एक भोजन आज एक जानवर को खिलाता है। एक मासिक दान उन्हें हर दिन खिलाता रहता है। ज़्यादातर दानदाता ₹2,500/माह चुनते हैं — कभी भी रद्द करें।
          </p>
          <Link href="/hi/donate-now?monthly=1#donation" className="btn-copper mt-4 w-full">मेरा दान मासिक बनाएँ</Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/hi/fundraiser" className="btn-light">फंडरेज़र शुरू करें</Link>
          <Link href="/hi" className="link-secondary self-center text-sm">होम पर वापस</Link>
        </div>
        <div className="mt-10">
          <p className="text-sm text-ink/60">मिशन को किसी परवाह करने वाले के साथ साझा करें — इससे प्रभाव कई गुना बढ़ता है।</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a href="https://wa.me/?text=RKM%20Foundation%20rescues%2C%20feeds%2C%20heals%20and%20shelters%20animals%20in%20need%20across%20India.%20Join%20the%20mission%3A%20https%3A%2F%2Frkmfoundation.com" target="_blank" rel="noopener noreferrer" aria-label="व्हाट्सऐप पर साझा करें"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink/75 ring-1 ring-ink/10 transition-colors hover:text-copper-dark hover:ring-copper/50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.2 1.6 2.5 4 3.5 1.4.6 2 .6 2.7.5.4 0 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.2Z"/></svg>
              व्हाट्सऐप पर साझा करें
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Frkmfoundation.com" target="_blank" rel="noopener noreferrer" aria-label="फ़ेसबुक पर साझा करें"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink/75 ring-1 ring-ink/10 transition-colors hover:text-copper-dark hover:ring-copper/50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9V7c0-.8.2-1 1-1h2V3h-3c-2.5 0-4 1.5-4 4v2H8v3h2v9h3v-9h2.5l.5-3h-3Z"/></svg>
              फ़ेसबुक पर साझा करें
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
