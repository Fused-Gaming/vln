/**
 * Blog Post Metadata
 *
 * Centralized blog metadata for dynamic OG generation and indexing.
 * Used by /app/blog/[slug]/opengraph-image.tsx for dynamic OG titles.
 */

export interface BlogPost {
  slug: string;
  title: string;
  shortTitle?: string; // For OG truncation if needed
  description: string;
  category: string;
  publishedDate: string;
  accent?: "sage" | "blue" | "amber" | "purple"; // OG accent color
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "top-smart-contract-vulnerabilities-defi",
    title: "Top Smart Contract Vulnerabilities Found in Bay Area DeFi Projects",
    shortTitle: "DeFi Vulnerabilities in Bay Area",
    description:
      "An analysis of the most common and critical smart contract vulnerabilities discovered in Bay Area DeFi projects.",
    category: "Security Research",
    publishedDate: "2025-01-15",
    accent: "sage",
  },
  {
    slug: "web3-security-checklist-bay-area-startups",
    title: "Web3 Security Checklist: Essential Practices for Bay Area Startups",
    shortTitle: "Web3 Security Checklist",
    description:
      "A comprehensive security checklist for Web3 projects launching in the Bay Area, covering smart contract audits, operational security, and incident response planning.",
    category: "Best Practices",
    publishedDate: "2025-02-10",
    accent: "blue",
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
