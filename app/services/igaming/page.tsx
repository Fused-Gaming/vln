import type { Metadata } from "next";
import IGamingServicesContent from "./iGamingServicesContent";

export const metadata: Metadata = {
  title: "iGaming Security — RNG Auditing & Platform Integrity | VLN",
  description:
    "Elite iGaming security services: provably-fair RNG auditing, wallet-flow risk modeling, platform integrity testing, and smart contract auditing for blockchain gaming operators. Backed by 12+ years of gaming infrastructure expertise.",
  keywords: [
    "iGaming security",
    "RNG audit",
    "provably fair audit",
    "blockchain gaming security",
    "casino smart contract audit",
    "gaming platform security",
    "wallet flow analysis",
    "iGaming penetration testing",
    "gaming RNG analysis",
    "on-chain gaming audit",
  ],
  alternates: {
    canonical: "https://vln.gg/services/igaming",
  },
  openGraph: {
    title: "iGaming Security — RNG Auditing & Platform Integrity | VLN",
    description:
      "Provably-fair RNG auditing, wallet-flow risk modeling, and platform integrity testing for blockchain gaming operators. Backed by 12+ years of Fused Gaming infrastructure expertise.",
    url: "https://vln.gg/services/igaming",
  },
};

export default function iGamingServicesPage() {
  return <IGamingServicesContent />;
}
