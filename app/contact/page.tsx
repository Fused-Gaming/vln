"use client";

import { Mail, Send, Globe, Github, Check } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PCBTraceBackground from "@/components/vln/pcb-trace-background";
import CSSFade from "@/components/animations/css-fade";
import Card from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      {/* Fixed Background - Optimized PCB Trace */}
      <PCBTraceBackground />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 pt-8 sm:pt-12 lg:pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade direction="up">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
                Get in <span className="text-gradient-rainbow">Touch</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-vln-gray max-w-2xl mx-auto">
                Ready to secure your blockchain project? Let&apos;s discuss your security needs.
              </p>
            </div>
          </CSSFade>
        </section>

        {/* Contact Options Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:pt-24">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Direct Contact */}
              <CSSFade delay={200} direction="left">
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-vln-sage">
                    Direct Contact
                  </h2>
                  <div className="space-y-4">
                    <Card className="glow-lift">
                      <div className="flex items-center space-x-3 mb-3">
                        <Mail className="w-6 h-6 text-vln-sage" />
                        <h3 className="font-semibold text-vln-white text-lg">Email</h3>
                      </div>
                      <a
                        href="mailto:info@vln.gg"
                        className="text-vln-sage hover:text-vln-bluegray transition-colors text-base sm:text-lg block mb-2"
                      >
                        info@vln.gg
                      </a>
                      <p className="text-sm text-vln-gray">
                        For general inquiries and audit requests
                      </p>
                    </Card>

                    <Card className="glow-lift-blue">
                      <div className="flex items-center space-x-3 mb-3">
                        <Send className="w-6 h-6 text-vln-bluegray" />
                        <h3 className="font-semibold text-vln-white text-lg">Telegram</h3>
                      </div>
                      <a
                        href="https://t.me/vlngg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-vln-bluegray hover:text-vln-sage transition-colors text-base sm:text-lg block mb-2"
                      >
                        @vlngg
                      </a>
                      <p className="text-sm text-vln-gray">Quick response for urgent matters</p>
                    </Card>

                    <Card className="glow-lift-purple">
                      <div className="flex items-center space-x-3 mb-3">
                        <Globe className="w-6 h-6 text-vln-purple" />
                        <h3 className="font-semibold text-vln-white text-lg">Website</h3>
                      </div>
                      <a
                        href="https://vln.gg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-vln-purple hover:text-vln-sage transition-colors text-base sm:text-lg block mb-2"
                      >
                        vln.gg
                      </a>
                      <p className="text-sm text-vln-gray">Visit our main website</p>
                    </Card>

                    <Card className="glow-lift-amber">
                      <div className="flex items-center space-x-3 mb-3">
                        <Github className="w-6 h-6 text-vln-amber" />
                        <h3 className="font-semibold text-vln-white text-lg">GitHub</h3>
                      </div>
                      <a
                        href="https://github.com/Fused-Gaming/vln"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-vln-amber hover:text-vln-sage transition-colors text-base sm:text-lg block mb-2"
                      >
                        github.com/Fused-Gaming/vln
                      </a>
                      <p className="text-sm text-vln-gray">View our research and contribute</p>
                    </Card>
                  </div>
                </div>
              </CSSFade>

              {/* What to Include */}
              <CSSFade delay={400} direction="right">
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-vln-sage">
                    What to Include
                  </h2>
                  <Card className="glow-lift">
                    <p className="text-vln-gray mb-4 text-sm sm:text-base">
                      When reaching out for a security audit or consultation, please include:
                    </p>
                    <ul className="space-y-3 text-vln-gray text-sm sm:text-base">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-sage mr-2 mt-1 flex-shrink-0" />
                        <span>
                          <strong className="text-vln-white">Project overview</strong>
                          <br />
                          Brief description of your project and its goals
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-sage mr-2 mt-1 flex-shrink-0" />
                        <span>
                          <strong className="text-vln-white">Contract details</strong>
                          <br />
                          Number of contracts, lines of code, complexity
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-sage mr-2 mt-1 flex-shrink-0" />
                        <span>
                          <strong className="text-vln-white">Service needed</strong>
                          <br />
                          Audit, penetration testing, advisory, or research
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-sage mr-2 mt-1 flex-shrink-0" />
                        <span>
                          <strong className="text-vln-white">Timeline</strong>
                          <br />
                          Desired start date and any deadlines
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-vln-sage mr-2 mt-1 flex-shrink-0" />
                        <span>
                          <strong className="text-vln-white">Budget</strong>
                          <br />
                          Estimated budget or request for quote
                        </span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="bg-vln-sage/5 border-vln-sage/30">
                    <h3 className="font-semibold text-vln-white mb-3 text-base sm:text-lg">
                      Response Time
                    </h3>
                    <p className="text-vln-gray text-sm">
                      We typically respond to inquiries within 24-48 hours. For urgent security
                      matters, please reach out via Telegram for faster response.
                    </p>
                  </Card>
                </div>
              </CSSFade>
            </div>
          </div>
        </section>

        {/* Responsible Disclosure Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <CSSFade delay={600} direction="up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-vln-sage text-center">
                Responsible Disclosure
              </h2>
              <Card className="glow-lift">
                <p className="text-vln-gray mb-6 text-sm sm:text-base">
                  If you&apos;ve discovered a vulnerability in a project we&apos;ve audited or in
                  the wild, we encourage responsible disclosure:
                </p>
                <ul className="space-y-3 text-vln-gray text-sm sm:text-base mb-6">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-vln-sage mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-vln-white">Report privately first</strong> - Contact
                      us via email before public disclosure
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-vln-sage mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-vln-white">Provide details</strong> - Include PoC,
                      affected code, and potential impact
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-vln-sage mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-vln-white">Allow remediation time</strong> - Give
                      projects reasonable time to fix issues
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-vln-sage mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-vln-white">No exploitation</strong> - Never exploit
                      vulnerabilities on mainnet
                    </span>
                  </li>
                </ul>
                <div className="pt-4 border-t border-vln-sage/20">
                  <p className="text-sm text-vln-gray">
                    For vulnerability disclosures, email:{" "}
                    <a
                      href="mailto:info@vln.gg"
                      className="text-vln-sage hover:text-vln-bluegray transition-colors"
                    >
                      info@vln.gg
                    </a>
                  </p>
                </div>
              </Card>
            </CSSFade>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
