import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How I Saved Someone $27,400 in Legal Fees With a $20 Subscription | VLN",
  description:
    "A case study in cost-effective solutions and strategic resource allocation. How proper systems can save enormous sums.",
  keywords: ["cost savings", "legal strategy", "efficiency", "resource management"],
  alternates: {
    canonical: "https://vln.gg/blog/saved-27400-legal-fees-subscription",
  },
  openGraph: {
    title: "Saved $27,400 Legal Fees With $20 Subscription | VLN",
    description: "A case study in cost-effective solutions and strategic resource allocation.",
    url: "https://vln.gg/blog/saved-27400-legal-fees-subscription",
    type: "article",
  },
};

export default function SavedLegalFeesPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How I Saved Someone $27,400 in Legal Fees With a $20 Subscription",
    description: "A case study in cost-effective solutions and strategic resource allocation.",
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
    datePublished: "2026-02-10",
    dateModified: "2026-03-12",
    url: "https://vln.gg/blog/saved-27400-legal-fees-subscription",
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
                <span className="text-vln-gray-dark text-sm">Case Study</span>
                <span className="text-vln-gray-dark">•</span>
                <span className="text-vln-gray-dark text-sm">February 10, 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                How I Saved Someone{" "}
                <span className="text-gradient-rainbow">$27,400 in Legal Fees</span>
              </h1>

              <p className="text-lg sm:text-xl text-vln-gray leading-relaxed mb-8">
                A powerful case study in leveraging the right tools and knowledge. Sometimes the best solutions are the most cost-effective ones.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Case Study", "Cost Savings", "Legal Strategy", "Efficiency"].map((tag) => (
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
                  This compelling case study shows how strategic thinking and proper tools can deliver extraordinary value. Read the full story on{" "}
                  <a
                    href="https://www.linkedin.com/pulse/how-i-saved-someone-27400-legal-fees-20-subscription-jesse-lucus-nbrde"
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
                <h2 className="text-2xl font-bold text-vln-white mb-3">Strategic Problem Solving</h2>
                <p className="text-vln-gray mb-6">
                  VLN applies this same strategic thinking to security challenges and risk mitigation.
                </p>
                <Button variant="primary" size="lg" href="/contact" className="group">
                  Discuss Your Challenge
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
