import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Smart Contract Security Services | Bay Area & San Francisco",
  description:
    "Expert smart contract audits, EVM penetration testing, DeFi security consulting, and blockchain training for Web3 teams in San Francisco and the Bay Area. CVSS-based assessments starting at $2K.",
  keywords: [
    "smart contract audit San Francisco",
    "EVM audit services Bay Area",
    "DeFi security audit San Francisco",
    "Web3 security services Bay Area",
    "blockchain penetration testing San Francisco",
    "smart contract security consulting Bay Area",
    "Solidity audit San Francisco",
    "DeFi vulnerability testing Silicon Valley",
    "blockchain security training Bay Area",
    "Web3 developer security training San Francisco",
    "smart contract audit",
    "EVM security",
    "DeFi security",
    "blockchain forensics",
  ],
  alternates: {
    canonical: "https://vln.gg/services",
  },
  openGraph: {
    title: "Smart Contract Security Services | VLN Security – San Francisco Bay Area",
    description:
      "Expert smart contract audits, EVM penetration testing, and blockchain forensics for Web3 teams in San Francisco and the Bay Area. Starting at $2K.",
    url: "https://vln.gg/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
