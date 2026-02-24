import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Web3 Security Blog | Smart Contract Vulnerability Research – VLN",
  description:
    "Deep-dive smart contract vulnerability research, DeFi exploit post-mortems, and blockchain security best practices from VLN's research team in San Francisco. Insights for Bay Area Web3 developers.",
  keywords: [
    "smart contract security blog",
    "DeFi vulnerability research Bay Area",
    "blockchain security insights San Francisco",
    "Web3 security best practices",
    "smart contract exploit analysis",
    "EVM security research",
    "DeFi security blog Bay Area",
    "Solidity vulnerability tutorials",
    "blockchain security news San Francisco",
  ],
  alternates: {
    canonical: "https://vln.gg/blog",
  },
  openGraph: {
    title: "Web3 Security Blog | VLN Vulnerability Research Lab",
    description:
      "Smart contract vulnerability research, DeFi exploit analysis, and blockchain security insights from VLN's research team.",
    url: "https://vln.gg/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
