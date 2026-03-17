"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";
import { Search, Eye, MessageSquare, Database, Check, Star, Shield, FileText, Clock, Award } from "lucide-react";
import TrystpilotWidget from "./components/TrystpilotWidget";
import PricingTierCard from "./components/PricingTierCard";
import ProcessTimeline from "./components/ProcessTimeline";
import MethodCard from "./components/MethodCard";
import CaseStudyCard from "./components/CaseStudyCard";
import FAQSection from "./components/FAQSection";

const investigationMethods = [
  {
    icon: Search,
    title: "Digital OSINT",
    tagline: "Deep web research & public records",
    description:
      "Comprehensive social media analysis, public records research, web archives, and digital footprint mapping. We identify patterns across multiple platforms and compile publicly available information into actionable intelligence.",
    features: [
      "Social media profile analysis (all major platforms)",
      "Public records research & aggregation",
      "Web archive & historical data review",
      "Domain & asset ownership verification",
      "Email & username pattern discovery",
      "Digital footprint consolidated report",
    ],
    color: "sage" as const,
  },
  {
    icon: Eye,
    title: "Field Operations",
    tagline: "Surveillance & physical evidence collection",
    description:
      "Professional surveillance, location verification, visual evidence documentation, and in-person observations. Conducted with strict adherence to legal boundaries and privacy regulations.",
    features: [
      "Surveillance and tailing operations",
      "Location verification & confirmation",
      "Visual evidence documentation",
      "Time-stamped photograph & video",
      "Physical asset assessment",
      "Behavior pattern documentation",
    ],
    color: "blue" as const,
  },
  {
    icon: MessageSquare,
    title: "Social Engineering",
    tagline: "Legitimate interviews & pretext communications",
    description:
      "Ethical social engineering through legitimate interviews, pretext communications, and reference checks. All interactions are legal and conducted with transparency when required.",
    features: [
      "Legitimate professional interviews",
      "Reference verification calls",
      "Pretext communications (legal basis)",
      "Relationship mapping & network analysis",
      "Verbal confirmation of details",
      "Interview transcript & summary",
    ],
    color: "amber" as const,
  },
  {
    icon: Database,
    title: "Data Integration",
    tagline: "Consolidate & cross-reference findings",
    description:
      "Synthesis of all investigation vectors into comprehensive analysis. We identify patterns, verify inconsistencies, and produce final risk assessments backed by corroborating evidence.",
    features: [
      "Multi-source data consolidation",
      "Pattern & anomaly identification",
      "Inconsistency verification",
      "Risk scoring & assessment",
      "Timeline construction",
      "Executive summary synthesis",
    ],
    color: "purple" as const,
  },
];

const pricingTiers = [
  {
    name: "Standard",
    price: "$500-$2,000",
    badge: null,
    methods: ["Digital OSINT", "Public Records"],
    deliverables: [
      "Comprehensive PDF report",
      "Evidence compilation",
      "1-2 week turnaround",
      "Email support",
    ],
    description: "Essential digital investigation and public records research",
    cta: "Get Started",
    ctaLink: "/contact?service=corporate-investigation",
  },
  {
    name: "Comprehensive",
    price: "$2,000-$5,000",
    badge: "POPULAR",
    methods: ["Digital OSINT", "Field Operations", "Social Engineering"],
    deliverables: [
      "Comprehensive presentation deck",
      "Detailed findings report",
      "All investigation methods",
      "2-4 week turnaround",
      "Priority support",
    ],
    description: "Full-scope investigation with field operations and interviews",
    cta: "Request Assessment",
    ctaLink: "/contact?service=corporate-investigation",
  },
  {
    name: "Full Forensic",
    price: "$5,000+",
    badge: "ENTERPRISE",
    methods: ["All Methods", "Expert Testimony"],
    deliverables: [
      "Court-ready documentation",
      "Expert testimony available",
      "All investigation vectors",
      "4-8 week comprehensive analysis",
      "Dedicated case manager",
    ],
    description: "Enterprise-grade investigation with legal readiness",
    cta: "Schedule Consultation",
    ctaLink: "/contact?service=corporate-investigation",
  },
];

const caseStudies = [
  {
    title: "Executive Due Diligence",
    industry: "Private Equity",
    challenge:
      "Thorough vetting of a C-suite executive joining a $500M acquisition target. Required assessment of financial, personal, and reputational risk before close.",
    solution:
      "Conducted full forensic investigation combining digital OSINT, field surveillance, and social engineering interviews. Identified undisclosed legal proceedings and family business conflicts.",
    outcome:
      "Provided detailed risk assessment report. Client negotiated enhanced escrow terms based on findings. Investigation took 4 weeks.",
    quote:
      "Their thorough approach and attention to confidentiality gave us the confidence we needed for the acquisition.",
    client: "Anonymous PE Firm",
  },
  {
    title: "Employee Fraud Investigation",
    industry: "Technology",
    challenge:
      "Internal investigation of high-level employee suspected of misrepresenting credentials and engaging in unauthorized business activities.",
    solution:
      "Multi-vector investigation: reviewed educational credentials, identified undisclosed business ventures, documented conflict-of-interest violations, and conducted interviews with former colleagues.",
    outcome:
      "Compiled court-ready evidence that supported termination and legal action. Employee settled before litigation.",
    quote:
      "The investigation was thorough, discreet, and the report was exactly what we needed for our legal team.",
    client: "Anonymous Tech Executive",
  },
];

