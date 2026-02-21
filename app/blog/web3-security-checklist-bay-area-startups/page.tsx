import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";
import { Check, AlertTriangle, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Web3 Security Checklist for Startups in the Bay Area | VLN",
  description:
    "A practical Web3 security checklist for San Francisco and Bay Area blockchain startups. Cover smart contract security, key management, infrastructure hardening, and incident response planning before your mainnet launch.",
  keywords: [
    "Web3 security checklist Bay Area",
    "smart contract security checklist San Francisco",
    "blockchain startup security guide",
    "DeFi launch security checklist",
    "smart contract pre-launch audit checklist",
    "Bay Area Web3 startup security",
    "Solidity security best practices",
    "DeFi security best practices San Francisco",
    "blockchain security guide startups",
    "Web3 security planning Silicon Valley",
  ],
  alternates: {
    canonical: "https://vln.gg/blog/web3-security-checklist-bay-area-startups",
  },
  openGraph: {
    title: "Web3 Security Checklist for Startups in the Bay Area | VLN",
    description:
      "A practical Web3 security checklist for blockchain startups: smart contract audits, key management, infrastructure security, and incident response planning.",
    url: "https://vln.gg/blog/web3-security-checklist-bay-area-startups",
    type: "article",
  },
};

const checklistSections = [
  {
    phase: "Phase 1",
    title: "Smart Contract Development Security",
    color: "sage" as const,
    items: [
      {
        item: "Use a well-audited smart contract framework",
        detail: "Build on OpenZeppelin's battle-tested contracts rather than writing custom implementations of common patterns (ERC20, ERC721, access control, etc.).",
        critical: true,
      },
      {
        item: "Enable Solidity's built-in overflow protection",
        detail: "Use Solidity 0.8.0+ for automatic integer overflow/underflow protection. If you must use unchecked blocks, document and justify each usage.",
        critical: true,
      },
      {
        item: "Follow the Checks-Effects-Interactions pattern",
        detail: "Always complete all state changes before making external calls. Apply ReentrancyGuard to any function that makes external calls.",
        critical: true,
      },
      {
        item: "Implement proper access control from day one",
        detail: "Design your role hierarchy before writing code. Use OpenZeppelin's AccessControl for multi-role systems. Never leave admin functions unprotected.",
        critical: false,
      },
      {
        item: "Use safe oracle patterns for price feeds",
        detail: "Avoid spot price oracles. Use TWAP, Chainlink, or multi-oracle aggregation. Add circuit breakers for extreme price deviations.",
        critical: true,
      },
      {
        item: "Write comprehensive unit and integration tests",
        detail: "Target 95%+ line coverage for core contract logic. Test all edge cases, boundary conditions, and failure scenarios.",
        critical: false,
      },
    ],
  },
  {
    phase: "Phase 2",
    title: "Pre-Launch Security Review",
    color: "blue" as const,
    items: [
      {
        item: "Run automated security scanners",
        detail: "Use Slither, Mythril, and Echidna to catch common vulnerabilities automatically. Integrate these into your CI/CD pipeline.",
        critical: false,
      },
      {
        item: "Conduct internal code review",
        detail: "Have at least two senior developers review all contract code with a security focus. Create a review checklist based on known vulnerability patterns.",
        critical: false,
      },
      {
        item: "Commission a professional smart contract audit",
        detail: "For any protocol handling real user funds, a professional audit is non-negotiable. Budget for it early and choose an auditor with verifiable experience.",
        critical: true,
      },
      {
        item: "Run a bug bounty program before mainnet",
        detail: "Deploy to a testnet and run a bounty program on Immunefi or similar platforms. The community will find issues your internal team missed.",
        critical: false,
      },
      {
        item: "Test your upgrade and emergency mechanisms",
        detail: "If your contracts are upgradeable, verify that upgrade paths work correctly. Test your pause mechanisms and ensure they can be activated quickly.",
        critical: true,
      },
    ],
  },
  {
    phase: "Phase 3",
    title: "Key Management & Operational Security",
    color: "amber" as const,
    items: [
      {
        item: "Use a multisig for all admin operations",
        detail: "Never use a single EOA as the admin of any contract with significant TVL. Use Gnosis Safe with a minimum 3-of-5 multisig for all privileged operations.",
        critical: true,
      },
      {
        item: "Implement timelocks for sensitive operations",
        detail: "Add a timelock contract (minimum 24 hours, ideally 48-72 hours) for admin actions like parameter changes, upgrades, and fund transfers.",
        critical: true,
      },
      {
        item: "Secure your deployment private keys",
        detail: "Use hardware wallets for deployment. Never store private keys in environment variables in CI/CD. Use dedicated key management services for production.",
        critical: true,
      },
      {
        item: "Limit admin key exposure",
        detail: "Use separate keys for different operational roles. Rotate keys regularly. Revoke access immediately when team members leave.",
        critical: false,
      },
      {
        item: "Audit your frontend for web3 security issues",
        detail: "Check for wallet drainer injection points, transaction simulation spoofing, and IPFS/ENS resolution attacks on your dApp frontend.",
        critical: false,
      },
    ],
  },
  {
    phase: "Phase 4",
    title: "Incident Response Planning",
    color: "purple" as const,
    items: [
      {
        item: "Build and test an emergency pause mechanism",
        detail: "Implement pause functionality for all critical contract operations. Test that pause can be activated within minutes by on-call team members.",
        critical: true,
      },
      {
        item: "Create a documented incident response runbook",
        detail: "Document step-by-step procedures for common incident types: reentrancy exploits, oracle manipulation, access control breaches. Practice tabletop exercises.",
        critical: false,
      },
      {
        item: "Set up real-time on-chain monitoring",
        detail: "Use Forta, OpenZeppelin Defender Sentinel, or custom monitoring to alert on large unusual transactions, failed pause attempts, and parameter changes.",
        critical: true,
      },
      {
        item: "Establish a responsible disclosure policy",
        detail: "Publish a security.txt, create a disclosure email, and respond to researchers promptly. Whitehats who find bugs should be rewarded, not threatened.",
        critical: false,
      },
      {
        item: "Maintain an emergency contact list",
        detail: "Have direct contacts at major CEXes, Chainlink, law enforcement, and blockchain forensics firms. In a live exploit, every minute counts.",
        critical: false,
      },
    ],
  },
];

