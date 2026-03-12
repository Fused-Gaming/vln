import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import { MapPin, Clock, Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://vln.gg"),
  title: "Join VLN Founders Network - Weekly Meetup in Oakland",
  description:
    "Connect with web3 founders, builders, and security leaders. VLN weekly founder meetup every Wednesday 5-7 PM at The Crybaby in Oakland, CA.",
  keywords: [
    "founder meetup",
    "web3 founders",
    "Oakland networking",
    "blockchain founders",
    "VLN founders",
    "tech networking",
    "startup community",
    "founder community",
  ],
  openGraph: {
    title: "Join VLN Founders Network - Every Wednesday in Oakland",
    description:
      "Connect with founders and builders at The Crybaby. Weekly meetup for tech leadership and networking. 5-7 PM PT.",
    url: "https://vln.gg/founder-meetup",
    type: "website",
    images: [
      {
        url: "https://vln.gg/api/events/meetup/og",
        width: 1200,
        height: 630,
        alt: "VLN Founders Network Meetup Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join VLN Founders Network - Every Wednesday in Oakland",
    description:
      "Connect with web3 founders and builders. Weekly meetup at The Crybaby, Oakland. 5-7 PM PT.",
    images: ["https://vln.gg/api/events/meetup/og"],
  },
  alternates: {
    canonical: "https://vln.gg/founder-meetup",
  },
};

export default function FounderMeetupPage() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      {/* Background */}
      <ICBoardBackground />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <CSSFade direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vln-sage/10 border border-vln-sage/30 mb-4">
                <Sparkles className="w-4 h-4 text-vln-sage" />
                <span className="text-vln-sage text-sm font-medium">
                  VLN Founders Network
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Connect with{" "}
                <span className="text-gradient-rainbow">Builders</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl md:text-3xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                Every Wednesday at The Crybaby in Oakland
              </p>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <p className="text-base sm:text-lg text-vln-gray max-w-2xl mx-auto">
                Join web3 founders, CTOs, and security leaders for networking,
                peer advisory, and insider insights from VLN.
              </p>
            </CSSFade>

            <CSSFade delay={600} direction="up">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="https://lu.ma/vlnfounders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-vln bg-vln-sage text-vln-bg hover:shadow-[0_0_8px_#a6c3a7] transition-all"
                >
                  Join on Luma
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="https://linkedin.com/company/vlngg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-vln border-2 border-vln-bluegray text-vln-bluegray hover:bg-vln-bluegray hover:text-vln-bg hover:shadow-[0_0_8px_#aab7c8] transition-all"
                >
                  Share on LinkedIn
                </a>
              </div>
            </CSSFade>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8 lg:gap-12">
              {/* Location Card */}
              <CSSFade>
                <div className="p-6 sm:p-8 rounded-vln border border-vln-sage/30 bg-vln-bg-light">
                  <div className="flex items-start gap-4 mb-6">
                    <MapPin className="w-8 h-8 text-vln-sage flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-vln-white mb-2">
                        Location
                      </h3>
                      <p className="text-vln-white font-semibold mb-2">
                        The Crybaby
                      </p>
                      <p className="text-vln-gray text-sm font-mono">
                        1928 Telegraph Ave
                        <br />
                        Oakland, CA 94612
                        <br />
                        United States
                      </p>
                      <a
                        href="https://maps.google.com/?q=1928+Telegraph+Ave+Oakland+CA+94612"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 mt-4 text-xs font-semibold rounded-vln border-2 border-vln-bluegray text-vln-bluegray hover:bg-vln-bluegray hover:text-vln-bg hover:shadow-[0_0_8px_#aab7c8] transition-all"
                      >
                        Open in Maps
                      </a>
                    </div>
                  </div>
                </div>
              </CSSFade>

              {/* Time Card */}
              <CSSFade delay={200}>
                <div className="p-6 sm:p-8 rounded-vln border border-vln-bluegray/30 bg-vln-bg-light">
                  <div className="flex items-start gap-4 mb-6">
                    <Clock className="w-8 h-8 text-vln-bluegray flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-vln-white mb-2">
                        When
                      </h3>
                      <p className="text-vln-white font-semibold mb-1">
                        Every Wednesday
                      </p>
                      <p className="text-vln-gray text-sm mb-4">
                        5:00 PM – 7:00 PM PT
                      </p>
                      <div className="text-xs text-vln-gray-dark">
                        <p>No RSVP required</p>
                        <p>Come whenever works for you</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CSSFade>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <CSSFade>
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  What to <span className="text-vln-sage">Expect</span>
                </h2>
                <p className="text-vln-gray text-lg max-w-2xl mx-auto">
                  Direct access to founders, security leaders, and VLN experts
                </p>
              </div>
            </CSSFade>

            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Users,
                  title: "Founder Network",
                  description:
                    "Direct access to web3 founders and CTOs building in the space",
                },
                {
                  icon: Sparkles,
                  title: "Peer Advisory",
                  description:
                    "Get advice from experienced founders and technical leaders",
                },
                {
                  icon: MapPin,
                  title: "Local Community",
                  description:
                    "Connect with the Oakland tech and web3 community",
                },
                {
                  icon: Clock,
                  title: "Casual Format",
                  description:
                    "Drop-in format, no formal agenda, just great conversations",
                },
              ].map((item, index) => (
                <CSSFade key={index} delay={index * 100}>
                  <div className="p-6 rounded-vln border border-vln-sage/20 bg-vln-bg">
                    <item.icon className="w-8 h-8 text-vln-sage mb-4" />
                    <h3 className="text-lg font-bold text-vln-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-vln-gray text-sm">{item.description}</p>
                  </div>
                </CSSFade>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <CSSFade>
              <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  See You <span className="text-vln-sage">Wednesday</span>?
                </h2>
                <p className="text-vln-gray text-lg">
                  No RSVP required. Just show up and connect.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href="https://lu.ma/vlnfounders"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-vln bg-vln-sage text-vln-bg hover:shadow-[0_0_8px_#a6c3a7] transition-all"
                  >
                    Join on Luma
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <Button
                    variant="secondary"
                    size="xl"
                    href="/"
                    className="group"
                  >
                    Back to VLN
                  </Button>
                </div>

                <div className="pt-8 border-t border-vln-sage/20">
                  <p className="text-vln-gray-dark text-sm">
                    Questions? Reach out to us at{" "}
                    <a
                      href="mailto:hello@vln.gg"
                      className="text-vln-sage hover:text-vln-white transition-colors"
                    >
                      hello@vln.gg
                    </a>
                  </p>
                </div>
              </div>
            </CSSFade>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
