"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SubscribeForm() {
  const hi = usePathname().startsWith("/hi");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "dup" | "err">("idle");
  const [email, setEmail] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const r = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "newsletter", email }),
      });
      const d = await r.json();
      setState(d.duplicate ? "dup" : r.ok ? "ok" : "err");
    } catch { setState("err"); }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold">
        {hi ? "आशा से जुड़ें।" : "Subscribe to hope."}
      </h3>
      <form onSubmit={submit} className="mt-4 flex max-w-md gap-2">
        <label className="sr-only" htmlFor="footer-email">{hi ? "ईमेल पता" : "Email Address"}</label>
        <input id="footer-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder={hi ? "अपना ईमेल पता लिखें" : "Enter your email address"} className="input-c" />
        <button className="btn-dark shrink-0" disabled={state === "loading"}>
          {state === "loading" ? "…" : hi ? "सदस्यता लें" : "Subscribe"}
        </button>
      </form>
      <p aria-live="polite" className="mt-2 min-h-5 text-sm">
        {state === "ok" && <span className="text-copper-dark">{hi ? "RKM फाउंडेशन समुदाय में आपका स्वागत है।" : "Welcome to the RKM Foundation community."}</span>}
        {state === "dup" && <span className="text-ink/70">{hi ? "आप पहले से ही समुदाय का हिस्सा हैं।" : "You're already part of the community."}</span>}
        {state === "err" && <span className="text-red-600">{hi ? "कुछ गड़बड़ हो गई। कृपया फिर से प्रयास करें।" : "Something went wrong. Please try again."}</span>}
      </p>
    </div>
  );
}
