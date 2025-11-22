"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import StatsGrid from "@/components/vln/stats-grid";
import ServicePillars from "@/components/vln/service-pillars";
import TestimonialsSection from "@/components/vln/testimonials-section";
import FAQSection from "@/components/vln/faq-section";
import ComparisonTable from "@/components/vln/comparison-table";
import GuaranteeSection from "@/components/vln/guarantee-section";
import UrgencyBanner from "@/components/vln/urgency-banner";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";
import { Check, Search, DollarSign, ShieldCheck, Siren } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      {/* Fixed Background - Futuristic IC Board */}
      <ICBoardBackground />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
            <CSSFade direction="up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Your Contract Has{" "}
                <span className="text-gradient-rainbow">Bugs</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl md:text-3xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                Let us find them before hackers do
              </p>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <p className="text-base sm:text-lg text-vln-gray max-w-2xl mx-auto">
                Professional smart contract audits, forensic investigation, and security training for blockchain gaming and DeFi projects
              </p>
            </CSSFade>

            <CSSFade delay={600} direction="up">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="primary" size="xl" href="/contact?service=prevention" className="group">
                  Start Free 30-Min Scan
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <Button variant="secondary" size="xl" href="/contact?service=forensics" className="group border-vln-amber text-vln-amber hover:bg-vln-amber/10 glow-lift-amber">
                  <Siren className="w-5 h-5" />
                  24/7 Emergency Forensics
                </Button>
              </div>
            </CSSFade>

            {/* Trust Badges */}
            <CSSFade delay={800} direction="up">
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 pt-8 max-w-3xl mx-auto">
                {[
                  { Icon: Search, text: '47 Critical Vulns Found', color: 'text-vln-sage' },
                  { Icon: DollarSign, text: '$5.2M Funds Recovered', color: 'text-vln-bluegray' },
                  { Icon: ShieldCheck, text: '0 Post-Audit Hacks', color: 'text-vln-purple' },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-2 p-3 rounded-vln bg-vln-bg-light/80 border border-vln-sage/20"
                  >
                    <badge.Icon className={`w-5 h-5 ${badge.color}`} />
                    <span className="text-sm font-medium text-vln-white">{badge.text}</span>
                  </div>
                ))}
              </div>
            </CSSFade>
          </div>
        </section>

        {/* Stats Grid */}
        <StatsGrid />

        {/* Service Pillars */}
        <ServicePillars />

        {/* Urgency Banner */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <UrgencyBanner />
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Pricing Section */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <CSSFade>
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  Transparent <span className="text-vln-sage">Pricing</span>
                </h2>
                <p className="text-vln-gray text-lg max-w-2xl mx-auto">
                  No hidden fees. Clear pricing based on project size.
                </p>
              </div>
            </CSSFade>

            <div className="max-w-4xl mx-auto">
              <CSSFade delay={200}>
                <div className="p-6 sm:p-8 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift">
                  <h3 className="text-2xl font-bold text-vln-white mb-6">
                    Prevention Audits
                  </h3>

                  <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    {[
                      { size: 'Small', lines: '< 500 lines', price: '$2K-4K' },
                      { size: 'Medium', lines: '500-2K lines', price: '$5K-8K' },
                      { size: 'Large', lines: '2K+ lines', price: '$10K+' },
                    ].map((tier, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-vln bg-vln-bg border border-vln-sage/10 text-center"
                      >
                        <p className="text-vln-sage font-bold mb-1">{tier.size}</p>
                        <p className="text-vln-gray-dark text-sm mb-2">{tier.lines}</p>
                        <p className="text-vln-white text-xl font-bold">{tier.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-8">
                    <p className="text-vln-white font-medium mb-4">All audits include:</p>
                    {[
                      'Comprehensive vulnerability analysis',
                      'CVSS scoring & risk assessment',
                      'Foundry PoC exploits for critical findings',
                      '30-day fix verification (free)',
                      'Critical bugs flagged within 48 hours',
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-vln-sage flex-shrink-0 mt-0.5" />
                        <span className="text-vln-gray">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="primary" size="lg" href="/contact?service=prevention" className="w-full group">
                    Start Free 30-Min Scan
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Button>
                </div>
              </CSSFade>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection />

        {/* Guarantee */}
        <GuaranteeSection />

        {/* Final CTA */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <CSSFade>
              <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                  Don&apos;t Launch with{" "}
                  <span className="text-gradient-rainbow">Vulnerabilities</span>
                </h2>
                <p className="text-xl sm:text-2xl text-vln-gray max-w-2xl mx-auto">
                  Your contract has bugs. Let us find them before hackers do.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button variant="primary" size="xl" href="/contact" className="group">
                    Start Free 30-Min Scan
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Button>
                  <Button variant="secondary" size="xl" href="/services">
                    View All Services
                  </Button>
                </div>

                <div className="pt-8">
                  <p className="text-vln-gray-dark text-sm mb-4">
                    Trusted by blockchain gaming projects, DeFi protocols, and smart contract developers
                  </p>
                  <div className="flex items-center justify-center gap-4 text-vln-gray-dark text-xs">
                    <span>✓ 12 Years Experience</span>
                    <span>•</span>
                    <span>✓ Government Cleared</span>
                    <span>•</span>
                    <span>✓ Expert Testimony</span>
                  </div>
                </div>
              </div>
            </CSSFade>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