const colorMap = {
  sage: {
    border: "border-vln-sage/20",
    text: "text-vln-sage",
    badge: "bg-vln-sage/10 text-vln-sage border-vln-sage/20",
    check: "text-vln-sage",
  },
  blue: {
    border: "border-vln-bluegray/20",
    text: "text-vln-bluegray",
    badge: "bg-vln-bluegray/10 text-vln-bluegray border-vln-bluegray/20",
    check: "text-vln-bluegray",
  },
  amber: {
    border: "border-vln-amber/20",
    text: "text-vln-amber",
    badge: "bg-vln-amber/10 text-vln-amber border-vln-amber/20",
    check: "text-vln-amber",
  },
  purple: {
    border: "border-vln-purple/20",
    text: "text-vln-purple",
    badge: "bg-vln-purple/10 text-vln-purple border-vln-purple/20",
    check: "text-vln-purple",
  },
};

export default function Web3SecurityChecklistPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Web3 Security Checklist for Startups in the Bay Area",
    description:
      "A practical Web3 security checklist for San Francisco and Bay Area blockchain startups.",
    author: {
      "@type": "Organization",
      name: "VLN Security",
      url: "https://vln.gg",
    },
    publisher: {
      "@type": "Organization",
      name: "VLN - Vulnerability Lab Network",
      logo: "https://vln.gg/vln-logo-dark.svg",
    },
    datePublished: "2025-02-01",
    dateModified: "2025-06-01",
    url: "https://vln.gg/blog/web3-security-checklist-bay-area-startups",
  };

  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto">
            <CSSFade direction="up">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link
                  href="/blog"
                  className="text-vln-sage hover:text-vln-bluegray transition-colors text-sm"
                >
                  ← Blog
                </Link>
                <span className="text-vln-gray-dark">•</span>
                <span className="text-vln-gray-dark text-sm">Security Guide</span>
                <span className="text-vln-gray-dark">•</span>
                <span className="text-vln-gray-dark text-sm">February 1, 2025</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                Web3 Security Checklist for Startups in the{" "}
                <span className="text-gradient-rainbow">Bay Area</span>
              </h1>

              <p className="text-lg sm:text-xl text-vln-gray leading-relaxed mb-6">
                Launching a DeFi protocol or blockchain gaming project in San Francisco? Security
                cannot be an afterthought. This checklist covers the critical security steps Bay
                Area Web3 startups should complete before going live on mainnet.
              </p>

              <div className="flex items-start gap-3 p-4 rounded-vln border border-vln-amber/30 bg-vln-amber/5 mb-8">
                <AlertTriangle className="w-5 h-5 text-vln-amber flex-shrink-0 mt-0.5" />
                <p className="text-vln-gray text-sm">
                  <strong className="text-vln-white">Important:</strong> Items marked as critical
                  should be treated as blockers before mainnet deployment. Non-critical items are
                  strongly recommended but may be addressed post-launch with appropriate mitigations.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["DeFi Security", "Startups", "Bay Area", "Pre-Launch", "Security Checklist"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-vln-sage/30 text-vln-sage"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </CSSFade>
          </div>
        </section>

        {/* Checklist */}
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-24">
          <div className="max-w-4xl mx-auto space-y-10">
            {checklistSections.map((section) => {
              const colors = colorMap[section.color];
              return (
                <CSSFade key={section.phase}>
                  <div className={`p-6 sm:p-8 rounded-vln border ${colors.border} bg-vln-bg-light`}>
                    <div className="flex items-center gap-3 mb-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${colors.badge}`}
                      >
                        {section.phase}
                      </span>
                      <h2 className={`text-2xl font-bold ${colors.text}`}>{section.title}</h2>
                    </div>

                    <div className="space-y-5">
                      {section.items.map((checkItem, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-0.5">
                            {checkItem.critical ? (
                              <Shield className={`w-5 h-5 ${colors.check}`} />
                            ) : (
                              <Check className={`w-5 h-5 ${colors.check} opacity-70`} />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-vln-white">
                                {checkItem.item}
                              </span>
                              {checkItem.critical && (
                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                  Critical
                                </span>
                              )}
                            </div>
                            <p className="text-vln-gray text-sm leading-relaxed">
                              {checkItem.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CSSFade>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-24">
          <CSSFade>
            <div className="max-w-4xl mx-auto">
              <div className="p-6 sm:p-8 rounded-vln border border-vln-bluegray/20 bg-vln-bg-light mb-8">
                <h2 className="text-2xl font-bold text-vln-white mb-4">
                  Need Help Working Through This Checklist?
                </h2>
                <p className="text-vln-gray leading-relaxed">
                  VLN works with Bay Area blockchain startups at every stage — from initial
                  architecture reviews to full pre-launch audits. Our team can help you implement
                  every item on this checklist and identify vulnerabilities your internal team may
                  have missed.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift text-center">
                <h2 className="text-2xl font-bold text-vln-white mb-3">
                  Get Your Free 30-Minute Security Scan
                </h2>
                <p className="text-vln-gray mb-6">
                  We&apos;ll review your highest-risk contract and identify immediate security
                  concerns — at no cost.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="primary" size="lg" href="/contact?service=audits" className="group">
                    Start Free Scan
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Button>
                  <Button variant="secondary" size="lg" href="/services">
                    View All Services
                  </Button>
                </div>
              </div>
            </div>
          </CSSFade>
        </section>
      </main>

      <Footer />
    </div>
  );
}
