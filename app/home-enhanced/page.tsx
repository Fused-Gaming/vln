"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, BarChart3, Zap, Shield } from "lucide-react";
import PCBTraceBackground from "@/components/vln/pcb-trace-background";
import ScrollSection from "@/components/animations/scroll-section";
import AlternatingFade, { AlternatingFadeItem } from "@/components/animations/alternating-fade";
import ScrollProgress from "@/components/animations/scroll-progress";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function HomeEnhanced() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Fixed Background - Optimized PCB Trace */}
      <PCBTraceBackground />

      {/* Header - Responsive */}
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
                className="text-sm sm:text-base text-vln-white hover:text-vln-sage transition-colors"
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

      {/* Main Content with Alternating Sections */}
      <main className="relative z-10 pt-20">
        {/* Section 0: Hero - Even (Left fade, active circuit) */}
        <ScrollSection index={0} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
            <AlternatingFade index={0}>
              <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
                <motion.h1
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  Smart Contract
                  <br />
                  <span className="text-gradient-rainbow">Vulnerability Research</span>
                </motion.h1>
                <motion.p
                  className="text-base sm:text-xl md:text-2xl text-vln-gray max-w-2xl mx-auto px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  Advanced security audits and vulnerability research for blockchain gaming projects
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 sm:pt-8 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <Button variant="primary" size="lg">
                    Our Services
                  </Button>
                  <Button variant="secondary" size="lg">
                    Get in Touch
                  </Button>
                </motion.div>
              </div>
            </AlternatingFade>
          </div>
        </ScrollSection>

        {/* Section 1: What We Deliver - Odd (Right fade, dimmed circuit) */}
        <ScrollSection index={1} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <AlternatingFade index={1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">
                What We <span className="text-vln-sage">Deliver</span>
              </h2>
            </AlternatingFade>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {[
                {
                  title: "Vulnerability Discovery",
                  desc: "Deep analysis of smart contracts to identify security vulnerabilities and potential exploits",
                  icon: Search,
                  color: "text-vln-sage",
                },
                {
                  title: "Professional Scoring",
                  desc: "CVSS-based vulnerability assessments with detailed risk analysis and remediation guidance",
                  icon: BarChart3,
                  color: "text-vln-bluegray",
                },
                {
                  title: "PoC Development",
                  desc: "Foundry-based proof-of-concept exploits and automated detection using Glider queries",
                  icon: Zap,
                  color: "text-vln-amber",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <AlternatingFadeItem key={i}>
                    <Card className="h-full glow-lift">
                      <Icon className={`w-12 h-12 mb-4 ${item.color}`} />
                      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-vln-white">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-vln-gray">{item.desc}</p>
                    </Card>
                  </AlternatingFadeItem>
                );
              })}
            </motion.div>
          </div>
        </ScrollSection>

        {/* Section 2: Statistics - Even (Left fade, active circuit) */}
        <ScrollSection index={2} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <AlternatingFade index={2}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">
                Proven <span className="text-vln-sage">Expertise</span>
              </h2>
            </AlternatingFade>

            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {[
                { value: "50+", label: "Audits Completed" },
                { value: "200+", label: "Vulnerabilities Found" },
                { value: "8.5", label: "Avg CVSS Score" },
                { value: "100%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <AlternatingFadeItem key={i}>
                  <motion.div
                    className="text-center p-4 sm:p-6 lg:p-8 border border-vln-sage/20 rounded-vln glow-lift"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-vln-sage mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-vln-gray">{stat.label}</div>
                  </motion.div>
                </AlternatingFadeItem>
              ))}
            </motion.div>
          </div>
        </ScrollSection>

        {/* Section 3: Who We Serve - Odd (Right fade, dimmed circuit) */}
        <ScrollSection index={3} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <AlternatingFade index={3}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">
                Who We <span className="text-vln-sage">Serve</span>
              </h2>
            </AlternatingFade>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {[
                "Blockchain Gaming Projects",
                "DeFi Protocols",
                "NFT Platforms",
                "Smart Contract Developers",
                "Security Researchers",
                "Blockchain Auditing Firms",
              ].map((audience, i) => (
                <AlternatingFadeItem key={i}>
                  <motion.div
                    className="p-4 sm:p-6 border border-vln-sage/20 rounded-vln text-center glow-lift-blue"
                    whileHover={{ scale: 1.03 }}
                  >
                    <p className="text-sm sm:text-base text-vln-white font-medium">{audience}</p>
                  </motion.div>
                </AlternatingFadeItem>
              ))}
            </motion.div>
          </div>
        </ScrollSection>

        {/* Section 4: CTA - Even (Left fade, active circuit) */}
        <ScrollSection index={4} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <AlternatingFade index={4}>
              <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  Ready to <span className="text-vln-sage">Secure</span> Your Project?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-vln-gray px-4">
                  Get in touch to discuss your security needs and receive a custom proposal
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 px-4">
                  <Button variant="primary" size="lg">
                    Contact Us
                  </Button>
                  <Button variant="secondary" size="lg">
                    View Services
                  </Button>
                </div>
              </div>
            </AlternatingFade>
          </div>
        </ScrollSection>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-vln-sage/20 bg-vln-bg/90 backdrop-blur-md mt-12 sm:mt-24">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-vln-sage mb-3 sm:mb-4">VLN</h3>
              <p className="text-vln-gray text-xs sm:text-sm">
                Smart Contract Vulnerability Research Lab
                <br />
                <span className="text-xs">A Fused Gaming Initiative</span>
              </p>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-vln-white mb-3 sm:mb-4">Contact</h4>
              <div className="space-y-2 text-xs sm:text-sm text-vln-gray">
                <p>
                  <a href="https://vln.gg" className="hover:text-vln-sage transition-colors">
                    vln.gg
                  </a>
                </p>
                <p>
                  <a href="mailto:info@vln.gg" className="hover:text-vln-sage transition-colors">
                    info@vln.gg
                  </a>
                </p>
                <p>
                  <a
                    href="https://t.me/vlngg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-vln-sage transition-colors"
                  >
                    @vlngg
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-vln-white mb-3 sm:mb-4">Resources</h4>
              <div className="space-y-2 text-xs sm:text-sm text-vln-gray">
                <p>
                  <Link href="/services" className="hover:text-vln-sage transition-colors">
                    Services
                  </Link>
                </p>
                <p>
                  <Link href="/pricing" className="hover:text-vln-sage transition-colors">
                    Pricing
                  </Link>
                </p>
                <p>
                  <Link href="/contact" className="hover:text-vln-sage transition-colors">
                    Contact
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-vln-sage/20 text-center text-xs sm:text-sm text-vln-gray">
            <p className="mb-2">Securing the future of blockchain gaming</p>
            <p className="text-xs">© 2024 VLN - Fused Gaming. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
