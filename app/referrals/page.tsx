import type { Metadata } from "next";
import ReferralsContent from "./ReferralsContent";

export const metadata: Metadata = {
  title: "Referral Program | VLN - Vulnerability Lab Network",
  description:
    "Join VLN's referral program and earn up to 20% commission on qualified security audit and consulting referrals.",
  keywords: [
    "VLN referral program",
    "earn commissions",
    "security audit referral",
    "partner program",
    "affiliate program",
  ],
  alternates: {
    canonical: "https://vln.gg/referrals",
  },
  openGraph: {
    title: "Referral Program | VLN",
    description: "Earn up to 20% commission by referring VLN security services.",
    url: "https://vln.gg/referrals",
  },
};

export default function ReferralsPage() {
  return <ReferralsContent />;
}
