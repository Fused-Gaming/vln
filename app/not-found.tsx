"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";
import { AlertTriangle, Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32 min-h-[70vh] flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <CSSFade direction="up">
              <div className="inline-flex items-center justify-center p-6 rounded-vln bg-vln-amber/10 border-2 border-vln-amber/40 mb-8">
                <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 text-vln-amber" />
              </div>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-tight">
                <span className="text-gradient-rainbow">404</span>
              </h1>
            </CSSFade>

            <CSSFade delay={300} direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-vln-white">
                Vulnerability Not Found
              </h2>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <p className="text-xl sm:text-2xl text-vln-gray max-w-2xl mx-auto leading-relaxed">
                Unlike our security audits, this page doesn&apos;t exist. But don&apos;t worry—we&apos;ve got you covered.
              </p>
            </CSSFade>

            <CSSFade delay={600} direction="up">
              <div className="p-6 sm:p-8 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light max-w-2xl mx-auto">
                <p className="text-lg text-vln-gray mb-6">
                  It looks like you&apos;ve stumbled upon a dead end. Here are some helpful links to get you back on track:
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    href="/"
                    className="w-full group"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    href="/services"
                    className="w-full group"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    View Services
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-vln-sage/20">
                  <p className="text-sm text-vln-gray-dark mb-4">
                    Or explore these popular pages:
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <a
                      href="/pricing"
                      className="text-sm text-vln-sage hover:underline transition-colors"
                    >
                      Pricing
                    </a>
                    <span className="text-vln-gray-dark">•</span>
                    <a
                      href="/faq"
                      className="text-sm text-vln-sage hover:underline transition-colors"
                    >
                      FAQ
                    </a>
                    <span className="text-vln-gray-dark">•</span>
                    <a
                      href="/about"
                      className="text-sm text-vln-sage hover:underline transition-colors"
                    >
                      About Us
                    </a>
                    <span className="text-vln-gray-dark">•</span>
                    <a
                      href="/contact"
                      className="text-sm text-vln-sage hover:underline transition-colors"
                    >
                      Contact
                    </a>
                    <span className="text-vln-gray-dark">•</span>
                    <a
                      href="/get-help"
                      className="text-sm text-vln-sage hover:underline transition-colors"
                    >
                      Get Help
                    </a>
                  </div>
                </div>
              </div>
            </CSSFade>

            <CSSFade delay={800}>
              <div className="pt-8">
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-2 text-vln-gray hover:text-vln-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Go back to previous page</span>
                </button>
              </div>
            </CSSFade>

            <CSSFade delay={1000}>
              <div className="mt-12 p-6 rounded-vln border border-vln-bluegray/20 bg-vln-bluegray/5">
                <p className="text-sm text-vln-gray">
                  <strong className="text-vln-white">Security Tip:</strong> If you believe this page should exist or you&apos;ve found a broken link on our site, please{" "}
                  <a href="/contact" className="text-vln-sage hover:underline">
                    let us know
                  </a>
                  . We take security and user experience seriously.
                </p>
              </div>
            </CSSFade>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
