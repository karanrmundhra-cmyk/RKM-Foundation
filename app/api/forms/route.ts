import { NextRequest, NextResponse } from "next/server";
import { sendFormEmail, sendFormAck, sendNewsletterWelcome } from "@/lib/email";
import { throttle, validate, type Rule } from "@/lib/guard";

const SCHEMAS: Record<string, Record<string, Rule>> = {
  newsletter: { email: { required: true, email: true, max: 200 } },
  unsubscribe: { email: { required: true, email: true, max: 200 } },
  volunteer: { name: { required: true, max: 100 }, email: { required: true, email: true }, way: { required: true, max: 80 }, story: { max: 3000 } },
  careers: { name: { required: true, max: 100 }, email: { required: true, email: true }, phone: { max: 20 }, role: { max: 120 }, message: { max: 3000 } },
  contact: { name: { required: true, max: 100 }, email: { required: true, email: true }, message: { required: true, max: 3000 } },
  csr: { name: { required: true, max: 100 }, phone: { required: true, max: 20 }, email: { required: true, email: true }, company: { required: true, max: 150 }, pillar: { max: 60 }, budget: { max: 60 }, message: { max: 3000 } },
  partner: { org_name: { required: true, max: 150 }, reg_number: { max: 80 }, org_address: { max: 300 }, contact_person: { required: true, max: 100 }, email: { required: true, email: true }, phone: { max: 20 }, cause_description: { required: true, max: 3000 }, funding_required: { max: 30 }, beneficiaries: { max: 100 } },
  "fundraiser-create": { title: { max: 150 }, name: { required: true, max: 100 }, email: { required: true, email: true }, phone: { required: true, max: 20 }, occasion: { max: 60 }, message: { max: 2000 }, goal: { max: 40 }, duration: { required: true, max: 20 } },
};

const seen = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "?";
    if (!throttle(`forms:${ip}`, 8)) {
      return NextResponse.json({ error: "Too many submissions. Please wait a minute." }, { status: 429 });
    }
    let body: any;
    try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
    const { formType, _ts, website } = body ?? {};
    const schema = SCHEMAS[formType as string];
    if (!schema) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    // bot checks: honeypot + minimum fill time
    if (website) return NextResponse.json({ ok: true });
    if (_ts && Date.now() - Number(_ts) < 2000) return NextResponse.json({ ok: true });

    const result = validate(body, schema);
    if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });

    const email = (result.clean!.email ?? "").toLowerCase();
    if (email) {
      const k = `${formType}:${email}`;
      const last = seen.get(k);
      if (last && Date.now() - last < 1000 * 60 * 60) {
        return NextResponse.json({ ok: true, duplicate: true });
      }
      seen.set(k, Date.now());
    }

    await sendFormEmail(formType, result.clean!);
    // Acknowledgement to the submitter — best-effort, never blocks the response.
    try {
      if (formType === "newsletter") await sendNewsletterWelcome(result.clean!.email);
      else await sendFormAck(formType, result.clean!);
    } catch (e) { console.error("[forms] ack", e); }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[forms]", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
