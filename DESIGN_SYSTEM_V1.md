# RKM Foundation — Design System Specification V1 (FROZEN)
_Frozen 4 July 2026, after the T-01…T-06 typography batch and P-01/P-02 polish items. This documents the system **exactly as implemented** — it is the reference for every future feature (including the donor-engagement ecosystem). Do not deviate without a register entry and owner approval. Single open question inside the freeze: G-06 (copper-eyebrow contrast), owner's palette call._

Source of truth in code: `app/globals.css`, `tailwind.config.ts`, `components/*`. This file describes them; if they ever disagree, the code that shipped through an approved register item wins, and this file must be updated in the same PR.

---

## 1 · Color tokens (`tailwind.config.ts`)

| Token | Value | Role |
|---|---|---|
| `ink` | `#111111` | Text, dark surfaces (`bg-ink` banners/hero), buttons |
| `snow` / `mist` | `#F5F5F5` | Quiet section backgrounds, footer |
| `copper` | `#B89245` | Accent (selection tint, rules, decorative) |
| `copper-dark` | `#8F6A2A` | Primary CTA bg, eyebrow text, emphasis — the "action" color |
| `copper-light` | `#E6D2A0` | Hairlines, underline decorations on dark |
| White | `#FFFFFF` | Base page background |

Opacity steps are the shading system: text `ink/80 · /75 · /70 · /65 · /60` (never below `/60` for information-bearing text ≤ 13px — accessibility floor from the a11y gate), borders `ink/10 · /12 · /15`, rings `ink/[0.08]`.
Warm neutrals for image frames only: `#f1ede7`, `#f0ede8`, gradient `#f3efe9 → #e9e0d4`.
**Known legacy exception (do not copy):** `.impact-range` hardcodes `#93502b` / `rgba(197,138,74,…)` — visually adjacent to copper-dark; new work must use tokens.

## 2 · Typography

One family: **Inter** (400/500/600/700, self-hosted via @fontsource). Devanagari: **Noto Sans Devanagari** (same weights), applied per-surface via inline `fontFamily` when `hi`. Root = browser 16px; on screens ≥1920px the root is 17px (single media query in `globals.css` — DC-01-C Large Desktop Comfort). All utility sizes are authored in rem, so the whole system scales ~6% on large monitors only; px values in this spec are quoted at the 16px root.

**Display scale (fluid, hierarchy by scale not weight):**

| Class | clamp() | @1440px | Line-height / tracking |
|---|---|---|---|
| `.display-1` | 2.75rem → 1.6rem+5.6vw → 6.5rem | **104px** | 0.98 / −0.02em |
| `.display-2` | 2.1rem → 1.3rem+3.6vw → 4.25rem | **68px** | 1.02 / −0.02em |
| `.display-3` | 1.6rem → 1.2rem+1.8vw → 2.6rem | **41.6px** | 1.08 / −0.015em |
| `.editorial-word` | 2.5rem → 1.2rem+6vw → 6rem | 96px | 0.9 / −0.02em |
| `.h-display` | — | contextual | 1.1, semibold, tight |

**Utility scale (fixed, post-T-batch — measured live):** body 16px/1.6 · lead paragraphs `text-lg` 18px (hero lead 20px) · **buttons 15px/600** · header nav 15px · header toggle & MENU label 13px caps · footer links/headings/address/identity 15px · **form inputs 16px** (`.input-c` — never smaller: iOS zoom) · form labels 14px/500 (`.label-c`) · donate preset outcomes 13px · disclosure Q&A 13px · micro-labels/captions/allocation 12px · `.eyebrow` 12px caps/0.2em · `.eyebrow-index` 12px caps/0.22em with 32px leading hairline · deliberate whispers 10–11px ONLY for: "MOST CHOSEN" badge, hero micro-labels, cookie-banner detail line. Headlines `text-wrap: balance`, paragraphs `text-wrap: pretty`; lead measure `.lead-measure` = 34ch; body max ~66ch.

## 3 · Spacing, breakpoints, grid

