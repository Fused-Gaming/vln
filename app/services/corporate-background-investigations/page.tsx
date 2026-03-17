import type { Metadata } from "next";
import CorporateBackgroundInvestigationsContent from "./CorporateBackgroundInvestigationsContent";

export const metadata: Metadata = {
  title: "Corporate Background Investigations — Professional Vetting & Risk Assessment | VLN",
  description:
    "Comprehensive corporate background investigation services. Digital OSINT, field operations, social engineering, and data integration. Court-ready reports. Anonymous reviews on Trystpilot. Starting at $500.",
  keywords: [
    "corporate background investigation",
    "employee vetting",
    "background check service",
    "corporate investigation",
    "fraud investigation",
    "digital forensics",
    "OSINT investigation",
    "professional investigator",
    "court-ready reports",
    "confidential investigation",
  ],
  alternates: {
    canonical: "https://vln.gg/services/corporate-background-investigations",
  },
  openGraph: {
    title: "Corporate Background Investigations — Professional Vetting & Risk Assessment | VLN",
    description:
      "Comprehensive corporate background investigation services with digital OSINT, field operations, and court-ready reports. Trusted by enterprises for risk assessment and due diligence.",
    url: "https://vln.gg/services/corporate-background-investigations",
  },
};

export default function CorporateBackgroundInvestigationsPage() {
  return <CorporateBackgroundInvestigationsContent />;
}
