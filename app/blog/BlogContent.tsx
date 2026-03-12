"use client";

import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";

type ArticleColor = "sage" | "blue" | "amber" | "purple";

interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  color: ArticleColor;
  source: string;
}

const articles: BlogArticle[] = [
  {
    slug: "drake-suing-eddie-kyc-fraud",
    title: "Drake Suing Eddie: Fingered Aiden KYC Fraud",
    excerpt:
      "Analysis of the Drake and Eddie controversy involving KYC fraud and identity verification failures. Learn about verification vulnerabilities in high-profile cases.",
    category: "Commentary",
    date: "March 8, 2026",
    readTime: "6 min read",
    tags: ["KYC", "Identity Verification", "Fraud Detection", "Case Analysis"],
    color: "purple" as const,
    source: "LinkedIn",
  },
  {
    slug: "2026-affiliate-marketing-blueprint",
    title: "The 2026 Affiliate Marketing Blueprint",
    excerpt:
      "A comprehensive guide to affiliate marketing strategies for 2026. Learn effective tactics, structure, and implementation for successful affiliate programs.",
    category: "Business Strategy",
    date: "March 5, 2026",
    readTime: "9 min read",
    tags: ["Affiliate Marketing", "Business Strategy", "2026 Guide", "Revenue Growth"],
    color: "blue" as const,
    source: "LinkedIn",
  },
  {
    slug: "front-end-developer-20",
    title: "The Only Front-End Developer You'll Ever Need ($20)",
    excerpt:
      "Revolutionary approach to front-end development at scale. Discover how to build and maintain modern web applications efficiently.",
    category: "Development",
    date: "March 2, 2026",
    readTime: "7 min read",
    tags: ["Front-End Development", "Efficiency", "Tools", "Economics"],
    color: "sage" as const,
    source: "LinkedIn",
  },
  {
    slug: "igaming-platform-security-audit-guide",
    title: "iGaming Platform Security: A Complete Audit Guide",
    excerpt:
      "A comprehensive security audit guide covering every domain VLN assesses on iGaming platforms — RNG integrity, wallet-flow risk, smart contract integration, API attack surface, anti-fraud, and regulatory compliance.",
    category: "Platform Security",
    date: "March 10, 2026",
    readTime: "14 min read",
    tags: ["iGaming", "Platform Security", "RNG", "Wallet-Flow Risk"],
    color: "amber" as const,
    source: "VLN Research",
  },
  {
    slug: "treating-history-as-ongoing-defect",
    title: "Treating History as an Ongoing Defect",
    excerpt:
      "A philosophical examination of how we approach historical patterns as ongoing problems. Understanding cycles, defects, and system improvement.",
    category: "Philosophy",
    date: "February 25, 2026",
    readTime: "5 min read",
    tags: ["Systems Thinking", "Philosophy", "History", "Improvement"],
    color: "purple" as const,
    source: "LinkedIn",
  },
  {
    slug: "rng-manipulation-attacks-casino-platforms",
    title: "RNG Manipulation Attacks: How Casino Platforms Get Exploited",
    excerpt:
      "A technical deep-dive into five RNG attack classes on casino and iGaming platforms — from on-chain block hash prediction and commit-reveal front-running to off-chain PRNG reconstruction and Chainlink VRF misconfiguration.",
    category: "RNG Analysis",
    date: "February 28, 2026",
    readTime: "16 min read",
    tags: ["RNG Security", "iGaming", "EVM", "Block Hash", "PRNG"],
    color: "purple" as const,
    source: "VLN Research",
  },
  {
    slug: "notorious-whales-seven-siblings",
    title: "Notorious Whales Known as 7 Siblings",
    excerpt:
      "Analysis of major market players and their coordinated activities. Understanding whale behavior and market dynamics.",
    category: "Market Analysis",
    date: "February 20, 2026",
    readTime: "8 min read",
    tags: ["Market Analysis", "Trading", "Whale Behavior", "Coordination"],
    color: "amber" as const,
    source: "LinkedIn",
  },
  {
    slug: "web3-security-checklist-bay-area-startups",
    title: "Web3 Security Checklist for Startups in the Bay Area",
    excerpt:
      "A practical pre-launch security checklist for San Francisco and Bay Area blockchain startups covering smart contract development, key management, infrastructure hardening, and incident response planning.",
    category: "Security Guide",
    date: "February 15, 2026",
    readTime: "8 min read",
    tags: ["Startups", "Bay Area", "Pre-Launch", "Best Practices"],
    color: "blue" as const,
    source: "VLN Research",
  },
  {
    slug: "joseph-tartakovsky-basic-math",
    title: "Joseph Tartakovsky, US Attorney, Needs to Learn Basic Math",
    excerpt:
      "Critical analysis of mathematical errors in legal arguments. How calculation failures impact cases and policy.",
    category: "Legal Analysis",
    date: "February 15, 2026",
    readTime: "7 min read",
    tags: ["Legal Analysis", "Mathematics", "Error Analysis", "Policy"],
    color: "sage" as const,
    source: "LinkedIn",
  },
  {
    slug: "saved-27400-legal-fees-subscription",
    title: "How I Saved Someone $27,400 in Legal Fees With a $20 Subscription",
    excerpt:
      "A case study in cost-effective solutions and strategic resource allocation. How proper systems can save enormous sums.",
    category: "Case Study",
    date: "February 10, 2026",
    readTime: "6 min read",
    tags: ["Case Study", "Cost Savings", "Legal Strategy", "Efficiency"],
    color: "blue" as const,
    source: "LinkedIn",
  },
  {
    slug: "porn-id-government-worker",
    title: "Now You Need ID to Watch Porn? You're a Government Worker",
    excerpt:
      "Analysis of digital identity verification requirements and government policy implications.",
    category: "Policy Analysis",
    date: "February 5, 2026",
    readTime: "6 min read",
    tags: ["Digital Identity", "Policy", "Verification", "Government"],
    color: "amber" as const,
    source: "LinkedIn",
  },
  {
    slug: "top-smart-contract-vulnerabilities-defi",
    title: "Top Smart Contract Vulnerabilities Found in Bay Area DeFi Projects",
    excerpt:
      "An analysis of five critical vulnerability classes — reentrancy, integer overflow, access control flaws, oracle manipulation, and business logic errors — discovered across our audited DeFi protocols.",
    category: "Security Research",
    date: "February 1, 2026",
    readTime: "12 min read",
    tags: ["DeFi Security", "EVM", "Vulnerability Research", "Bay Area"],
    color: "sage" as const,
    source: "VLN Research",
  },
  {
    slug: "sold-drugs-marketplace-interview",
    title: "I Sold Drugs: Marketplace Built by a Man I'm Interviewing",
    excerpt:
      "An interview-based exploration of underground marketplace dynamics, system design, and the people behind illegal commerce infrastructure.",
    category: "Interview",
    date: "January 30, 2026",
    readTime: "10 min read",
    tags: ["Interview", "Marketplace", "Case Study", "Systems Analysis"],
    color: "purple" as const,
    source: "LinkedIn",
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
  amber: {
    border: "border-vln-amber/20 hover:border-vln-amber/40",
    text: "text-vln-amber",
    badge: "bg-vln-amber/10 text-vln-amber border border-vln-amber/20",
    glow: "glow-lift",
  },
  purple: {
    border: "border-vln-purple/20 hover:border-vln-purple/40",
    text: "text-vln-purple",
    badge: "bg-vln-purple/10 text-vln-purple border border-vln-purple/20",
    glow: "glow-lift",
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
                    <span className="text-vln-gray-dark text-xs">•</span>
                    <span className="text-vln-gray-dark text-xs">{article.readTime}</span>
                    <span className="text-vln-gray-dark text-xs">•</span>
                    <span className="text-vln-gray-dark text-xs">{article.source}</span>
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
