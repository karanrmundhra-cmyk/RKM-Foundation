import { test, expect, type Page } from "@playwright/test";

// Donation critical-path E2E (SOP-13 / RKMF-024).
// Razorpay + /api/donate are mocked, so these run anywhere with no secrets and
// never touch the real payment processor — they verify OUR flow logic.

// Stub standing in for Razorpay's checkout.js: defines window.Razorpay and, on
// .open(), invokes the success handler with the same shape the real SDK sends.
const RAZORPAY_STUB = `
  window.Razorpay = function (opts) { this._o = opts; };
  window.Razorpay.prototype.on = function () {};
  window.Razorpay.prototype.open = function () {
    var o = this._o;
    Promise.resolve().then(function () {
      o.handler({
        razorpay_payment_id: 'pay_test123',
        razorpay_order_id: o.order_id || 'order_test123',
        razorpay_subscription_id: o.subscription_id,
        razorpay_signature: 'sig_test',
      });
    });
  };
`;

async function dismissConsent(page: Page) {
  const reject = page.getByRole("button", { name: "Reject" });
  if (await reject.isVisible().catch(() => false)) await reject.click();
}

async function fillRequiredFields(page: Page) {
  await page.locator("#d-name").fill("Test Donor");
  await page.locator("#d-email").fill("test@example.com");
  await page.locator("label", { hasText: /I agree to the/ }).getByRole("checkbox").check();
}

function form(page: Page) {
  // The page also has a newsletter <form>; scope to the donate form via its
  // unique frequency radiogroup.
  return page
    .locator("form")
    .filter({ has: page.getByRole("radiogroup", { name: /Donation frequency|दान आवृत्ति/ }) });
}

function submit(page: Page) {
  return form(page).getByRole("button", { name: /Donate/ });
}

// Amount presets are the only buttons carrying aria-pressed, so this avoids
// matching the submit CTA (which also contains "₹5,000" etc.).
function preset(page: Page, label: string) {
  return form(page).locator("button[aria-pressed]", { hasText: label });
}

// Route Razorpay's checkout.js to our stub, and the verify endpoint to a result.
async function mockRazorpay(page: Page, opts: { monthly?: boolean; verified?: boolean }) {
  await page.route("https://checkout.razorpay.com/**", (route) =>
    route.fulfill({ contentType: "application/javascript", body: RAZORPAY_STUB }),
  );
  await page.route("**/api/donate", (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(
        opts.monthly
          ? { keyId: "rzp_test_key", subscriptionId: "sub_test", amount: 500000, monthly: true }
          : { keyId: "rzp_test_key", orderId: "order_test", amount: 500000 },
      ),
    }),
  );
  await page.route("**/api/donate/verify", (route) =>
    route.fulfill({ contentType: "application/json", body: JSON.stringify({ verified: opts.verified ?? true }) }),
  );
}

test.beforeEach(async ({ page }) => {
  await page.goto("/donate-now");
  await dismissConsent(page);
  await expect(form(page)).toBeVisible();
});

test("recurring-first: monthly is the default frequency (§8)", async ({ page }) => {
  await expect(page.getByRole("radio", { name: "Monthly" })).toHaveAttribute("aria-checked", "true");
  await expect(page.getByRole("radio", { name: "One-Time" })).toHaveAttribute("aria-checked", "false");
  await expect(preset(page, "₹5,000")).toHaveAttribute("aria-pressed", "true");
  await expect(submit(page)).toContainText("/ month");
});

test("switching to one-time drops the monthly framing", async ({ page }) => {
  await page.getByRole("radio", { name: "One-Time" }).click();
  await expect(page.getByRole("radio", { name: "One-Time" })).toHaveAttribute("aria-checked", "true");
  await expect(submit(page)).not.toContainText("/ month");
});

test("amount presets update the charged amount in the CTA", async ({ page }) => {
  await preset(page, "₹10,000").click();
  await expect(preset(page, "₹10,000")).toHaveAttribute("aria-pressed", "true");
  await expect(preset(page, "₹5,000")).toHaveAttribute("aria-pressed", "false");
  await expect(submit(page)).toContainText("₹10,000");
});

test("fee-cover opt-in adds ~2% to the charged amount (§8)", async ({ page }) => {
  await page.locator("label", { hasText: /cover the ~2% transaction fee/ }).getByRole("checkbox").check();
  // 5,000 × 1.02 = 5,100
  await expect(submit(page)).toContainText("₹5,100");
});

test("custom amount below ₹1,000 is rejected before any network call", async ({ page }) => {
  let donateCalled = false;
  await page.route("**/api/donate", (route) => {
    donateCalled = true;
    route.fulfill({ contentType: "application/json", body: JSON.stringify({ demo: true }) });
  });
  await page.locator("#custom-amt").fill("500");
  await fillRequiredFields(page);
  await submit(page).click();
  await expect(page.getByText(/Minimum donation is ₹1,000/)).toBeVisible();
  expect(donateCalled).toBe(false);
});

test("demo mode (no gateway keys) shows the launch-soon panel", async ({ page }) => {
  await page.route("**/api/donate", (route) =>
    route.fulfill({ contentType: "application/json", body: JSON.stringify({ demo: true }) }),
  );
  await fillRequiredFields(page);
  await submit(page).click();
  await expect(page.getByText(/Online payments launch soon/)).toBeVisible();
});

test("happy path: monthly gift → verified → thank-you page", async ({ page }) => {
  await mockRazorpay(page, { monthly: true, verified: true });
  await fillRequiredFields(page);
  await submit(page).click();
  await expect(page).toHaveURL(/\/thank-you/);
});

test("failed verification routes to the donation-failed page", async ({ page }) => {
  await mockRazorpay(page, { monthly: false, verified: false });
  await page.getByRole("radio", { name: "One-Time" }).click();
  await fillRequiredFields(page);
  await submit(page).click();
  await expect(page).toHaveURL(/\/donation-failed/);
});

test("analytics consent stays off until explicitly accepted (SOP-01)", async ({ page }) => {
  // beforeEach already clicked Reject, so the flag must not be true.
  const consent = await page.evaluate(() => (window as unknown as { __rkmf_analyticsConsent?: boolean }).__rkmf_analyticsConsent);
  expect(consent === true).toBe(false);
});
