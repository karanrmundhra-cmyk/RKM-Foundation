import { test, expect } from "@playwright/test";

// Tobler's Ledger + mailer surfaces (4B). No DB in CI, so public pages render
// their honest empty states and admin APIs stay locked — exactly what we assert.

test.describe("Tobler's Ledger (public)", () => {
  test("/updates renders the timeline shell + empty state", async ({ page }) => {
    await page.goto("/updates");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Every rescue, written down");
    await expect(page.getByText("The first monthly update is being prepared")).toBeVisible();
  });

  test("/hi/updates renders full Hindi parity", async ({ page }) => {
    await page.goto("/hi/updates");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("हर बचाव");
    await expect(page.locator("div[lang='hi']").first()).toBeVisible();
  });

  test("unknown month 404s and invalid month is rejected", async ({ page }) => {
    const r = await page.goto("/updates/2031-01");
    expect(r?.status()).toBe(404);
    const bad = await page.goto("/updates/not-a-month");
    expect(bad?.status()).toBe(404);
  });
});

test.describe("Mailer API security", () => {
  test("admin endpoints are dead without a token", async ({ request }) => {
    for (const [method, url] of [["get", "/api/updates"], ["post", "/api/updates"], ["post", "/api/updates/preview"], ["post", "/api/updates/send"], ["post", "/api/updates/photo?month=2026-07"]] as const) {
      const r = method === "get" ? await request.get(url) : await request.post(url, { data: {} });
      expect(r.status(), `${method.toUpperCase()} ${url}`).toBe(401);
    }
  });

  test("action endpoint rejects garbage tokens without an oracle", async ({ request }) => {
    const r = await request.get("/api/updates/action?token=definitely-not-a-real-token-aaaaaaaaaaaa");
    expect([400, 503]).toContain(r.status()); // 503 when DB unconfigured (CI), 400 otherwise
    expect(await r.text()).not.toContain("consumed"); // no state leakage
  });

  test("resend webhook rejects unsigned posts", async ({ request }) => {
    const r = await request.post("/api/webhooks/resend", { data: { type: "email.delivered" } });
    expect([401, 503]).toContain(r.status()); // 503 when secret unset (CI), 401 when set + bad sig
  });
});

test.describe("Ops dashboard API (4C)", () => {
  test("attention scan and daily digest are locked down", async ({ request }) => {
    expect((await request.get("/api/admin/attention")).status()).toBe(401);
    expect((await request.get("/api/cron/daily")).status()).toBe(401);
    expect((await request.get("/api/cron/monthly")).status()).toBe(401);
  });
});

test.describe("Donor portal (4D)", () => {
  test("/account renders the magic-link sign-in when logged out", async ({ page }) => {
    await page.goto("/account");
    await expect(page.getByRole("heading", { name: "Sign in with your email." })).toBeVisible();
    await expect(page.getByRole("button", { name: /Email me a sign-in link/ })).toBeVisible();
  });

  test("receipt download API rejects anonymous and malformed requests", async ({ request }) => {
    expect([401, 503]).toContain((await request.get("/api/account/receipt?receipt_id=00000000-0000-0000-0000-000000000000")).status());
    expect([401, 503]).toContain((await request.get("/api/account/receipt?receipt_id=nope", { headers: { Authorization: "Bearer fake" } })).status());
  });
});

test.describe("Knowledge Vault API (4E)", () => {
  test("vault endpoints are dead without a token", async ({ request }) => {
    expect((await request.get("/api/admin/vault")).status()).toBe(401);
    expect((await request.post("/api/admin/vault?title=x&category=legal", { data: "x" })).status()).toBe(401);
    expect((await request.get("/api/admin/vault/file?document_id=00000000-0000-0000-0000-000000000000")).status()).toBe(401);
    expect((await request.post("/api/admin/vault/publish", { data: {} })).status()).toBe(401);
  });
});
