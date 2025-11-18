"use client";

import { motion } from "framer-motion";
import { Shield, Search, Lock, GraduationCap, Check } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PCBTraceBackground from "@/components/vln/pcb-trace-background";
import ScrollSection from "@/components/animations/scroll-section";
import AlternatingFade, { AlternatingFadeItem } from "@/components/animations/alternating-fade";
import ScrollProgress from "@/components/animations/scroll-progress";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import ClientCarousel from "@/components/vln/client-carousel";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Fixed Background - Optimized PCB Trace */}
      <PCBTraceBackground />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 pt-8 sm:pt-12 lg:pt-20">
        {/* Section 0: Hero - Even */}
        <ScrollSection index={0} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <AlternatingFade index={0}>
              <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
                  Our <span className="text-gradient-rainbow">Services</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-vln-gray max-w-2xl mx-auto">
                  Comprehensive security solutions for blockchain gaming and DeFi projects
                </p>
              </div>
            </AlternatingFade>
          </div>
        </ScrollSection>

        {/* Section 1: Smart Contract Audits - Odd */}
        <ScrollSection index={1} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <AlternatingFade index={1}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Shield className="w-8 h-8 text-vln-sage" />
                      <h2 className="text-3xl font-bold text-vln-sage">Smart Contract Audits</h2>
                    </div>
                    <p className="text-vln-gray leading-relaxed text-sm sm:text-base">
                      Comprehensive security audits for your smart contracts with detailed
                      vulnerability assessments, CVSS scoring, and actionable remediation guidance.
                    </p>
                    <ul className="space-y-2 text-vln-gray text-sm sm:text-base">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-sage mr-2 mt-0.5 flex-shrink-0" />
                        <span>Line-by-line code review</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-sage mr-2 mt-0.5 flex-shrink-0" />
                        <span>CVSS-based vulnerability scoring</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-sage mr-2 mt-0.5 flex-shrink-0" />
                        <span>Detailed remediation recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-sage mr-2 mt-0.5 flex-shrink-0" />
                        <span>Post-fix verification</span>
                      </li>
                    </ul>
                  </div>
                </AlternatingFade>

                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Card className="glow-lift">
                    <h3 className="text-xl font-bold mb-4 text-vln-white">Deliverables</h3>
                    <ul className="space-y-3 text-vln-gray text-sm sm:text-base">
                      <li className="flex items-start">
                        <span className="text-vln-sage mr-2">•</span>
                        <span>Comprehensive audit report</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-sage mr-2">•</span>
                        <span>Executive summary</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-sage mr-2">•</span>
                        <span>Vulnerability findings with severity ratings</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-sage mr-2">•</span>
                        <span>Remediation guidance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-sage mr-2">•</span>
                        <span>Post-audit consultation</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Section 2: Vulnerability Research - Even */}
        <ScrollSection index={2} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="order-2 md:order-1"
                >
                  <Card className="glow-lift-blue">
                    <h3 className="text-xl font-bold mb-4 text-vln-white">Research Methodology</h3>
                    <ul className="space-y-3 text-vln-gray text-sm sm:text-base">
                      <li className="flex items-start">
                        <span className="text-vln-bluegray mr-2">•</span>
                        <span>Automated vulnerability scanning</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-bluegray mr-2">•</span>
                        <span>Manual exploit discovery</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-bluegray mr-2">•</span>
                        <span>PoC development with Foundry</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-bluegray mr-2">•</span>
                        <span>Glider-based detection queries</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-bluegray mr-2">•</span>
                        <span>Responsible disclosure</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>

                <AlternatingFade index={2}>
                  <div className="space-y-4 order-1 md:order-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <Search className="w-8 h-8 text-vln-bluegray" />
                      <h2 className="text-3xl font-bold text-vln-bluegray">Vulnerability Research</h2>
                    </div>
                    <p className="text-vln-gray leading-relaxed text-sm sm:text-base">
                      Deep-dive security research to discover novel vulnerabilities before malicious
                      actors do. We develop proof-of-concept exploits and automated detection
                      mechanisms.
                    </p>
                    <ul className="space-y-2 text-vln-gray text-sm sm:text-base">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-bluegray mr-2 mt-0.5 flex-shrink-0" />
                        <span>Novel vulnerability discovery</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-bluegray mr-2 mt-0.5 flex-shrink-0" />
                        <span>Proof-of-concept exploits</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-bluegray mr-2 mt-0.5 flex-shrink-0" />
                        <span>Automated detection with Glider</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-bluegray mr-2 mt-0.5 flex-shrink-0" />
                        <span>Professional vulnerability reports</span>
                      </li>
                    </ul>
                  </div>
                </AlternatingFade>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Section 3: Penetration Testing - Odd */}
        <ScrollSection index={3} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <AlternatingFade index={3}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Lock className="w-8 h-8 text-vln-amber" />
                      <h2 className="text-3xl font-bold text-vln-amber">Penetration Testing</h2>
                    </div>
                    <p className="text-vln-gray leading-relaxed text-sm sm:text-base">
                      Simulated attacks on your smart contracts and infrastructure to identify
                      exploitable weaknesses before they can be exploited in production.
                    </p>
                    <ul className="space-y-2 text-vln-gray text-sm sm:text-base">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-amber mr-2 mt-0.5 flex-shrink-0" />
                        <span>Testnet exploitation attempts</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-amber mr-2 mt-0.5 flex-shrink-0" />
                        <span>Business logic testing</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-amber mr-2 mt-0.5 flex-shrink-0" />
                        <span>Access control verification</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-amber mr-2 mt-0.5 flex-shrink-0" />
                        <span>Economic exploit modeling</span>
                      </li>
                    </ul>
                  </div>
                </AlternatingFade>

                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Card className="glow-lift-amber">
                    <h3 className="text-xl font-bold mb-4 text-vln-white">Testing Scope</h3>
                    <ul className="space-y-3 text-vln-gray text-sm sm:text-base">
                      <li className="flex items-start">
                        <span className="text-vln-amber mr-2">•</span>
                        <span>Smart contract layer</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-amber mr-2">•</span>
                        <span>Access control mechanisms</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-amber mr-2">•</span>
                        <span>Economic incentive models</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-amber mr-2">•</span>
                        <span>Integration points</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-amber mr-2">•</span>
                        <span>Third-party dependencies</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Section 4: Technical Advisory - Even */}
        <ScrollSection index={4} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="order-2 md:order-1"
                >
                  <Card className="glow-lift-purple">
                    <h3 className="text-xl font-bold mb-4 text-vln-white">Advisory Services</h3>
                    <ul className="space-y-3 text-vln-gray text-sm sm:text-base">
                      <li className="flex items-start">
                        <span className="text-vln-purple mr-2">•</span>
                        <span>Security architecture review</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-purple mr-2">•</span>
                        <span>Best practices guidance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-purple mr-2">•</span>
                        <span>Development team training</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-purple mr-2">•</span>
                        <span>Incident response planning</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-purple mr-2">•</span>
                        <span>Ongoing security consultation</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>

                <AlternatingFade index={4}>
                  <div className="space-y-4 order-1 md:order-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <GraduationCap className="w-8 h-8 text-vln-purple" />
                      <h2 className="text-3xl font-bold text-vln-purple">Technical Advisory</h2>
                    </div>
                    <p className="text-vln-gray leading-relaxed text-sm sm:text-base">
                      Expert security guidance throughout your project lifecycle. From architecture
                      design to deployment and beyond, we provide the expertise you need to build
                      secure systems.
                    </p>
                    <ul className="space-y-2 text-vln-gray text-sm sm:text-base">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-purple mr-2 mt-0.5 flex-shrink-0" />
                        <span>Architecture security reviews</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-purple mr-2 mt-0.5 flex-shrink-0" />
                        <span>Development best practices</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-purple mr-2 mt-0.5 flex-shrink-0" />
                        <span>Team training and workshops</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-purple mr-2 mt-0.5 flex-shrink-0" />
                        <span>Retainer-based support</span>
                      </li>
                    </ul>
                  </div>
                </AlternatingFade>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Section 5: Client Carousel - Odd */}
        <ScrollSection index={5} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <ClientCarousel />
          </div>
        </ScrollSection>

        {/* Section 6: CTA - Even */}
        <ScrollSection index={6} variant="default">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <AlternatingFade index={6}>
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
                    View Pricing
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
