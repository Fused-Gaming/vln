import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact VLN | Get a Smart Contract Audit Quote – San Francisco",
  description:
    "Request a smart contract audit or security consultation from VLN. Serving Web3 startups, DeFi protocols, and blockchain gaming teams in San Francisco, Silicon Valley, and globally. Free 30-minute initial scan.",
  keywords: [
    "contact smart contract auditor San Francisco",
    "get DeFi security audit Bay Area",
    "smart contract audit quote San Francisco",
    "blockchain security consultation Bay Area",
    "Web3 security audit request San Francisco",
    "hire smart contract auditor Bay Area",
    "DeFi security consultation Silicon Valley",
  ],
  alternates: {
    canonical: "https://vln.gg/contact",
  },
  openGraph: {
    title: "Contact VLN | Smart Contract Audit Quotes – San Francisco Bay Area",
    description:
      "Request a smart contract audit from VLN. Serving DeFi startups and blockchain teams in San Francisco and globally. Free 30-minute initial security scan.",
    url: "https://vln.gg/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
