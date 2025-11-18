import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-vln-sage/20 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-vln-sage">VLN</span>
            <span className="text-sm text-vln-bluegray">by Fused Gaming</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-vln-white hover:text-vln-sage transition-colors">
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

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Smart Contract
              <br />
              <span className="text-vln-sage">Vulnerability Research</span>
            </h1>
            <p className="text-xl md:text-2xl text-vln-bluegray max-w-2xl mx-auto">
              Advanced security audits and vulnerability research for blockchain gaming projects
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link
                href="/services"
                className="px-8 py-4 bg-vln-sage text-vln-bg rounded-vln font-semibold glow-lift card-lift"
              >
                Our Services
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-vln-sage text-vln-sage rounded-vln font-semibold glow-lift card-lift"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="container mx-auto px-6 py-24 border-t border-vln-sage/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              What We <span className="text-vln-sage">Deliver</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-vln-sage/20 rounded-vln glow-lift card-lift">
                <h3 className="text-xl font-bold mb-4 text-vln-sage">Vulnerability Discovery</h3>
                <p className="text-vln-bluegray">
                  Deep analysis of smart contracts to identify security vulnerabilities and potential exploits
                </p>
              </div>
              <div className="p-6 border border-vln-sage/20 rounded-vln glow-lift card-lift">
                <h3 className="text-xl font-bold mb-4 text-vln-sage">Professional Scoring</h3>
                <p className="text-vln-bluegray">
                  CVSS-based vulnerability assessments with detailed risk analysis and remediation guidance
                </p>
              </div>
              <div className="p-6 border border-vln-sage/20 rounded-vln glow-lift card-lift">
                <h3 className="text-xl font-bold mb-4 text-vln-sage">PoC Development</h3>
                <p className="text-vln-bluegray">
                  Foundry-based proof-of-concept exploits and automated detection using Glider queries
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="container mx-auto px-6 py-24 border-t border-vln-sage/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Who We <span className="text-vln-sage">Serve</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Blockchain Gaming Projects",
                "DeFi Protocols",
                "NFT Platforms",
                "Smart Contract Developers",
                "Security Researchers",
                "Blockchain Auditing Firms",
              ].map((audience) => (
                <div
                  key={audience}
                  className="p-4 border border-vln-sage/20 rounded-vln text-center glow-lift"
                >
                  <p className="text-vln-white font-medium">{audience}</p>
                </div>
              ))}
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
