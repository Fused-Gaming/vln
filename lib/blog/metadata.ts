/**
 * Blog Post Metadata
 *
 * Centralized blog metadata for dynamic OG generation, RSS feed, sitemap, and indexing.
 * Used by /app/blog/[slug]/opengraph-image.tsx and /app/api/blog/rss/route.ts.
 *
 * Canonical URLs use blog.vln.gg — the blog subdomain routes to /blog/* via middleware.
 */

export interface BlogPost {
  slug: string;
  title: string;
  shortTitle?: string; // For OG truncation if needed
  description: string;
  category: string;
  publishedDate: string;
  readTime?: string;
  accent?: "sage" | "blue" | "amber" | "purple"; // OG accent color
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "drake-suing-eddie-kyc-fraud",
    title: "Drake Suing Eddie: Fingered Aiden KYC Fraud",
    description:
      "Analysis of the Drake and Eddie controversy involving KYC fraud and identity verification failures. Learn about verification vulnerabilities in high-profile cases.",
    category: "Commentary",
    publishedDate: "2026-03-08",
    readTime: "6 min read",
    accent: "purple",
  },
  {
    slug: "2026-affiliate-marketing-blueprint",
    title: "The 2026 Affiliate Marketing Blueprint",
    description:
      "A comprehensive guide to affiliate marketing strategies for 2026. Learn effective tactics, structure, and implementation for successful affiliate programs.",
    category: "Business Strategy",
    publishedDate: "2026-03-05",
    readTime: "9 min read",
    accent: "blue",
  },
  {
    slug: "front-end-developer-20",
    title: "The Only Front-End Developer You'll Ever Need ($20)",
    description:
      "Revolutionary approach to front-end development at scale. Discover how to build and maintain modern web applications efficiently.",
    category: "Development",
    publishedDate: "2026-03-02",
    readTime: "7 min read",
    accent: "sage",
  },
  {
    slug: "igaming-platform-security-audit-guide",
    title: "iGaming Platform Security: A Complete Audit Guide",
    shortTitle: "iGaming Security Audit Guide",
    description:
      "A comprehensive security audit guide for iGaming platforms — covering RNG integrity, wallet-flow risk, smart contract integration, API attack surface, and regulatory compliance for high-throughput gaming systems.",
    category: "Platform Security",
    publishedDate: "2026-03-10",
    readTime: "14 min read",
    accent: "amber",
  },
  {
    slug: "treating-history-as-ongoing-defect",
    title: "Treating History as an Ongoing Defect",
    description:
      "A philosophical examination of how we approach historical patterns as ongoing problems. Understanding cycles, defects, and system improvement.",
    category: "Philosophy",
    publishedDate: "2026-02-25",
    readTime: "5 min read",
    accent: "purple",
  },
  {
    slug: "rng-manipulation-attacks-casino-platforms",
    title: "RNG Manipulation Attacks: How Casino Platforms Get Exploited",
    shortTitle: "RNG Manipulation Attacks",
    description:
      "A technical deep-dive into RNG manipulation attacks on casino and iGaming platforms — from block hash prediction on EVM chains to timing attacks on off-chain entropy sources.",
    category: "RNG Analysis",
    publishedDate: "2026-02-28",
    readTime: "16 min read",
    accent: "purple",
  },
  {
    slug: "notorious-whales-seven-siblings",
    title: "Notorious Whales Known as 7 Siblings",
    description:
      "Analysis of major market players and their coordinated activities. Understanding whale behavior and market dynamics.",
    category: "Market Analysis",
    publishedDate: "2026-02-20",
    readTime: "8 min read",
    accent: "amber",
  },
  {
    slug: "web3-security-checklist-bay-area-startups",
    title: "Web3 Security Checklist: Essential Practices for Bay Area Startups",
    shortTitle: "Web3 Security Checklist",
    description:
      "A comprehensive security checklist for Web3 projects launching in the Bay Area, covering smart contract audits, operational security, and incident response planning.",
    category: "Best Practices",
    publishedDate: "2026-02-15",
    readTime: "8 min read",
    accent: "blue",
  },
  {
    slug: "joseph-tartakovsky-basic-math",
    title: "Joseph Tartakovsky, US Attorney, Needs to Learn Basic Math",
    description:
      "Critical analysis of mathematical errors in legal arguments. How calculation failures impact cases and policy.",
    category: "Legal Analysis",
    publishedDate: "2026-02-15",
    readTime: "7 min read",
    accent: "sage",
  },
  {
    slug: "saved-27400-legal-fees-subscription",
    title: "How I Saved Someone $27,400 in Legal Fees With a $20 Subscription",
    description:
      "A case study in cost-effective solutions and strategic resource allocation. How proper systems can save enormous sums.",
    category: "Case Study",
    publishedDate: "2026-02-10",
    readTime: "6 min read",
    accent: "blue",
  },
  {
    slug: "porn-id-government-worker",
    title: "Now You Need ID to Watch Porn? You're a Government Worker",
    description:
      "Analysis of digital identity verification requirements and government policy implications.",
    category: "Policy Analysis",
    publishedDate: "2026-02-05",
    readTime: "6 min read",
    accent: "amber",
  },
  {
    slug: "top-smart-contract-vulnerabilities-defi",
    title: "Top Smart Contract Vulnerabilities Found in Bay Area DeFi Projects",
    shortTitle: "DeFi Vulnerabilities in Bay Area",
    description:
      "An analysis of the most common and critical smart contract vulnerabilities discovered in Bay Area DeFi projects.",
    category: "Security Research",
    publishedDate: "2026-02-01",
    readTime: "12 min read",
    accent: "sage",
  },
  {
    slug: "sold-drugs-marketplace-interview",
    title: "I Sold Drugs: Marketplace Built by a Man I'm Interviewing",
    description:
      "An interview-based exploration of underground marketplace dynamics, system design, and the people behind illegal commerce infrastructure.",
    category: "Interview",
    publishedDate: "2026-01-30",
    readTime: "10 min read",
    accent: "purple",
  },
];

/**
 * Get blog post metadata by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/**
 * Get all published blog post slugs (for sitemap, RSS, etc.)
 */
export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}
