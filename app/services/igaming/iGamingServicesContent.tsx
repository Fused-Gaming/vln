"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";
import { Shield, Search, BarChart3, Code, ExternalLink, Check } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "RNG & Provably-Fair Auditing",
    tagline: "Mathematically verify your randomness pipeline",
    description:
      "Deep statistical analysis and source-code review of your RNG implementation — from CSPRNG seeding and shuffle algorithms to on-chain commit-reveal schemes. We produce reproducible PoC test suites and bias reports operators can share with regulators.",
    features: [
      "CSPRNG seed entropy validation",
      "Fisher-Yates shuffle uniformity analysis",
      "On-chain commit-reveal scheme review",
      "Statistical bias testing (Chi-squared, KS, runs tests)",
      "Reproducible PoC test suite delivered",
      "Regulator-ready findings report",
    ],
    pricing: "Starting at $3K",
    color: "sage" as const,
    cta: "Book RNG Audit",
    ctaLink: "/contact?service=rng-audit",
  },
  {
    icon: BarChart3,
    title: "Wallet-Flow Risk Modeling",
    tagline: "Map every dollar through your platform",
    description:
      "End-to-end transaction graph analysis for gaming operators. We model deposit, play, withdrawal, and bonus-abuse flows to surface wash-trading patterns, collusion clusters, and economic attack surfaces before they cost you money.",
    features: [
      "On-chain & off-chain transaction graph analysis",
      "Bonus-abuse and multi-account clustering",
      "Wash-trading & collusion detection patterns",
      "Economic attack surface enumeration",
      "Risk-scoring model for real-time flagging",
      "Executive risk summary + raw data export",
    ],
    pricing: "Custom pricing",
    color: "blue" as const,
    cta: "Request Assessment",
    ctaLink: "/contact?service=wallet-flow",
  },
  {
    icon: Search,
    title: "Platform Integrity Testing",
    tagline: "Black-box testing from a player's perspective",
    description:
      "Full-scope penetration testing of your iGaming platform — API authentication, session management, game-state manipulation, and payout logic. We simulate real adversarial players to find exploits before they find you.",
    features: [
      "API auth & session-fixation testing",
      "Game-state manipulation & replay attacks",
      "Payout logic bypass attempts",
      "Bet-timing and race-condition fuzzing",
      "Mobile client reverse engineering",
      "OWASP Gaming Top-10 coverage",
    ],
    pricing: "Starting at $5K",
    color: "amber" as const,
    cta: "Request Pentest",
    ctaLink: "/contact?service=platform-integrity",
  },
  {
    icon: Code,
    title: "Smart Contract Game Audits",
    tagline: "Audit the code that holds player funds",
    description:
      "Comprehensive EVM security audits for on-chain casino and gaming contracts — house-edge logic, jackpot pools, staking vaults, and token economics. Every critical finding ships with a Foundry PoC exploit.",
    features: [
      "House-edge and odds parameter review",
      "Jackpot pool and vault drain scenarios",
      "Token economics and inflation vectors",
      "Access control and upgradeability review",
      "Foundry PoC exploits for critical findings",
      "30-day free fix-verification included",
    ],
    pricing: "Starting at $2K",
    color: "purple" as const,
    cta: "Get Free 30-Min Scan",
    ctaLink: "/contact?service=game-contract-audit",
  },
];

const colorClasses = {
  sage: {
    border: "border-vln-sage/20 hover:border-vln-sage/40",
    text: "text-vln-sage",
    bg: "bg-vln-sage/10",
    glow: "glow-lift",
    badge: "bg-vln-sage/15 text-vln-sage border-vln-sage/30",
  },
  blue: {
    border: "border-vln-bluegray/20 hover:border-vln-bluegray/40",
    text: "text-vln-bluegray",
    bg: "bg-vln-bluegray/10",
    glow: "glow-lift-blue",
    badge: "bg-vln-bluegray/15 text-vln-bluegray border-vln-bluegray/30",
  },
  amber: {
    border: "border-vln-amber/20 hover:border-vln-amber/40",
    text: "text-vln-amber",
    bg: "bg-vln-amber/10",
    glow: "glow-lift-amber",
    badge: "bg-vln-amber/15 text-vln-amber border-vln-amber/30",
  },
  purple: {
    border: "border-vln-purple/20 hover:border-vln-purple/40",
    text: "text-vln-purple",
    bg: "bg-vln-purple/10",
    glow: "glow-lift-purple",
    badge: "bg-vln-purple/15 text-vln-purple border-vln-purple/30",
  },
};

