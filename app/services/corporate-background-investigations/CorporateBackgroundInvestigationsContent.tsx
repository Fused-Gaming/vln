"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";
import { Shield, Users, FileText, TrendingUp, Check } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Executive Background Screening",
    tagline: "Comprehensive vetting for leadership positions",
    description:
      "Deep-dive background investigations for C-suite executives, board members, and senior leadership. Includes criminal history, financial records, litigation background, and regulatory compliance verification.",
    features: [
      "Multi-jurisdiction criminal background checks",
      "Financial records and credit history review",
      "Litigation and regulatory history analysis",
      "Professional credential verification",
      "Reference checks from authoritative sources",
      "Detailed findings report with risk assessment",
    ],
    pricing: "Starting at $2K",
    color: "sage" as const,
    cta: "Request Executive Screening",
    ctaLink: "/contact?service=executive-screening",
  },
  {
    icon: Users,
    title: "Due Diligence & Corporate Vetting",
    tagline: "Validate partnerships and acquisitions",
    description:
      "Comprehensive corporate due diligence investigations for mergers, acquisitions, and strategic partnerships. Verify ownership structures, financial stability, and regulatory compliance.",
    features: [
      "Corporate structure and ownership analysis",
      "Financial stability and litigation review",
      "Regulatory compliance verification",
      "Beneficial ownership identification",
      "Fraud history and enforcement actions",
      "Executive background integration report",
    ],
    pricing: "Custom pricing",
    color: "blue" as const,
    cta: "Request Due Diligence",
    ctaLink: "/contact?service=due-diligence",
  },
  {
    icon: FileText,
    title: "Compliance & Regulatory Screening",
    tagline: "Maintain industry compliance standards",
    description:
      "Specialized screening for regulated industries including gaming, financial services, and healthcare. Ensure employees, executives, and partners meet all regulatory requirements.",
    features: [
      "AML/KYC compliance screening",
      "OFAC sanctions list verification",
      "Gaming license compatibility review",
      "Financial regulatory compliance check",
      "Ongoing monitoring services available",
      "Audit-ready documentation and reports",
    ],
    pricing: "Starting at $1.5K",
    color: "amber" as const,
    cta: "Request Compliance Screening",
    ctaLink: "/contact?service=compliance-screening",
  },
  {
    icon: TrendingUp,
    title: "Ongoing Risk Monitoring",
    tagline: "Real-time alerts for institutional clients",
    description:
      "Continuous monitoring of key personnel and corporate relationships. Automated alerts for negative news, litigation, regulatory actions, and other risk indicators.",
    features: [
      "24/7 news monitoring and alerts",
      "Regulatory action tracking",
      "Litigation emergence alerts",
      "Financial distress indicators",
      "Customizable monitoring parameters",
      "Monthly executive summary reports",
    ],
    pricing: "Retainer-based",
    color: "purple" as const,
    cta: "Discuss Monitoring Program",
    ctaLink: "/contact?service=risk-monitoring",
  },
];

