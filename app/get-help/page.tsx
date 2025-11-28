"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";
import { MessageCircle, Mail, Clock, Zap } from "lucide-react";

export default function GetHelpPage() {
  const supportOptions = [
    {
      icon: Zap,
      title: "Emergency Response",
      description: "Contract hacked? Funds at risk? Get immediate 24/7 incident response.",
      action: "Contact Emergency Team",
      href: "/contact?service=emergency",
      color: "amber" as const,
      urgent: true
    },
    {
      icon: MessageCircle,
      title: "Live Chat Support",
      description: "Quick questions about our services? Chat with our team on Telegram.",
      action: "Open Telegram Chat",
      href: "https://t.me/vlngg",
      color: "sage" as const,
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "General inquiries, quotes, or detailed questions.",
      action: "Send Email",
      href: "mailto:info@vln.gg",
      color: "blue" as const,
    },
    {
      icon: Clock,
      title: "Schedule Consultation",
      description: "Book a free 30-minute security consultation with our team.",
      action: "Schedule Call",
      href: "/contact?type=consultation",
      color: "purple" as const,
    },
  ];

  const faqs = [
    {
      q: "How quickly can you respond to an emergency?",
      a: "Our incident response team is available 24/7. For active exploits or imminent threats, we can typically begin assessment within 1-2 hours of contact."
    },
    {
      q: "What information should I have ready?",
      a: "For audits: contract code, documentation, and deployment details. For emergencies: transaction hashes, contract addresses, and timeline of events."
    },
    {
      q: "Do you offer support in different timezones?",
      a: "Yes, our team operates globally and can accommodate calls and meetings across all major timezones."
    },
  ];

  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
            <CSSFade direction="up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Get <span className="text-gradient-rainbow">Help</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl md:text-3xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                We&apos;re here to help secure your smart contracts
              </p>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <p className="text-base sm:text-lg text-vln-gray max-w-2xl mx-auto">
                Whether you need emergency incident response, have questions about our services, or want to schedule a consultation, our team is ready to assist.
              </p>
            </CSSFade>
          </div>
        </section>

        {/* Support Options */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <StaggerFade staggerDelay={150} className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              const colorClasses = {
                sage: 'border-vln-sage/20 hover:border-vln-sage/40 text-vln-sage bg-vln-sage/10 glow-lift',
                blue: 'border-vln-bluegray/20 hover:border-vln-bluegray/40 text-vln-bluegray bg-vln-bluegray/10 glow-lift-blue',
                amber: 'border-vln-amber/20 hover:border-vln-amber/40 text-vln-amber bg-vln-amber/10 glow-lift-amber',
                purple: 'border-vln-purple/20 hover:border-vln-purple/40 text-vln-purple bg-vln-purple/10 glow-lift-purple',
              };

              return (
                <div
                  key={index}
                  className={`relative p-6 sm:p-8 rounded-vln border-2 ${colorClasses[option.color].split(' ')[0]} ${colorClasses[option.color].split(' ')[1]} bg-vln-bg-light transition-all duration-300 ${colorClasses[option.color].split(' ').slice(-1)[0]} hover:-translate-y-1`}
                >
                  {option.urgent && (
                    <div className="absolute -top-3 -right-3">
                      <span className="px-3 py-1 rounded-full bg-vln-amber text-vln-bg text-xs font-bold uppercase animate-pulse">
                        24/7
                      </span>
                    </div>
                  )}

                  <div className={`inline-flex items-center justify-center p-3 rounded-vln ${colorClasses[option.color].split(' ')[3]} mb-4`}>
                    <Icon className={`w-6 h-6 ${colorClasses[option.color].split(' ')[2]}`} />
                  </div>

                  <h3 className={`text-2xl font-bold mb-3 ${colorClasses[option.color].split(' ')[2]}`}>
                    {option.title}
                  </h3>

                  <p className="text-vln-gray leading-relaxed mb-6">
                    {option.description}
                  </p>

                  <Button
                    variant={option.urgent ? 'primary' : 'secondary'}
                    size="lg"
                    href={option.href}
                    className="w-full"
                  >
                    {option.action}
                  </Button>
                </div>
              );
            })}
          </StaggerFade>
        </section>

        {/* Quick FAQ */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 bg-vln-bg-light">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Quick <span className="text-vln-sage">Answers</span>
            </h2>
          </CSSFade>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <CSSFade key={index} delay={index * 100}>
                <div className="p-6 rounded-vln border border-vln-sage/20 bg-vln-bg">
                  <h3 className="text-lg font-bold text-vln-white mb-2">{faq.q}</h3>
                  <p className="text-vln-gray">{faq.a}</p>
                </div>
              </CSSFade>
            ))}
          </div>

          <CSSFade delay={400}>
            <div className="text-center mt-12">
              <p className="text-vln-gray mb-4">Need more answers?</p>
              <Button variant="secondary" size="lg" href="/faq">
                View Full FAQ
              </Button>
            </div>
          </CSSFade>
        </section>

        {/* Contact Info */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade>
            <div className="max-w-3xl mx-auto text-center p-8 sm:p-12 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Direct Contact Information
              </h2>
              <div className="space-y-3 text-lg text-vln-gray">
                <p>
                  <strong className="text-vln-white">Emergency Response:</strong>{" "}
                  <a href="mailto:emergency@vln.gg" className="text-vln-amber hover:underline">
                    emergency@vln.gg
                  </a>
                </p>
                <p>
                  <strong className="text-vln-white">General Inquiries:</strong>{" "}
                  <a href="mailto:info@vln.gg" className="text-vln-sage hover:underline">
                    info@vln.gg
                  </a>
                </p>
                <p>
                  <strong className="text-vln-white">Telegram:</strong>{" "}
                  <a href="https://t.me/vlngg" target="_blank" rel="noopener noreferrer" className="text-vln-bluegray hover:underline">
                    @vlngg
                  </a>
                </p>
                <p>
                  <strong className="text-vln-white">Response Time:</strong>{" "}
                  <span className="text-vln-white">Emergency: 1-2 hours | General: 24 hours</span>
                </p>
              </div>
            </div>
          </CSSFade>
        </section>
      </main>

      <Footer />
    </div>
  );
}
