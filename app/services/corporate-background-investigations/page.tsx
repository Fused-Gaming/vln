import type { Metadata } from "next";
import CorporateBackgroundServicesContent from "./CorporateBackgroundServicesContent";

export const metadata: Metadata = {
  title: "Corporate Background Investigations — Comprehensive Vetting | VLN",
  description:
    "Professional corporate background investigations with digital forensics, OSINT, field operations, and court-ready reporting. Confidential vetting for due diligence, risk assessment, and litigation support.",
  keywords: [
    "background investigation",
    "corporate vetting",
    "digital forensics",
    "OSINT",
    "due diligence",
    "background check",
    "investigation services",
    "corporate due diligence",
    "background verification",
    "forensic investigation",
  ],
  alternates: {
    canonical: "https://vln.gg/services/corporate-background-investigations",
  },
  openGraph: {
    title: "Corporate Background Investigations — Comprehensive Vetting | VLN",
    description:
      "Professional background investigations with digital forensics, field operations, and court-ready reporting for corporate due diligence and risk assessment.",
    url: "https://vln.gg/services/corporate-background-investigations",
  },
};

export default function CorporateBackgroundServicesPage() {
  return <CorporateBackgroundServicesContent />;
}
