"use client";

import { Calendar } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PCBTraceBackground from "@/components/vln/pcb-trace-background";
import CSSFade from "@/components/animations/css-fade";
import Card from "@/components/ui/card";
import Script from "next/script";

export default function BookingContent() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      {/* Fixed Background - Optimized PCB Trace */}
      <PCBTraceBackground />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 pt-8 sm:pt-12 lg:pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade direction="up">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
                Schedule a <span className="text-gradient-rainbow">Consultation</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-vln-gray max-w-2xl mx-auto">
                Book a free 30-minute consultation with our security team. We&apos;ll discuss your project security needs and recommend the best solution.
              </p>
            </div>
          </CSSFade>
        </section>

        {/* Calendly Booking Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <CSSFade delay={100} direction="up">
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-vln-sage" />
                <h2 className="text-2xl sm:text-3xl font-bold text-vln-sage">
                  Select Your Available Time
                </h2>
              </div>
              <p className="text-center text-vln-gray text-base sm:text-lg">
                Choose a date and time that works best for you. All consultations are conducted via video call.
              </p>
            </div>

            {/* Calendly Embed Container */}
            <Card className="bg-vln-bg-light/30 border-vln-sage/10 p-6 sm:p-8">
              <div className="calendly-inline-widget" data-url="https://calendly.com/hello-jlucus/30min?background_color=0a0e0f&text_color=f8f9fa" style={{ minWidth: '320px', height: '700px' }}></div>
            </Card>
          </CSSFade>
        </section>

        {/* Alternative Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade delay={200} direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-vln-sage">
                Prefer Another Method?
              </h2>
              <Card className="glow-lift bg-vln-bg-light/50">
                <p className="text-vln-gray mb-6">
                  If you&apos;d prefer to reach out directly, you can contact us via email or schedule a callback.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:info@vln.gg"
                    className="px-6 py-3 rounded-vln border-2 border-vln-sage text-vln-sage hover:bg-vln-sage/10 transition-all"
                  >
                    Email Us
                  </a>
                  <a
                    href="/contact"
                    className="px-6 py-3 rounded-vln border-2 border-vln-bluegray text-vln-bluegray hover:bg-vln-bluegray/10 transition-all"
                  >
                    Contact Form
                  </a>
                </div>
              </Card>
            </div>
          </CSSFade>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Calendly Widget Script */}
      <Script src="https://assets.calendly.com/assets/external/widget.js" async />
    </div>
  );
}
