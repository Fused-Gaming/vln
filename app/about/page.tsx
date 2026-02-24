import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About VLN | San Francisco Smart Contract Security Research Lab",
  description:
    "Meet VLN's team of government-cleared smart contract security researchers based in San Francisco. 12+ years securing blockchain systems, 47 critical vulnerabilities found, $5.2M in funds recovered.",
  keywords: [
    "VLN security team San Francisco",
    "smart contract security researchers Bay Area",
    "blockchain security experts San Francisco",
    "Web3 security company Bay Area",
    "DeFi audit firm San Francisco",
    "Fused Gaming security research",
    "smart contract auditors Bay Area",
    "blockchain forensics experts San Francisco",
  ],
  alternates: {
    canonical: "https://vln.gg/about",
  },
  openGraph: {
    title: "About VLN | San Francisco Smart Contract Security Research Lab",
    description:
      "Meet VLN's team of government-cleared smart contract security researchers in San Francisco. 12+ years of experience, 47 critical vulnerabilities found, $5.2M recovered.",
    url: "https://vln.gg/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