const faqs = [
  {
    question: "How is my privacy protected during the investigation?",
    answer:
      "Client confidentiality is paramount. All investigations use secure communication channels, encrypted file transfers, and anonymized reporting. We maintain strict attorney-client privilege where applicable and follow all applicable privacy laws. Our Trystpilot reviews showcase how clients trust our discretion.",
  },
  {
    question: "Are investigations conducted legally?",
    answer:
      "Absolutely. All investigations comply with federal and state laws, including the Fair Credit Reporting Act (FCRA), state public records laws, and surveillance regulations. We do not engage in illegal wiretapping, hacking, or unauthorized data access. Our methods are ethical and documented.",
  },
  {
    question: "Can the investigation findings be used in court?",
    answer:
      "Yes. Our Full Forensic tier produces court-ready documentation with expert testimony available. Evidence chain-of-custody is maintained throughout the investigation, and findings are structured for legal admissibility. For Standard and Comprehensive tiers, documentation can often be enhanced upon request.",
  },
  {
    question: "How long does an investigation take?",
    answer:
      "Standard OSINT investigations typically take 1-2 weeks. Comprehensive investigations (field ops + interviews) usually take 2-4 weeks. Full Forensic investigations may take 4-8 weeks depending on scope and complexity. We provide turnaround estimates during the free consultation.",
  },
  {
    question: "What if you find nothing?",
    answer:
      "We report findings objectively. A clean background is valuable information and is clearly documented in our reports. Some investigations uncover no significant issues, which can be just as important as identifying concerns. We charge based on scope and time, not on findings.",
  },
  {
    question: "Can you investigate international subjects?",
    answer:
      "Yes. Our digital OSINT capabilities extend globally. Field operations and interviews are limited to regions where we have licensed investigators (primarily North America). We can connect you with trusted international partners when needed.",
  },
];

const processSteps = [
  {
    number: 1,
    title: "Free Consultation",
    duration: "1 hour",
    details: [
      "Scope definition",
      "Budget alignment",
      "Investigation strategy discussion",
    ],
  },
  {
    number: 2,
    title: "Intake & Assessment",
    duration: "24 hours",
    details: [
      "Digital footprint analysis",
      "Tier recommendation",
      "Data gathering begins",
    ],
  },
  {
    number: 3,
    title: "Investigation Planning",
    duration: "2-3 days",
    details: [
      "Method selection",
      "Timeline agreement",
      "Resource allocation",
    ],
  },
  {
    number: 4,
    title: "Active Investigation",
    duration: "Varies by tier",
    details: [
      "OSINT research phase",
      "Field operations (if applicable)",
      "Ongoing documentation",
    ],
  },
  {
    number: 5,
    title: "Analysis & Synthesis",
    duration: "3-5 days",
    details: [
      "Pattern analysis",
      "Cross-reference validation",
      "Risk assessment",
    ],
  },
  {
    number: 6,
    title: "Report Preparation",
    duration: "3-5 days",
    details: [
      "Findings documentation",
      "Evidence compilation",
      "Executive summary",
    ],
  },
  {
    number: 7,
    title: "Delivery & Debrief",
    duration: "1 day",
    details: [
      "Report delivery",
      "Presentation walkthrough",
      "Questions & discussion",
    ],
  },
  {
    number: 8,
    title: "Follow-up Support",
    duration: "Ongoing",
    details: [
      "Expert testimony (if needed)",
      "Advisory services",
      "Follow-up investigations",
    ],
  },
];

const reportDeliverables = [
  {
    title: "Executive Summary",
    description:
      "High-level overview of findings, key risks, and recommendations. Perfect for board presentations and internal reviews.",
    icon: FileText,
  },
  {
    title: "Detailed Findings",
    description:
      "Comprehensive documentation of all investigation vectors with evidence, sources, and methodology.",
    icon: Search,
  },
  {
    title: "Risk Assessment",
    description:
      "Structured risk scoring and threat modeling based on findings. Actionable recommendations included.",
    icon: Shield,
  },
  {
    title: "Evidence Appendix",
    description:
      "Source materials, screenshots, records, and documentation supporting all conclusions (court-ready formatting available).",
    icon: Database,
  },
];

