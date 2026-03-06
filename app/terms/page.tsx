import type { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service | VLN - Vulnerability Lab Network",
  description:
    "VLN Terms of Service. Legal terms governing our smart contract security audits, penetration testing, and security consulting services.",
  keywords: [
    "VLN terms of service",
    "security audit terms",
    "smart contract audit agreement",
    "DeFi security terms",
    "blockchain audit terms",
  ],
  alternates: {
    canonical: "https://vln.gg/terms",
  },
  openGraph: {
    title: "Terms of Service | VLN",
    description: "VLN Terms of Service. Legal terms governing our security services.",
    url: "https://vln.gg/terms",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
