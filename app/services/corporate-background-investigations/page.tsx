import type { Metadata } from "next";
import CorporateBackgroundInvestigationsContent from "./CorporateBackgroundInvestigationsContent";

export const metadata: Metadata = {
  title: "Corporate Background Investigations | VLN Professional Services",
  description:
    "Professional corporate background investigation services for due diligence, executive screening, and risk assessment. Comprehensive vetting with verified intelligence from authoritative sources.",
  keywords: [
    "corporate background investigations",
    "due diligence services",
    "executive background check",
    "corporate risk assessment",
    "background investigation services",
    "professional vetting",
    "compliance screening",
    "corporate intelligence",
  ],
  alternates: {
    canonical: "https://vln.gg/services/corporate-background-investigations",
  },
  openGraph: {
    title: "Corporate Background Investigations | VLN Professional Services",
    description:
      "Professional corporate background investigation services for due diligence, executive screening, and risk assessment.",
    url: "https://vln.gg/services/corporate-background-investigations",
  },
};

export default function CorporateBackgroundInvestigationsPage() {
  return <CorporateBackgroundInvestigationsContent />;
}
