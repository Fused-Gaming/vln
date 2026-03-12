import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";
import { MapPin, Clock, Users, Sparkles, Calendar, Coffee } from "lucide-react";

export const metadata: Metadata = {
  title: "VLN Founder Meetup: Connect with Oakland's Web3 Community | VLN",
  description:
    "Join VLN's weekly founder meetup in Oakland. Connect with web3 founders, CTOs, and security leaders every Wednesday 5-7 PM at The Crybaby for networking, peer advisory, and insider insights.",
  keywords: [
    "founder meetup Oakland",
    "web3 founders network",
    "blockchain founders meetup",
    "Oakland tech founders",
    "VLN founder community",
    "web3 networking",
    "startup founder meetup",
    "Bay Area blockchain founders",
    "founder advisory network",
    "tech founder community",
  ],
  alternates: {
    canonical: "https://blog.vln.gg/vln-founder-meetup-oakland",
  },
  openGraph: {
    title: "VLN Founder Meetup: Connect with Oakland's Web3 Community",
    description:
      "Join VLN's weekly founder meetup every Wednesday 5-7 PM at The Crybaby in Oakland. Network with web3 founders, CTOs, and security leaders.",
    url: "https://blog.vln.gg/vln-founder-meetup-oakland",
    type: "article",
  },
};

const meetupBenefits = [
  {
    icon: Users,
    title: "Direct Founder Network",
    description:
      "Access to web3 founders, CTOs, and technical leaders actively building in the space. Get advice from experienced founders who've navigated fundraising, product-market fit, and scaling.",
  },
  {
    icon: Sparkles,
    title: "Peer Advisory & Insights",
    description:
      "Discuss challenges with founders facing similar problems. Get unfiltered feedback on your security approach, technical architecture, and risk management strategy from security experts.",
  },
  {
    icon: Coffee,
    title: "Casual, Drop-in Format",
    description:
      "No formal agenda or required RSVP. Show up whenever works for you. Mix of structured conversations and organic networking. Perfect for introverts and extroverts alike.",
  },
  {
    icon: MapPin,
    title: "Premium Venue",
    description:
      "The Crybaby is a craft cocktail bar in the heart of downtown Oakland with an intimate, professional atmosphere — ideal for meaningful conversations and relationship building.",
  },
];

const whoAttends = [
  {
    role: "Founders",
    description: "Building the next generation of blockchain and web3 applications",
  },
  {
    role: "CTOs & Technical Leads",
    description: "Responsible for architecture, security, and technical strategy",
  },
  {
    role: "Security Leaders",
    description: "Blockchain security researchers, auditors, and risk managers",
  },
  {
    role: "Investors",
    description: "VCs and angels interested in web3 security and compliance",
  },
];

