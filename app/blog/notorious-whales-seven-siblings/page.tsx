import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Notorious Whales Known as 7 Siblings | VLN Insights",
  description:
    "Analysis of major market players and their coordinated activities. Understanding whale behavior and market dynamics.",
  keywords: ["market analysis", "whales", "trading", "market dynamics"],
  alternates: {
    canonical: "https://vln.gg/blog/notorious-whales-seven-siblings",
  },
  openGraph: {
    title: "Notorious Whales Known as 7 Siblings | VLN",
    description: "Analysis of major market players and their coordinated activities.",
    url: "https://vln.gg/blog/notorious-whales-seven-siblings",
    type: "article",
  },
};

export default function NotoriousWhalesPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Notorious Whales Known as 7 Siblings",
    description: "Analysis of major market players and their coordinated activities.",
    author: {
      "@type": "Person",
      name: "Jesse Lucus",
      url: "https://linkedin.com/in/supitsj",
    },
    publisher: {
      "@type": "Organization",
      name: "VLN - Vulnerability Lab Network",
      logo: "https://vln.gg/vln-logo-dark.svg",
    },
    datePublished: "2026-02-20",
    dateModified: "2026-03-12",
    url: "https://vln.gg/blog/notorious-whales-seven-siblings",
  };

  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
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
                <span className="text-vln-gray-dark text-sm">Market Analysis</span>
                <span className="text-vln-gray-dark">•</span>
                <span className="text-vln-gray-dark text-sm">February 20, 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                Notorious Whales Known as{" "}
                <span className="text-gradient-rainbow">7 Siblings</span>
              </h1>

              <p className="text-lg sm:text-xl text-vln-gray leading-relaxed mb-8">
                An investigation into major market players who coordinate activities. Understanding their strategies, patterns, and market impact.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Market Analysis", "Trading", "Whale Behavior", "Coordination"].map((tag) => (
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

        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-24">
          <div className="max-w-4xl mx-auto space-y-8">
            <CSSFade>
              <article className="prose prose-invert max-w-none">
                <p className="text-vln-gray leading-relaxed">
                  This in-depth analysis examines notorious market whales and their coordinated activities. Read the full report on{" "}
                  <a
                    href="https://www.linkedin.com/pulse/notorious-whales-known-7-siblings-jesse-lucus-xjbme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-vln-sage hover:text-vln-bluegray transition-colors"
                  >
                    LinkedIn
                  </a>
                  .
                </p>
              </article>
            </CSSFade>

            <CSSFade>
              <div className="p-6 sm:p-8 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift text-center">
                <h2 className="text-2xl font-bold text-vln-white mb-3">Market Security & Forensics</h2>
                <p className="text-vln-gray mb-6">
                  Need help analyzing market patterns or investigating suspicious activity?
                </p>
                <Button variant="primary" size="lg" href="/contact?service=forensics" className="group">
                  Talk To Our Team
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
              </div>
            </CSSFade>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
