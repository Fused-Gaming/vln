"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
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

            <CSSFade delay={400}>
              <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift">
                <p className="text-lg text-vln-gray mb-6">
                  Our blog is coming soon! We'll be publishing:
                </p>
                <ul className="text-left space-y-3 mb-8 text-vln-gray">
                  <li>✓ Deep-dive vulnerability case studies</li>
                  <li>✓ Smart contract security best practices</li>
                  <li>✓ Post-mortem analyses of major exploits</li>
                  <li>✓ Threat intelligence and emerging attack vectors</li>
                  <li>✓ Secure coding tutorials and workshops</li>
                </ul>
                <p className="text-vln-gray mb-6">
                  Subscribe to stay updated on our latest security research and insights.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="primary" size="lg" href="/contact?subject=newsletter" className="w-full sm:w-auto">
                    Subscribe to Newsletter
                  </Button>
                  <Button variant="secondary" size="lg" href="/" className="w-full sm:w-auto">
                    Back to Home
                  </Button>
                </div>
              </div>
            </CSSFade>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
