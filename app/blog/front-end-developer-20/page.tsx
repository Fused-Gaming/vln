import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Only Front-End Developer You'll Ever Need ($20) | VLN Insights",
  description:
    "Revolutionary approach to front-end development at scale. Discover how to build and maintain modern web applications efficiently.",
  keywords: ["front-end development", "development strategy", "efficiency"],
  alternates: {
    canonical: "https://vln.gg/blog/front-end-developer-20",
  },
  openGraph: {
    title: "The Only Front-End Developer You'll Ever Need | VLN",
    description: "Revolutionary approach to front-end development at scale.",
    url: "https://vln.gg/blog/front-end-developer-20",
    type: "article",
  },
};

export default function FrontEndDeveloperPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Only Front-End Developer You'll Ever Need ($20)",
    description: "Revolutionary approach to front-end development at scale.",
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
    datePublished: "2026-03-02",
    dateModified: "2026-03-12",
    url: "https://vln.gg/blog/front-end-developer-20",
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
                <span className="text-vln-gray-dark text-sm">Development</span>
                <span className="text-vln-gray-dark">•</span>
                <span className="text-vln-gray-dark text-sm">March 2, 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                The Only Front-End Developer{" "}
                <span className="text-gradient-rainbow">You'll Ever Need ($20)</span>
              </h1>

              <p className="text-lg sm:text-xl text-vln-gray leading-relaxed mb-8">
                Challenging conventional wisdom about development costs and efficiency. Learn how modern tools and approaches are transforming front-end development economics.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Front-End Development", "Efficiency", "Tools", "Economics"].map((tag) => (
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
                  This thought-provoking piece examines modern front-end development economics and efficiency. Read the full article on{" "}
                  <a
                    href="https://www.linkedin.com/pulse/only-front-end-developer-you-ever-need-20-jesse-lucus-bnudc"
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
                <h2 className="text-2xl font-bold text-vln-white mb-3">Building Development Teams?</h2>
                <p className="text-vln-gray mb-6">
                  Interested in discussing development strategy and efficiency?
                </p>
                <Button variant="primary" size="lg" href="/contact" className="group">
                  Get In Touch
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
