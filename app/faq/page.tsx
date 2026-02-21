import type { Metadata } from "next";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "Smart Contract Audit FAQ | Common Questions – VLN Security",
  description:
    "Frequently asked questions about smart contract audits, DeFi security assessments, and blockchain forensics. Learn about our audit process, pricing, and how we serve Bay Area Web3 teams.",
  keywords: [
    "smart contract audit FAQ",
    "how much does smart contract audit cost",
    "what is EVM security audit",
    "DeFi security audit questions",
    "blockchain security FAQ Bay Area",
    "smart contract audit process San Francisco",
  ],
  alternates: {
    canonical: "https://vln.gg/faq",
  },
  openGraph: {
    title: "Smart Contract Audit FAQ | VLN Security",
    description:
      "Common questions about smart contract audits, DeFi security, and blockchain forensics. Pricing, process, and how to get started.",
    url: "https://vln.gg/faq",
  },
};

export default function FAQPage() {
  return <FAQContent />;
}
