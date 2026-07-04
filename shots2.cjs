const { chromium, devices } = require("@playwright/test");
const OUT = "/Users/x/Library/CloudStorage/OneDrive-rkmsupport/Build/rkm-foundation/Review/vis-shots2";
const BASE = "https://rkmfoundation.com";
const pages = ["/", "/donate-now", "/about", "/hi"];
const mobilePages = ["/", "/donate-now"];
const name = (p) => (p === "/" ? "home" : p.replace(/\//g, "_").replace(/^_/, ""));
(async () => {
  const fs = require("fs");
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  for (const p of pages) {
    const pg = await ctx.newPage();
    try {
      await pg.goto(BASE + p, { waitUntil: "load", timeout: 45000 });
      await pg.waitForTimeout(3000);
      await pg.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await pg.waitForTimeout(1200);
      await pg.evaluate(() => window.scrollTo(0, 0));
      await pg.waitForTimeout(700);
      await pg.screenshot({ path: `${OUT}/d-${name(p)}.png`, fullPage: true, animations: "disabled" });
      console.log("OK d", p);
    } catch (e) { console.log("FAIL d", p, e.message.slice(0, 60)); }
    await pg.close();
  }
  const mctx = await browser.newContext({ ...devices["iPhone 13"], deviceScaleFactor: 1 });
  for (const p of mobilePages) {
    const pg = await mctx.newPage();
    try {
      await pg.goto(BASE + p, { waitUntil: "load", timeout: 45000 });
      await pg.waitForTimeout(3000);
      await pg.screenshot({ path: `${OUT}/m-${name(p)}.png`, fullPage: true, animations: "disabled" });
      console.log("OK m", p);
    } catch (e) { console.log("FAIL m", p, e.message.slice(0, 60)); }
    await pg.close();
  }
  await browser.close();
  console.log("ALL_DONE");
})();
