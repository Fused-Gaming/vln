"use client";

import Link from "next/link";
import ClientCarousel from "@/components/vln/client-carousel";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-vln-sage/20 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-vln-sage">VLN</span>
            <span className="text-sm text-vln-bluegray">by Fused Gaming</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-vln-sage font-semibold">
              Services
            </Link>
            <Link href="/contact" className="text-vln-white hover:text-vln-sage transition-colors">
              Contact
            </Link>
            <a
              href="https://github.com/Fused-Gaming/vln"
              target="_blank"
              rel="noopener noreferrer"
              className="text-vln-white hover:text-vln-sage transition-colors"
            >
              GitHub
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Our <span className="text-vln-sage">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-vln-bluegray max-w-2xl mx-auto">
              Comprehensive security solutions for blockchain gaming and DeFi projects
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-6 py-16 border-t border-vln-sage/20">
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Smart Contract Audits */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-vln-sage">Smart Contract Audits</h2>
                <p className="text-vln-bluegray leading-relaxed">
                  Comprehensive security audits for your smart contracts with detailed vulnerability
                  assessments, CVSS scoring, and actionable remediation guidance.
                </p>
                <ul className="space-y-2 text-vln-bluegray">
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Line-by-line code review</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>CVSS-based vulnerability scoring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Detailed remediation recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Post-fix verification</span>
                  </li>
                </ul>
              </div>
              <div className="p-8 border border-vln-sage/20 rounded-vln glow-lift card-lift">
                <h3 className="text-xl font-bold mb-4 text-vln-white">Deliverables</h3>
                <ul className="space-y-3 text-vln-bluegray">
                  <li>• Comprehensive audit report</li>
                  <li>• Executive summary</li>
                  <li>• Vulnerability findings with severity ratings</li>
                  <li>• Remediation guidance</li>
                  <li>• Post-audit consultation</li>
                </ul>
              </div>
            </div>

            {/* Vulnerability Research */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 order-2 md:order-1">
                <div className="p-8 border border-vln-sage/20 rounded-vln glow-lift card-lift">
                  <h3 className="text-xl font-bold mb-4 text-vln-white">Research Methodology</h3>
                  <ul className="space-y-3 text-vln-bluegray">
                    <li>• Automated vulnerability scanning</li>
                    <li>• Manual exploit discovery</li>
                    <li>• PoC development with Foundry</li>
                    <li>• Glider-based detection queries</li>
                    <li>• Responsible disclosure</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4 order-1 md:order-2">
                <h2 className="text-3xl font-bold text-vln-sage">Vulnerability Research</h2>
                <p className="text-vln-bluegray leading-relaxed">
                  Deep-dive security research to discover novel vulnerabilities before malicious actors do.
                  We develop proof-of-concept exploits and automated detection mechanisms.
                </p>
                <ul className="space-y-2 text-vln-bluegray">
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Novel vulnerability discovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Proof-of-concept exploits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Automated detection with Glider</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Professional vulnerability reports</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Penetration Testing */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-vln-sage">Penetration Testing</h2>
                <p className="text-vln-bluegray leading-relaxed">
                  Simulated attacks on your smart contracts and infrastructure to identify
                  exploitable weaknesses before they can be exploited in production.
                </p>
                <ul className="space-y-2 text-vln-bluegray">
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Testnet exploitation attempts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Business logic testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Access control verification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Economic exploit modeling</span>
                  </li>
                </ul>
              </div>
              <div className="p-8 border border-vln-sage/20 rounded-vln glow-lift card-lift">
                <h3 className="text-xl font-bold mb-4 text-vln-white">Testing Scope</h3>
                <ul className="space-y-3 text-vln-bluegray">
                  <li>• Smart contract layer</li>
                  <li>• Access control mechanisms</li>
                  <li>• Economic incentive models</li>
                  <li>• Integration points</li>
                  <li>• Third-party dependencies</li>
                </ul>
              </div>
            </div>

            {/* Technical Advisory */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 order-2 md:order-1">
                <div className="p-8 border border-vln-sage/20 rounded-vln glow-lift card-lift">
                  <h3 className="text-xl font-bold mb-4 text-vln-white">Advisory Services</h3>
                  <ul className="space-y-3 text-vln-bluegray">
                    <li>• Security architecture review</li>
                    <li>• Best practices guidance</li>
                    <li>• Development team training</li>
                    <li>• Incident response planning</li>
                    <li>• Ongoing security consultation</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4 order-1 md:order-2">
                <h2 className="text-3xl font-bold text-vln-sage">Technical Advisory</h2>
                <p className="text-vln-bluegray leading-relaxed">
                  Expert security guidance throughout your project lifecycle. From architecture design
                  to deployment and beyond, we provide the expertise you need to build secure systems.
                </p>
                <ul className="space-y-2 text-vln-bluegray">
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Architecture security reviews</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Development best practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Team training and workshops</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vln-sage mr-2">✓</span>
                    <span>Retainer-based support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Work With */}
        <section className="border-t border-vln-sage/20">
          <ClientCarousel />
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-24 border-t border-vln-sage/20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to <span className="text-vln-sage">Secure</span> Your Project?
            </h2>
            <p className="text-xl text-vln-bluegray">
              Get in touch to discuss your security needs and receive a custom proposal
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-vln-sage text-vln-bg rounded-vln font-semibold glow-lift card-lift"
              >
                Contact Us
              </Link>
              <a
                href="https://t.me/vlngg"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-vln-sage text-vln-sage rounded-vln font-semibold glow-lift card-lift"
              >
                Telegram
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-vln-sage/20 mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-vln-sage mb-4">VLN</h3>
              <p className="text-vln-bluegray text-sm">
                Smart Contract Vulnerability Research Lab
                <br />
                <span className="text-xs">A Fused Gaming Initiative</span>
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-vln-white mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-vln-bluegray">
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
              <h4 className="font-semibold text-vln-white mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-vln-bluegray">
                <p>
                  <a
                    href="https://github.com/Fused-Gaming/vln"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-vln-sage transition-colors"
                  >
                    GitHub
                  </a>
                </p>
                <p>
                  <Link href="/services" className="hover:text-vln-sage transition-colors">
                    Services
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
          <div className="pt-8 border-t border-vln-sage/20 text-center text-sm text-vln-bluegray">
            <p>
              Securing the future of blockchain gaming
              <br />
              <span className="text-xs">© 2024 VLN - Fused Gaming. All rights reserved.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
