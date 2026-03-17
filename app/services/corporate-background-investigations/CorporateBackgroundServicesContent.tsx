"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";
import { Search, Eye, MessageSquare, Database, CheckCircle, Clock, Shield } from "lucide-react";
import ServiceHero from "./components/ServiceHero";
import MethodCard from "./components/MethodCard";
import PricingTier from "./components/PricingTier";
import ProcessTimeline from "./components/ProcessTimeline";
import CaseStudyCard from "./components/CaseStudyCard";
import TrystpilotWidget from "./components/TrystpilotWidget";
import FAQAccordion from "./components/FAQAccordion";

const investigationMethods = [
  {
    icon: Search,
    title: "Digital OSINT",
    subtitle: "Social/web/public records",
    description:
      "Comprehensive open-source intelligence research across social media, public records, web archives, and government databases. We map digital footprints, verify credentials, and uncover hidden patterns.",
    features: [
      "Social media & web analysis",
      "Public records research",
      "Archive & database searches",
      "Credential verification",
      "Pattern analysis",
    ],
    cta: "Learn More",
  },
  {
    icon: Eye,
    title: "Field Operations",
    subtitle: "Surveillance, tailing, evidence",
    description:
      "Physical surveillance, location verification, and evidence collection by licensed field operatives. We document behavior patterns and confirm subject locations.",
    features: [
      "Surveillance & tailing",
      "Location verification",
      "Photo/video documentation",
      "Evidence collection",
      "Court-admissible documentation",
    ],
    cta: "Learn More",
  },
  {
    icon: MessageSquare,
    title: "Social Engineering",
    subtitle: "Interviews, pretext calls",
    description:
      "Legitimate interviews and pretext conversations conducted by experienced investigators. We gather information through ethical social interaction and skillful questioning.",
    features: [
      "Witness interviews",
      "Pretext calling",
      "Reference verification",
      "Background conversations",
      "Information gathering",
    ],
    cta: "Learn More",
  },
  {
    icon: Database,
    title: "Data Integration",
    subtitle: "Consolidate, verify, analyze",
    description:
      "Cross-reference all findings across data sources. We consolidate, verify, and analyze information to produce comprehensive, accurate, and actionable intelligence reports.",
    features: [
      "Data consolidation",
      "Cross-reference verification",
      "Pattern analysis",
      "Risk assessment",
      "Final integration",
    ],
    cta: "Learn More",
  },
];

const pricingTiers = [
  {
    name: "Standard",
    price: "$500-$2K",
    badge: null,
    description: "Digital OSINT focused investigation",
    features: [
      "Digital OSINT research",
      "Public records search",
      "Social media analysis",
      "Basic report generation",
    ],
    deliverables: [
      "PDF research report",
      "Documentation summary",
      "Key findings outline",
    ],
    timeline: "1-2 weeks",
    cta: "Start Investigation",
    ctaLink: "/contact?service=background-standard",
  },
  {
    name: "Comprehensive",
    price: "$2K-$5K",
    badge: "⭐ POPULAR",
    description: "Full multi-method investigation",
    features: [
      "Digital OSINT",
      "Field operations",
      "Social engineering interviews",
      "Data integration",
      "Risk assessment",
    ],
    deliverables: [
      "Comprehensive presentation",
      "Video walkthrough",
      "Raw data export",
      "Executive summary",
    ],
    timeline: "2-4 weeks",
    cta: "Request Investigation",
    ctaLink: "/contact?service=background-comprehensive",
  },
  {
    name: "Full Forensic",
    price: "$5K+",
    badge: "🔬 ENTERPRISE",
    description: "Complete investigation with expert testimony",
    features: [
      "All investigation methods",
      "Extended timeline options",
      "Expert testimony preparation",
      "Legal documentation",
      "Court-ready findings",
    ],
    deliverables: [
      "Full forensic report",
      "Video documentation package",
      "Expert witness testimony",
      "Legal brief package",
      "Ongoing consultation",
    ],
    timeline: "4-8 weeks",
    cta: "Schedule Consultation",
    ctaLink: "/contact?service=background-forensic",
  },
];

