import type { Metadata } from "next";
import { HomeExperience } from "@/components/home/HomeExperience";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { en: "/", hi: "/hi", "x-default": "/" },
  },
};

export default function Home() {
  return <HomeExperience />;
}
