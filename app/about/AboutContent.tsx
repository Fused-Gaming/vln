"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";
import EmployeeCard from "@/components/vln/employee-card";
import { Shield, Target, Users, Award, Mic, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We treat every line of code as a potential attack vector. Our rigorous methodology has maintained a 100% post-audit success rate.",
      color: "sage" as const
    },
    {
      icon: Target,
      title: "Precision & Thoroughness",
      description: "We don't just find bugs—we provide CVSS-scored findings, proof-of-concept exploits, and detailed remediation guidance.",
      color: "blue" as const
    },
    {
      icon: Users,
      title: "Client Partnership",
      description: "Your success is our success. We work collaboratively, provide free fix verification, and offer ongoing support.",
      color: "amber" as const
    },
    {
      icon: Award,
      title: "Excellence & Integrity",
      description: "We maintain the highest professional standards, backed by government clearances and expert testimony experience.",
      color: "purple" as const
    },
  ];

  const milestones = [
    { year: "2013", event: "Founded Fused Gaming", description: "Began developing secure gaming infrastructure" },
    { year: "2018", event: "First Blockchain Audit", description: "Transitioned expertise to smart contract security" },
    { year: "2021", event: "VLN Launched", description: "Established dedicated vulnerability research lab" },
    { year: "2023", event: "Expert Testimony", description: "Provided expert witness testimony in major DeFi exploit case" },
    { year: "2024", event: "47 Critical Vulns Found", description: "Discovered and helped remediate critical vulnerabilities across audited projects" },
    { year: "2025", event: "$5.2M Recovered", description: "Assisted in recovering stolen funds through forensic analysis" },
  ];

  const employees = [
    {
      name: "J. Lucus",
      role: "Lead Security Researcher",
      shortIntro: "Expert in smart contract security with over 8 years of experience auditing DeFi protocols and blockchain gaming platforms. Specialized in finding critical vulnerabilities before they reach production.",
      fullBio: "J. Lucus brings deep expertise in smart contract security, having audited over 100 blockchain projects across DeFi, NFT, and gaming sectors. With a background in cryptography and distributed systems, J. has discovered numerous critical vulnerabilities and developed innovative security testing methodologies.\n\nJ. holds government security clearances and has provided expert testimony in several high-profile blockchain exploit cases, helping recover millions in stolen funds.",
      github: "https://github.com/jlucus",
      linkedin: "https://www.linkedin.com/in/supitsj",
      email: "j.lucus@vln.gg",
      telegram: "https://t.me/supitsj",
      imageUrl: "https://avatars.githubusercontent.com/jlucus"
    },
    {
      name: "Jamie Vargas",
      role: "Security Operations & Incident Response",
      shortIntro: "Incident response specialist with expertise in blockchain forensics, threat intelligence, and rapid vulnerability mitigation. First responder for critical security incidents.",
      fullBio: "Jamie Vargas leads VLN's incident response operations, coordinating rapid response to security threats and coordinating vulnerability disclosures. With a background in cybersecurity operations and digital forensics, Jamie has successfully managed numerous critical security incidents.\n\nJamie specializes in on-chain forensics, helping trace stolen funds and identify attack vectors in real-time. She works closely with law enforcement and has assisted in recovering over $5M in compromised assets.",
      github: "https://github.com/jmenichole",
      linkedin: "https://www.linkedin.com/in/jmenichole0",
      email: "jmenichole@vln.gg",
      telegram: "https://t.me/jmenichole",
      imageUrl: "https://avatars.githubusercontent.com/jmenichole"
    }
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
                About <span className="text-gradient-rainbow">VLN</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl md:text-3xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                Elite security research lab protecting blockchain gaming and DeFi
              </p>
            </CSSFade>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-vln-bg-light">
          <CSSFade>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-vln-sage">Mission</span>
              </h2>
              <p className="text-lg sm:text-xl text-vln-gray leading-relaxed mb-6">
                VLN exists to make blockchain gaming and DeFi safer. We believe that security isn&apos;t an afterthought—it&apos;s a fundamental requirement for building trust in decentralized systems.
              </p>
              <p className="text-lg sm:text-xl text-vln-gray leading-relaxed">
                Through rigorous auditing, proactive threat modeling, and rapid incident response, we protect billions of dollars in user funds and ensure that vulnerabilities are found by defenders, not attackers.
              </p>
            </div>
          </CSSFade>
        </section>

        {/* Our Story */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <CSSFade>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
                Our <span className="text-vln-bluegray">Story</span>
              </h2>
            </CSSFade>

            <div className="space-y-6 text-vln-gray text-lg leading-relaxed">
              <CSSFade delay={200}>
                <p>
                  VLN (Vulnerability Lab Network) was born from <strong className="text-vln-white">12 years of experience</strong> securing high-stakes systems at Fused Gaming. Our founders cut their teeth building secure infrastructure for iGaming platforms handling millions of dollars in daily transactions.
                </p>
              </CSSFade>

              <CSSFade delay={400}>
                <p>
                  When blockchain gaming emerged, we recognized that the same security principles—threat modeling, attack surface analysis, and defense-in-depth—applied to smart contracts. But the stakes were even higher: <strong className="text-vln-white">immutable code, irreversible transactions, and billions of dollars at risk.</strong>
                </p>
              </CSSFade>

              <CSSFade delay={600}>
                <p>
                  In 2021, we launched VLN as a dedicated security research lab focused exclusively on blockchain gaming and DeFi. We&apos;ve since audited dozens of projects, discovered <strong className="text-vln-white">47 critical vulnerabilities</strong>, assisted in recovering <strong className="text-vln-white">$5.2M in stolen funds</strong>, and maintained a <strong className="text-vln-white">100% post-audit success rate</strong>—zero hacks for projects that implemented our recommendations.
                </p>
              </CSSFade>

              <CSSFade delay={800}>
                <p>
                  Our team includes government-cleared security researchers, smart contract experts with hundreds of audits under their belts, and forensic analysts who&apos;ve provided expert testimony in major legal cases.
                </p>
              </CSSFade>

              <CSSFade delay={1000}>
                <p>
                  We&apos;re not just auditors—we&apos;re <strong className="text-vln-white">security partners</strong> invested in your long-term success. That&apos;s why we offer free fix verification, rapid critical bug reporting, and ongoing support through retainer packages.
                </p>
              </CSSFade>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center">
              Meet the <span className="text-vln-sage">Team</span>
            </h2>
          </CSSFade>

          <StaggerFade staggerDelay={150} className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {employees.map((employee, index) => (
              <EmployeeCard
                key={index}
                name={employee.name}
                role={employee.role}
                shortIntro={employee.shortIntro}
                fullBio={employee.fullBio}
                github={employee.github}
                linkedin={employee.linkedin}
                email={employee.email}
                telegram={employee.telegram}
                imageUrl={employee.imageUrl}
              />
            ))}
          </StaggerFade>
        </section>

        {/* Keynote Speaking */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 bg-vln-bg-light">
          <CSSFade>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mic className="w-6 h-6 text-vln-amber" />
              <p className="text-vln-amber text-sm font-mono uppercase tracking-widest">Keynote Speaking</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
              Book a <span className="text-vln-amber">Keynote Speaker</span>
            </h2>
            <p className="text-vln-gray text-lg text-center max-w-2xl mx-auto mb-12">
              Bring a firsthand perspective on cybercrime, social engineering, and the adversary mindset to your next conference, corporate event, or security awareness program.
            </p>
          </CSSFade>

          <CSSFade>
            <div className="max-w-4xl mx-auto">
              <div className="p-6 sm:p-10 rounded-vln border-2 border-vln-amber/20 hover:border-vln-amber/40 bg-vln-bg transition-all duration-300 glow-lift-amber">
                <div className="flex flex-col sm:flex-row gap-8 items-start">

                  {/* Photo */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-vln overflow-hidden border-2 border-vln-amber/30">
                      <Image
                        src="/brett-johnson.jpg"
                        alt="Brett Johnson — Keynote Speaker"
                        fill
                        className="object-cover object-top"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/placeholder-avatar.svg";
                        }}
                      />
                    </div>
                    {/* Credential badge */}
                    <div className="mt-3 text-center">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-vln-amber/10 border border-vln-amber/30 text-vln-amber">
                        The Original Internet Godfather
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-3xl sm:text-4xl font-bold text-vln-white mb-1">Brett Johnson</h3>
                    <p className="text-vln-amber font-medium mb-4">Cybercrime Expert &amp; Keynote Speaker</p>

                    <p className="text-vln-gray leading-relaxed mb-4">
                      Brett Johnson is one of the world&apos;s leading authorities on cybercrime, identity theft, and social engineering. Once listed on the US Secret Service&apos;s Most Wanted list and the architect of ShadowCrew — the predecessor to every modern cybercrime forum — Brett now channels that experience into elite security education for enterprises, governments, and conferences worldwide.
                    </p>
                    <p className="text-vln-gray leading-relaxed mb-6">
                      His talks bridge the gap between the attacker&apos;s mindset and practical defense, delivered with unmatched credibility and authenticity. Brett has spoken for the FBI, Secret Service, INTERPOL, financial institutions, and Fortune 500 companies, and is a trusted advisor to VLN on adversarial threat modeling and social engineering defense.
                    </p>

                    {/* Speaking topics */}
                    <div className="mb-6">
                      <p className="text-xs font-mono uppercase tracking-widest text-vln-gray-dark mb-3">Speaking Topics</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "The Cybercriminal Mindset",
                          "Social Engineering & Manipulation",
                          "Identity Theft & Account Takeover",
                          "Cybercrime Evolution",
                          "Security Awareness Culture",
                          "Insider Threat",
                        ].map((topic) => (
                          <span
                            key={topic}
                            className="px-3 py-1 rounded-full text-xs font-medium border border-vln-amber/20 bg-vln-amber/5 text-vln-amber"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Engagement Pricing */}
                    <div className="mb-6 p-4 rounded-vln border border-vln-amber/15 bg-vln-amber/5">
                      <p className="text-xs font-mono uppercase tracking-widest text-vln-gray-dark mb-3">Engagement Pricing</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { tier: "Virtual Keynote",    price: "Starting at $15,000", detail: "Live remote presentation, Q&A, 60–90 min" },
                          { tier: "In-Person Keynote",  price: "Starting at $25,000", detail: "On-site delivery, travel included, 60–90 min" },
                          { tier: "Workshop / Training", price: "Starting at $35,000", detail: "Half or full day, custom curriculum, team deep-dive" },
                        ].map(({ tier, price, detail }) => (
                          <div key={tier} className="p-3 rounded-vln bg-vln-bg border border-vln-amber/10">
                            <p className="text-xs font-mono text-vln-gray-dark mb-1">{tier}</p>
                            <p className="text-vln-amber font-semibold text-sm mb-1">{price}</p>
                            <p className="text-vln-gray text-xs leading-relaxed">{detail}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-vln-gray-dark text-xs mt-3">
                        All engagements include pre-event consultation, customized content, and post-event follow-up materials. Contact us for multi-event, retainer, and non-profit rates.
                      </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="primary"
                        size="md"
                        href="/contact?service=keynote&speaker=brett-johnson"
                        className="group border-vln-amber text-vln-amber hover:bg-vln-amber hover:text-vln-bg glow-lift-amber"
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        Book Brett for Your Event
                        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </Button>
                      <a
                        href="https://www.brettjohnson.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-vln border border-vln-amber/30 hover:border-vln-amber/60 text-vln-amber text-sm font-medium transition-all duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        brettjohnson.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CSSFade>
        </section>

        {/* Core Values */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 bg-vln-bg-light">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center">
              Our <span className="text-vln-purple">Core Values</span>
            </h2>
          </CSSFade>

          <StaggerFade staggerDelay={150} className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              const colorClasses = {
                sage: 'border-vln-sage/20 hover:border-vln-sage/40 text-vln-sage bg-vln-sage/10 glow-lift',
                blue: 'border-vln-bluegray/20 hover:border-vln-bluegray/40 text-vln-bluegray bg-vln-bluegray/10 glow-lift-blue',
                amber: 'border-vln-amber/20 hover:border-vln-amber/40 text-vln-amber bg-vln-amber/10 glow-lift-amber',
                purple: 'border-vln-purple/20 hover:border-vln-purple/40 text-vln-purple bg-vln-purple/10 glow-lift-purple',
              };

              return (
                <div
                  key={index}
                  className={`p-6 sm:p-8 rounded-vln border-2 ${colorClasses[value.color].split(' ')[0]} ${colorClasses[value.color].split(' ')[1]} bg-vln-bg transition-all duration-300 ${colorClasses[value.color].split(' ').slice(-1)[0]} hover:-translate-y-1`}
                >
                  <div className={`inline-flex items-center justify-center p-3 rounded-vln ${colorClasses[value.color].split(' ')[3]} mb-4`}>
                    <Icon className={`w-6 h-6 ${colorClasses[value.color].split(' ')[2]}`} />
                  </div>

                  <h3 className={`text-2xl font-bold mb-3 ${colorClasses[value.color].split(' ')[2]}`}>
                    {value.title}
                  </h3>

                  <p className="text-vln-gray leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </StaggerFade>
        </section>

        {/* Timeline */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center">
              Our <span className="text-vln-sage">Journey</span>
            </h2>
          </CSSFade>

          <div className="max-w-4xl mx-auto">
            <StaggerFade staggerDelay={100} className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-20 sm:w-24 text-right">
                    <span className="text-2xl sm:text-3xl font-bold text-vln-sage">
                      {milestone.year}
                    </span>
                  </div>

                  <div className="flex-shrink-0 w-px h-full bg-vln-sage/20 relative">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-vln-sage"></div>
                  </div>

                  <div className="flex-1 pb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-vln-white mb-2">
                      {milestone.event}
                    </h3>
                    <p className="text-vln-gray">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </StaggerFade>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 bg-vln-bg-light">
          <CSSFade>
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 p-8 sm:p-12 rounded-vln border-2 border-vln-sage/20 bg-vln-bg glow-lift">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Ready to work with VLN?
              </h2>
              <p className="text-xl text-vln-gray max-w-2xl mx-auto">
                Join dozens of blockchain gaming and DeFi projects that trust VLN to secure their smart contracts.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="primary" size="xl" href="/contact" className="group">
                  Get Free 30-Min Scan
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <Button variant="secondary" size="xl" href="/services">
                  View Our Services
                </Button>
              </div>
            </div>
          </CSSFade>
        </section>
      </main>

      <Footer />
    </div>
  );
}
