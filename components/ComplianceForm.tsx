"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ComplianceForm() {
  const hi = usePathname().startsWith("/hi");
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("busy");
    const d = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch("/api/compliance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      const j = await r.json();
      if (r.ok) setState("ok"); else { setErr(j.error || (hi ? "कृपया फिर से प्रयास करें।" : "Please try again.")); setState("err"); }
    } catch { setErr(hi ? "नेटवर्क त्रुटि — कृपया फिर से प्रयास करें।" : "Network error — please try again."); setState("err"); }
  }
  if (state === "ok") return (
    <div className="card mx-auto max-w-md p-6 text-center" style={hi ? { fontFamily: '"Noto Sans Devanagari", Inter, sans-serif' } : undefined}>
      <p className="font-semibold text-copper-dark">{hi ? "विवरण सहेजा गया — आपका 80G प्रमाणपत्र भेजा जा रहा है।" : "Details saved — your 80G certificate is on its way."}</p>
      <p className="mt-2 text-sm text-ink/70">{hi ? "आपका वैधानिक फ़ॉर्म 10BE प्रमाणपत्र वित्तीय वर्ष समाप्त होने के बाद (31 मई तक) जारी किया जाएगा, जैसा आयकर नियमों के अनुसार आवश्यक है।" : "Your statutory Form 10BE certificate will be issued after the financial year closes (by 31 May), as required by income-tax rules."}</p>
    </div>
  );
  return (
    <form onSubmit={submit} className="card mx-auto max-w-md p-6 text-left" style={hi ? { fontFamily: '"Noto Sans Devanagari", Inter, sans-serif' } : undefined}>
      <p className="text-sm font-bold uppercase tracking-wider text-copper-dark">{hi ? "अपना 80G कर लाभ प्राप्त करें" : "Claim your 80G tax benefit"}</p>
      <p className="mt-1.5 text-sm text-ink/70">{hi ? "30 सेकंड — आपका कर प्रमाणपत्र जारी करने के लिए हमें ये विवरण चाहिए।" : "30 seconds — we need these details to issue your tax certificate."}</p>
      <div className="mt-4 grid gap-3">
        <div><label htmlFor="c-email" className="label-c">{hi ? "दान के लिए इस्तेमाल किया ईमेल *" : "Email used for donation *"}</label>
          <input id="c-email" name="email" type="email" required className="input-c" /></div>
        <div><label htmlFor="c-pan" className="label-c">PAN *</label>
          <input id="c-pan" name="pan" required maxLength={10} className="input-c uppercase" placeholder="ABCDE1234F" /></div>
        <div><label htmlFor="c-name" className="label-c">{hi ? "PAN के अनुसार सटीक नाम *" : "Name exactly as per PAN *"}</label>
          <input id="c-name" name="name_as_per_pan" required className="input-c" /></div>
        <div><label htmlFor="c-addr" className="label-c">{hi ? "पता *" : "Address *"}</label>
          <input id="c-addr" name="address_line" required className="input-c" placeholder={hi ? "फ़्लैट / गली" : "Flat / street"} /></div>
        <div className="grid grid-cols-3 gap-2">
          <input name="city" required aria-label={hi ? "शहर" : "City"} className="input-c" placeholder={hi ? "शहर" : "City"} />
          <input name="state" required aria-label={hi ? "राज्य" : "State"} className="input-c" placeholder={hi ? "राज्य" : "State"} />
          <input name="pincode" required aria-label={hi ? "पिन कोड" : "PIN code"} maxLength={6} className="input-c" placeholder={hi ? "पिन" : "PIN"} />
        </div>
      </div>
      <button disabled={state === "busy"} className="btn-copper mt-4 w-full">{state === "busy" ? (hi ? "सहेजा जा रहा है…" : "Saving…") : (hi ? "सहेजें और मेरा 80G प्रमाणपत्र पाएँ" : "Save & Get My 80G Certificate")}</button>
      {state === "err" && <p className="mt-2 text-sm text-red-600" aria-live="polite">{err}</p>}
      <p className="mt-3 text-[0.75rem] text-ink/60">{hi ? "केवल आपके कर दस्तावेज़ के लिए। एन्क्रिप्टेड और कभी साझा नहीं किया जाता।" : "Used only for your tax documentation. Encrypted and never shared."}</p>
    </form>
  );
}