const colorClasses = {
  sage: {
    border: "border-vln-sage/20 hover:border-vln-sage/40",
    text: "text-vln-sage",
    bg: "bg-vln-sage/10",
    glow: "glow-lift",
  },
  blue: {
    border: "border-vln-bluegray/20 hover:border-vln-bluegray/40",
    text: "text-vln-bluegray",
    bg: "bg-vln-bluegray/10",
    glow: "glow-lift-blue",
  },
  amber: {
    border: "border-vln-amber/20 hover:border-vln-amber/40",
    text: "text-vln-amber",
    bg: "bg-vln-amber/10",
    glow: "glow-lift-amber",
  },
  purple: {
    border: "border-vln-purple/20 hover:border-vln-purple/40",
    text: "text-vln-purple",
    bg: "bg-vln-purple/10",
    glow: "glow-lift-purple",
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
                Professional Investigation Services
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Corporate Background{" "}
                <span className="text-gradient-rainbow">Investigations</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                Comprehensive due diligence and risk assessment for executives,
                partnerships, and regulatory compliance.
              </p>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <p className="text-base sm:text-lg text-vln-gray max-w-2xl mx-auto">
                Professional-grade background investigations backed by verified
                intelligence from authoritative sources. Trusted by institutional
                clients for M&A, compliance, and executive vetting.
              </p>
            </CSSFade>

            <CSSFade delay={600} direction="up">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  href="/contact?service=investigations"
                  className="group"
                >
                  Get Assessment
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Button>
                <Button variant="secondary" size="lg" href="/services">
                  Back to Services
                </Button>
              </div>
            </CSSFade>
          </div>
        </section>

        {/* Why Choose VLN Investigations */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <CSSFade>
            <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-vln border border-vln-sage/20 bg-vln-bg-light">
              <h2 className="text-2xl sm:text-3xl font-bold text-vln-white mb-6 text-center">
                Why Institutional Clients Choose VLN
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Government-cleared security researchers with deep due diligence expertise",
                  "Verified access to authoritative intelligence sources and databases",
                  "Multi-jurisdictional investigation capabilities",
                  "Regulatory compliance specialists for AML/KYC requirements",
                  "Rapid turnaround: most reports within 5-7 business days",
                  "Confidential handling with attorney-client privilege protocols",
                  "24/7 emergency investigations for time-sensitive matters",
                  "Audit-ready documentation for institutional clients",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-vln-sage flex-shrink-0 mt-0.5" />
                    <span className="text-vln-gray text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CSSFade>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <StaggerFade staggerDelay={150} className="space-y-12 sm:space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const colors = colorClasses[service.color];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.title}
                  className={`max-w-6xl mx-auto p-6 sm:p-8 lg:p-10 rounded-vln border-2 ${colors.border} bg-vln-bg-light transition-all duration-300 ${colors.glow}`}
                >
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Content */}
                    <div className={!isEven ? "lg:order-2" : ""}>
                      <div className={`inline-flex items-center justify-center p-4 rounded-vln ${colors.bg} mb-6`}>
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <h2 className={`text-3xl sm:text-4xl font-bold mb-3 ${colors.text}`}>
                        {service.title}
                      </h2>
                      <p className="text-lg sm:text-xl text-vln-gray-dark mb-4">
                        {service.tagline}
                      </p>
                      <p className="text-base text-vln-gray mb-6">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-sm font-medium text-vln-gray-dark">
                          Pricing:
                        </span>
                        <span className={`text-lg font-bold ${colors.text}`}>
                          {service.pricing}
                        </span>
                      </div>
                      <Button
                        variant={service.color === "sage" ? "primary" : "secondary"}
                        size="lg"
                        href={service.ctaLink}
                        className="group"
                      >
                        {service.cta}
                        <span className="ml-2 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Button>
                    </div>

                    {/* Features */}
                    <div className={!isEven ? "lg:order-1" : ""}>
                      <div className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check
                              className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`}
                            />
                            <span className="text-vln-gray">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggerFade>
        </section>

        {/* Trystpilot Reviews Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <p className="font-mono text-[10px] uppercase tracking-[4px] text-vln-sage mb-3">
                  Client Reviews & Testimonials
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-vln-white">
                  Trusted by{" "}
                  <span className="text-vln-sage">Institutional Clients</span>
                </h2>
                <p className="mt-4 text-vln-gray max-w-2xl mx-auto">
                  Read anonymous reviews from corporate clients, law firms, and
                  investment firms who have used our investigation services.
                </p>
              </div>

              <div className="rounded-vln border-2 border-vln-sage/25 bg-vln-bg-light overflow-hidden glow-lift">
                <div className="p-8 sm:p-10">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-vln bg-vln-sage/10 border border-vln-sage/25">
                          <span className="text-vln-sage text-lg font-semibold">
                            ★
                          </span>
                        </div>
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[3px] text-vln-sage">
                            Client Testimonials
                          </p>
                          <p className="text-sm text-vln-gray-dark">
                            Verified reviews from Trystpilot
                          </p>
                        </div>
                      </div>
                      <p className="text-base text-vln-gray leading-relaxed mb-4">
                        Our clients consistently praise our thoroughness, speed,
                        and attention to detail. Read detailed reviews from law
                        firms, PE firms, and corporate clients who have trusted
                        us with critical due diligence investigations.
                      </p>
                      <p className="text-sm text-vln-gray-dark">
                        All reviews are anonymous and moderated for authenticity
                      </p>
                    </div>
                    <a
                      href="https://www.trystpilot.xyz/profile/vln-security"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 px-6 py-3 rounded-[8px] border border-vln-sage/40 text-vln-sage bg-vln-sage/[0.07] font-semibold text-sm hover:bg-vln-sage hover:text-vln-bg transition-all duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-vln-sage whitespace-nowrap"
                      aria-label="View reviews on Trystpilot"
                    >
                      View Reviews →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CSSFade>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade>
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 p-8 sm:p-12 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Ready to Start Your Investigation?
              </h2>
              <p className="text-xl text-vln-gray max-w-2xl mx-auto">
                Schedule a consultation to discuss your investigation needs and
                get a custom quote. Confidentiality guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  variant="primary"
                  size="xl"
                  href="/contact?service=investigations"
                  className="group"
                >
                  Request Investigation
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Button>
                <Button variant="secondary" size="xl" href="/services">
                  All Services
                </Button>
              </div>
            </div>
          </CSSFade>
        </section>
      </main>

      <Footer />
    </div>
  );
}