const caseStudies = [
  {
    title: "Due Diligence on Key Hire",
    industry: "Technology / Private Equity",
    challenge:
      "PE firm conducting pre-acquisition due diligence needed comprehensive background verification on CEO before $50M acquisition.",
    solution:
      "Conducted comprehensive investigation across digital, field, and social engineering vectors. Uncovered significant historical discrepancies in resume credentials and past litigation history.",
    outcome:
      "Client adjusted deal terms based on findings. Investigation completed in 3 weeks. Saved client from major acquisition risk.",
    quote:
      "The thoroughness and speed were exceptional. This investigation fundamentally changed our due diligence process.",
  },
  {
    title: "Executive Background Verification",
    industry: "Financial Services",
    challenge:
      "Hedge fund needed to verify background and credentials of new investor with $100M+ capital commitment.",
    solution:
      "Multi-phase investigation: OSINT analysis of business history, field verification of claimed residences and office locations, pretext interviews with former associates.",
    outcome:
      "Verified legitimacy of investment source. Provided confidence for capital deployment. Completed 2-week timeline.",
    quote:
      "Professional, discreet, and incredibly thorough. Exactly what we needed for institutional-grade due diligence.",
  },
];

const faqItems = [
  {
    question: "How long does a typical investigation take?",
    answer:
      "Timeline depends on scope and tier. Standard investigations: 1-2 weeks. Comprehensive: 2-4 weeks. Full forensic: 4-8 weeks. We provide realistic timelines during the free consultation.",
  },
  {
    question: "Is the investigation confidential?",
    answer:
      "Absolutely. We treat all client information with the highest confidentiality. Our clients appear anonymously on Trystpilot, and all reports are protected by attorney-client privilege when applicable.",
  },
  {
    question: "Are your investigators licensed?",
    answer:
      "Yes. Our investigators are fully licensed, bonded, and insured. We comply with all state and federal regulations regarding investigative work.",
  },
  {
    question: "Can reports be used in court?",
    answer:
      "Yes. Our Full Forensic tier delivers court-ready documentation. Our investigator can provide expert testimony if needed. All findings are documented to legal standards.",
  },
  {
    question: "What if you find nothing?",
    answer:
      "A thorough investigation with clean findings is valuable—it confirms what isn't there. We provide comprehensive documentation of what we searched and analyzed.",
  },
  {
    question: "How do you ensure accuracy?",
    answer:
      "We employ rigorous cross-referencing across multiple data sources. Our data integration phase verifies findings against multiple independent sources before final reporting.",
  },
  {
    question: "What's the free consultation?",
    answer:
      "A 1-hour call where we discuss your specific needs, recommend an appropriate tier, discuss timeline and budget, and answer any questions. Zero obligation.",
  },
  {
    question: "Can I get updates during the investigation?",
    answer:
      "Yes. We provide regular updates based on the investigation tier. Comprehensive and forensic tiers include scheduled check-ins and progress reports.",
  },
];

const processSteps = [
  {
    number: 1,
    title: "Free Consultation",
    description: "Discuss scope, budget, and timeline",
    duration: "1 hour",
    details: [
      "Scope definition",
      "Budget alignment",
      "Question & answer",
      "Next steps planning",
    ],
  },
  {
    number: 2,
    title: "Intake & Assessment",
    description: "Digital footprint analysis",
    duration: "24 hours",
    details: [
      "Information collection",
      "Digital footprint scan",
      "Tier recommendation",
      "Agreement signing",
    ],
  },
  {
    number: 3,
    title: "Investigation Planning",
    description: "Method selection & timeline agreement",
    duration: "2-3 days",
    details: [
      "Method determination",
      "Resource allocation",
      "Timeline finalization",
      "Investigation kickoff",
    ],
  },
  {
    number: 4,
    title: "Active Investigation",
    description: "Multi-phase data collection",
    duration: "1-6 weeks",
    details: [
      "OSINT research phase",
      "Field operations (if applicable)",
      "Social engineering phase",
      "Ongoing documentation",
    ],
  },
  {
    number: 5,
    title: "Analysis & Synthesis",
    description: "Pattern analysis and verification",
    duration: "3-5 days",
    details: [
      "Cross-reference validation",
      "Pattern identification",
      "Risk assessment",
      "Finding consolidation",
    ],
  },
  {
    number: 6,
    title: "Report Preparation",
    description: "Professional documentation",
    duration: "3-5 days",
    details: [
      "Report writing",
      "Evidence compilation",
      "Executive summary",
      "QA review",
    ],
  },
  {
    number: 7,
    title: "Delivery & Debrief",
    description: "Report presentation and walkthrough",
    duration: "1 day",
    details: [
      "Report delivery",
      "Findings presentation",
      "Q&A session",
      "Next steps discussion",
    ],
  },
  {
    number: 8,
    title: "Follow-up Support",
    description: "Ongoing assistance and expert testimony",
    duration: "Ongoing",
    details: [
      "Expert testimony (if needed)",
      "Advisory services",
      "Additional investigations",
      "Long-term support",
    ],
  },
];

