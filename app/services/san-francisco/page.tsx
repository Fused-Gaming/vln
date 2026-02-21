import type { Metadata } from "next";
import SanFranciscoServicesContent from "./SanFranciscoServicesContent";

export const metadata: Metadata = {
  title: "Smart Contract Audit & Web3 Security in San Francisco | VLN",
  description:
    "San Francisco's premier smart contract audit and Web3 security firm. Expert EVM audits, DeFi vulnerability assessments, blockchain forensics, and security training for Bay Area startups and Silicon Valley DeFi teams. Free 30-min initial scan.",
  keywords: [
    "smart contract audit San Francisco",
    "Web3 security San Francisco",
    "EVM audit San Francisco",
    "DeFi security audit San Francisco",
    "blockchain security firm San Francisco",
    "smart contract auditor San Francisco",
    "Bay Area smart contract audit",
    "Silicon Valley DeFi security",
    "blockchain security services San Francisco",
    "DeFi startup security audit Bay Area",
    "smart contract forensics San Francisco",
    "EVM vulnerability testing Bay Area",
    "Solidity audit San Francisco",
    "blockchain penetration testing San Francisco",
  ],
  alternates: {
    canonical: "https://vln.gg/services/san-francisco",
  },
  openGraph: {
    title: "Smart Contract Audit & Web3 Security in San Francisco | VLN",
    description:
      "San Francisco's premier smart contract audit firm. Expert EVM audits, DeFi vulnerability research, and blockchain forensics for Bay Area startups. Free 30-min initial scan.",
    url: "https://vln.gg/services/san-francisco",
  },
};

export default function SanFranciscoServicesPage() {
  return <SanFranciscoServicesContent />;
}
