import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin", "/admin/", "/account", "/account/", "/prototype/", "/prototype-v2/"] },
    sitemap: "https://rkmfoundation.com/sitemap.xml",
  };
}
