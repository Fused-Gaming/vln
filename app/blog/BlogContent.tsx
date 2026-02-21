"use client";

import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";

const articles = [
  {
    slug: "top-smart-contract-vulnerabilities-defi",
    title: "Top Smart Contract Vulnerabilities Found in Bay Area DeFi Projects",
    excerpt:
      "An analysis of five critical vulnerability classes — reentrancy, integer overflow, access control flaws, oracle manipulation, and business logic errors — discovered across our audited DeFi protocols.",
    category: "Security Research",
    date: "January 15, 2025",
    readTime: "12 min read",
    tags: ["DeFi Security", "EVM", "Vulnerability Research", "Bay Area"],
    color: "sage" as const,
  },
  {
    slug: "web3-security-checklist-bay-area-startups",
    title: "Web3 Security Checklist for Startups in the Bay Area",
    excerpt:
      "A practical pre-launch security checklist for San Francisco and Bay Area blockchain startups covering smart contract development, key management, infrastructure hardening, and incident response planning.",
    category: "Security Guide",
    date: "February 1, 2025",
    readTime: "8 min read",
    tags: ["Startups", "Bay Area", "Pre-Launch", "Best Practices"],
    color: "blue" as const,
  },
];

const colorMap = {
  sage: {
    border: "border-vln-sage/20 hover:border-vln-sage/40",
    text: "text-vln-sage",
    badge: "bg-vln-sage/10 text-vln-sage border border-vln-sage/20",
    glow: "glow-lift",
  },
  blue: {
    border: "border-vln-bluegray/20 hover:border-vln-bluegray/40",
    text: "text-vln-bluegray",
    badge: "bg-vln-bluegray/10 text-vln-bluegray border border-vln-bluegray/20",
    glow: "glow-lift-blue",
  },
};

export default function BlogContent() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <CSSFade direction="up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                VLN <span className="text-gradient-rainbow">Blog</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl md:text-3xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                Security insights, vulnerability research, and Web3 analysis
              </p>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <p className="text-base sm:text-lg text-vln-gray max-w-2xl mx-auto">
                Deep-dive research from VLN&apos;s security team in San Francisco — covering DeFi
                vulnerabilities, blockchain forensics, and security best practices for Bay Area
                Web3 teams.
              </p>
            </CSSFade>
          </div>
        </section>

        {/* Articles */}
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-24">
          <StaggerFade staggerDelay={150} className="max-w-4xl mx-auto space-y-8">
            {articles.map((article) => {
              const colors = colorMap[article.color];
              return (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className={`block p-6 sm:p-8 rounded-vln border-2 ${colors.border} bg-vln-bg-light transition-all duration-300 ${colors.glow}`}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
                      {article.category}
                    </span>
                    <span className="text-vln-gray-dark text-xs">{article.date}</span>
                    <span className="text-vln-gray-dark text-xs">{article.readTime}</span>
                  </div>

                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 ${colors.text}`}>
                    {article.title}
                  </h2>

                  <p className="text-vln-gray text-base leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs text-vln-gray-dark border border-vln-bg-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className={`text-sm font-medium ${colors.text} flex items-center gap-1`}>
                      Read article
                      <span>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </StaggerFade>
        </section>

        {/* Newsletter CTA */}
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-24">
          <CSSFade>
            <div className="max-w-4xl mx-auto text-center p-8 sm:p-12 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Stay Updated on Web3 Security Research
              </h2>
              <p className="text-vln-gray mb-6 max-w-2xl mx-auto">
                Subscribe to VLN&apos;s newsletter for the latest smart contract vulnerability
                research, DeFi exploit post-mortems, and security best practices for Bay Area
                blockchain teams.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  href="/contact?subject=newsletter"
                  className="w-full sm:w-auto"
                >
                  Subscribe to Newsletter
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="/contact"
                  className="w-full sm:w-auto"
                >
                  Get Security Audit
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
