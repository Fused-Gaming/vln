"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";
import { Check, Shield, Zap, Crown } from "lucide-react";

export default function PricingPage() {
  const auditTiers = [
    {
      size: "Small Contract",
      lines: "< 500 lines",
      price: "$2,000 - $4,000",
      timeline: "3-5 business days",
      icon: Shield,
      color: "sage" as const,
    },
    {
      size: "Medium Contract",
      lines: "500 - 2,000 lines",
      price: "$5,000 - $8,000",
      timeline: "5-7 business days",
      icon: Zap,
      color: "blue" as const,
    },
    {
      size: "Large Contract",
      lines: "2,000+ lines",
      price: "$10,000+",
      timeline: "7-14 business days",
      icon: Crown,
      color: "amber" as const,
    },
  ];

  const auditInclusions = [
    "Comprehensive vulnerability analysis",
    "CVSS 3.1 scoring & risk assessment",
    "Foundry PoC exploits for critical findings",
    "30-day fix verification (free)",
    "Critical bugs flagged within 48 hours",
    "Detailed remediation guidance",
    "Executive summary for stakeholders",
    "Secure code review checklist",
  ];

  const retainerTiers = [
    {
      name: "Starter",
      price: "$5,000/month",
      commitment: "3-month minimum",
      hours: "20 hours/month",
      features: [
        "Security consulting & code review",
        "Slack/Discord integration",
        "2 business day response time",
        "Monthly security report",
        "Best practices guidance",
      ],
      color: "sage" as const,
    },
    {
      name: "Growth",
      price: "$12,000/month",
      commitment: "6-month minimum",
      hours: "50 hours/month",
      features: [
        "All Starter features",
        "Priority support (24-hour response)",
        "Architecture design review",
        "Threat modeling sessions",
        "Quarterly team training",
        "Dedicated security consultant",
      ],
      color: "blue" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom pricing",
      commitment: "12-month minimum",
      hours: "Unlimited consulting",
      features: [
        "All Growth features",
        "24/7 emergency response",
        "On-demand code audits",
        "White-glove service",
        "Legal & compliance support",
        "Executive security briefings",
        "Custom SLAs",
      ],
      color: "amber" as const,
    },
  ];

  const services = [
    {
      name: "Penetration Testing",
      starting: "$8,000",
      description: "Comprehensive infrastructure and protocol security assessment",
    },
    {
      name: "Incident Response",
      starting: "$15,000",
      description: "24/7 emergency forensics, fund recovery, and expert testimony",
    },
    {
      name: "Secure Development",
      starting: "$150/hour",
      description: "Expert Solidity development and security consulting",
    },
    {
      name: "Protocol Design",
      starting: "$10,000",
      description: "Security-first architecture and tokenomics consulting",
    },
    {
      name: "VLN University",
      starting: "$3,000/session",
      description: "Full-day or half-day security training workshops",
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
                Transparent <span className="text-gradient-rainbow">Pricing</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl md:text-3xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                No hidden fees. Clear pricing based on project size and complexity.
              </p>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <p className="text-base sm:text-lg text-vln-gray max-w-2xl mx-auto">
                All audits include comprehensive vulnerability analysis, CVSS scoring, and 30-day fix verification at no extra cost.
              </p>
            </CSSFade>
          </div>
        </section>

        {/* Audit Pricing Tiers */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">
              Smart Contract <span className="text-vln-sage">Audit Pricing</span>
            </h2>
          </CSSFade>

          <StaggerFade staggerDelay={150} className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12">
            {auditTiers.map((tier, index) => {
              const Icon = tier.icon;
              const colorClasses = {
                sage: 'border-vln-sage/20 hover:border-vln-sage/40 text-vln-sage bg-vln-sage/10 glow-lift',
                blue: 'border-vln-bluegray/20 hover:border-vln-bluegray/40 text-vln-bluegray bg-vln-bluegray/10 glow-lift-blue',
                amber: 'border-vln-amber/20 hover:border-vln-amber/40 text-vln-amber bg-vln-amber/10 glow-lift-amber',
              };

              return (
                <div
                  key={index}
                  className={`p-6 sm:p-8 rounded-vln border-2 ${colorClasses[tier.color].split(' ')[0]} ${colorClasses[tier.color].split(' ')[1]} bg-vln-bg-light transition-all duration-300 ${colorClasses[tier.color].split(' ').slice(-1)[0]} hover:-translate-y-1`}
                >
                  <div className={`inline-flex items-center justify-center p-3 rounded-vln ${colorClasses[tier.color].split(' ')[3]} mb-4`}>
                    <Icon className={`w-6 h-6 ${colorClasses[tier.color].split(' ')[2]}`} />
                  </div>

                  <h3 className={`text-2xl font-bold mb-2 ${colorClasses[tier.color].split(' ')[2]}`}>
                    {tier.size}
                  </h3>
                  <p className="text-vln-gray-dark text-sm mb-4">{tier.lines}</p>

                  <div className="mb-6">
                    <p className={`text-3xl font-bold ${colorClasses[tier.color].split(' ')[2]}`}>
                      {tier.price}
                    </p>
                    <p className="text-vln-gray text-sm mt-2">{tier.timeline}</p>
                  </div>

                  <Button
                    variant={tier.color === 'sage' ? 'primary' : 'secondary'}
                    size="lg"
                    href={`/contact?service=audit&tier=${tier.size.toLowerCase().replace(' ', '-')}`}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              );
            })}
          </StaggerFade>

          <CSSFade delay={400}>
            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light">
              <h3 className="text-2xl font-bold text-vln-white mb-6">All audits include:</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {auditInclusions.map((inclusion, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-vln-sage flex-shrink-0 mt-0.5" />
                    <span className="text-vln-gray">{inclusion}</span>
                  </div>
                ))}
              </div>
            </div>
          </CSSFade>
        </section>

        {/* Retainer Packages */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 bg-vln-bg-light">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
              Monthly <span className="text-vln-bluegray">Retainer Packages</span>
            </h2>
            <p className="text-vln-gray text-center text-lg mb-12 sm:mb-16 max-w-3xl mx-auto">
              For teams that need ongoing security support and consulting
            </p>
          </CSSFade>

          <StaggerFade staggerDelay={150} className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {retainerTiers.map((tier, index) => {
              const colorClasses = {
                sage: 'border-vln-sage/20 hover:border-vln-sage/40 text-vln-sage glow-lift',
                blue: 'border-vln-bluegray/20 hover:border-vln-bluegray/40 text-vln-bluegray glow-lift-blue',
                amber: 'border-vln-amber/20 hover:border-vln-amber/40 text-vln-amber glow-lift-amber',
              };

              return (
                <div
                  key={index}
                  className={`relative p-6 sm:p-8 rounded-vln border-2 ${colorClasses[tier.color].split(' ')[0]} ${colorClasses[tier.color].split(' ')[1]} bg-vln-bg transition-all duration-300 ${colorClasses[tier.color].split(' ').slice(-1)[0]} hover:-translate-y-1 ${tier.popular ? 'ring-2 ring-vln-bluegray/50' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-vln-bluegray text-vln-bg text-xs font-bold uppercase">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className={`text-2xl font-bold mb-2 ${colorClasses[tier.color].split(' ')[2]}`}>
                    {tier.name}
                  </h3>

                  <div className="mb-6">
                    <p className={`text-3xl font-bold ${colorClasses[tier.color].split(' ')[2]}`}>
                      {tier.price}
                    </p>
                    <p className="text-vln-gray-dark text-sm mt-1">{tier.commitment}</p>
                    <p className="text-vln-gray text-sm mt-2">{tier.hours}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 ${colorClasses[tier.color].split(' ')[2]} flex-shrink-0 mt-0.5`} />
                        <span className="text-vln-gray text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={tier.color === 'blue' ? 'primary' : 'secondary'}
                    size="lg"
                    href={`/contact?service=retainer&tier=${tier.name.toLowerCase()}`}
                    className="w-full"
                  >
                    {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </div>
              );
            })}
          </StaggerFade>
        </section>

        {/* Other Services */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">
              Additional <span className="text-vln-purple">Services</span>
            </h2>
          </CSSFade>

          <StaggerFade staggerDelay={100} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 rounded-vln border-2 border-vln-purple/20 hover:border-vln-purple/40 bg-vln-bg-light transition-all duration-300 glow-lift-purple hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-vln-white mb-2">{service.name}</h3>
                <p className="text-2xl font-bold text-vln-purple mb-4">
                  {service.starting}
                </p>
                <p className="text-vln-gray text-sm mb-6">{service.description}</p>
                <Button
                  variant="secondary"
                  size="md"
                  href={`/contact?service=${service.name.toLowerCase().replace(' ', '-')}`}
                  className="w-full"
                >
                  Learn More
                </Button>
              </div>
            ))}
          </StaggerFade>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-vln-bg-light">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Pricing <span className="text-vln-sage">FAQ</span>
            </h2>
          </CSSFade>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                q: "Do you offer discounts for multiple audits?",
                a: "Yes! We offer volume discounts for clients who need multiple audits or ongoing work. Contact us to discuss custom pricing."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept wire transfer, stablecoins (USDC/USDT), and cryptocurrency (ETH/BTC). Payment terms are 50% upfront, 50% upon delivery."
              },
              {
                q: "What's included in the 30-day fix verification?",
                a: "After you fix the issues we found, we'll re-audit those specific sections at no charge to verify the fixes are secure. This is included in all audit packages."
              },
              {
                q: "Do you offer rush audits?",
                a: "Yes, for an additional 50% fee we can prioritize your audit and deliver in 24-48 hours for small contracts. Contact us for availability."
              },
              {
                q: "Can I upgrade from a one-time audit to a retainer?",
                a: "Absolutely! We'll credit 100% of your audit cost toward the first month of a retainer if you upgrade within 30 days."
              }
            ].map((faq, index) => (
              <CSSFade key={index} delay={index * 100}>
                <div className="p-6 rounded-vln border border-vln-sage/20 bg-vln-bg">
                  <h3 className="text-lg font-bold text-vln-white mb-2">{faq.q}</h3>
                  <p className="text-vln-gray">{faq.a}</p>
                </div>
              </CSSFade>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade>
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 p-8 sm:p-12 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Ready to secure your contract?
              </h2>
              <p className="text-xl text-vln-gray max-w-2xl mx-auto">
                Start with a free 30-minute security scan and get a custom quote for your project.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="primary" size="xl" href="/contact" className="group">
                  Get Free Security Scan
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <Button variant="secondary" size="xl" href="/services">
                  View All Services
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
