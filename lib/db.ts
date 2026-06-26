// Server-side Postgres access via Supabase REST (service key required for writes; RLS bypass).
// Falls back to no-op logging when SUPABASE_SERVICE_KEY is absent (pre-launch mode).
const URL = process.env.SUPABASE_URL || "https://rnwifjrdhdhemrlmgjij.supabase.co";
const KEY = process.env.SUPABASE_SERVICE_KEY;

export function dbEnabled() { return !!KEY; }

async function rest(path: string, init: RequestInit & { headers?: Record<string, string> } = {}) {
  if (!KEY) throw new Error("db-not-configured");
  const r = await fetch(`${URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: KEY, Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json", Prefer: "return=representation",
      ...init.headers,
    },
  });
  if (!r.ok) {
    // Log the verbose PostgREST body server-side only; never surface it in the thrown message.
    console.error(`[db] ${path} ${r.status}: ${await r.text()}`);
    throw new Error(`db-error ${r.status}`);
  }
  const t = await r.text();
  return t ? JSON.parse(t) : null;
}

export async function upsertDonor(d: { full_name: string; email?: string; mobile?: string; pan?: string; residency_declared: boolean; source?: string }) {
  // dedupe by email (lowercased) — PAN dedup happens in Stage 2
  if (d.email) {
    const found = await rest(`donor?select=donor_id&email=ilike.${encodeURIComponent(d.email)}&limit=1`);
    if (found?.[0]) return found[0].donor_id as string;
  }
  const row = await rest("donor", { method: "POST", body: JSON.stringify({ ...d, email: d.email?.toLowerCase() }) });
  return row[0].donor_id as string;
}

export async function insertDonation(x: Record<string, unknown>) {
  const row = await rest("donation", { method: "POST", body: JSON.stringify(x) });
  return row[0];
}

export async function recordPaymentEvent(e: { provider_event_id: string; event_type: string; signature_valid: boolean; payload: unknown; donation_id?: string }) {
  try {
    await rest("payment_event", { method: "POST", body: JSON.stringify(e) });
    return { duplicate: false };
  } catch (err: any) {
    if (String(err.message).includes("409") || String(err.message).includes("duplicate")) return { duplicate: true };
    throw err;
  }
}

export async function markDonationPaid(payment_ref: string, patch: Record<string, unknown>) {
  return rest(`donation?payment_ref=eq.${encodeURIComponent(payment_ref)}`, { method: "PATCH", body: JSON.stringify({ status: "paid", ...patch }) });
}

export async function completeCompliance(donorEmail: string, data: { pan: string; name_as_per_pan: string; address_line?: string; city?: string; state?: string; pincode?: string }) {
  const donors = await rest(`donor?select=donor_id,compliance_state&email=ilike.${encodeURIComponent(donorEmail)}&limit=1`);
  if (!donors?.[0]) throw new Error("donor-not-found");
  const id = donors[0].donor_id;
  await rest(`donor?donor_id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ ...data, compliance_state: "complete" }) });
  await rest("compliance_event", { method: "POST", body: JSON.stringify({ donor_id: id, field: "pan", old_value: null, new_value: data.pan.slice(0, 3) + "XXXXX" + data.pan.slice(-2), via: "stage2_form" }) });
  // propagate to this donor's paid donations awaiting compliance
  await rest(`donation?donor_id=eq.${id}&compliance_state=eq.pending_pan`, { method: "PATCH", body: JSON.stringify({ compliance_state: "complete", tenbd_includable: true }) });
  return id;
}

export function indianFY(d = new Date()) {
  const y = d.getFullYear(), m = d.getMonth() + 1;
  return m >= 4 ? `${y}-${String(y + 1).slice(2)}` : `${y - 1}-${String(y).slice(2)}`;
}

// ── M3: generic helpers for admin/receipt modules ────────────────────────────
export function dbConfig() { return { url: URL, key: KEY }; }
// Generic REST fetch against {SUPABASE_URL}/rest/v1/{path} (incl. rpc/* paths).
export async function dbFetch(path: string, init: RequestInit & { headers?: Record<string, string> } = {}) {
  return rest(path, init);
}
