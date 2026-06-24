// Privacy-first, consent-gated, never-throws event tracking (§12 funnel, §13 DPDP).
//
// Design:
// - NO network call and NO cookie until explicit analytics consent exists
//   (window.__rkmf_analyticsConsent === true). Until then events buffer in
//   memory only, so instrumentation is wired but nothing leaks pre-consent.
// - Provider-agnostic: when a cookieless provider is loaded (Plausible by
//   default), consented events forward to it; otherwise they stay in the local
//   buffer for dev/QA visibility.
// - Must NEVER throw — analytics can never break the donation flow.
//
// Consent (SOP-01 / RKMF-004) is owned here so the banner, the provider loader
// (components/Analytics.tsx), and track() share one source of truth. The
// CookieBanner sets the choice via setAnalyticsConsent(); the loader reads
// getStoredConsent() and listens for CONSENT_EVENT. Reject is a real, equally
// weighted choice — it persists "denied" and guarantees the flag stays off.

export type TrackProps = Record<string, string | number | boolean | undefined>;

interface BufferedEvent {
  event: string;
  props: TrackProps;
  t: number;
}

type PlausibleFn = (event: string, opts?: { props?: TrackProps }) => void;

declare global {
  interface Window {
    __rkmf_analyticsConsent?: boolean;
    __rkmf_events?: BufferedEvent[];
    plausible?: PlausibleFn & { q?: unknown[] };
  }
}

// localStorage key + custom-event name shared across the consent system.
export const CONSENT_KEY = "rkmf-consent";
export const CONSENT_EVENT = "rkmf:consent-changed";
export type ConsentChoice = "granted" | "denied";

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

// Persist the visitor's choice, flip the in-memory consent flag, and broadcast
// so the provider loader can react without a page reload.
export function setAnalyticsConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch {
    /* storage may be unavailable (private mode) — still honour the choice in-memory */
  }
  window.__rkmf_analyticsConsent = granted === true;
  try {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { granted } }));
  } catch {
    /* no-op */
  }
}

export function track(event: string, props: TrackProps = {}): void {
  if (typeof window === "undefined") return;
  try {
    const w = window;
    // Always keep a local, in-memory trail (no storage, no network) so the
    // funnel is observable in dev/QA even before a provider is connected.
    (w.__rkmf_events ||= []).push({ event, props, t: Date.now() });

    // Only forward off-device after explicit consent AND with a live provider.
    if (w.__rkmf_analyticsConsent === true && typeof w.plausible === "function") {
      w.plausible(event, { props });
    }
  } catch {
    /* analytics must never break the app */
  }
}

// Canonical funnel event names (§12 event map) — import these to avoid typos.
export const EV = {
  donateView: "donate_view",
  frequencySelected: "frequency_selected",
  amountSelected: "amount_selected",
  detailsStarted: "details_started",
  razorpayLaunched: "razorpay_launched",
  paymentSuccess: "payment_success",
  paymentFailed: "payment_failed",
} as const;