export default function FounderMeetupBlog() {
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
          <div className="max-w-3xl mx-auto">
            <CSSFade direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vln-sage/10 border border-vln-sage/30 mb-6">
                <Sparkles className="w-4 h-4 text-vln-sage" />
                <span className="text-vln-sage text-sm font-medium">
                  Community & Networking
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                Connect with Oakland's Web3{" "}
                <span className="text-gradient-rainbow">Founder Community</span>
              </h1>

              <p className="text-xl text-vln-gray leading-relaxed mb-8">
                Introducing VLN's weekly founder meetup — a drop-in gathering for web3 founders, CTOs, and security leaders to network, exchange insights, and build lasting relationships.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="xl"
                  href="/founder-meetup"
                  className="group"
                >
                  View Event Details
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Button>
                <a
                  href="https://luma.com/calendar/manage/cal-YfSqBlVF8hIcxiv?new=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-vln border-2 border-vln-sage text-vln-sage hover:bg-vln-sage hover:text-vln-bg hover:shadow-[0_0_8px_#a6c3a7] transition-all"
                >
                  Register on Luma
                </a>
              </div>

              <div className="mt-8 p-6 rounded-vln border border-vln-sage/30 bg-vln-bg-light">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-vln-sage mb-1">Every Wednesday</div>
                    <div className="text-sm text-vln-gray">Recurring meetup</div>
                  </div>
                  <div className="text-center border-l border-r border-vln-sage/20 sm:border-r">
                    <div className="text-2xl font-bold text-vln-sage mb-1">5-7 PM PT</div>
                    <div className="text-sm text-vln-gray">Drop-in anytime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-vln-sage mb-1">The Crybaby</div>
                    <div className="text-sm text-vln-gray">Oakland venue</div>
                  </div>
                </div>
              </div>
            </CSSFade>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <CSSFade>
                <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                  Why We're Doing This
                </h2>

                <div className="space-y-6 text-vln-gray leading-relaxed">
                  <p>
                    Building in web3 is hard. The technical challenges are real — smart contract security, RNG integrity, wallet-flow risk, regulatory compliance. But the human challenges are often harder.
                  </p>

                  <p>
                    As a founder, you need more than just advisors. You need peers who understand the unique pressures of building in blockchain. You need to exchange war stories with other CTOs who've debugged reentrancy exploits. You need to learn from security leaders who've recovered millions from hacks.
                  </p>

                  <p>
                    That's why VLN started a weekly founder meetup in Oakland. It's a space to talk openly about the hard problems — security vulnerabilities you've discovered, architectural decisions you're wrestling with, fundraising challenges specific to web3, team scaling, and investor expectations around security.
                  </p>

                  <p>
                    No pitching. No formal agenda. Just founders, CTOs, and security experts connecting over great cocktails.
                  </p>
                </div>
              </CSSFade>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <CSSFade>
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  What You'll Get Out of It
                </h2>
                <p className="text-vln-gray text-lg max-w-2xl mx-auto">
                  Real connections with founders solving real problems in web3
                </p>
              </div>
            </CSSFade>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {meetupBenefits.map((benefit, idx) => (
                <CSSFade key={idx} delay={idx * 100}>
                  <div className="p-6 rounded-vln border border-vln-sage/20 bg-vln-bg">
                    <benefit.icon className="w-8 h-8 text-vln-sage mb-4" />
                    <h3 className="text-lg font-bold text-vln-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-vln-gray text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </CSSFade>
              ))}
            </div>
          </div>
        </section>

        {/* Who Attends */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <CSSFade>
                <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                  Who Attends
                </h2>

                <div className="space-y-4">
                  {whoAttends.map((attendee, idx) => (
                    <CSSFade key={idx} delay={idx * 100}>
                      <div className="p-4 rounded-vln border border-vln-bluegray/20 bg-vln-bg-light hover:border-vln-bluegray/40 transition-all">
                        <div className="font-semibold text-vln-sage mb-1">
                          {attendee.role}
                        </div>
                        <p className="text-vln-gray text-sm">
                          {attendee.description}
                        </p>
                      </div>
                    </CSSFade>
                  ))}
                </div>
              </CSSFade>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <CSSFade>
                <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                  Event Details
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Calendar className="w-6 h-6 text-vln-sage flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-vln-white mb-1">When</h3>
                      <p className="text-vln-gray">
                        Every Wednesday
                        <br />
                        5:00 PM – 7:00 PM PT
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-vln-sage flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-vln-white mb-1">Where</h3>
                      <p className="text-vln-gray">
                        The Crybaby
                        <br />
                        1928 Telegraph Ave
                        <br />
                        Oakland, CA 94612, United States
                      </p>
                      <a
                        href="https://maps.google.com/?q=1928+Telegraph+Ave+Oakland+CA+94612"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-vln-sage hover:text-vln-white transition-colors text-sm font-medium"
                      >
                        Open in Maps →
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Coffee className="w-6 h-6 text-vln-sage flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-vln-white mb-1">Format</h3>
                      <p className="text-vln-gray">
                        Drop-in (no RSVP required)
                        <br />
                        Casual networking and peer advisory
                        <br />
                        No formal agenda
                      </p>
                    </div>
                  </div>
                </div>
              </CSSFade>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <CSSFade>
                <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                  Frequently Asked
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      q: "Do I need to RSVP?",
                      a: "No. It's a drop-in format. Show up whenever works for you. If you want to register on Luma for reminders, you can do that too.",
                    },
                    {
                      q: "What if I can't make every week?",
                      a: "No problem. Come whenever you can. Some founders come weekly, others come once a month. Whatever works for your schedule.",
                    },
                    {
                      q: "Will this be a sales pitch?",
                      a: "Absolutely not. We've intentionally designed this as a peer-to-peer space. No pitching, no product demos, no sales. Just founders talking to founders.",
                    },
                    {
                      q: "What should I expect at The Crybaby?",
                      a: "It's a craft cocktail bar with an intimate, professional atmosphere. You can grab a drink, order food, and find groups having conversations. We typically gather in the back/lounge area.",
                    },
                    {
                      q: "Is this VLN's client recruitment event?",
                      a: "Not at all. This is genuinely about building community. Yes, you might meet VLN team members, but they're there as founders and peers — not to pitch services.",
                    },
                    {
                      q: "Can I bring guests?",
                      a: "Yes, bring other founders, CTOs, or technical leaders you think would find value. The more good people in the room, the better.",
                    },
                  ].map((faq, idx) => (
                    <CSSFade key={idx} delay={idx * 100}>
                      <div className="border-b border-vln-sage/20 pb-6 last:border-b-0">
                        <h3 className="font-semibold text-vln-white mb-2">
                          {faq.q}
                        </h3>
                        <p className="text-vln-gray">{faq.a}</p>
                      </div>
                    </CSSFade>
                  ))}
                </div>
              </CSSFade>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <CSSFade>
              <div className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  See You <span className="text-vln-sage">Wednesday</span>?
                </h2>
                <p className="text-vln-gray text-lg">
                  Drop by The Crybaby anytime between 5-7 PM. No commitment, no agenda, just good conversations.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href="https://luma.com/calendar/manage/cal-YfSqBlVF8hIcxiv?new=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-vln bg-vln-sage text-vln-bg hover:shadow-[0_0_8px_#a6c3a7] transition-all"
                  >
                    Register on Luma
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <Button variant="secondary" size="xl" href="/founder-meetup">
                    View Event Page
                  </Button>
                </div>

                <div className="pt-8 border-t border-vln-sage/20">
                  <p className="text-vln-gray-dark text-sm">
                    Questions? Email us at{" "}
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

        {/* Related Resources */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <CSSFade>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  More from VLN
                </h2>
                <p className="text-vln-gray">
                  Explore resources for founders building secure web3 applications
                </p>
              </div>
            </CSSFade>

            <div className="max-w-2xl mx-auto grid gap-4">
              <CSSFade>
                <a
                  href="https://blog.vln.gg/web3-security-checklist-bay-area-startups"
                  className="p-6 rounded-vln border border-vln-sage/20 bg-vln-bg-light hover:border-vln-sage/40 transition-all"
                >
                  <h3 className="font-semibold text-vln-white mb-2">
                    Web3 Security Checklist for Bay Area Startups
                  </h3>
                  <p className="text-vln-gray text-sm">
                    Essential security practices before launch — smart contract audits, operational security, and incident response planning.
                  </p>
                </a>
              </CSSFade>

              <CSSFade delay={100}>
                <a
                  href="https://blog.vln.gg/igaming-platform-security-audit-guide"
                  className="p-6 rounded-vln border border-vln-bluegray/20 bg-vln-bg-light hover:border-vln-bluegray/40 transition-all"
                >
                  <h3 className="font-semibold text-vln-white mb-2">
                    iGaming Platform Security: Complete Audit Guide
                  </h3>
                  <p className="text-vln-gray text-sm">
                    Comprehensive security audit guide covering RNG integrity, wallet-flow risk, smart contract integration, and compliance.
                  </p>
                </a>
              </CSSFade>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
