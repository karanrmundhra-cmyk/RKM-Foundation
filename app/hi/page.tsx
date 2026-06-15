import type { Metadata } from "next";
import { HomeHi } from "@/components/home/HomeHi";

export const metadata: Metadata = {
  title: "RKM फाउंडेशन — भारत में पशु बचाव, भोजन और आश्रय",
  description:
    "RKM फाउंडेशन भारत में एक पंजीकृत धर्मार्थ ट्रस्ट है जो पशु कल्याण के लिए समर्पित है — ज़रूरतमंद जानवरों को बचाना, खिलाना, इलाज करना और आश्रय देना। 12A, 80G और CSR पंजीकृत।",
  alternates: { canonical: "/hi" },
};

export default function HindiHome() {
  return <HomeHi />;
}
