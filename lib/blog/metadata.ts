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
    slug: "vln-founder-meetup-oakland",
    title: "Connect with Oakland's Web3 Founder Community — Weekly Meetup",
    shortTitle: "VLN Founder Meetup in Oakland",
    description:
      "Join VLN's weekly founder meetup for web3 founders, CTOs, and security leaders. Drop-in networking and peer advisory every Wednesday 5-7 PM at The Crybaby in Oakland.",
    category: "Community",
    publishedDate: "2026-03-12",
    readTime: "8 min read",
    accent: "sage",
  },
  {
    slug: "top-smart-contract-vulnerabilities-defi",
    title: "Top Smart Contract Vulnerabilities Found in Bay Area DeFi Projects",
    shortTitle: "DeFi Vulnerabilities in Bay Area",
    description:
      "An analysis of the most common and critical smart contract vulnerabilities discovered in Bay Area DeFi projects.",
    category: "Security Research",
    publishedDate: "2025-01-15",
    readTime: "12 min read",
    accent: "sage",
  },
  {
    slug: "web3-security-checklist-bay-area-startups",
    title: "Web3 Security Checklist: Essential Practices for Bay Area Startups",
    shortTitle: "Web3 Security Checklist",
    description:
      "A comprehensive security checklist for Web3 projects launching in the Bay Area, covering smart contract audits, operational security, and incident response planning.",
    category: "Best Practices",
    publishedDate: "2025-02-01",
    readTime: "8 min read",
    accent: "blue",
  },
  {
    slug: "igaming-platform-security-audit-guide",
    title: "iGaming Platform Security: A Complete Audit Guide",
    shortTitle: "iGaming Security Audit Guide",
    description:
      "A comprehensive security audit guide for iGaming platforms — covering RNG integrity, wallet-flow risk, smart contract integration, API attack surface, and regulatory compliance for high-throughput gaming systems.",
    category: "Platform Security",
    publishedDate: "2025-03-10",
    readTime: "14 min read",
    accent: "amber",
  },
  {
    slug: "rng-manipulation-attacks-casino-platforms",
    title: "RNG Manipulation Attacks: How Casino Platforms Get Exploited",
    shortTitle: "RNG Manipulation Attacks",
    description:
      "A technical deep-dive into RNG manipulation attacks on casino and iGaming platforms — from block hash prediction on EVM chains to timing attacks on off-chain entropy sources.",
    category: "RNG Analysis",
    publishedDate: "2025-04-22",
    readTime: "16 min read",
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