- **Section rhythm:** `.section-y` = py-20/28/32 (sm/lg) · `.section-y-lg` = py-24/32/40. Never stack two full-bleed closing sections (the one-ending rule).
- **Container:** `.container-c` = `max-w-content` (**72rem**) + px-5 / sm:px-8, centered. At ≥1536px (2xl) it widens to **80rem** (DC-01-C). Below 1536px the 72rem width is deliberate — do not widen further.
- **Breakpoints:** Tailwind defaults (sm 640 / md 768 / lg 1024 / xl 1280). Conventions: single column below `sm`; 2-col grids at `sm`; 12-col asymmetric layouts (`lg:grid-cols-12`, typically 5/7 or 6/6 splits) at `lg`; 3-up rows use `sm:grid-cols-2 lg:grid-cols-3`.
- Grid gaps: content grids gap-x-12/16, gap-y-10/14; card grids gap-3/8.
- Footer list rows: `space-y-3` (T-03).

## 4 · Radius, borders, shadows

Buttons/pills `rounded-full` · cards `rounded-2xl` · figure frames `rounded-[1.25rem]` · inputs `rounded-xl` · badges `rounded-full`. Borders are hairlines: `border-ink/10–15`, rings `ring-1 ring-ink/[0.08]`. Shadow exists **only** on card hover: `0 1px 2px rgba(11,11,11,.06), 0 12px 32px −12px rgba(11,11,11,.18)` — no ambient shadows anywhere else.

## 5 · Buttons & CTA hierarchy