export default function IGamingServicesContent() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
            <CSSFade direction="up">
              <p className="font-mono text-[10px] uppercase tracking-[4px] text-vln-sage mb-4">
                iGaming Security Practice
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Security for{" "}
                <span className="text-gradient-rainbow">Gaming Operators</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                RNG auditing, wallet-flow risk modeling, and platform integrity
                testing — backed by 12+ years of Fused Gaming infrastructure
                expertise.
              </p>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="primary" size="lg" href="/contact?service=igaming" className="group">
                  Get iGaming Assessment
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <Button variant="secondary" size="lg" href="#capability-sample">
                  View Live Demo ↓
                </Button>
              </div>
            </CSSFade>
          </div>
        </section>

        {/* Services */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <StaggerFade staggerDelay={150} className="space-y-12 sm:space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const colors = colorClasses[service.color];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.title}
                  className={`max-w-6xl mx-auto p-6 sm:p-8 lg:p-10 rounded-vln border-2 ${colors.border} bg-vln-bg-light transition-all duration-300 ${colors.glow}`}
                >
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Content */}
                    <div className={!isEven ? "lg:order-2" : ""}>
                      <div className={`inline-flex items-center justify-center p-4 rounded-vln ${colors.bg} mb-6`}>
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <h2 className={`text-3xl sm:text-4xl font-bold mb-3 ${colors.text}`}>
                        {service.title}
                      </h2>
                      <p className="text-lg sm:text-xl text-vln-gray-dark mb-4">
                        {service.tagline}
                      </p>
                      <p className="text-base text-vln-gray mb-6">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-sm font-medium text-vln-gray-dark">Pricing:</span>
                        <span className={`text-lg font-bold ${colors.text}`}>{service.pricing}</span>
                      </div>
                      <Button
                        variant={service.color === "sage" ? "primary" : "secondary"}
                        size="lg"
                        href={service.ctaLink}
                        className="group"
                      >
                        {service.cta}
                        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </Button>
                    </div>

                    {/* Features */}
                    <div className={!isEven ? "lg:order-1" : ""}>
                      <div className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                            <span className="text-vln-gray">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggerFade>
        </section>

        {/* Blackjack Premium Capability Sample Card */}
        <section
          id="capability-sample"
          className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24"
        >
          <CSSFade direction="up">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="font-mono text-[10px] uppercase tracking-[4px] text-vln-sage mb-3">
                  Live Capability Sample
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-vln-white">
                  See Our iGaming Engineering Depth
                </h2>
                <p className="mt-4 text-vln-gray max-w-2xl mx-auto">
                  We built a full casino-grade Blackjack engine to demonstrate
                  the same RNG integrity, shuffle logic, and payout settlement
                  mechanics we audit in client platforms.
                </p>
              </div>

              {/* Game Card */}
              <div className="relative rounded-vln border-2 border-vln-sage/25 bg-vln-bg-light overflow-hidden glow-lift group">
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-vln-sage/60 to-transparent" />

                <div className="flex flex-col lg:flex-row">
                  {/* Left: table preview panel */}
                  <div className="lg:w-64 xl:w-72 flex-shrink-0 bg-[#0d2014] border-b lg:border-b-0 lg:border-r border-vln-sage/15 flex flex-col items-center justify-center px-8 py-10 gap-5">
                    {/* Felt circle */}
                    <div className="w-28 h-28 rounded-full bg-[#0a1a0d] border-2 border-vln-sage/25 flex items-center justify-center shadow-[inset_0_0_24px_rgba(134,217,147,0.08)]">
                      <span className="text-5xl text-vln-sage/80 select-none" aria-hidden>♠</span>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-[9px] uppercase tracking-[3px] text-vln-sage/70 mb-1">
                        Fused Gaming
                      </p>
                      <p className="text-vln-white font-bold text-lg leading-tight">
                        Blackjack Premium
                      </p>
                      <p className="text-vln-gray-dark text-xs mt-1">6-Deck · CSPRNG Shuffle</p>
                    </div>
                    {/* Stat pills */}
                    <div className="flex flex-col gap-2 w-full">
                      {[
                        { label: "RNG", value: "CSPRNG" },
                        { label: "Decks", value: "6" },
                        { label: "Hands", value: "Multi" },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-vln-sage/[0.06] border border-vln-sage/15">
                          <span className="font-mono text-[9px] uppercase tracking-[2px] text-vln-sage/60">{label}</span>
                          <span className="font-mono text-xs text-vln-sage font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: description + features + CTA */}
                  <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between gap-8">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {["RNG Integrity", "Shuffle Algorithm", "Multi-Hand Settlement", "Provably Fair", "CSPRNG"].map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full border text-[10px] font-mono tracking-wide bg-vln-sage/10 text-vln-sage border-vln-sage/25"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-vln-gray leading-relaxed mb-6">
                        An interactive casino-grade Blackjack engine built to the same standards we apply when auditing client platforms. Every shuffle uses{" "}
                        <span className="font-mono text-vln-sage text-sm">crypto.getRandomValues</span>{" "}
                        with a Fisher-Yates algorithm across a full 6-deck shoe. Hit, Stand, Double Down, Split, and Insurance are all implemented with correct payout mathematics — the exact logic we verify during a real iGaming security engagement.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          "6-deck shoe with CSPRNG Fisher-Yates shuffle",
                          "Hit · Stand · Double Down · Split · Insurance",
                          "Multi-hand play with per-hand settlement",
                          "Dealer soft-17 stand rule enforced",
                          "Chip denominations $1 – $100",
                          "Confetti win celebration & card-deal animation",
                        ].map((feat) => (
                          <div key={feat} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-vln-sage flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-vln-gray">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 border-t border-vln-sage/10">
                      <a
                        href="/internal/bj9k4-blackjack-premium"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-vln-sage text-vln-bg font-semibold text-sm hover:bg-vln-sage-light transition-all duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-vln-sage shadow-vln-glow"
                        aria-label="Open Blackjack Premium live demo in new tab"
                      >
                        Play Live Demo
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <Button variant="secondary" size="md" href="/contact?service=igaming" className="group">
                        Discuss Your Platform
                        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </Button>
                      <p className="text-[11px] font-mono text-vln-gray-dark sm:ml-auto">
                        Internal sample · not indexed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CSSFade>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade>
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 p-8 sm:p-12 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Ready to secure your iGaming platform?
              </h2>
              <p className="text-xl text-vln-gray max-w-2xl mx-auto">
                Schedule a free 30-minute call to scope your RNG audit, platform
                integrity test, or smart contract review.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="primary" size="xl" href="/contact?service=igaming" className="group">
                  Get Free Consultation
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <Button variant="secondary" size="xl" href="/services">
                  All Services
                </Button>
              </div>
            </div>
          </CSSFade>
        </section>
      </main>

      <Footer />
    </div>
  );
}