export default function CorporateBackgroundServicesContent() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-vln-bg text-white">
        {/* Hero Section */}
        <ServiceHero
          headline="Corporate Background Investigations"
          subheading="Professional digital forensics & comprehensive vetting"
          description="Starting at $500 | Expert methodology | Court-ready reports"
          primaryCta={{ text: "Get Free Consultation", href: "/contact?service=background-intro" }}
          secondaryCta={{ text: "View Process", href: "#process" }}
        />

        {/* Service Overview */}
        <CSSFade>
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-lg border border-vln-sage/20 bg-vln-sage/5">
                  <Shield className="w-8 h-8 text-vln-sage mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Fully Licensed & Bonded</h3>
                  <p className="text-sm text-gray-300">
                    All investigators are state-licensed, bonded, and insured.
                  </p>
                </div>
                <div className="p-6 rounded-lg border border-vln-bluegray/20 bg-vln-bluegray/5">
                  <CheckCircle className="w-8 h-8 text-vln-bluegray mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Court-Ready Reports</h3>
                  <p className="text-sm text-gray-300">
                    Documentation meets legal standards for litigation support.
                  </p>
                </div>
                <div className="p-6 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <Clock className="w-8 h-8 text-amber-400 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Expert Testimony</h3>
                  <p className="text-sm text-gray-300">
                    Lead investigator available for expert witness testimony.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </CSSFade>

        {/* Investigation Methods */}
        <section className="py-20 px-6 bg-black/30">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Investigation Methods</h2>
              <p className="text-gray-300 max-w-2xl">
                Four parallel vectors of investigation working in concert to uncover comprehensive intelligence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <StaggerFade staggerDelay={100}>
                {investigationMethods.map((method, idx) => (
                  <MethodCard key={idx} {...method} />
                ))}
              </StaggerFade>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Pricing & Tiers</h2>
              <p className="text-gray-300 max-w-2xl">
                Choose the investigation scope that matches your needs and budget.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StaggerFade staggerDelay={100}>
                {pricingTiers.map((tier, idx) => (
                  <PricingTier key={idx} {...tier} />
                ))}
              </StaggerFade>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20 px-6 bg-black/30" id="process">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Investigation Journey</h2>
              <p className="text-gray-300 max-w-2xl">
                From initial consultation through final delivery and ongoing support.
              </p>
            </div>
            <ProcessTimeline steps={processSteps} />
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h2>
              <p className="text-gray-300 max-w-2xl">
                Real investigations that delivered measurable value for our clients.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <StaggerFade staggerDelay={100}>
                {caseStudies.map((study, idx) => (
                  <CaseStudyCard key={idx} {...study} />
                ))}
              </StaggerFade>
            </div>
          </div>
        </section>

        {/* Trystpilot Widget */}
        <section className="py-20 px-6 bg-black/30">
          <div className="max-w-4xl mx-auto">
            <TrystpilotWidget />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-300">
                Have questions about our investigation services? We've answered the most common ones below.
              </p>
            </div>
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        {/* Final CTA */}
        <CSSFade>
          <section className="py-20 px-6 bg-gradient-to-b from-black/30 to-black">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Schedule your free 1-hour consultation. No obligation, no sales pitch—just a conversation about your needs and our capabilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/contact?service=background-final-cta"
                  className="px-8 py-3 bg-vln-sage text-black font-semibold rounded-lg hover:bg-vln-sage/90 transition-all"
                >
                  Get Free Consultation
                </Button>
                <Button
                  href="/services/corporate-background-investigations#process"
                  className="px-8 py-3 border border-vln-sage/40 text-white font-semibold rounded-lg hover:border-vln-sage/60 transition-all"
                >
                  Learn More About Our Process
                </Button>
              </div>
            </div>
          </section>
        </CSSFade>
      </main>
      <Footer />
    </>
  );
}
