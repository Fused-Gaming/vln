"use client";

import { useState } from 'react';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = [
    {
      name: "General",
      faqs: [
        {
          q: "What is VLN?",
          a: "VLN (Vulnerability Lab Network) is a smart contract security firm specializing in audits, penetration testing, and incident response for blockchain gaming and DeFi projects. We're a division of Fused Gaming with 12 years of experience in security research."
        },
        {
          q: "Why should I get my contract audited?",
          a: "Smart contract bugs have resulted in billions of dollars in losses. An audit finds vulnerabilities before hackers do, protects your users, builds trust with investors, and is often required for insurance, CEX listings, or institutional partnerships."
        },
        {
          q: "How long does an audit take?",
          a: "Timelines depend on contract complexity: Small contracts (< 500 lines) take 3-5 days, medium (500-2K lines) take 5-7 days, and large contracts (2K+ lines) take 7-14 days. Rush audits are available for an additional fee."
        },
        {
          q: "Do you sign NDAs?",
          a: "Yes, we routinely sign NDAs and can accommodate custom confidentiality requirements. All client code and findings are kept strictly confidential unless you request public disclosure."
        },
      ]
    },
    {
      name: "Audit Process",
      faqs: [
        {
          q: "What does your audit process look like?",
          a: "1) Kickoff call to understand your project. 2) Automated scanning for common vulnerabilities. 3) Manual line-by-line code review. 4) Threat modeling and attack scenario testing. 5) Report delivery with CVSS-scored findings. 6) Fix verification (free within 30 days)."
        },
        {
          q: "What vulnerabilities do you test for?",
          a: "We test for all common smart contract vulnerabilities including reentrancy, integer overflow/underflow, access control issues, front-running, flash loan attacks, oracle manipulation, gas optimization issues, and business logic flaws. Our methodology is based on OWASP and SWC registry standards."
        },
        {
          q: "Do you provide proof-of-concept exploits?",
          a: "Yes! For all high and critical findings, we provide working Foundry-based proof-of-concept code that demonstrates the exploit. This helps your team understand the issue and verify the fix."
        },
        {
          q: "What happens after you find vulnerabilities?",
          a: "Critical bugs are flagged within 48 hours. We provide a detailed report with CVSS risk scores, impact analysis, and remediation guidance. After you fix the issues, we'll re-audit those sections for free within 30 days to verify the fixes."
        },
        {
          q: "Can you audit contracts mid-development?",
          a: "Absolutely! In fact, we recommend iterative audits throughout development. This 'security-first' approach catches issues early when they're cheaper and easier to fix. We offer retainer packages specifically for this use case."
        },
      ]
    },
    {
      name: "Pricing & Payment",
      faqs: [
        {
          q: "How much does an audit cost?",
          a: "Audit pricing is based on contract complexity: $2K-4K for small contracts (< 500 lines), $5K-8K for medium (500-2K lines), and $10K+ for large contracts (2K+ lines). See our pricing page for retainer packages and other services."
        },
        {
          q: "Do you offer discounts?",
          a: "Yes! We offer volume discounts for multiple audits, discounts for open-source projects, and preferential pricing for retainer clients. We also provide free initial security scans (30 minutes) to all prospects."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept wire transfer, stablecoins (USDC/USDT on Ethereum/Polygon), and cryptocurrency (ETH/BTC). Payment terms are typically 50% upfront and 50% upon delivery, though we're flexible for established clients."
        },
        {
          q: "Is the 30-day fix verification really free?",
          a: "Yes, completely free. If we find 10 issues and you fix all 10, we'll re-audit those specific code sections at no charge within 30 days. This ensures your fixes are secure and don't introduce new vulnerabilities."
        },
      ]
    },
    {
      name: "Incident Response & Forensics",
      faqs: [
        {
          q: "What should I do if I've been hacked?",
          a: "Contact us immediately at info@vln.gg or via Telegram (@vlngg) for 24/7 emergency response. Time is critical. Our incident response team will help you contain the breach, analyze the attack, and potentially recover funds."
        },
        {
          q: "Can you help recover stolen funds?",
          a: "We've successfully assisted in recovering over $5.2M in stolen funds through forensic analysis, transaction tracing, and coordination with law enforcement and exchanges. Success depends on rapid response and attack specifics."
        },
        {
          q: "Do you provide expert testimony?",
          a: "Yes, our team has provided expert testimony in 3 legal cases involving smart contract exploits. We can provide court-ready reports, expert witness testimony, and technical analysis for litigation or insurance claims."
        },
        {
          q: "How much does incident response cost?",
          a: "Emergency response starts at $15,000 and varies based on complexity, urgency, and fund recovery success. We offer contingency arrangements where fees are a percentage of recovered funds. Contact us immediately if you're under attack."
        },
      ]
    },
    {
      name: "Training & Consulting",
      faqs: [
        {
          q: "What does VLN University offer?",
          a: "VLN University provides hands-on security training workshops for development teams. Full-day workshops cover common vulnerabilities, secure coding patterns, threat modeling, and include capture-the-flag exercises. Half-day sessions are also available."
        },
        {
          q: "Who should attend training?",
          a: "Our training is designed for Solidity developers, smart contract engineers, security engineers, and technical leads. No prior security expertise required—we tailor content to your team's experience level."
        },
        {
          q: "Do you offer ongoing consulting?",
          a: "Yes! Our retainer packages provide ongoing security consulting, code review, architecture design feedback, and incident response. Packages start at $5K/month with 20 hours of consulting time. See our pricing page for details."
        },
      ]
    },
    {
      name: "Results & Guarantees",
      faqs: [
        {
          q: "What's your track record?",
          a: "We've found 47 critical vulnerabilities across audited projects, assisted in recovering $5.2M in stolen funds, and maintained a 100% record—zero post-audit hacks for projects that implemented all our recommendations."
        },
        {
          q: "Do you guarantee my contract is safe?",
          a: "No audit can guarantee 100% security. We provide a comprehensive assessment based on industry best practices, but smart contracts are complex and new attack vectors emerge. Our 100% post-audit success rate speaks to our thoroughness."
        },
        {
          q: "What if you miss a vulnerability?",
          a: "While we maintain rigorous quality standards, if a vulnerability is exploited that we should have caught, we'll conduct a full review at no charge and work with you on remediation. Our reputation is built on thoroughness and integrity."
        },
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
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <CSSFade direction="up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Frequently Asked <span className="text-gradient-rainbow">Questions</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                Everything you need to know about VLN security services
              </p>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <p className="text-base sm:text-lg text-vln-gray max-w-2xl mx-auto">
                Don't see your question? <a href="/contact" className="text-vln-sage hover:underline">Contact us</a> for a free consultation.
              </p>
            </CSSFade>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="max-w-4xl mx-auto space-y-12">
            {categories.map((category, categoryIndex) => (
              <CSSFade key={categoryIndex} delay={categoryIndex * 100}>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-vln-sage mb-6 sm:mb-8">
                    {category.name}
                  </h2>

                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      const isOpen = openIndex === globalIndex;

                      return (
                        <div
                          key={faqIndex}
                          className="rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light overflow-hidden transition-all duration-300 hover:border-vln-sage/40"
                        >
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                            className="w-full p-6 flex items-center justify-between text-left transition-colors hover:bg-vln-sage/5"
                          >
                            <h3 className="text-lg font-bold text-vln-white pr-4">
                              {faq.q}
                            </h3>
                            <ChevronDown
                              className={cn(
                                "w-6 h-6 text-vln-sage flex-shrink-0 transition-transform duration-300",
                                isOpen && "rotate-180"
                              )}
                            />
                          </button>

                          <div
                            className={cn(
                              "overflow-hidden transition-all duration-300",
                              isOpen ? "max-h-96" : "max-h-0"
                            )}
                          >
                            <div className="px-6 pb-6 pt-2">
                              <p className="text-vln-gray leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CSSFade>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 bg-vln-bg-light">
          <CSSFade>
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 p-8 sm:p-12 rounded-vln border-2 border-vln-sage/20 bg-vln-bg glow-lift">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Still have questions?
              </h2>
              <p className="text-xl text-vln-gray max-w-2xl mx-auto">
                Schedule a free 30-minute consultation to discuss your project and security needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="primary" size="xl" href="/contact" className="group">
                  Get Free Consultation
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <Button variant="secondary" size="xl" href="/services">
                  View Our Services
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

function Button({ variant, size, href, className, children }: any) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-vln";

  const variantClasses = {
    primary: "bg-vln-sage text-vln-bg hover:bg-vln-sage/90 glow-lift",
    secondary: "border-2 border-vln-sage/40 text-vln-sage hover:bg-vln-sage/10 glow-lift"
  };

  const sizeClasses = {
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  return (
    <a
      href={href}
      className={cn(
        baseClasses,
        variantClasses[variant as keyof typeof variantClasses],
        sizeClasses[size as keyof typeof sizeClasses],
        className
      )}
    >
      {children}
    </a>
  );
}
