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
  title: 'About VLN',
  description:
    'Learn about VLN - elite security consulting for iGaming platforms and blockchain gaming systems.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="About VLN"
          description="Elite security for the next generation of gaming infrastructure"
        />

        <Section>
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-2xl font-bold text-vln-sage md:text-3xl">
                Our Mission
              </h2>
              <div className="space-y-4 text-base text-vln-gray-300 md:text-lg">
                <p>
                  VLN (Vulnerability Lab Network) provides elite,
                  mathematically-rigorous threat modeling and exploit detection
                  for gaming and EVM ecosystems. We specialize in securing
                  high-risk, high-throughput systems where security failures
                  can have immediate financial impact.
                </p>
                <p>
                  Our team combines deep expertise in application security,
                  cryptography, and blockchain technology to deliver
                  comprehensive security assessments tailored specifically for
                  the gaming industry.
                </p>
                <p>
                  Powered by Fused Gaming, we bring years of experience in
                  gaming infrastructure to every engagement, understanding both
                  the technical challenges and business requirements unique to
                  this space.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Section spacing="md" className="bg-vln-bg/60">
          <Container>
            <h2 className="mb-12 text-center text-2xl font-bold text-vln-sage md:text-3xl">
              Our Expertise
            </h2>
            <Grid cols={2} gap="lg">
              <FeatureCard
                title="iGaming Platforms"
                description="Deep understanding of gaming-specific vulnerabilities including RNG manipulation, payment processing, and session management"
              />
              <FeatureCard
                title="Blockchain Gaming"
                description="Expertise in smart contract security, tokenomics, and decentralized gaming infrastructure"
              />
              <FeatureCard
                title="High-Throughput Systems"
                description="Experience securing real-time systems handling thousands of concurrent users and transactions"
              />
              <FeatureCard
                title="Compliance & Regulation"
                description="Knowledge of gaming industry regulations and compliance requirements across jurisdictions"
              />
            </Grid>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-2xl font-bold text-vln-sage md:text-3xl">
                Why Choose VLN?
              </h2>
              <div className="space-y-6">
                <Card>
                  <h3 className="mb-2 text-lg font-bold text-vln-sage">
                    Industry Specialization
                  </h3>
                  <p className="text-sm text-vln-bluegray">
                    Unlike general security firms, we focus exclusively on
                    gaming and blockchain systems, bringing deep domain
                    expertise to every engagement.
                  </p>
                </Card>

                <Card>
                  <h3 className="mb-2 text-lg font-bold text-vln-sage">
                    Comprehensive Approach
                  </h3>
                  <p className="text-sm text-vln-bluegray">
                    We combine automated scanning with manual penetration
                    testing and code review, ensuring complete coverage of your
                    attack surface.
                  </p>
                </Card>

                <Card>
                  <h3 className="mb-2 text-lg font-bold text-vln-sage">
                    Actionable Results
                  </h3>
                  <p className="text-sm text-vln-bluegray">
                    Our reports include detailed remediation guidance,
                    proof-of-concept exploits, and prioritized roadmaps to help
                    you address vulnerabilities effectively.
                  </p>
                </Card>

                <Card>
                  <h3 className="mb-2 text-lg font-bold text-vln-sage">
                    Ongoing Support
                  </h3>
                  <p className="text-sm text-vln-bluegray">
                    We provide re-testing verification and ongoing consultation
                    to ensure your platform remains secure as it evolves.
                  </p>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        <Section spacing="md" className="bg-vln-bg/60">
          <Container size="md">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-vln-sage md:text-3xl">
                Ready to Secure Your Platform?
              </h2>
              <p className="mb-8 text-base text-vln-bluegray md:text-lg">
                Get in touch with our team to discuss your security needs.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button size="lg">Request Audit</Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="secondary">
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
