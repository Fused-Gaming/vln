"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";
import { Shield, Search, Code, Palette, GraduationCap, Check } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      id: "audits",
      icon: Shield,
      title: "Smart Contract Audits",
      tagline: "Find vulnerabilities before attackers do",
      description: "Comprehensive security audits for EVM-based smart contracts with CVSS-scored findings, proof-of-concept exploits, and detailed remediation guidance.",
      features: [
        "Line-by-line code review",
        "Automated + manual testing",
        "CVSS 3.1 risk scoring",
        "Foundry PoC exploits",
        "30-day fix verification",
        "Critical bugs flagged within 48 hours"
      ],
      pricing: "Starting at $2K",
      color: "sage" as const,
      cta: "Get Free 30-Min Scan",
      ctaLink: "/contact?service=audits"
    },
    {
      id: "pentest",
      icon: Search,
      title: "Penetration Testing",
      tagline: "Simulate real-world attack scenarios",
      description: "Advanced penetration testing for blockchain protocols, DeFi platforms, and Web3 infrastructure to identify exploitable vulnerabilities.",
      features: [
        "Black-box & white-box testing",
        "Infrastructure assessment",
        "API & smart contract fuzzing",
        "Economic attack modeling",
        "Detailed attack chain documentation",
        "Executive summary reports"
      ],
      pricing: "Custom pricing",
      color: "blue" as const,
      cta: "Request Assessment",
      ctaLink: "/contact?service=pentest"
    },
    {
      id: "development",
      icon: Code,
      title: "Secure Development",
      tagline: "Build security into your contracts from day one",
      description: "Expert Solidity development and security consulting to help you build secure, gas-optimized smart contracts that pass audits the first time.",
      features: [
        "Security-first architecture design",
        "Gas optimization strategies",
        "Unit & integration testing",
        "OpenZeppelin best practices",
        "Code review & pair programming",
        "CI/CD security integration"
      ],
      pricing: "Retainer or project-based",
      color: "amber" as const,
      cta: "Discuss Your Project",
      ctaLink: "/contact?service=development"
    },
    {
      id: "design",
      icon: Palette,
      title: "Security-First Design",
      tagline: "Design secure protocols and tokenomics",
      description: "Protocol design consulting focused on security, game theory, and economic sustainability for DeFi and blockchain gaming projects.",
      features: [
        "Threat modeling & risk analysis",
        "Tokenomics security review",
        "Game theory attack scenarios",
        "Access control architecture",
        "Upgrade path design",
        "Security documentation"
      ],
      pricing: "Custom pricing",
      color: "purple" as const,
      cta: "Book Consultation",
      ctaLink: "/contact?service=design"
    },
    {
      id: "university",
      icon: GraduationCap,
      title: "VLN University",
      tagline: "Train your team to write secure code",
      description: "Hands-on security training workshops for development teams covering common vulnerabilities, secure coding patterns, and defensive programming techniques.",
      features: [
        "Full-day or half-day workshops",
        "Real-world vulnerability examples",
        "Capture-the-flag exercises",
        "Secure coding checklist",
        "Team certification",
        "Post-training support"
      ],
      pricing: "Starting at $3K per session",
      color: "sage" as const,
      cta: "Schedule Training",
      ctaLink: "/contact?service=university"
    },
  ];

  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
            <CSSFade direction="up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Elite <span className="text-gradient-rainbow">Security Services</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl md:text-3xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                Comprehensive security solutions for blockchain gaming and DeFi
              </p>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <p className="text-base sm:text-lg text-vln-gray max-w-2xl mx-auto">
                From prevention to forensics, we protect your contracts, recover stolen funds, and train your team to build secure protocols from day one.
              </p>
            </CSSFade>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <StaggerFade staggerDelay={150} className="space-y-12 sm:space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              const colorClasses = {
                sage: {
                  border: 'border-vln-sage/20 hover:border-vln-sage/40',
                  text: 'text-vln-sage',
                  bg: 'bg-vln-sage/10',
                  glow: 'glow-lift'
                },
                blue: {
                  border: 'border-vln-bluegray/20 hover:border-vln-bluegray/40',
                  text: 'text-vln-bluegray',
                  bg: 'bg-vln-bluegray/10',
                  glow: 'glow-lift-blue'
                },
                amber: {
                  border: 'border-vln-amber/20 hover:border-vln-amber/40',
                  text: 'text-vln-amber',
                  bg: 'bg-vln-amber/10',
                  glow: 'glow-lift-amber'
                },
                purple: {
                  border: 'border-vln-purple/20 hover:border-vln-purple/40',
                  text: 'text-vln-purple',
                  bg: 'bg-vln-purple/10',
                  glow: 'glow-lift-purple'
                }
              };

              const colors = colorClasses[service.color];

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`max-w-6xl mx-auto p-6 sm:p-8 lg:p-10 rounded-vln border-2 ${colors.border} bg-vln-bg-light transition-all duration-300 ${colors.glow}`}
                >
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content */}
                    <div className={!isEven ? 'lg:order-2' : ''}>
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
                        <span className="text-sm font-medium text-vln-gray-dark">Pricing:</span>
                        <span className={`text-lg font-bold ${colors.text}`}>{service.pricing}</span>
                      </div>

                      <Button
                        variant={service.color === 'sage' ? 'primary' : 'secondary'}
                        size="lg"
                        href={service.ctaLink}
                        className="group"
                      >
                        {service.cta}
                        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </Button>
                    </div>

                    {/* Features List */}
                    <div className={!isEven ? 'lg:order-1' : ''}>
                      <div className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
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

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade>
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 p-8 sm:p-12 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Not sure which service you need?
              </h2>
              <p className="text-xl text-vln-gray max-w-2xl mx-auto">
                Schedule a free 30-minute consultation to discuss your project and security needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="primary" size="xl" href="/contact" className="group">
                  Get Free Consultation
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <Button variant="secondary" size="xl" href="/pricing">
                  View Pricing
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
