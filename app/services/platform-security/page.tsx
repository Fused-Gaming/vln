import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/vln/header';
import { Footer } from '@/components/vln/footer';
import { Hero } from '@/components/vln/hero';
import { Container, Section, Grid } from '@/components/vln';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui';
import { FeatureCard } from '@/components/vln/feature-card';

export const metadata: Metadata = {
  title: 'Platform Security Audits',
  description:
    'Comprehensive application security assessments for iGaming platforms including penetration testing, code review, and vulnerability analysis.',
};

export default function PlatformSecurityPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Platform Security"
          description="Comprehensive security assessments for high-throughput gaming platforms"
        >
          <Link href="/contact">
            <Button size="lg">Request Audit</Button>
          </Link>
        </Hero>

        <Section>
          <Container>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content - 2 columns */}
              <div className="space-y-8 lg:col-span-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-vln-sage md:text-3xl">
                    Overview
                  </h2>
                  <div className="space-y-4 text-base text-vln-gray-300 md:text-lg">
                    <p>
                      Our platform security service provides comprehensive
                      security assessments for iGaming platforms, identifying
                      vulnerabilities before they can be exploited by malicious
                      actors.
                    </p>
                    <p>
                      We combine automated scanning with manual penetration
                      testing and code review to ensure complete coverage of
                      your platform's attack surface.
                    </p>
                    <p>
                      With deep expertise in gaming-specific vulnerabilities
                      including payment processing, session management, and
                      real-time event handling, we provide security insights
                      tailored to your industry.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="mb-6 text-2xl font-bold text-vln-sage md:text-3xl">
                    What We Offer
                  </h2>
                  <Grid cols={2} gap="md">
                    <FeatureCard
                      title="Penetration Testing"
                      description="Simulated attacks to identify exploitable vulnerabilities in your platform"
                    />
                    <FeatureCard
                      title="Code Security Review"
                      description="Manual review of critical code paths for security flaws"
                    />
                    <FeatureCard
                      title="Vulnerability Assessment"
                      description="Comprehensive scanning and classification of security issues"
                    />
                    <FeatureCard
                      title="Security Architecture Review"
                      description="Analysis of system design for security best practices"
                    />
                  </Grid>
                </div>

                <div>
                  <h2 className="mb-6 text-2xl font-bold text-vln-sage md:text-3xl">
                    Our Process
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        step: '1',
                        title: 'Discovery',
                        description:
                          'Understanding your platform architecture, technology stack, and security requirements',
                      },
                      {
                        step: '2',
                        title: 'Assessment',
                        description:
                          'Comprehensive testing including automated scans, manual penetration testing, and code review',
                      },
                      {
                        step: '3',
                        title: 'Reporting',
                        description:
                          'Detailed vulnerability reports with CVSS scores, PoC exploits, and remediation guidance',
                      },
                      {
                        step: '4',
                        title: 'Remediation Support',
                        description:
                          'Re-testing and verification after fixes are implemented',
                      },
                    ].map(({ step, title, description }) => (
                      <Card key={step} className="flex gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-vln-sage/10 text-xl font-bold text-vln-sage">
                          {step}
                        </div>
                        <div>
                          <h3 className="mb-1 text-lg font-bold text-vln-sage">
                            {title}
                          </h3>
                          <p className="text-sm text-vln-bluegray">
                            {description}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="mb-6 text-2xl font-bold text-vln-sage md:text-3xl">
                    Deliverables
                  </h2>
                  <Card>
                    <ul className="space-y-3">
                      {[
                        'Detailed vulnerability report with severity ratings',
                        'Executive summary for stakeholders',
                        'Proof-of-concept exploits for critical findings',
                        'Prioritized remediation roadmap',
                        'Re-test verification report',
                      ].map((item) => (
                        <li key={item} className="flex items-start text-sm md:text-base">
                          <span className="mr-3 mt-1 text-vln-sage">→</span>
                          <span className="text-vln-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-6">
                <Card>
                  <h3 className="mb-4 text-xl font-bold text-vln-sage">
                    Quick Info
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="mb-1 font-medium text-vln-gray-200">
                        Duration
                      </p>
                      <p className="text-vln-bluegray">2-4 weeks</p>
                    </div>
                    <div>
                      <p className="mb-1 font-medium text-vln-gray-200">
                        Deliverables
                      </p>
                      <p className="text-vln-bluegray">5 reports</p>
                    </div>
                    <div>
                      <p className="mb-1 font-medium text-vln-gray-200">
                        Pricing
                      </p>
                      <p className="text-vln-bluegray">Contact for quote</p>
                    </div>
                  </div>
                  <Link href="/contact" className="mt-6 block">
                    <Button className="w-full">Get Quote</Button>
                  </Link>
                </Card>

                <Card>
                  <h3 className="mb-4 text-xl font-bold text-vln-sage">
                    Other Services
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/services/rng-analysis"
                        className="text-vln-bluegray transition-colors hover:text-vln-sage"
                      >
                        → RNG Analysis
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/smart-contracts"
                        className="text-vln-bluegray transition-colors hover:text-vln-sage"
                      >
                        → Smart Contract Audits
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/wallet-flow"
                        className="text-vln-bluegray transition-colors hover:text-vln-sage"
                      >
                        → Wallet Flow Analysis
                      </Link>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        <Section spacing="md" className="bg-vln-bg/60">
          <Container size="md">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-vln-sage md:text-3xl">
                Ready to Get Started?
              </h2>
              <p className="mb-8 text-base text-vln-bluegray md:text-lg">
                Request a platform security audit today.
              </p>
              <Link href="/contact">
                <Button size="lg">Request This Service</Button>
              </Link>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
