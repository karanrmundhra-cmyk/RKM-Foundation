"use client";
// /account/details (4D · M3 screen 4): PAN + address via the EXISTING
// /api/compliance path (masked audit trail included) — no duplicate system.
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { PortalNav, SignIn, usePortalSession } from "../portal";

type Donor = { full_name: string | null; name_as_per_pan: string | null; pan: string | null; address_line: string | null; city: string | null; state: string | null; pincode: string | null; compliance_state: string | null };

export default function DetailsPage() {
  const { session, ready } = usePortalSession();
  const [donor, setDonor] = useState<Donor | null>(null);
  const [form, setForm] = useState({ pan: "", name_as_per_pan: "", address_line: "", city: "", state: "", pincode: "" });
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data } = await supabaseBrowser().from("donor").select("full_name,name_as_per_pan,pan,address_line,city,state,pincode,compliance_state").limit(1);
      const d = (data?.[0] as Donor) ?? null;
      setDonor(d);
      if (d) setForm({ pan: "", name_as_per_pan: d.name_as_per_pan ?? d.full_name ?? "", address_line: d.address_line ?? "", city: d.city ?? "", state: d.state ?? "", pincode: d.pincode ?? "" });
    })();
  }, [session]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.user.email) return;
    setState("busy"); setMsg("");
    try {
      const r = await fetch("/api/compliance", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, ...form, pan: form.pan.toUpperCase() }),
      });
      const j = await r.json();
      if (!r.ok) { setState("err"); setMsg(j?.error ?? "Could not save."); return; }
      setState("ok"); setMsg("Saved. Your 80G certificate will use these details.");
    } catch { setState("err"); setMsg("Network error."); }
  }

  const mask = (pan: string | null) => (pan ? pan.slice(0, 2) + "•••••" + pan.slice(-3) : null);

  return (
    <section className="bg-snow pb-24 pt-32 sm:pt-36">
      <div className="container-c max-w-4xl">
        <p className="eyebrow-index">Your account</p>
        <h1 className="display-3 mt-4">Your details.</h1>
        {!ready ? <div className="card mt-10 h-40 animate-pulse" /> : !session ? <SignIn /> : (
          <>
            <PortalNav active="details" email={session.user.email ?? ""} />
            <div className="card-static mt-6 max-w-xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-dark">80G tax details</p>
              {donor?.pan ? (
                <p className="mt-3 text-sm leading-relaxed text-ink/70">PAN on file: <strong className="text-ink">{mask(donor.pan)}</strong>{donor.compliance_state === "complete" ? " · complete ✓" : ""}. Submitting the form below replaces it.</p>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-ink/70">No PAN on file yet — add it to receive your 80G tax certificate (Form 10BE).</p>
              )}
              <form onSubmit={submit} className="mt-5 grid gap-4">
                <div><label className="label-c" htmlFor="pan">PAN</label><input id="pan" required maxLength={10} className="input-c uppercase" value={form.pan} onChange={(e) => setForm({ ...form, pan: e.target.value })} placeholder="ABCDE1234F" pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]" /></div>
                <div><label className="label-c" htmlFor="nap">Name as per PAN</label><input id="nap" required maxLength={120} className="input-c" value={form.name_as_per_pan} onChange={(e) => setForm({ ...form, name_as_per_pan: e.target.value })} /></div>
                <div><label className="label-c" htmlFor="addr">Address</label><input id="addr" maxLength={300} className="input-c" value={form.address_line} onChange={(e) => setForm({ ...form, address_line: e.target.value })} /></div>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className="label-c" htmlFor="city">City</label><input id="city" maxLength={80} className="input-c" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
                  <div><label className="label-c" htmlFor="st">State</label><input id="st" maxLength={80} className="input-c" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} /></div>
                  <div><label className="label-c" htmlFor="pin">PIN</label><input id="pin" maxLength={10} className="input-c" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} /></div>
                </div>
                <button className="btn-copper" disabled={state === "busy"}>{state === "busy" ? "Saving…" : "Save details"}</button>
                {msg ? <p className={`text-sm ${state === "err" ? "text-red-700" : "text-copper-dark"}`} role={state === "err" ? "alert" : "status"}>{msg}</p> : null}
              </form>
              <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink/55">Changes are recorded in a masked audit trail. Email or mobile changes: <a className="link-secondary" href="mailto:info@rkm.support">info@rkm.support</a>.</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
