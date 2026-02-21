"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";
import { Shield, Search, Code, GraduationCap, Check, MapPin, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Smart Contract Audits",
    description:
      "Comprehensive EVM smart contract security audits with CVSS-scored findings, Foundry PoC exploits, and detailed remediation guidance. Trusted by San Francisco DeFi startups and blockchain gaming teams.",
    features: [
      "Line-by-line Solidity code review",
      "Automated + manual vulnerability testing",
      "CVSS 3.1 risk scoring on every finding",
      "Foundry proof-of-concept exploits",
      "30-day free fix verification",
      "Critical bugs flagged within 48 hours",
    ],
    pricing: "Starting at $2K",
    color: "sage" as const,
    cta: "Get Free 30-Min Scan",
    ctaLink: "/contact?service=audits",
  },
  {
    icon: Search,
    title: "DeFi Penetration Testing",
    description:
      "Advanced black-box and white-box penetration testing for DeFi protocols, blockchain gaming platforms, and Web3 infrastructure. Identify exploitable attack vectors before they reach mainnet.",
    features: [
      "Economic attack modeling and game theory analysis",
      "Flash loan and MEV attack simulations",
      "Infrastructure and API security assessment",
      "Smart contract fuzzing with Echidna & Foundry",
      "Detailed attack chain documentation",
      "Executive and technical summary reports",
    ],
    pricing: "Custom pricing",
    color: "blue" as const,
    cta: "Request Assessment",
    ctaLink: "/contact?service=pentest",
  },
  {
    icon: Code,
    title: "Blockchain Forensics & Incident Response",
    description:
      "24/7 emergency response for live exploits. On-chain fund tracing, attacker wallet analysis, and rapid vulnerability mitigation for Bay Area DeFi protocols and blockchain gaming projects.",
    features: [
      "24/7 emergency incident response",
      "On-chain fund tracing and wallet clustering",
      "Real-time exploit reverse engineering",
      "Law enforcement coordination",
      "Post-mortem vulnerability analysis",
      "Recovery strategy and fund mitigation",
    ],
    pricing: "Starting at $15K",
    color: "amber" as const,
    cta: "Emergency Forensics",
    ctaLink: "/contact?service=forensics",
  },
  {
    icon: GraduationCap,
    title: "Security Training for Bay Area Teams",
    description:
      "Hands-on Solidity security training workshops for San Francisco and Silicon Valley blockchain development teams. Learn to identify and prevent common smart contract vulnerabilities.",
    features: [
      "Full-day and half-day workshop formats",
      "Real-world vulnerability case studies",
      "Capture-the-flag hacking exercises",
      "Secure Solidity coding patterns and checklists",
      "Team certification upon completion",
      "On-site or remote delivery for Bay Area teams",
    ],
    pricing: "Starting at $3K per session",
    color: "purple" as const,
    cta: "Schedule Workshop",
    ctaLink: "/contact?service=university",
  },
];

const localClients = [
  "DeFi Protocols",
  "Blockchain Gaming Teams",
  "NFT Marketplaces",
  "Web3 Startups",
  "DAO Organizations",
  "Layer 2 Projects",
];

export default function SanFranciscoServicesContent() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
            <CSSFade direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-vln-sage/30 bg-vln-sage/10 text-vln-sage text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                San Francisco Bay Area
              </div>
            </CSSFade>

            <CSSFade direction="up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Smart Contract Audits in{" "}
                <span className="text-gradient-rainbow">San Francisco</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl md:text-3xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                Bay Area&apos;s trusted Web3 security partner
              </p>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <p className="text-base sm:text-lg text-vln-gray max-w-2xl mx-auto">
                VLN provides professional smart contract audits, EVM penetration testing, and blockchain
                forensics for DeFi startups, blockchain gaming teams, and Web3 projects across San
                Francisco, Silicon Valley, and the greater Bay Area.
              </p>
            </CSSFade>

            <CSSFade delay={600} direction="up">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="primary" size="xl" href="/contact?service=audits" className="group">
                  Get Free 30-Min Scan
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="secondary" size="xl" href="/services">
                  View All Services
                </Button>
              </div>
            </CSSFade>
          </div>
        </section>

        {/* Why Bay Area Teams Trust VLN */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <CSSFade>
            <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-vln border border-vln-sage/20 bg-vln-bg-light">
              <h2 className="text-2xl sm:text-3xl font-bold text-vln-white mb-6 text-center">
                Why San Francisco Web3 Teams Choose VLN
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Government-cleared security researchers with 12+ years experience",
                  "Expert testimony experience in major DeFi exploit cases",
                  "47 critical vulnerabilities discovered across audited projects",
                  "$5.2M in stolen funds recovered through forensic analysis",
                  "100% post-audit success rate — zero hacks after remediation",
                  "Free 30-day fix verification included with every audit",
                  "48-hour critical bug reporting for all active engagements",
                  "On-site and remote engagements for Bay Area teams",
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
          <CSSFade>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Security Services for{" "}
                <span className="text-vln-sage">Bay Area Web3 Teams</span>
              </h2>
              <p className="text-vln-gray text-lg max-w-2xl mx-auto">
                From pre-launch audits to emergency forensics, we cover every phase of your
                smart contract security lifecycle.
              </p>
            </div>
          </CSSFade>

          <StaggerFade staggerDelay={150} className="space-y-12 sm:space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

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

              const colors = colorClasses[service.color];

              return (
                <div
                  key={service.title}
                  className={`max-w-6xl mx-auto p-6 sm:p-8 lg:p-10 rounded-vln border-2 ${colors.border} bg-vln-bg-light transition-all duration-300 ${colors.glow}`}
                >
                  <div className={`grid lg:grid-cols-2 gap-8 items-center`}>
                    <div className={!isEven ? "lg:order-2" : ""}>
                      <div
                        className={`inline-flex items-center justify-center p-4 rounded-vln ${colors.bg} mb-6`}
                      >
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                      </div>

                      <h3 className={`text-3xl sm:text-4xl font-bold mb-3 ${colors.text}`}>
                        {service.title}
                      </h3>

                      <p className="text-base text-vln-gray mb-6">{service.description}</p>

                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-sm font-medium text-vln-gray-dark">Pricing:</span>
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

        {/* Who We Serve */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <CSSFade>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                Serving San Francisco&apos;s{" "}
                <span className="text-vln-bluegray">Web3 Ecosystem</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {localClients.map((client) => (
                  <span
                    key={client}
                    className="px-4 py-2 rounded-vln border border-vln-bluegray/30 bg-vln-bluegray/10 text-vln-bluegray text-sm font-medium"
                  >
                    {client}
                  </span>
                ))}
              </div>
              <p className="text-vln-gray mt-6 max-w-2xl mx-auto">
                From early-stage DeFi startups in SoMa to established blockchain gaming studios in
                Silicon Valley — VLN provides the security expertise to protect your smart contracts
                at every stage of development.
              </p>
            </div>
          </CSSFade>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade>
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 p-8 sm:p-12 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Ready to Secure Your Smart Contract?
              </h2>
              <p className="text-xl text-vln-gray max-w-2xl mx-auto">
                Get a free 30-minute security scan for your Bay Area Web3 project. No commitment
                required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="primary" size="xl" href="/contact" className="group">
                  Start Free 30-Min Scan
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="secondary" size="xl" href="/pricing">
                  View Pricing
                </Button>
              </div>
              <p className="text-vln-gray-dark text-sm">
                Serving San Francisco, Silicon Valley, Oakland, Berkeley, and all of the Bay Area
              </p>
            </div>
          </CSSFade>
        </section>
      </main>

      <Footer />
    </div>
  );
}
