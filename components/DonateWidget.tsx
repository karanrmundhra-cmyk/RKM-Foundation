"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { track, EV } from "@/lib/analytics";

const AMOUNTS = [
  { v: 2500, label: "₹2,500", ctx: "Feeds a rescued animal for 2 weeks", ctxHi: "एक बचाए गए जानवर को 2 हफ़्ते खिलाता है" },
  { v: 5000, label: "₹5,000", ctx: "Food & daily care for 2–3 animals for a month", ctxHi: "2–3 जानवरों के लिए एक महीने का भोजन और देखभाल", popular: true },
  { v: 10000, label: "₹10,000", ctx: "Emergency medical treatment or one kennel", ctxHi: "आपातकालीन चिकित्सा या एक केनेल" },
];

declare global { interface Window { Razorpay?: any } }

export default function DonateWidget() {
  const router = useRouter();
  const params = useSearchParams();
  const hi = usePathname().startsWith("/hi");
  // Recurring-first (§8): default to monthly. A ?onetime deep-link can still
  // start on one-time; the thank-you upsell deep-links with ?monthly=1.
  const [freq, setFreq] = useState<"one-time" | "monthly">(params.get("onetime") ? "one-time" : "monthly");
  const [amount, setAmount] = useState<number>(5000);
  const [custom, setCustom] = useState("");
  const [coverFees, setCoverFees] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);

  const effective = custom ? Number(custom) : amount;
  // Optional fee-cover (§8): donor can absorb the ~2% gateway fee so 100% of the
  // intended gift reaches the animals. Capped to whole rupees.
  const amountToCharge = coverFees ? Math.round(effective * 1.02) : effective;
  const customInvalid = custom !== "" && Number(custom) < 1000;
  const okPath = hi ? "/hi/thank-you" : "/thank-you";
  const failPath = hi ? "/hi/donation-failed" : "/donation-failed";

  // Funnel: donation widget viewed (§12 event map). Consent-gated in lib/analytics.
  useEffect(() => { track(EV.donateView); }, []);

  async function donate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    if (!effective || effective < 1000) { setMsg(hi ? "न्यूनतम दान ₹1,000 है।" : "Minimum donation is ₹1,000."); return; }
    const form = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    setBusy(true);
    track(EV.detailsStarted, { amount: amountToCharge, frequency: freq, coverFees });
    try {
      const r = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountToCharge, frequency: freq, name: form.name, email: form.email }),
      });
      const d = await r.json();
      if (d.error) { setMsg(d.error); setBusy(false); return; }
      if (d.demo) { setDemo(true); setBusy(false); return; }

      if (!window.Razorpay) {
        await new Promise<void>((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://checkout.razorpay.com/v1/checkout.js";
          // Fail fast instead of hanging on "Opening secure payment…" forever when
          // checkout.js is blocked (ad-blocker / privacy extension) or the network stalls.
          const timer = setTimeout(() => rej(new Error("rzp-load-timeout")), 12000);
          s.onload = () => { clearTimeout(timer); res(); };
          s.onerror = () => { clearTimeout(timer); rej(new Error("rzp-load-error")); };
          document.body.appendChild(s);
        });
      }
      // Guard: even if the <script> "loaded", an extension can strip the global.
      if (!window.Razorpay) throw new Error("rzp-unavailable");
      const rzp = new window.Razorpay({
        key: d.keyId,
        ...(d.monthly ? { subscription_id: d.subscriptionId } : { order_id: d.orderId, amount: d.amount, currency: "INR" }),
        name: "RKM Foundation",
        description: freq === "monthly" ? (hi ? "मासिक दान (कभी भी रद्द करें)" : "Monthly donation (cancel anytime)") : (hi ? "दान" : "Donation"),
        image: "/logo-512.png",
        prefill: { name: form.name, email: form.email },
        notes: { pan: form.pan ?? "", address: form.address ?? "", whatsapp_optin: form.whatsapp ? "yes" : "no" },
        theme: { color: "#93502b" },
        handler: async (resp: any) => {
          // Server-side signature verification before showing success
          try {
            const v = await fetch("/api/donate/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            }).then((x) => x.json());
            track(v.verified ? EV.paymentSuccess : EV.paymentFailed, { amount: amountToCharge, frequency: freq });
            router.push(v.verified ? okPath : failPath);
          } catch { track(EV.paymentFailed, { reason: "verify_error" }); router.push(failPath); }
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rzp.on("payment.failed", () => { track(EV.paymentFailed, { reason: "razorpay" }); router.push(failPath); });
      track(EV.razorpayLaunched, { amount: amountToCharge, frequency: freq });
      rzp.open();
    } catch {
      // If the Razorpay global never appeared, the checkout script was almost
      // certainly blocked by an ad-blocker / privacy extension — tell the donor
      // exactly that and offer a fallback, rather than a generic retry.
      const blocked = typeof window !== "undefined" && !window.Razorpay;
      setMsg(
        blocked
          ? (hi
              ? "सुरक्षित भुगतान विंडो नहीं खुल सकी — कोई ऐड-ब्लॉकर या प्राइवेसी एक्सटेंशन इसे रोक रहा हो सकता है। कृपया उसे इस साइट के लिए बंद करें और फिर से प्रयास करें, या फ़ुटर में दिए QR से UPI द्वारा दें, या info@rkm.support पर लिखें।"
              : "We couldn't open the secure payment window — an ad-blocker or privacy extension may be blocking it. Please disable it for this site and retry, or pay via the UPI/QR in the footer, or write to info@rkm.support.")
          : (hi ? "भुगतान शुरू नहीं हो सका। कृपया फिर से प्रयास करें।" : "Could not initiate payment. Please try again.")
      );
      setBusy(false);
    }
  }

  if (demo) {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 8v5m0 3v.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" strokeLinecap="round"/></svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold">{hi ? "ऑनलाइन भुगतान जल्द शुरू हो रहा है" : "Online payments launch soon"}</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink/70">
          {hi ? <>हम अपना सुरक्षित भुगतान गेटवे सक्रिय कर रहे हैं। तब तक, सीधे दान करने के लिए{" "}
            <a className="link-secondary" href="mailto:info@rkm.support">info@rkm.support</a> पर लिखें या{" "}
            <a className="link-secondary" href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer">व्हाट्सऐप करें</a>{" "}
            — हम कुछ ही मिनटों में आपकी मदद करेंगे।</> : <>We&apos;re activating our secure payment gateway. Meanwhile, write to{" "}
            <a className="link-secondary" href="mailto:info@rkm.support">info@rkm.support</a> or{" "}
            <a className="link-secondary" href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer">WhatsApp us</a>{" "}
            to donate directly — we&apos;ll guide you in minutes.</>}
        </p>
        <button onClick={() => setDemo(false)} className="btn-light mt-6">{hi ? "वापस" : "Back"}</button>
      </div>
    );
  }

  return (
    <form onSubmit={donate} className="card p-6 sm:p-8" style={hi ? { fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' } : undefined}>
      <div className="grid grid-cols-2 gap-2 rounded-full bg-snow p-1.5 ring-1 ring-ink/10" role="radiogroup" aria-label={hi ? "दान आवृत्ति" : "Donation frequency"}>
        {(["one-time", "monthly"] as const).map((f) => (
          <button key={f} type="button" onClick={() => { setFreq(f); track(EV.frequencySelected, { frequency: f }); }} role="radio" aria-checked={freq === f}
            className={`rounded-full py-2.5 text-sm font-semibold transition-colors ${freq === f ? "bg-ink text-white" : "text-ink/60 hover:text-ink"}`}>
            {f === "one-time" ? (hi ? "एक बार" : "One-Time") : (hi ? "मासिक" : "Monthly")}
          </button>
        ))}
      </div>
      {freq === "monthly" && (
        <p className="mt-2 text-center text-xs text-copper-dark">{hi ? "मासिक दान रोज़ाना भोजन और देखभाल बनाए रखता है। कभी भी रद्द करें।" : "Monthly giving sustains daily feeding & care. Cancel anytime."}</p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {AMOUNTS.map((a) => (
          <button type="button" key={a.v} onClick={() => { setAmount(a.v); setCustom(""); track(EV.amountSelected, { value: a.v, type: "preset" }); }}
            aria-pressed={!custom && amount === a.v}
            className={`relative rounded-2xl border p-4 text-left transition-all ${!custom && amount === a.v ? "border-copper bg-copper/10 ring-1 ring-copper" : "border-ink/15 hover:border-copper/60"}`}>
            {a.popular && <span className="absolute -top-2.5 right-3 rounded-full bg-copper-dark px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">{hi ? "सबसे ज़्यादा चुना गया" : "Most Chosen"}</span>}
            <div className="text-lg font-bold">{a.label}</div>
            <div className="mt-1 text-xs leading-snug text-ink/60">{hi ? a.ctxHi : a.ctx}</div>
          </button>
        ))}
      </div>
      <div className="mt-3">
        <label htmlFor="custom-amt" className="sr-only">{hi ? "रुपये में कोई अन्य राशि, न्यूनतम 1,000" : "Custom amount in rupees, minimum 1,000"}</label>
        <input id="custom-amt" inputMode="numeric" pattern="[0-9]*" placeholder={hi ? "या कोई अन्य राशि लिखें" : "Or enter a custom amount"}
          aria-describedby="custom-amt-hint" aria-invalid={customInvalid}
          value={custom} onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
          className={`input-c ${customInvalid ? "!border-red-400" : ""}`} />
        <p id="custom-amt-hint" className={`mt-1 text-xs ${customInvalid ? "text-red-600" : "text-ink/60"}`}>
          {hi ? "न्यूनतम दान ₹1,000" : "Minimum donation ₹1,000"}
        </p>
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-xs text-ink/70">
        <input type="checkbox" checked={coverFees} onChange={(e) => setCoverFees(e.target.checked)} className="mt-0.5 accent-copper-dark" />
        <span>{hi
          ? "मैं ~2% लेन-देन शुल्क वहन करता/करती हूँ ताकि मेरा पूरा दान जानवरों तक पहुँचे।"
          : "I'll cover the ~2% transaction fee so my entire gift reaches the animals."}</span>
      </label>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div><label className="label-c" htmlFor="d-name">{hi ? "पूरा नाम" : "Full Name"} <span className="text-copper-dark">*</span></label>
          <input id="d-name" name="name" required autoComplete="name" className="input-c" placeholder={hi ? "आपका पूरा नाम" : "Your full name"} /></div>
        <div><label className="label-c" htmlFor="d-email">{hi ? "ईमेल" : "Email"} <span className="text-copper-dark">*</span></label>
          <input id="d-email" name="email" type="email" required autoComplete="email" className="input-c" placeholder="you@example.com" /></div>
        <div><label className="label-c" htmlFor="d-pan">PAN <span className="text-ink/60">{hi ? "(वैकल्पिक)" : "(optional)"}</span></label>
          <input id="d-pan" name="pan" maxLength={10} pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]" className="input-c uppercase" placeholder="ABCDE1234F" aria-describedby="pan-hint" />
          <p id="pan-hint" className="mt-1 text-xs text-ink/60">{hi ? "केवल आपके 80G कर प्रमाणपत्र के लिए आवश्यक" : "Needed only for your 80G tax certificate"}</p></div>
        <div><label className="label-c" htmlFor="d-addr">{hi ? "पता" : "Address"} <span className="text-ink/60">{hi ? "(वैकल्पिक)" : "(optional)"}</span></label>
          <input id="d-addr" name="address" autoComplete="address-level2" className="input-c" placeholder={hi ? "शहर, राज्य" : "City, State"} /></div>
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-xs text-ink/70">
        <input type="checkbox" name="whatsapp" className="mt-0.5 accent-copper-dark" />
        <span>{hi ? "मुझे व्हाट्सऐप पर प्रभाव अपडेट भेजें (आपकी मदद किए जानवरों की तस्वीरें और कहानियाँ)" : "Send me impact updates on WhatsApp (photos & stories of the animals you help)"}</span>
      </label>
      <label className="mt-3 flex items-start gap-2.5 text-xs text-ink/60">
        <input type="checkbox" required className="mt-0.5 accent-copper-dark" />
        <span>{hi ? <>मैं <a href="/legal/terms-and-conditions" className="underline underline-offset-2 hover:text-copper-dark">नियम और शर्तें</a> और <a href="/legal/privacy-policy" className="underline underline-offset-2 hover:text-copper-dark">गोपनीयता नीति</a> से सहमत हूँ।</> : <>I agree to the <a href="/legal/terms-and-conditions" className="underline underline-offset-2 hover:text-copper-dark">Terms &amp; Conditions</a> and <a href="/legal/privacy-policy" className="underline underline-offset-2 hover:text-copper-dark">Privacy Policy</a>.</>}</span>
      </label>

      <button disabled={busy} className="btn-copper mt-6 w-full !py-4 text-base">
        {busy
          ? (hi ? "सुरक्षित भुगतान खुल रहा है…" : "Opening secure payment…")
          : hi
            ? `${effective >= 1000 ? `₹${amountToCharge.toLocaleString("en-IN")}` : ""} दान करें${freq === "monthly" ? " / माह" : ""}`
            : `Donate ${effective >= 1000 ? `₹${amountToCharge.toLocaleString("en-IN")}` : "Now"}${freq === "monthly" ? " / month" : ""}`}
      </button>
      {msg && <p className="mt-3 text-center text-sm text-red-600" aria-live="polite">{msg}</p>}

      <p className="mt-4 text-center text-[11px] font-medium tracking-wide text-ink/60">
        {hi ? "कार्ड · नेटबैंकिंग — Razorpay द्वारा सुरक्षित" : "Cards · NetBanking — secured by Razorpay"}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-ink/10 pt-5 text-[11px] text-ink/60 sm:grid-cols-4">
        <div className="flex items-center gap-1.5"><Check /> {hi ? "80G कर लाभ" : "80G tax benefits"}</div>
        <div className="flex items-center gap-1.5"><Check /> {hi ? "सत्यापित भुगतान" : "Verified payments"}</div>
        <div className="flex items-center gap-1.5"><Check /> {hi ? "तुरंत रसीद" : "Instant receipt"}</div>
        <div className="flex items-center gap-1.5"><Check /> {hi ? "कभी भी रद्द करें" : "Cancel anytime"}</div>
      </div>
    </form>
  );
}

function Check() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#93502b" strokeWidth="2.5" aria-hidden className="shrink-0"><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
