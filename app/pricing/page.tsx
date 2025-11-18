"use client";

import Link from "next/link";
import { Shield, Search, AlertTriangle, Clock, GraduationCap, Code, Check } from "lucide-react";
import { SiSolidity } from "react-icons/si";
import ScrollProgress from "@/components/animations/scroll-progress";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import ClientCarousel from "@/components/vln/client-carousel";

export default function PricingPage() {
  const services = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security Audits",
      description: "Comprehensive smart contract security audits with detailed vulnerability assessments",
      hourly: "$500-750/hr",
      daily: "$4,000/day",
      project: "$15K-50K",
      features: [
        "Line-by-line code review",
        "CVSS vulnerability scoring",
        "Detailed remediation guidance",
        "Post-fix verification",
        "Executive summary report",
      ],
      color: "sage",
    },
    {
      icon: <SiSolidity className="w-8 h-8" />,
      title: "Smart Contract Review",
      description: "In-depth analysis of smart contract logic, architecture, and security patterns",
      hourly: "$600-850/hr",
      daily: "$4,800/day",
      project: "$20K-75K",
      features: [
        "Architecture review",
        "Gas optimization analysis",
        "Business logic validation",
        "Integration testing",
        "Best practices audit",
      ],
      color: "bluegray",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Blockchain Forensics",
      description: "Advanced blockchain analysis and transaction tracing for security investigations",
      hourly: "$550-800/hr",
      daily: "$4,400/day",
      project: "Case-dependent",
      features: [
        "Transaction tracing",
        "Wallet flow analysis",
        "On-chain investigation",
        "Attack vector identification",
        "Detailed forensic reports",
      ],
      color: "purple",
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Incident Response",
      description: "Emergency security response for active exploits and security breaches",
      hourly: "$750-1,000/hr",
      daily: "$6,000/day",
      project: "$25K-100K",
      features: [
        "24/7 emergency response",
        "Real-time threat mitigation",
        "Exploit containment",
        "Post-incident analysis",
        "Recovery recommendations",
      ],
      color: "amber",
      featured: true,
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Expert Witness",
      description: "Professional testimony and expert analysis for legal proceedings",
      hourly: "$850-1,200/hr",
      daily: "N/A",
      project: "Case-dependent",
      features: [
        "Expert testimony",
        "Technical documentation",
        "Case analysis",
        "Deposition support",
        "Court appearances",
      ],
      color: "purple",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Training & Workshops",
      description: "Security training and workshops for development teams and organizations",
      hourly: "$400-600/hr",
      daily: "$3,200/day",
      project: "$10K-30K",
      features: [
        "Custom curriculum",
        "Hands-on workshops",
        "Security best practices",
        "Team training",
        "Certification programs",
      ],
      color: "bluegray",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Fullstack Web Development",
      description: "End-to-end web application development with security-first approach",
      hourly: "$200-500/hr",
      daily: "$4,000/day",
      project: "$15K-50K",
      features: [
        "Full-stack development",
        "Secure architecture",
        "Web3 integration",
        "Performance optimization",
        "Ongoing maintenance",
      ],
      color: "sage",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      sage: {
        bg: "bg-vln-sage/10",
        border: "border-vln-sage",
        text: "text-vln-sage",
        glow: "glow-lift",
      },
      bluegray: {
        bg: "bg-vln-bluegray/10",
        border: "border-vln-bluegray",
        text: "text-vln-bluegray",
        glow: "glow-lift-blue",
      },
      amber: {
        bg: "bg-vln-amber/10",
        border: "border-vln-amber",
        text: "text-vln-amber",
        glow: "glow-lift-amber",
      },
      purple: {
        bg: "bg-vln-purple/10",
        border: "border-vln-purple",
        text: "text-vln-purple",
        glow: "glow-lift-purple",
      },
    };
    return colors[color as keyof typeof colors] || colors.sage;
  };

  return (
    <div className="min-h-screen">
      <ScrollProgress />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-vln-sage/20 backdrop-blur-md bg-vln-bg/80">
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-vln-sage" />
              <span className="text-xl sm:text-2xl font-bold text-vln-sage">VLN</span>
              <span className="text-xs sm:text-sm text-vln-bluegray hidden sm:inline">
                by Fused Gaming
              </span>
            </Link>
            <div className="flex items-center space-x-4 sm:space-x-8">
              <Link
                href="/services"
                className="text-sm sm:text-base text-vln-white hover:text-vln-sage transition-colors"
              >
                Services
              </Link>
              <Link
                href="/pricing"
                className="text-sm sm:text-base text-vln-sage font-semibold"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-sm sm:text-base text-vln-white hover:text-vln-sage transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
              Professional <span className="text-gradient-rainbow">Security Services</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-vln-gray max-w-2xl mx-auto">
              Enterprise-grade blockchain security with transparent, competitive pricing
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, i) => {
              const colorClasses = getColorClasses(service.color);
              return (
                <Card
                  key={i}
                  className={`${colorClasses.glow} ${
                    service.featured ? "ring-2 ring-vln-amber" : ""
                  } relative`}
                >
                  {service.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-vln-amber text-vln-bg text-xs font-bold px-3 py-1 rounded-full">
                        PRIORITY
                      </span>
                    </div>
                  )}

                  <div className={`${colorClasses.text} mb-4`}>{service.icon}</div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-vln-white">
                    {service.title}
                  </h3>

                  <p className="text-sm text-vln-gray mb-4 min-h-[3rem]">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-4 pb-4 border-b border-vln-sage/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-vln-gray">Hourly:</span>
                      <span className={`font-semibold ${colorClasses.text}`}>
                        {service.hourly}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-vln-gray">Daily:</span>
                      <span className={`font-semibold ${colorClasses.text}`}>
                        {service.daily}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-vln-gray">Project:</span>
                      <span className={`font-semibold ${colorClasses.text}`}>
                        {service.project}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className={`w-4 h-4 ${colorClasses.text} mr-2 mt-0.5 flex-shrink-0`} />
                        <span className="text-vln-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={service.featured ? "primary" : "secondary"}
                    size="sm"
                    className="w-full"
                  >
                    Request Quote
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Retainer Plans */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 border-t border-vln-sage/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-16">
              Retainer <span className="text-vln-sage">Plans</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  name: "Essential",
                  price: "$10K/month",
                  description: "For ongoing security needs",
                  features: [
                    "20 hours monthly",
                    "Priority email support",
                    "Quarterly security review",
                    "Rollover up to 5 hours",
                  ],
                  color: "sage",
                },
                {
                  name: "Professional",
                  price: "$25K/month",
                  description: "Comprehensive security coverage",
                  features: [
                    "50 hours monthly",
                    "24/7 emergency support",
                    "Monthly security review",
                    "Rollover up to 15 hours",
                    "Incident response included",
                  ],
                  color: "bluegray",
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  description: "Tailored for large organizations",
                  features: [
                    "Unlimited hours",
                    "Dedicated security team",
                    "Continuous monitoring",
                    "Custom SLA",
                    "On-site visits included",
                  ],
                  color: "purple",
                },
              ].map((plan, i) => {
                const colorClasses = getColorClasses(plan.color);
                return (
                  <Card
                    key={i}
                    className={`${colorClasses.glow} ${
                      plan.popular ? "ring-2 ring-vln-bluegray scale-105" : ""
                    } relative`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-vln-bluegray text-vln-bg text-xs font-bold px-3 py-1 rounded-full">
                          POPULAR
                        </span>
                      </div>
                    )}

                    <h3 className="text-2xl font-bold mb-2 text-vln-white">{plan.name}</h3>
                    <div className={`text-3xl font-bold mb-2 ${colorClasses.text}`}>
                      {plan.price}
                    </div>
                    <p className="text-sm text-vln-gray mb-6">{plan.description}</p>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <Check className={`w-4 h-4 ${colorClasses.text} mr-2 mt-0.5 flex-shrink-0`} />
                          <span className="text-vln-gray">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button variant={plan.popular ? "primary" : "secondary"} className="w-full">
                      Get Started
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Who We Work With */}
        <section className="border-t border-vln-sage/20">
          <ClientCarousel />
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 border-t border-vln-sage/20">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Ready to Get <span className="text-vln-sage">Started</span>?
            </h2>
            <p className="text-lg sm:text-xl text-vln-gray">
              Contact us for a custom quote tailored to your specific needs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg">
                Request Consultation
              </Button>
              <Button variant="secondary" size="lg">
                Schedule Call
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-vln-sage/20 bg-vln-bg/90 backdrop-blur-md mt-12 sm:mt-24">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center text-sm text-vln-gray">
            <p className="mb-2">VLN - Smart Contract Vulnerability Research Lab</p>
            <p className="text-xs">© 2024 Fused Gaming. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