`.btn` base: inline-flex, rounded-full, **px-[1.875rem] py-[0.9375rem] text-[0.9375rem] font-semibold** (30/15/15px at 16px root), transition 200ms ease-out, hover `scale-[1.02] -translate-y-px`, active `scale-[0.98]`, `motion-reduce:transform-none`, focus `focus-visible:ring-2 ring-copper`.
Variants: `.btn-copper` (copper-dark → hover ink) = **primary**; `.btn-dark` (ink → hover copper-dark) = strong secondary on light; `.btn-light` (white + ring → hover copper ring/text) = secondary; on-dark ghost = `bg-white/10 ring-white/25 hover:bg-white/20`. Header Donate override: `!px-5 !py-2.5 !text-[0.9375rem]`.
**CTA hierarchy rules (frozen):** one `btn-copper` per view region; the alternative action is a **text link** — on light: `.link-secondary` (semibold, copper underline, offset-4); on dark: `text-sm font-semibold text-white/75 underline decoration-copper decoration-2 underline-offset-4 hover:text-white`. End-of-page banner = one contextual primary + one text alt (fundraiser pages → /fundraiser/create; CSR → #consultation; else Donate). Mobile sticky donate bar appears after 700px scroll, `sm:hidden`, suppressed on donate/thank-you/failed/legal routes.

## 6 · Forms

`.input-c`: full-width, rounded-xl, border ink/15, px-4 py-3, **text-base (16px)**, placeholder ink/60, focus = copper border + 1px copper ring (no glow). `.label-c`: 14px/500, ink/80, mb-1.5. Hints/errors 12px (`text-ink/60` / `text-red-600`). Checkboxes: 12–13px labels, `items-start gap-2.5`. Validation is inline, never blocking-modal. Honeypot + min-fill-time on public forms.

## 7 · Iconography & imagery

Icons: inline SVG only, stroke `#93502b`-family or currentColor, 13–26px, `aria-hidden`; no icon library. Checkmark ticks 13px pattern in the donate widget.
**Image treatment:** real documentary photography only (owner-supplied), warm grade; frames via `.figure-frame` / `.img-hover` (zoom 1.04 on hover, 500ms, motion-reduce off) on tinted warm bg (blur-up feel); `next/image` mandatory except the two GSAP-animated heroes (documented exception — plain `<img>` with `fetchPriority=high`); explicit dimensions always (CLS); alt text descriptive ("A rescued dog cared for by RKM Foundation" pattern). **Never** stock photography, never invented subjects. The homepage Tobler figure is owner-locked (rejected item H-02 — do not touch).

## 8 · Motion rules (frozen contract)

- **Signature easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for everything expressive; `ease-out` 200ms for utility hovers.
- **Timing bands:** micro (hover/press) 200–250ms · reveals 500ms (delay cap 160ms) · image zoom 500ms · drawer springs via Framer defaults · `hero-settle` 8s one-time scale 1.04→1.
- **Reveal contract:** content NEVER starts hidden; IntersectionObserver adds fade-up (12px) only for below-fold, 600ms hard fail-safe to visible; skip entirely under reduced motion.
- **Scroll layer (desktop only, both gates required: `!reducedMotion && !mobile`):** Lenis smoothWheel 1.1s wired to GSAP ScrollTrigger; hero parallax scrub ≤ yPercent 14 / scale 1.08; content drift ≤ −8%; pinned story beat; ₹ CountUps 1.1s render real values from first paint. All dynamically imported — never in the initial bundle, never delaying LCP.
- **Hover language:** buttons lift 1px + 1.02 · cards lift 3px + copper ring + soft shadow · images zoom 1.04 · menu links grow copper underline (origin-left, 300ms) · disclosure marker: copper **+ / –** (`.faq-disclosure`, P-01) — never the browser default triangle.
- **Focus:** every interactive element `focus-visible:ring-2 ring-copper` (slider thumb: 4px copper halo). **Prohibited:** scroll-jacking beyond the pinned beat, autoplaying media, cursor effects, page transitions, parallax on mobile, any animation requiring `unsafe-inline` CSP.

## 9 · Cards & recurring patterns

`.card` (hover-lift) / `.card-static` · `.figure-frame` · `.placeholder-figure` (tonal, never a dashed "upload here") · indexed list rows (01/02/03 copper tabular numerals + display-3 titles) · ruled lists (`border-t border-ink/12`, py-7/9 rows) · certificate chips (14px semibold + ring) · testimonial figure (26px copper quote SVG, 40px avatar, name·place·context 12px) · allocation strip (95/5 bar: copper fill + ink/25, 12px labels) · dark banner section (`bg-ink section-y text-white`, display-2 ≤ 20ch, lead white/70).

## 10 · Editorial writing rules (voice freeze)

Specific, humble, concrete; emotion through facts. Sentence case headlines with periods ("No vague promises."). Banned: charity clichés ("Be the change", "Every life matters"), motivational filler, unverifiable claims, invented names/numbers/stories (register gate), absolutist money claims (the 95/5 commitment sentence is the only allocation claim — G-02 wording is owner-controlled). Numbers: Indian formats (₹, lakh/crore, `en-IN` locale). ₹-outcome equivalences: **only** the canonical G-04 table — ₹2,500 "Two weeks of warm meals for a rescued animal getting back on its feet." · ₹5,000 "A full month of food and care for 2–3 animals in our shelter." · ₹10,000 "Emergency medical treatment — the surgery or care that saves a life." (kennel wording lives on /fundraiser only). Hindi is a first-class surface: every user-facing string ships EN+HI in the same PR, Devanagari font applied per-surface.

## 11 · Change control

Any visual/UX/content change: register entry → preview in `Review/preview-v2/` → owner approval by ID → implement approved IDs only → full CI (tsc, lint, E2E incl. axe WCAG 2.2 AA, Lighthouse) → deploy → live verification (measured, not asserted) → register updated. Small engineering fixes are exempt from preview but not from CI. Owner-rejected items (H-02 Tobler image, G-02 allocation copy, C-01 contact reorder, S-02, M-02 rename, A-01 About compression, G-03 nav) are archived — do not re-propose.

**Amendment — DC-01-C Large Desktop Comfort (4 Jul 2026, owner-approved after live measurement):** container 80rem at 2xl; root font 17px at ≥1920px; all fixed utility sizes converted px→rem (identical rendering at the 16px root; ~6% larger on ≥1920px screens). Measured trigger: at 2560×1440 the 72rem container left 704px empty gutters per side (45% content share). The freeze otherwise stands.
