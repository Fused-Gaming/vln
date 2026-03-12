import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Drake Suing Eddie: Fingered Aiden KYC Fraud | VLN Insights",
  description:
    "Analysis of the Drake and Eddie controversy involving KYC fraud and identity verification failures. Learn about verification vulnerabilities in high-profile cases.",
  keywords: [
    "KYC fraud",
    "identity verification",
    "fraud detection",
    "verification failures",
    "financial crime",
  ],
  alternates: {
    canonical: "https://vln.gg/blog/drake-suing-eddie-kyc-fraud",
  },
  openGraph: {
    title: "Drake Suing Eddie: Fingered Aiden KYC Fraud | VLN",
    description: "Analysis of KYC fraud vulnerabilities in high-profile cases.",
    url: "https://vln.gg/blog/drake-suing-eddie-kyc-fraud",
    type: "article",
  },
};

export default function DrakeSuingEddiePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Drake Suing Eddie: Fingered Aiden KYC Fraud",
    description:
      "Analysis of KYC fraud vulnerabilities in high-profile cases.",
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
    datePublished: "2026-03-08",
    dateModified: "2026-03-12",
    url: "https://vln.gg/blog/drake-suing-eddie-kyc-fraud",
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
                <span className="text-vln-gray-dark text-sm">Commentary</span>
                <span className="text-vln-gray-dark">•</span>
                <span className="text-vln-gray-dark text-sm">March 8, 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                Drake Suing Eddie:{" "}
                <span className="text-gradient-rainbow">Fingered Aiden KYC Fraud</span>
              </h1>

              <p className="text-lg sm:text-xl text-vln-gray leading-relaxed mb-8">
                A deep-dive into identity verification failures and KYC fraud vulnerabilities exposed in high-profile disputes. What we can learn about verification systems when stakes are highest.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["KYC", "Identity Verification", "Fraud Detection", "Case Analysis"].map((tag) => (
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
                  This article explores the verification vulnerabilities exposed in the Drake and Eddie controversy, specifically examining how identity verification systems failed to prevent KYC (Know Your Customer) fraud. Read the full analysis on{" "}
                  <a
                    href="https://www.linkedin.com/pulse/drake-suing-eddie-fingered-aiden-kyc-fraud-jesse-lucus-tnrgc"
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
                <h2 className="text-2xl font-bold text-vln-white mb-3">Want to Discuss This?</h2>
                <p className="text-vln-gray mb-6">
                  Have insights on KYC fraud or identity verification? Let&apos;s discuss security in financial systems.
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
