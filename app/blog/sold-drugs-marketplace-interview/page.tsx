import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";

export const metadata: Metadata = {
  title: "I Sold Drugs: Marketplace Built by a Man I'm Interviewing | VLN Insights",
  description:
    "An interview-based exploration of underground marketplace dynamics, system design, and the people behind illegal commerce infrastructure.",
  keywords: ["marketplace", "interview", "dark web", "case study"],
  alternates: {
    canonical: "https://vln.gg/blog/sold-drugs-marketplace-interview",
  },
  openGraph: {
    title: "I Sold Drugs: Marketplace Interview | VLN",
    description: "An interview-based exploration of underground marketplace dynamics and system design.",
    url: "https://vln.gg/blog/sold-drugs-marketplace-interview",
    type: "article",
  },
};

export default function DrugMarketplacePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "I Sold Drugs: Marketplace Built by a Man I'm Interviewing",
    description: "An interview-based exploration of underground marketplace dynamics and system design.",
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
    datePublished: "2026-01-30",
    dateModified: "2026-03-12",
    url: "https://vln.gg/blog/sold-drugs-marketplace-interview",
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
                <span className="text-vln-gray-dark text-sm">Interview</span>
                <span className="text-vln-gray-dark">•</span>
                <span className="text-vln-gray-dark text-sm">January 30, 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                I Sold Drugs:{" "}
                <span className="text-gradient-rainbow">Marketplace Built by a Man I&apos;m Interviewing</span>
              </h1>

              <p className="text-lg sm:text-xl text-vln-gray leading-relaxed mb-8">
                A candid interview exploring underground marketplace dynamics, system design, and the stories of people behind illegal commerce infrastructure.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Interview", "Marketplace", "Case Study", "Systems Analysis"].map((tag) => (
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
                  This revealing interview explores underground marketplace design, security vulnerabilities, and system dynamics. Read the full interview on{" "}
                  <a
                    href="https://www.linkedin.com/pulse/i-sold-drugs-marketplace-built-man-im-interview-jesse-lucus-ml7he"
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
                <h2 className="text-2xl font-bold text-vln-white mb-3">Underground Marketplace Security</h2>
                <p className="text-vln-gray mb-6">
                  VLN researches platform security across all network types and use cases.
                </p>
                <Button variant="primary" size="lg" href="/contact?service=research" className="group">
                  Learn About Our Research
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
