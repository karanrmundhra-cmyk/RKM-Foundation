import type { MetadataRoute } from "next";

const BASE = "https://rkmfoundation.com";
const routes = ["", "/hi", "/hi/contact", "/hi/donate-now", "/hi/careers", "/hi/other-ways-to-give", "/hi/about", "/hi/partner-with-us", "/hi/csr", "/hi/fundraiser", "/hi/fundraiser/create", "/hi/faqs", "/hi/media", "/hi/blog", "/hi/blog/the-dog-who-started-it-all", "/hi/shop", "/hi/legal", "/hi/legal/privacy-policy", "/hi/legal/terms-and-conditions", "/hi/legal/website-disclaimer-cookie-policy", "/hi/legal/donation-refund-policy", "/hi/legal/shop-refund-policy", "/hi/legal/80g-tax-disclaimer", "/about", "/donate-now", "/fundraiser", "/fundraiser/create", "/shop", "/csr",
  "/partner-with-us", "/other-ways-to-give", "/faqs", "/careers", "/media", "/blog",
  "/blog/the-dog-who-started-it-all", "/contact", "/legal", "/legal/privacy-policy",
  "/legal/terms-and-conditions", "/legal/website-disclaimer-cookie-policy",
  "/legal/donation-refund-policy", "/legal/shop-refund-policy", "/legal/80g-tax-disclaimer"];

// Pair every URL with its EN/HI counterpart so the sitemap carries valid
// hreflang for the whole bilingual site (Google-recommended at scale).
function langAlternates(r: string) {
  const en = r === "/hi" ? "" : r.startsWith("/hi/") ? r.slice(3) : r;
  const hi = en === "" ? "/hi" : `/hi${en}`;
  return { en: `${BASE}${en}`, hi: `${BASE}${hi}`, "x-default": `${BASE}${en}` };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    changeFrequency: r === "" || r === "/blog" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/donate-now" ? 0.9 : 0.6,
    alternates: { languages: langAlternates(r) },
  }));
}
