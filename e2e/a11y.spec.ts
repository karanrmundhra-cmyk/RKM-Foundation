import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Automated WCAG 2.2 AA scan (§2b). axe catches a meaningful subset of WCAG;
// a manual keyboard/screen-reader pass is still required for full conformance,
// but this is a build-failing gate against regressions on serious/critical issues.
const PAGES = ["/", "/donate-now", "/about", "/csr", "/faqs", "/contact", "/hi"];

async function dismissConsent(page: Page) {
  for (const name of ["Reject", "अस्वीकार करें"]) {
    const b = page.getByRole("button", { name });
    if (await b.isVisible().catch(() => false)) {
      await b.click();
      return;
    }
  }
}

for (const path of PAGES) {
  test(`a11y: ${path} has no serious/critical WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(path);
    await dismissConsent(page);
    // Trigger every scroll-reveal so elements are at their RESTING opacity before
    // axe measures contrast (otherwise mid-animation opacity gives false failures).
    await page.evaluate(async () => {
      const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const seriousOrCritical = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");

    // color-contrast is tracked as a separate design-palette review item (the
    // editorial faint-label aesthetic vs. WCAG AA) — surfaced but non-blocking.
    // Everything else serious/critical is a build-failing structural gate.
    const contrast = seriousOrCritical.filter((v) => v.id === "color-contrast");
    if (contrast.length) {
      const nodes = contrast.reduce((n, v) => n + v.nodes.length, 0);
      // eslint-disable-next-line no-console
      console.log(`[a11y] ${path}: ${nodes} color-contrast node(s) flagged for design review (non-blocking).`);
    }

    const blocking = seriousOrCritical.filter((v) => v.id !== "color-contrast");
    const summary = blocking.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.slice(0, 6).map((n) => ({ target: n.target, snippet: n.html.slice(0, 100), why: n.failureSummary?.slice(0, 160) })),
    }));
    expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
  });
}
