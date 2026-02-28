import type { Metadata } from "next";
import RefundsContent from "./RefundsContent";

export const metadata: Metadata = {
  title: "Refund Policy | VLN - Vulnerability Lab Network",
  description:
    "VLN Refund Policy. Learn about our refund terms for smart contract audits, retainers, training, and other security services.",
  keywords: [
    "VLN refund policy",
    "audit refund policy",
    "security service refunds",
    "money back guarantee",
    "audit satisfaction guarantee",
  ],
  alternates: {
    canonical: "https://vln.gg/refunds",
  },
  openGraph: {
    title: "Refund Policy | VLN",
    description: "VLN Refund Policy for our security services.",
    url: "https://vln.gg/refunds",
  },
};

export default function RefundsPage() {
  return <RefundsContent />;
}
