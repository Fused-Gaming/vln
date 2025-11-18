"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, BarChart3, Zap } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PCBTraceBackground from "@/components/vln/pcb-trace-background";
import ScrollSection from "@/components/animations/scroll-section";
import AlternatingFade, { AlternatingFadeItem } from "@/components/animations/alternating-fade";
import ScrollProgress from "@/components/animations/scroll-progress";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import ClientCarousel from "@/components/vln/client-carousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Fixed Background - Optimized PCB Trace */}
      <PCBTraceBackground />

      {/* Header */}
      <Header />

      {/* Main Content with Alternating Sections */}
      <main className="relative z-10 pt-8 sm:pt-12 lg:pt-20">
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

        {/* Section 2: Who We Serve - Even (Left fade, active circuit) */}
        <ScrollSection index={2} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <AlternatingFade index={2}>
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

        {/* Section 3: Who We Work With - Odd (Right fade, dimmed circuit) */}
        <ScrollSection index={3} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <ClientCarousel />
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
      <Footer />
    </div>
  );
}
