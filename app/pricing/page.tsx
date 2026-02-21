import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Smart Contract Audit Pricing | Transparent Rates – VLN Security",
  description:
    "Transparent smart contract audit pricing starting at $2K. Competitive rates for EVM audits, DeFi security assessments, and blockchain penetration testing. Serving San Francisco Bay Area startups and global protocols.",
  keywords: [
    "smart contract audit cost",
    "smart contract audit pricing San Francisco",
    "EVM audit cost Bay Area",
    "DeFi security audit price",
    "blockchain security audit rates",
    "how much does blockchain audit cost",
    "affordable smart contract audit Bay Area",
    "Web3 security audit pricing Silicon Valley",
  ],
  alternates: {
    canonical: "https://vln.gg/pricing",
  },
  openGraph: {
    title: "Smart Contract Audit Pricing | VLN Security",
    description:
      "Transparent smart contract audit pricing starting at $2K. Competitive rates for EVM audits and DeFi security assessments.",
    url: "https://vln.gg/pricing",
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
