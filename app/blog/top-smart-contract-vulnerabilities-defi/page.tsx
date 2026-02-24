import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Top Smart Contract Vulnerabilities Found in Bay Area DeFi Projects | VLN",
  description:
    "An analysis of the most common and critical smart contract vulnerabilities discovered in Bay Area DeFi projects. Real-world examples, CVSS scores, and how to prevent reentrancy, integer overflow, access control flaws, and more.",
  keywords: [
    "smart contract vulnerabilities DeFi",
    "top smart contract vulnerabilities Bay Area",
    "DeFi exploit analysis San Francisco",
    "EVM vulnerability research",
    "reentrancy attack smart contracts",
    "integer overflow Solidity",
    "access control vulnerabilities DeFi",
    "flash loan attack vectors",
    "smart contract security best practices",
    "Solidity vulnerability patterns Bay Area",
    "DeFi hack analysis",
    "Web3 security research San Francisco",
  ],
  alternates: {
    canonical: "https://vln.gg/blog/top-smart-contract-vulnerabilities-defi",
  },
  openGraph: {
    title: "Top Smart Contract Vulnerabilities Found in Bay Area DeFi Projects | VLN",
    description:
      "Analysis of the most critical smart contract vulnerabilities in DeFi: reentrancy, integer overflow, access control flaws, flash loan attacks, and more. Real-world examples and prevention strategies.",
    url: "https://vln.gg/blog/top-smart-contract-vulnerabilities-defi",
    type: "article",
  },
};

const vulnerabilities = [
  {
    rank: "01",
    name: "Reentrancy Attacks",
    cvss: "9.8 Critical",
    cvssColor: "text-red-400",
    description:
      "Reentrancy remains one of the most devastating smart contract vulnerabilities, responsible for some of the largest DeFi exploits in history, including the infamous DAO hack. The vulnerability occurs when a contract makes an external call before updating its internal state.",
    example:
      "A lending protocol in the Bay Area DeFi ecosystem was found to have a reentrancy vulnerability in its liquidation function. An attacker could recursively call the liquidation function, draining the contract's ETH balance before the internal accounting was updated.",
    prevention: [
      "Follow the Checks-Effects-Interactions (CEI) pattern in all external calls",
      "Use OpenZeppelin's ReentrancyGuard modifier for critical functions",
      "Implement mutex locks for state-changing operations with external calls",
      "Use pull-payment patterns instead of push-payment where possible",
    ],
    color: "border-red-500/20 bg-red-500/5",
    labelColor: "text-red-400",
  },
  {
    rank: "02",
    name: "Integer Overflow & Underflow",
    cvss: "7.5 High",
    cvssColor: "text-orange-400",
    description:
      "Prior to Solidity 0.8.0, arithmetic operations did not revert on overflow or underflow, allowing attackers to manipulate token balances, voting weights, and other critical values. Despite the compiler upgrade, legacy contracts and unchecked blocks remain a risk.",
    example:
      "A token vesting contract used `unchecked` blocks for gas optimization without properly validating inputs. An attacker could pass a start timestamp far in the future, causing the vesting calculation to underflow and return maximum token amounts immediately.",
    prevention: [
      "Use Solidity 0.8.0+ for automatic overflow/underflow protection",
      "Avoid unchecked blocks unless you have proven invariants preventing overflow",
      "Use SafeMath for Solidity < 0.8.0 contracts",
      "Add explicit range validations for all arithmetic operations on user-controlled inputs",
    ],
    color: "border-orange-500/20 bg-orange-500/5",
    labelColor: "text-orange-400",
  },
  {
    rank: "03",
    name: "Access Control Flaws",
    cvss: "8.8 High",
    cvssColor: "text-orange-400",
    description:
      "Improper access control is the second most common vulnerability class in DeFi protocols. Missing ownership checks, inadequate role-based access, and unprotected initialization functions allow attackers to call privileged functions or take over contracts entirely.",
    example:
      "A DeFi protocol's proxy contract had an unprotected `initialize()` function that set the admin address. Since the function lacked an `initializer` modifier, an attacker was able to call it again after deployment and take over the contract admin role.",
    prevention: [
      "Use OpenZeppelin's Ownable or AccessControl for role management",
      "Always use the `initializer` modifier for upgradeable contract initializers",
      "Implement two-step ownership transfers to prevent accidental ownership loss",
      "Audit all admin functions and ensure proper access restrictions",
    ],
    color: "border-orange-500/20 bg-orange-500/5",
    labelColor: "text-orange-400",
  },
  {
    rank: "04",
    name: "Oracle Manipulation & Price Attacks",
    cvss: "9.1 Critical",
    cvssColor: "text-red-400",
    description:
      "DeFi protocols that rely on spot price oracles from DEX liquidity pools are vulnerable to flash loan-powered price manipulation. Attackers can borrow large amounts, manipulate pool prices within a single transaction, exploit dependent protocols, then repay.",
    example:
      "A lending protocol used a single Uniswap V2 pool as its price oracle for collateral valuation. An attacker used a $50M flash loan to temporarily inflate the collateral token price, borrowed the maximum allowed, then repaid the flash loan — netting $8M in profit.",
    prevention: [
      "Use time-weighted average price (TWAP) oracles instead of spot prices",
      "Integrate Chainlink or other decentralized oracle networks for price feeds",
      "Add minimum liquidity requirements and price deviation checks",
      "Use multiple oracle sources with median aggregation",
    ],
    color: "border-red-500/20 bg-red-500/5",
    labelColor: "text-red-400",
  },
  {
    rank: "05",
    name: "Logic & Business Rule Errors",
    cvss: "7.0–9.5 Variable",
    cvssColor: "text-yellow-400",
    description:
      "Not all vulnerabilities stem from known patterns. Custom business logic errors — miscalculated rewards, incorrect fee accounting, flawed liquidation thresholds — can be just as devastating as reentrancy. These are the hardest to detect with automated tools.",
    example:
      "A yield farming protocol calculated compounding rewards using an incorrect base formula. The error was less than 0.01% per transaction, but when compounded over 10,000+ transactions, it allowed certain stakers to withdraw 340% of their original deposit.",
    prevention: [
      "Write comprehensive unit tests covering all edge cases and boundary conditions",
      "Use formal verification tools like Certora Prover for critical invariants",
      "Conduct economic modeling and game theory analysis before deployment",
      "Have a dedicated review for all reward, fee, and liquidation calculation paths",
    ],
    color: "border-yellow-500/20 bg-yellow-500/5",
    labelColor: "text-yellow-400",
  },
];

export default function TopSmartContractVulnerabilitiesPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Top Smart Contract Vulnerabilities Found in Bay Area DeFi Projects",
    description:
      "An analysis of the most common and critical smart contract vulnerabilities discovered in Bay Area DeFi projects.",
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
    datePublished: "2025-01-15",
    dateModified: "2025-06-01",
    url: "https://vln.gg/blog/top-smart-contract-vulnerabilities-defi",
    keywords:
      "smart contract vulnerabilities, DeFi security, reentrancy, integer overflow, access control, Bay Area blockchain security",
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
                <span className="text-vln-gray-dark text-sm">Security Research</span>
                <span className="text-vln-gray-dark">•</span>
                <span className="text-vln-gray-dark text-sm">January 15, 2025</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                Top Smart Contract Vulnerabilities Found in{" "}
                <span className="text-gradient-rainbow">Bay Area DeFi Projects</span>
              </h1>

              <p className="text-lg sm:text-xl text-vln-gray leading-relaxed mb-8">
                Based on our vulnerability research across dozens of audited protocols, we&apos;ve
                identified five vulnerability classes that appear most frequently in Bay Area DeFi
                projects. Understanding these patterns is the first step to building secure smart
                contracts.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["DeFi Security", "Smart Contracts", "EVM", "Bay Area", "Vulnerability Research"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium border border-vln-sage/30 text-vln-sage"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CSSFade>
          </div>
        </section>

        {/* Vulnerabilities */}
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-24">
          <div className="max-w-4xl mx-auto space-y-10">
            {vulnerabilities.map((vuln) => (
              <CSSFade key={vuln.rank}>
                <article
                  className={`p-6 sm:p-8 rounded-vln border ${vuln.color} transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-vln-bg-light/50 font-mono">
                        {vuln.rank}
                      </span>
                      <div>
                        <h2 className={`text-2xl font-bold ${vuln.labelColor}`}>{vuln.name}</h2>
                        <span className={`text-sm font-mono font-medium ${vuln.cvssColor}`}>
                          CVSS {vuln.cvss}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-vln-gray leading-relaxed mb-6">{vuln.description}</p>

                  <div className="mb-6 p-4 rounded-vln bg-vln-bg border border-vln-sage/10">
                    <h3 className="text-sm font-semibold text-vln-sage mb-2 uppercase tracking-wider">
                      Real-World Example
                    </h3>
                    <p className="text-vln-gray text-sm leading-relaxed">{vuln.example}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-vln-white mb-3 uppercase tracking-wider">
                      Prevention Strategies
                    </h3>
                    <ul className="space-y-2">
                      {vuln.prevention.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-vln-gray">
                          <span className={`font-mono font-bold ${vuln.labelColor} flex-shrink-0`}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </CSSFade>
            ))}
          </div>
        </section>

        {/* Conclusion & CTA */}
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-24">
          <CSSFade>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 sm:p-8 rounded-vln border border-vln-bluegray/20 bg-vln-bg-light">
                <h2 className="text-2xl font-bold text-vln-white mb-4">
                  The Bottom Line
                </h2>
                <p className="text-vln-gray leading-relaxed mb-4">
                  These five vulnerability classes account for the majority of critical findings VLN
                  has discovered across our audit portfolio. While automated tools can catch some of
                  these issues, the most dangerous vulnerabilities — particularly business logic
                  errors and complex oracle attacks — require expert manual review.
                </p>
                <p className="text-vln-gray leading-relaxed">
                  Bay Area DeFi teams launching on mainnet should consider a comprehensive security
                  audit before deployment, not as an optional add-on but as a core part of their
                  development process. The cost of a professional audit is a fraction of the funds
                  that can be lost in a single exploit.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift text-center">
                <h2 className="text-2xl font-bold text-vln-white mb-3">
                  Is Your Contract Vulnerable?
                </h2>
                <p className="text-vln-gray mb-6">
                  Get a free 30-minute security scan from VLN&apos;s expert researchers. We&apos;ll
                  identify your highest-risk attack surface and recommend next steps.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="primary" size="lg" href="/contact?service=audits" className="group">
                    Get Free 30-Min Scan
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
