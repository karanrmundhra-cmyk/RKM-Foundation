const { chromium } = require("@playwright/test");
const TARGETS = {
  "/": [
    ["hero h1", "h1"],
    ["hero lead p", "main p"],
    ["hero CTA btn", "main a.btn-copper"],
    ["header nav About", "header a[href='/about']"],
    ["header Donate btn", "header a[href^='/donate-now']"],
    ["section h2 display-2", "h2.display-2"],
    ["eyebrow-index", ".eyebrow-index"],
    ["trust item h3", "h3.display-3"],
    ["trust item body", "h3.display-3 + p"],
    ["cert chip", "a[href*='12A_Certificate']"],
    ["footer col heading", "footer h4"],
    ["footer link", "footer a[href='/faqs']"],
    ["footer body", "footer p"],
    ["footer address", "footer address, footer li"],
    ["subscribe h3", "footer h3, section h3"],
  ],
  "/donate-now": [
    ["donate h1", "h1"],
    ["form preset label", "form button span, form label"],
    ["form input", "form input[type='email'], .input-c"],
    ["donate button", "form button[type='submit'], form .btn-copper"],
    ["trust tick", "form svg + span, form .text-\\[13px\\]"],
    ["allocation strip label", ".text-\\[11px\\]"],
  ],
};
(async () => {
  const browser = await chromium.launch();
  const out = {};
  for (const [w, label] of [[1440, "d"], [390, "m"]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    for (const path of Object.keys(TARGETS)) {
      const pg = await ctx.newPage();
      await pg.goto("https://rkmfoundation.com" + path, { waitUntil: "load", timeout: 45000 });
      await pg.waitForTimeout(2500);
      const res = await pg.evaluate((sels) => {
        const r = {};
        for (const [name, sel] of sels) {
          try {
            const el = document.querySelector(sel);
            if (!el) { r[name] = "NOT FOUND: " + sel; continue; }
            const cs = getComputedStyle(el);
            r[name] = `${parseFloat(cs.fontSize).toFixed(1)}px / lh ${cs.lineHeight} / w ${cs.fontWeight}`;
          } catch (e) { r[name] = "ERR " + e.message.slice(0, 40); }
        }
        r["__root html"] = getComputedStyle(document.documentElement).fontSize;
        r["__body"] = getComputedStyle(document.body).fontSize;
        return r;
      }, TARGETS[path]);
      out[`${label} ${path}`] = res;
      await pg.close();
    }
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(out, null, 1));
})();
