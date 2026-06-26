# RKM Foundation

Website for **RKM Foundation**, a registered charitable animal-welfare trust in Thane West / Mumbai, India — rescue, feeding, veterinary care, sterilisation, vaccination, and adoption. Bilingual (English + Hindi `/hi`), donation-first, with 80G-compliant tax receipts.

Production: **https://rkmfoundation.com**

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS; self-hosted fonts (`@fontsource` Inter + Noto Sans Devanagari) |
| Hosting | Vercel (production = `main` branch) |
| Database | Supabase (donor/donation/receipt ledger — the compliance spine) |
| Payments | Razorpay (one-time orders + monthly subscriptions) |
| Email | Resend (acknowledgement + 80G receipt PDF via `pdf-lib`) |
| Analytics | Plausible (cookieless, consent-gated) |
| Motion | GSAP + Framer Motion + Lenis |

---

## Local development

```bash
npm install
cp .env.example .env.local   # fill in the values you need (see below)
npm run dev                  # http://localhost:3000
```

Scripts: `dev` · `build` · `start` · `lint` · `test:e2e` (Playwright) · `test:e2e:install` (one-time browser install).

The app degrades gracefully without secrets: missing Supabase → no-op ledger; missing Razorpay keys → the donate form shows a "payments launching soon" panel instead of erroring.

---

## Environment variables

See `.env.example` for the full annotated list. The important ones:

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay API (order/subscription creation) |
| **`RAZORPAY_WEBHOOK_SECRET`** | **Required for 80G receipts** — see Donations below |
| `SUPABASE_URL` / `SUPABASE_SERVICE_KEY` | Donation ledger + receipt numbering |
| `DEFAULT_FUND_ID` | Fund the donation is attributed to |
| `RESEND_API_KEY` / `FORMS_FROM_EMAIL` / `FORMS_TO_EMAIL` | Transactional email |
| `ADMIN_ACCESS_TOKEN` | Interim auth for `/admin` + receipt re-issue endpoint |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` / `_SRC` | Analytics (optional; defaults to Plausible Cloud) |

---

## Donations & 80G receipts (important)

Flow: donate form → `POST /api/donate` (creates Razorpay order/subscription) → Razorpay Checkout → `POST /api/donate/verify` (signature check) → thank-you page.

**The 80G receipt + email is issued ONLY by the Razorpay webhook**, `POST /api/razorpay-webhook`, on `payment.captured` — this is the idempotent "source of truth." It must be configured or **no receipt is sent even though the payment succeeds**:

1. Razorpay Dashboard → Settings → Webhooks → add `https://rkmfoundation.com/api/razorpay-webhook`, events `payment.captured` + `payment.failed` (+ `subscription.charged` for monthly), with a secret.
2. Set `RAZORPAY_WEBHOOK_SECRET` in Vercel (Production) to that secret; ensure `SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`, `DEFAULT_FUND_ID` are set too.

To re-issue a receipt for an existing paid donation: resend the `payment.captured` event from Razorpay, or `POST /api/admin/receipts/issue` with the admin token.

> Note: ad-blockers / privacy extensions can block `checkout.razorpay.com`; the form detects this and shows a UPI/contact fallback. Test donations in an Incognito window.

---

## Quality gates (CI)

`.github/workflows/ci.yml` runs on every PR + push to `main`:
- Typecheck (`tsc --noEmit`), lint, build (all build-failing)
- **Donation E2E** (Playwright, Razorpay mocked) — build-failing
- **Accessibility** (axe-core WCAG 2.2 AA across 7 pages) — build-failing, including color-contrast
- Lighthouse-CI (perf / a11y / SEO / budgets; see `lighthouserc.json`)

`.github/workflows/security.yml`: gitleaks secret scan + `npm audit` (weekly + on push).

---

## Security & compliance

- **CSP:** per-request nonce via `middleware.ts`; no `script-src 'unsafe-inline'`. Payment scripts run via host allowlist; Razorpay UI in an allowed iframe.
- **Headers:** HSTS (preload), COOP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (see `next.config.mjs`).
- **Consent (DPDP/GDPR):** no analytics before explicit opt-in; reject = accept; "Manage cookies" in the footer.
- **PCI:** card data never touches our servers/DOM (Razorpay-hosted checkout).

---

## Deployment

Production deploys automatically from `main` via the Vercel GitHub integration. Preview deploys are created for every branch/PR (protected by Vercel auth).

## Key directories

```
app/            # App Router routes (EN) + app/hi (Hindi) + app/api/* route handlers
components/     # UI components (prototype-v2/* power the homepage experience)
lib/            # razorpay, db (Supabase), notify/receipt (80G), analytics, content
middleware.ts   # per-request nonce CSP
e2e/            # Playwright: donation.spec.ts + a11y.spec.ts
```
