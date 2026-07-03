import { NextRequest, NextResponse } from "next/server";
import { createMonthlySubscription, createOrder, keys } from "@/lib/razorpay";
import { dbEnabled, indianFY, insertDonation, upsertDonor } from "@/lib/db";
import { throttle } from "@/lib/guard";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "?";
    if (!throttle(`donate:${ip}`, 10)) {
      return NextResponse.json({ error: "Too many attempts. Please wait a minute." }, { status: 429 });
    }
    let parsed: unknown;
    try { parsed = await req.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
    const { amount, frequency, name, email } = (parsed ?? {}) as Record<string, unknown>;
    const amt = Math.round(Number(amount));
    if (!amt || amt < 1000 || amt > 10000000) {
      return NextResponse.json({ error: "Donation must be between ₹1,000 and ₹1,00,00,000." }, { status: 400 });
    }
    if (!keys()) return NextResponse.json({ demo: true });

    const notes = {
      name: String(name ?? "").slice(0, 100),
      email: String(email ?? "").slice(0, 100),
      source: "website",
    };
    let donorId: string | null = null;
    if (dbEnabled()) {
      try {
        donorId = await upsertDonor({ full_name: notes.name, email: notes.email, residency_declared: true, source: "donate_form" });
      } catch (e) { console.error("[donate] donor upsert", e); }
    }
    if (frequency === "monthly") {
      const sub = await createMonthlySubscription(amt * 100, notes);
      return NextResponse.json({ subscriptionId: sub.id, keyId: keys()!.keyId, amount: amt * 100, monthly: true });
    }
    const order = await createOrder(amt * 100, notes);
    if (dbEnabled() && donorId) {
      try {
        await insertDonation({
          donor_id: donorId, channel: "online", gross_amount_paise: amt * 100,
          status: "initiated", payment_ref: order.id, fund_id: process.env.DEFAULT_FUND_ID,
          financial_year: indianFY(), eighty_g_eligible: true,
        });
      } catch (e) { console.error("[donate] ledger insert", e); }
    }
    return NextResponse.json({ orderId: order.id, keyId: keys()!.keyId, amount: amt * 100 });
  } catch (e) {
    console.error("[donate]", e);
    return NextResponse.json({ error: "Could not initiate payment. Please try again." }, { status: 500 });
  }
}
