"use client";
// Shared portal chrome (4D): session handling + magic-link sign-in. Trust-first:
// any email can request a link; the portal shows whatever that email owns.
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { supabaseBrowser } from "@/lib/supabase-browser";

export function usePortalSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sb = supabaseBrowser();
    sb.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);
  return { session, ready };
}

export function SignIn() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "sent" | "err">("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy"); setErr("");
    const { error } = await supabaseBrowser().auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${window.location.origin}/account` },
    });
    if (error) { setErr(error.message); setState("err"); } else setState("sent");
  }
  return (
    <div className="card mx-auto mt-10 max-w-md p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-dark">Donor portal</p>
      <h2 className="mt-3 text-xl font-semibold tracking-tight">Sign in with your email.</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">No password. We&apos;ll email you a secure one-time link — use the address you donated with.</p>
      {state === "sent" ? (
        <p className="mt-5 rounded-xl bg-snow px-4 py-3 text-sm text-ink/80" role="status">Check your inbox — the sign-in link is on its way. It works once and expires soon.</p>
      ) : (
        <form onSubmit={submit} className="mt-5">
          <label className="label-c" htmlFor="pe">Email address</label>
          <input id="pe" type="email" required className="input-c" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
          <button className="btn-copper mt-4 w-full" disabled={state === "busy"}>{state === "busy" ? "Sending…" : "Email me a sign-in link"}</button>
          {err ? <p className="mt-3 text-sm text-red-700" role="alert">{err}</p> : null}
        </form>
      )}
      <p className="mt-5 text-xs leading-relaxed text-ink/70">Receipts are legal documents and are always emailed after every donation regardless of this portal.</p>
    </div>
  );
}

export function PortalNav({ active, email, }: { active: "overview" | "receipts" | "details"; email: string }) {
  const tab = (href: string, key: string, label: string) => (
    <Link href={href} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active === key ? "bg-ink text-white" : "text-ink/70 hover:text-copper-dark"}`}>{label}</Link>
  );
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
      <nav aria-label="Account" className="flex gap-1 rounded-full bg-snow p-1.5 ring-1 ring-ink/10">
        {tab("/account", "overview", "Overview")}
        {tab("/account/receipts", "receipts", "Receipts")}
        {tab("/account/details", "details", "My details")}
      </nav>
      <div className="flex items-center gap-3 text-sm text-ink/60">
        <span>{email}</span>
        <button type="button" className="underline underline-offset-4 hover:text-copper-dark" onClick={() => void supabaseBrowser().auth.signOut()}>Sign out</button>
      </div>
    </div>
  );
}

export function inr(paise?: number | null): string {
  return "₹" + ((paise ?? 0) / 100).toLocaleString("en-IN");
}