const colorClasses = {
  sage: {
    border: "border-vln-sage/20 hover:border-vln-sage/40",
    text: "text-vln-sage",
    bg: "bg-vln-sage/10",
    glow: "glow-lift",
    badge: "bg-vln-sage/15 text-vln-sage border-vln-sage/30",
  },
  blue: {
    border: "border-vln-bluegray/20 hover:border-vln-bluegray/40",
    text: "text-vln-bluegray",
    bg: "bg-vln-bluegray/10",
    glow: "glow-lift-blue",
    badge: "bg-vln-bluegray/15 text-vln-bluegray border-vln-bluegray/30",
  },
  amber: {
    border: "border-vln-amber/20 hover:border-vln-amber/40",
    text: "text-vln-amber",
    bg: "bg-vln-amber/10",
    glow: "glow-lift-amber",
    badge: "bg-vln-amber/15 text-vln-amber border-vln-amber/30",
  },
  purple: {
    border: "border-vln-purple/20 hover:border-vln-purple/40",
    text: "text-vln-purple",
    bg: "bg-vln-purple/10",
    glow: "glow-lift-purple",
    badge: "bg-vln-purple/15 text-vln-purple border-vln-purple/30",
  },
};

export default function CorporateBackgroundInvestigationsContent() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
            <CSSFade direction="up">
              <p className="font-mono text-[10px] uppercase tracking-[4px] text-vln-sage mb-4">
                Investigation Services
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Corporate Background <span className="text-gradient-rainbow">Investigations</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                Professional digital forensics, comprehensive vetting, and expert risk assessment.
                Court-ready reports. Anonymous reviews on Trystpilot.
              </p>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="primary" size="lg" href="/contact?service=corporate-investigation" className="group">
                  Get Free Consultation
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <Button variant="secondary" size="lg" href="#methods">
                  View Investigation Methods ↓
                </Button>
              </div>
            </CSSFade>

            <CSSFade delay={600} direction="up">
              <div className="flex flex-wrap justify-center gap-8 pt-8">
                <div className="text-center">
                  <p className="text-vln-sage font-bold text-2xl">$500</p>
                  <p className="text-vln-gray text-sm">Starting price</p>
                </div>
                <div className="h-12 w-px bg-vln-gray/20" />
                <div className="text-center">
                  <p className="text-vln-sage font-bold text-2xl">4.8★</p>
                  <p className="text-vln-gray text-sm">Trystpilot rating</p>
                </div>
                <div className="h-12 w-px bg-vln-gray/20" />
                <div className="text-center">
                  <p className="text-vln-sage font-bold text-2xl">1-8 wks</p>
                  <p className="text-vln-gray text-sm">Investigation timeline</p>
                </div>
              </div>
            </CSSFade>
          </div>
        </section>

        {/* Investigation Methods */}
        <section id="methods" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="max-w-5xl mx-auto mb-12">
            <CSSFade direction="up">
              <p className="font-mono text-[10px] uppercase tracking-[4px] text-vln-sage mb-3">
                Four Investigation Vectors
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-vln-white mb-4">
                Investigation Methods
              </h2>
              <p className="text-vln-gray text-lg max-w-3xl">
                We employ four complementary investigation methodologies that work in parallel.
                Your tier determines which methods are deployed and the depth of each investigation vector.
              </p>
            </CSSFade>
          </div>

          <StaggerFade staggerDelay={150} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investigationMethods.map((method) => (
              <MethodCard key={method.title} method={method} colorClasses={colorClasses} />
            ))}
          </StaggerFade>
        </section>

        {/* Pricing Tiers */}
        <section id="pricing" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="max-w-5xl mx-auto mb-12">
            <CSSFade direction="up">
              <p className="font-mono text-[10px] uppercase tracking-[4px] text-vln-sage mb-3">
                Flexible Pricing
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-vln-white mb-4">
                Pricing Tiers
              </h2>
              <p className="text-vln-gray text-lg max-w-3xl">
                Choose the investigation scope that matches your needs. All tiers include
                detailed reporting, evidence documentation, and professional presentation.
              </p>
            </CSSFade>
          </div>

          <StaggerFade staggerDelay={150} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => (
              <PricingTierCard key={tier.name} tier={tier} />
            ))}
          </StaggerFade>
        </section>

        {/* Process Timeline */}
        <section id="process" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="max-w-5xl mx-auto mb-12">
            <CSSFade direction="up">
              <p className="font-mono text-[10px] uppercase tracking-[4px] text-vln-sage mb-3">
                8-Step Process
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-vln-white mb-4">
                Investigation Journey
              </h2>
              <p className="text-vln-gray text-lg max-w-3xl">
                From your initial consultation through final delivery, here's how we conduct investigations
                with rigor, professionalism, and complete confidentiality.
              </p>
            </CSSFade>
          </div>

          <CSSFade direction="up" delay={200}>
            <ProcessTimeline steps={processSteps} />
          </CSSFade>
        </section>

        {/* Report Deliverables */}
        <section id="deliverables" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="max-w-5xl mx-auto mb-12">
            <CSSFade direction="up">
              <p className="font-mono text-[10px] uppercase tracking-[4px] text-vln-sage mb-3">
                What You Receive
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-vln-white mb-4">
                Report Deliverables
              </h2>
              <p className="text-vln-gray text-lg max-w-3xl">
                Every investigation produces comprehensive documentation structured for your specific use case
                — whether for internal decision-making, legal proceedings, or board presentations.
              </p>
            </CSSFade>
          </div>

          <StaggerFade staggerDelay={150} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {reportDeliverables.map((deliverable) => {
              const Icon = deliverable.icon;
              return (
                <div
                  key={deliverable.title}
                  className="p-6 sm:p-8 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light hover:border-vln-sage/40 transition-all duration-300 glow-lift"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-vln bg-vln-sage/10">
                      <Icon className="w-6 h-6 text-vln-sage" />
                    </div>
                    <h3 className="text-xl font-bold text-vln-white">{deliverable.title}</h3>
                  </div>
                  <p className="text-vln-gray">{deliverable.description}</p>
                </div>
              );
            })}
          </StaggerFade>
        </section>

        {/* Case Studies */}
        <section id="cases" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="max-w-5xl mx-auto mb-12">
            <CSSFade direction="up">
              <p className="font-mono text-[10px] uppercase tracking-[4px] text-vln-sage mb-3">
                Real Results
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-vln-white mb-4">
                Case Studies
              </h2>
              <p className="text-vln-gray text-lg max-w-3xl">
                Examples of investigations we've conducted across industries. Names and identifying details
                have been anonymized to respect client confidentiality.
              </p>
            </CSSFade>
          </div>

          <StaggerFade staggerDelay={150} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.title} caseStudy={caseStudy} />
            ))}
          </StaggerFade>
        </section>

        {/* Trystpilot Integration */}
        <section id="reviews" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade direction="up">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="font-mono text-[10px] uppercase tracking-[4px] text-vln-sage mb-3">
                  Anonymous Reviews
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-vln-white mb-4">
                  What Clients Say (Privately)
                </h2>
                <p className="text-vln-gray text-lg max-w-3xl mx-auto">
                  We respect the confidential nature of investigations. These anonymous reviews from Trystpilot
                  show what clients share about their experience while maintaining the privacy that's central to our service.
                </p>
              </div>

              <TrystpilotWidget />
            </div>
          </CSSFade>
        </section>

        {/* Trust & Credentials */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade direction="up">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="font-mono text-[10px] uppercase tracking-[4px] text-vln-sage mb-3">
                  Trust & Credentials
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-vln-white mb-4">
                  Licensed & Regulated
                </h2>
              </div>

              <StaggerFade staggerDelay={100} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                {[
                  { icon: Award, label: "Licensed Investigators", detail: "State-certified professionals" },
                  { icon: Shield, label: "Legally Compliant", detail: "FCRA & state law adherence" },
                  { icon: Star, label: "Expert Testimony", detail: "Court-admissible findings" },
                  { icon: Clock, label: "Confidential Service", detail: "Privacy is paramount" },
                ].map((credential, idx) => {
                  const Icon = credential.icon;
                  return (
                    <div key={idx} className="p-6 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light text-center">
                      <Icon className="w-8 h-8 text-vln-sage mx-auto mb-3" />
                      <h3 className="text-vln-white font-bold mb-1">{credential.label}</h3>
                      <p className="text-vln-gray text-sm">{credential.detail}</p>
                    </div>
                  );
                })}
              </StaggerFade>
            </div>
          </CSSFade>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <CSSFade direction="up">
              <p className="font-mono text-[10px] uppercase tracking-[4px] text-vln-sage mb-3 text-center">
                Common Questions
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-vln-white mb-8 text-center">
                Frequently Asked Questions
              </h2>
            </CSSFade>

            <FAQSection faqs={faqs} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade>
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 p-8 sm:p-12 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Ready to investigate?
              </h2>
              <p className="text-vln-gray text-lg max-w-2xl mx-auto">
                Schedule your free consultation with our investigation team.
                We'll help you determine the right scope and approach for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="primary" size="lg" href="/contact?service=corporate-investigation" className="group">
                  Schedule Free Consultation
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <Button variant="secondary" size="lg" href="#pricing">
                  View Pricing
                </Button>
              </div>
              <p className="text-vln-gray-dark text-sm">No credit card required. 1-hour consultation call.</p>
            </div>
          </CSSFade>
        </section>
      </main>

      <Footer />
    </div>
  );
}
