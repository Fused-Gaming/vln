"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";
import EmployeeCard from "@/components/vln/employee-card";
import { Shield, Target, Users, Award } from "lucide-react";

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
      telegram: "https://t.me/supitsj"
    },
    {
      name: "Jamie Vargas",
      role: "Security Operations & Incident Response",
      shortIntro: "Incident response specialist with expertise in blockchain forensics, threat intelligence, and rapid vulnerability mitigation. First responder for critical security incidents.",
      fullBio: "Jamie Vargas leads VLN's incident response operations, coordinating rapid response to security threats and coordinating vulnerability disclosures. With a background in cybersecurity operations and digital forensics, Jamie has successfully managed numerous critical security incidents.\n\nJamie specializes in on-chain forensics, helping trace stolen funds and identify attack vectors in real-time. She works closely with law enforcement and has assisted in recovering over $5M in compromised assets.",
      github: "https://github.com/jmenichole",
      linkedin: "https://www.linkedin.com/in/jmenichole0",
      email: "jmenichole@vln.gg",
      telegram: "https://t.me/jmenichole"
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
              />
            ))}
          </StaggerFade>
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
