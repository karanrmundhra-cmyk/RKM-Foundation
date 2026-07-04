import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Account",
  description: "Your donations, receipts, and details — RKM Foundation donor portal.",
  robots: { index: false, follow: false }, // private surface
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
