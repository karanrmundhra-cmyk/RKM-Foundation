import type { MetadataRoute } from "next";

// Web App Manifest (SOP-15) — enables Add-to-Home-Screen on Android/iOS, a
// branded install experience, and a declared theme/background colour. Icons
// reuse the existing self-hosted brand assets in /public. Next.js auto-injects
// <link rel="manifest"> when this file is present.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RKM Foundation — Animal Rescue, Feeding & Shelter in India",
    short_name: "RKM Foundation",
    description:
      "RKM Foundation is a registered charitable trust in India focused on animal welfare — rescuing, feeding, treating, and sheltering animals in need. 80G & CSR registered.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111111",
    lang: "en",
    dir: "ltr",
    categories: ["charity", "nonprofit", "lifestyle"],
    icons: [
      { src: "/logo-128.png", sizes: "128x128", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/logo-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
