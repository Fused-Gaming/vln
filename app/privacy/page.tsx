import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | VLN - Vulnerability Lab Network",
  description:
    "VLN Privacy Policy. Learn how we collect, use, and protect your data when using our smart contract security services.",
  keywords: [
    "VLN privacy policy",
    "data privacy",
    "GDPR compliance",
    "security audit privacy",
    "blockchain security privacy",
  ],
  alternates: {
    canonical: "https://vln.gg/privacy",
  },
  openGraph: {
    title: "Privacy Policy | VLN",
    description: "VLN Privacy Policy. Learn how we protect your data and privacy.",
    url: "https://vln.gg/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
