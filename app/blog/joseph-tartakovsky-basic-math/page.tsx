import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Joseph Tartakovsky, US Attorney, Needs to Learn Basic Math | VLN Insights",
  description:
    "Critical analysis of mathematical errors in legal arguments. How calculation failures impact cases and policy.",
  keywords: ["legal analysis", "mathematics", "errors", "policy"],
  alternates: {
    canonical: "https://vln.gg/blog/joseph-tartakovsky-basic-math",
  },
  openGraph: {
    title: "Joseph Tartakovsky Math Errors | VLN",
    description: "Critical analysis of mathematical errors in legal arguments.",
    url: "https://vln.gg/blog/joseph-tartakovsky-basic-math",
    type: "article",
  },
};

export default function TartakovskyMathPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Joseph Tartakovsky, US Attorney, Needs to Learn Basic Math",
    description: "Critical analysis of mathematical errors in legal arguments.",
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
    datePublished: "2026-02-15",
    dateModified: "2026-03-12",
    url: "https://vln.gg/blog/joseph-tartakovsky-basic-math",
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
                <span className="text-vln-gray-dark text-sm">Legal Analysis</span>
                <span className="text-vln-gray-dark">•</span>
                <span className="text-vln-gray-dark text-sm">February 15, 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                Joseph Tartakovsky, US Attorney:{" "}
                <span className="text-gradient-rainbow">Learning Basic Math</span>
              </h1>

              <p className="text-lg sm:text-xl text-vln-gray leading-relaxed mb-8">
                A critical examination of mathematical errors in legal arguments and their broader implications for justice and policy.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Legal Analysis", "Mathematics", "Error Analysis", "Policy"].map((tag) => (
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
                  This critical analysis examines how mathematical errors in legal arguments can undermine justice. Read the full article on{" "}
                  <a
                    href="https://www.linkedin.com/pulse/joseph-tartakovsky-us-attorney-needs-learn-basic-math-jesse-lucus-mku0e"
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
                <h2 className="text-2xl font-bold text-vln-white mb-3">Precision in Analysis</h2>
                <p className="text-vln-gray mb-6">
                  VLN applies mathematical rigor to security analysis and audit findings.
                </p>
                <Button variant="primary" size="lg" href="/contact?service=audits" className="group">
                  Learn More
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
