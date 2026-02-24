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

  const legalTerms = [
    {
      title: "Confidentiality",
      items: [
        "Mutual NDA (5-year term)",
        "All findings kept confidential",
        "Secure communication channels",
        "No public disclosure without consent"
      ]
    },
    {
      title: "Liability & Insurance",
      items: [
        "$5M professional indemnity insurance",
        "Liability capped at 1-3x audit fee",
        "Best-effort assessment (no guarantees)",
        "Insurance-ready reporting available"
      ]
    },
    {
      title: "Service Level Agreement",
      items: [
        "Guaranteed delivery timeline",
        "Critical findings within 48 hours",
        "Response time: 24-48 hours",
        "Service credits for SLA breaches"
      ]
    },
    {
      title: "Intellectual Property",
      items: [
        "You retain all code IP rights",
        "Report ownership transferred at delivery",
        "No code reuse without permission",
        "Security methodology remains proprietary"
      ]
    }
  ];

  const notIncluded = [
    "Gas optimization (available as add-on)",
    "Economic/game theory analysis (see Protocol Design service)",
    "Frontend security audit",
    "Infrastructure/DevOps assessment",
    "Post-deployment monitoring",
    "Legal compliance review"
  ];

  const retainerTiers = [
    {
      name: "Starter",
      price: "$5,000/month",
      commitment: "3-month minimum",
      hours: "20 hours/month",
      responseTime: "48 hours",
      sla: "95% availability",
      features: [
        "Security consulting & code review",
        "Slack/Discord integration",
        "2 business day response time",
        "Monthly security report",
        "Best practices guidance",
        "Rollover unused hours (max 10)",
      ],
      color: "sage" as const,
    },
    {
      name: "Growth",
      price: "$12,000/month",
      commitment: "6-month minimum",
      hours: "50 hours/month",
      responseTime: "24 hours",
      sla: "99% availability",
      features: [
        "All Starter features",
        "Priority support (24-hour response)",
        "Architecture design review",
        "Threat modeling sessions",
        "Quarterly team training",
        "Dedicated security consultant",
        "Rollover unused hours (max 25)",
        "10% discount on additional audits",
      ],
      color: "blue" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom pricing",
      commitment: "12-month minimum",
      hours: "Unlimited consulting",
      responseTime: "1 hour (critical)",
      sla: "99.9% availability",
      features: [
        "All Growth features",
        "24/7 emergency response",
        "On-demand code audits (up to 3/year)",
        "White-glove service",
        "Legal & compliance support",
        "Executive security briefings",
        "Custom SLAs & guarantees",
        "Expert testimony availability",
        "Insurance coordination",
      ],
      color: "amber" as const,
    },
  ];

  const services = [
    {
      name: "Penetration Testing",
      starting: "$8,000",
      description: "Comprehensive infrastructure and protocol security assessment",
      details: "Black-box & white-box testing, API fuzzing, economic attack modeling"
    },
    {
      name: "Incident Response",
      starting: "$15,000",
      description: "24/7 emergency forensics, fund recovery, and expert testimony",
      details: "Emergency containment, transaction tracing, legal coordination"
    },
    {
      name: "Secure Development",
      starting: "$150/hour",
      description: "Expert Solidity development and security consulting",
      details: "Security-first architecture, gas optimization, testing support"
    },
    {
      name: "Protocol Design",
      starting: "$10,000",
      description: "Security-first architecture and tokenomics consulting",
      details: "Threat modeling, game theory analysis, access control design"
    },
    {
      name: "VLN University",
      starting: "$3,000/session",
      description: "Full-day or half-day security training workshops",
      details: "Hands-on training, CTF exercises, team certification"
    },
    {
      name: "Legal Report Format",
      starting: "$1,000",
      description: "Court-ready audit reports with expert testimony support",
      details: "Formatted for insurance claims, litigation, regulatory compliance"
    },
  ];

  const serviceBundles = [
    {
      name: "Launch Package",
      price: "$12,000",
      discount: "Save 20%",
      originalPrice: "$15,000",
      includes: [
        "Medium contract audit",
        "Penetration testing",
        "30-day post-launch support",
        "Investor-ready report"
      ]
    },
    {
      name: "Enterprise Security",
      price: "$35,000",
      discount: "Save 15%",
      originalPrice: "$41,000",
      includes: [
        "Large contract audit",
        "Full penetration testing",
        "6-month Growth retainer",
        "Team training session",
        "Expert testimony availability"
      ]
    },
    {
      name: "Audit + Retainer",
      price: "Audit price credited 100%",
      discount: "Best Value",
      originalPrice: "",
      includes: [
        "Any audit tier",
        "Full credit toward first month retainer",
        "Example: $3K audit = $3K off $5K Starter retainer",
        "Must upgrade within 30 days"
      ]
    }
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

          {/* Legal Terms & Guarantees */}
          <CSSFade delay={500}>
            <div className="max-w-6xl mx-auto mt-12">
              <h3 className="text-2xl font-bold text-center text-vln-white mb-8">
                Legal Terms & <span className="text-vln-sage">Service Guarantees</span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {legalTerms.map((section, index) => (
                  <div key={index} className="p-6 rounded-vln border border-vln-sage/20 bg-vln-bg">
                    <h4 className="text-lg font-bold text-vln-sage mb-4">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-vln-gray flex items-start gap-2">
                          <Check className="w-4 h-4 text-vln-sage flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </CSSFade>

          {/* What's NOT Included */}
          <CSSFade delay={600}>
            <div className="max-w-4xl mx-auto mt-12 p-6 sm:p-8 rounded-vln border-2 border-amber-500/20 bg-vln-bg-light">
              <h3 className="text-xl font-bold text-vln-white mb-4">What&apos;s NOT included in standard audits:</h3>
              <p className="text-sm text-vln-gray mb-4">These services are available as add-ons or separate engagements:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {notIncluded.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-amber-500">⚠</span>
                    <span className="text-vln-gray text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-vln-gray-dark mt-4 italic">
                *Contact us to add any of these services to your audit package
              </p>
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
                    <p className="text-vln-gray text-sm mt-1">{tier.hours}</p>
                    <div className="mt-3 pt-3 border-t border-vln-gray-dark/20">
                      <p className="text-xs text-vln-gray-dark">Response: <span className="text-vln-white">{tier.responseTime}</span></p>
                      <p className="text-xs text-vln-gray-dark mt-1">SLA: <span className="text-vln-white">{tier.sla}</span></p>
                    </div>
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

          {/* Retainer Comparison Table */}
          <CSSFade delay={400}>
            <div className="max-w-6xl mx-auto mt-16 overflow-x-auto">
              <h3 className="text-2xl font-bold text-center text-vln-white mb-8">
                Detailed <span className="text-vln-bluegray">Comparison</span>
              </h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-vln-bluegray/30">
                    <th className="text-left p-4 text-vln-gray-dark font-medium">Feature</th>
                    <th className="text-center p-4 text-vln-sage font-bold">Starter</th>
                    <th className="text-center p-4 text-vln-bluegray font-bold">Growth</th>
                    <th className="text-center p-4 text-vln-amber font-bold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-vln-gray-dark/20">
                    <td className="p-4 text-vln-gray">Monthly Hours</td>
                    <td className="p-4 text-center text-vln-white">20 hrs</td>
                    <td className="p-4 text-center text-vln-white">50 hrs</td>
                    <td className="p-4 text-center text-vln-white">Unlimited</td>
                  </tr>
                  <tr className="border-b border-vln-gray-dark/20 bg-vln-bg-light/30">
                    <td className="p-4 text-vln-gray">Response Time</td>
                    <td className="p-4 text-center text-vln-white">48 hours</td>
                    <td className="p-4 text-center text-vln-white">24 hours</td>
                    <td className="p-4 text-center text-vln-white">1 hour</td>
                  </tr>
                  <tr className="border-b border-vln-gray-dark/20">
                    <td className="p-4 text-vln-gray">SLA Guarantee</td>
                    <td className="p-4 text-center text-vln-white">95%</td>
                    <td className="p-4 text-center text-vln-white">99%</td>
                    <td className="p-4 text-center text-vln-white">99.9%</td>
                  </tr>
                  <tr className="border-b border-vln-gray-dark/20 bg-vln-bg-light/30">
                    <td className="p-4 text-vln-gray">Hour Rollover</td>
                    <td className="p-4 text-center text-vln-white">10 hrs max</td>
                    <td className="p-4 text-center text-vln-white">25 hrs max</td>
                    <td className="p-4 text-center text-vln-white">Unlimited</td>
                  </tr>
                  <tr className="border-b border-vln-gray-dark/20">
                    <td className="p-4 text-vln-gray">Dedicated Consultant</td>
                    <td className="p-4 text-center text-vln-gray-dark">—</td>
                    <td className="p-4 text-center text-vln-bluegray">✓</td>
                    <td className="p-4 text-center text-vln-amber">✓</td>
                  </tr>
                  <tr className="border-b border-vln-gray-dark/20 bg-vln-bg-light/30">
                    <td className="p-4 text-vln-gray">Audit Discount</td>
                    <td className="p-4 text-center text-vln-gray-dark">—</td>
                    <td className="p-4 text-center text-vln-bluegray">10%</td>
                    <td className="p-4 text-center text-vln-amber">20%</td>
                  </tr>
                  <tr className="border-b border-vln-gray-dark/20">
                    <td className="p-4 text-vln-gray">On-Demand Audits</td>
                    <td className="p-4 text-center text-vln-gray-dark">—</td>
                    <td className="p-4 text-center text-vln-gray-dark">—</td>
                    <td className="p-4 text-center text-vln-amber">3/year</td>
                  </tr>
                  <tr className="border-b border-vln-gray-dark/20 bg-vln-bg-light/30">
                    <td className="p-4 text-vln-gray">Emergency Response</td>
                    <td className="p-4 text-center text-vln-gray-dark">Business hrs</td>
                    <td className="p-4 text-center text-vln-bluegray">Priority</td>
                    <td className="p-4 text-center text-vln-amber">24/7</td>
                  </tr>
                  <tr className="border-b border-vln-gray-dark/20">
                    <td className="p-4 text-vln-gray">Legal/Insurance Support</td>
                    <td className="p-4 text-center text-vln-gray-dark">—</td>
                    <td className="p-4 text-center text-vln-gray-dark">—</td>
                    <td className="p-4 text-center text-vln-amber">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CSSFade>
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
                <p className="text-2xl font-bold text-vln-purple mb-3">
                  {service.starting}
                </p>
                <p className="text-vln-gray text-sm mb-3">{service.description}</p>
                <p className="text-vln-gray-dark text-xs mb-6 italic">{service.details}</p>
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

        {/* Service Bundles */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-vln-bg-light">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
              Bundle <span className="text-vln-amber">Packages</span>
            </h2>
            <p className="text-vln-gray text-center text-lg mb-12 sm:mb-16 max-w-3xl mx-auto">
              Save 15-20% with our curated service bundles
            </p>
          </CSSFade>

          <StaggerFade staggerDelay={150} className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {serviceBundles.map((bundle, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-vln border-2 border-vln-amber/20 hover:border-vln-amber/40 bg-vln-bg transition-all duration-300 glow-lift-amber hover:-translate-y-1"
              >
                <div className="mb-4">
                  <span className="px-3 py-1 rounded-full bg-vln-amber/20 text-vln-amber text-xs font-bold uppercase">
                    {bundle.discount}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-vln-amber mb-2">
                  {bundle.name}
                </h3>

                <div className="mb-6">
                  <p className="text-3xl font-bold text-vln-white">
                    {bundle.price}
                  </p>
                  {bundle.originalPrice && (
                    <p className="text-vln-gray-dark text-sm mt-1 line-through">
                      was {bundle.originalPrice}
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  {bundle.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-vln-amber flex-shrink-0 mt-0.5" />
                      <span className="text-vln-gray text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="secondary"
                  size="lg"
                  href={`/contact?service=bundle&tier=${bundle.name.toLowerCase().replace(' ', '-')}`}
                  className="w-full"
                >
                  Get Bundle
                </Button>
              </div>
            ))}
          </StaggerFade>

          <CSSFade delay={400}>
            <div className="max-w-4xl mx-auto mt-12 p-6 rounded-vln border border-vln-amber/20 bg-vln-bg">
              <p className="text-center text-vln-gray">
                <span className="font-bold text-vln-amber">Upgrade Path:</span> Start with any audit, then upgrade to a retainer within 30 days and receive 100% credit toward your first month. This makes starting a retainer risk-free!
              </p>
            </div>
          </CSSFade>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Pricing <span className="text-vln-sage">FAQ</span>
            </h2>
          </CSSFade>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                q: "Do you offer discounts for multiple audits?",
                a: "Yes! We offer volume discounts for clients who need multiple audits or ongoing work. Bundle packages save 15-20%. Contact us to discuss custom pricing."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept wire transfer, stablecoins (USDC/USDT on Ethereum/Polygon), and cryptocurrency (ETH/BTC). Payment terms are 50% upfront, 50% upon delivery."
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
                a: "Absolutely! We'll credit 100% of your audit cost toward the first month of a retainer if you upgrade within 30 days. This makes trying our services risk-free."
              },
              {
                q: "Do you sign NDAs and confidentiality agreements?",
                a: "Yes, we routinely sign mutual NDAs with a standard 5-year term. All client code and findings are kept strictly confidential unless you request public disclosure."
              },
              {
                q: "What's your liability coverage?",
                a: "We carry $5M in professional indemnity insurance. Our liability is capped at 1-3x the audit fee depending on the engagement. We can provide insurance certificates upon request."
              },
              {
                q: "What happens if you miss a vulnerability?",
                a: "While we maintain rigorous quality standards and a 100% post-audit success rate, if an issue we should have caught is exploited, we'll conduct a full review at no charge and assist with remediation. Our reputation is built on thoroughness."
              },
              {
                q: "Can I get a legal-format report for insurance or investors?",
                a: "Yes! For an additional $1,000, we can format your audit report for legal compliance, insurance claims, or investor due diligence. This includes enhanced documentation and expert testimony availability."
              },
              {
                q: "What's included in retainer support?",
                a: "Retainers include ongoing code review, security consulting, architecture feedback, Slack/Discord integration, and priority response times. See retainer tiers above for specific SLAs."
              },
              {
                q: "Can I get service credits if you miss an SLA?",
                a: "Yes, if we breach a guaranteed SLA (delivery timeline, response time, etc.), you'll receive service credits toward future work. Details are specified in the engagement contract."
              },
              {
                q: "Do you offer payment plans for larger audits?",
                a: "Yes, for audits over $15K or enterprise retainers, we can arrange custom payment schedules. Typically 25% upfront, 50% at midpoint, 25% on delivery. Contact us to discuss."
              },
              {
                q: "What's the difference between an audit and penetration testing?",
                a: "Audits focus on code review and static analysis. Penetration testing simulates real-world attacks on your deployed protocol, including infrastructure, APIs, and economic attack vectors. We recommend both for comprehensive security."
              },
              {
                q: "Can I see a sample audit report?",
                a: "Yes! We can provide anonymized sample reports during the sales process. Contact us to request examples relevant to your project type (DeFi, gaming, NFTs, etc.)."
              },
              {
                q: "Do you work with insurance companies?",
                a: "Yes, we've worked with several DeFi insurance providers and can format reports to meet their requirements. We can also coordinate directly with your insurance carrier for claims or underwriting."
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
