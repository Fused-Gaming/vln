import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - VLN Smart Contract Security",
  description: "Get in touch with VLN for smart contract security audits, vulnerability research, and blockchain security consulting.",
};

export default function ContactPage() {
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
            <Link href="/services" className="text-vln-white hover:text-vln-sage transition-colors">
              Services
            </Link>
            <Link href="/contact" className="text-vln-sage font-semibold">
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
              Get in <span className="text-vln-sage">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-vln-bluegray max-w-2xl mx-auto">
              Ready to secure your blockchain project? Let&apos;s discuss your security needs.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="container mx-auto px-6 py-16 border-t border-vln-sage/20">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Direct Contact */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-vln-sage">Direct Contact</h2>
                  <div className="space-y-6">
                    <div className="p-6 border border-vln-sage/20 rounded-vln glow-lift">
                      <h3 className="font-semibold text-vln-white mb-2">Email</h3>
                      <a
                        href="mailto:info@vln.gg"
                        className="text-vln-sage hover:text-vln-bluegray transition-colors text-lg"
                      >
                        info@vln.gg
                      </a>
                      <p className="text-sm text-vln-bluegray mt-2">
                        For general inquiries and audit requests
                      </p>
                    </div>

                    <div className="p-6 border border-vln-sage/20 rounded-vln glow-lift">
                      <h3 className="font-semibold text-vln-white mb-2">Telegram</h3>
                      <a
                        href="https://t.me/vlngg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-vln-sage hover:text-vln-bluegray transition-colors text-lg"
                      >
                        @vlngg
                      </a>
                      <p className="text-sm text-vln-bluegray mt-2">
                        Quick response for urgent matters
                      </p>
                    </div>

                    <div className="p-6 border border-vln-sage/20 rounded-vln glow-lift">
                      <h3 className="font-semibold text-vln-white mb-2">Website</h3>
                      <a
                        href="https://vln.gg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-vln-sage hover:text-vln-bluegray transition-colors text-lg"
                      >
                        vln.gg
                      </a>
                      <p className="text-sm text-vln-bluegray mt-2">
                        Visit our main website
                      </p>
                    </div>

                    <div className="p-6 border border-vln-sage/20 rounded-vln glow-lift">
                      <h3 className="font-semibold text-vln-white mb-2">GitHub</h3>
                      <a
                        href="https://github.com/Fused-Gaming/vln"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-vln-sage hover:text-vln-bluegray transition-colors text-lg"
                      >
                        github.com/Fused-Gaming/vln
                      </a>
                      <p className="text-sm text-vln-bluegray mt-2">
                        View our research and contribute
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Include */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-vln-sage">What to Include</h2>
                  <div className="p-6 border border-vln-sage/20 rounded-vln space-y-4">
                    <p className="text-vln-bluegray">
                      When reaching out for a security audit or consultation, please include:
                    </p>
                    <ul className="space-y-3 text-vln-bluegray">
                      <li className="flex items-start">
                        <span className="text-vln-sage mr-2 mt-1">✓</span>
                        <span>
                          <strong className="text-vln-white">Project overview</strong>
                          <br />
                          Brief description of your project and its goals
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-sage mr-2 mt-1">✓</span>
                        <span>
                          <strong className="text-vln-white">Contract details</strong>
                          <br />
                          Number of contracts, lines of code, complexity
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-sage mr-2 mt-1">✓</span>
                        <span>
                          <strong className="text-vln-white">Service needed</strong>
                          <br />
                          Audit, penetration testing, advisory, or research
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-sage mr-2 mt-1">✓</span>
                        <span>
                          <strong className="text-vln-white">Timeline</strong>
                          <br />
                          Desired start date and any deadlines
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-vln-sage mr-2 mt-1">✓</span>
                        <span>
                          <strong className="text-vln-white">Budget</strong>
                          <br />
                          Estimated budget or request for quote
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 border border-vln-sage/20 rounded-vln bg-vln-sage/5">
                  <h3 className="font-semibold text-vln-white mb-3">Response Time</h3>
                  <p className="text-vln-bluegray text-sm">
                    We typically respond to inquiries within 24-48 hours. For urgent security
                    matters, please reach out via Telegram for faster response.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsible Disclosure */}
        <section className="container mx-auto px-6 py-16 border-t border-vln-sage/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-vln-sage text-center">
              Responsible Disclosure
            </h2>
            <div className="p-8 border border-vln-sage/20 rounded-vln space-y-4">
              <p className="text-vln-bluegray">
                If you&apos;ve discovered a vulnerability in a project we&apos;ve audited or in the wild,
                we encourage responsible disclosure:
              </p>
              <ul className="space-y-2 text-vln-bluegray">
                <li className="flex items-start">
                  <span className="text-vln-sage mr-2">✓</span>
                  <span>
                    <strong className="text-vln-white">Report privately first</strong> - Contact
                    us via email before public disclosure
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-vln-sage mr-2">✓</span>
                  <span>
                    <strong className="text-vln-white">Provide details</strong> - Include PoC,
                    affected code, and potential impact
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-vln-sage mr-2">✓</span>
                  <span>
                    <strong className="text-vln-white">Allow remediation time</strong> - Give
                    projects reasonable time to fix issues
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-vln-sage mr-2">✓</span>
                  <span>
                    <strong className="text-vln-white">No exploitation</strong> - Never exploit
                    vulnerabilities on mainnet
                  </span>
                </li>
              </ul>
              <div className="pt-4 border-t border-vln-sage/20 mt-6">
                <p className="text-sm text-vln-bluegray">
                  For vulnerability disclosures, email:{" "}
                  <a
                    href="mailto:info@vln.gg"
                    className="text-vln-sage hover:text-vln-bluegray transition-colors"
                  >
                    info@vln.gg
                  </a>
                </p>
              </div>
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
