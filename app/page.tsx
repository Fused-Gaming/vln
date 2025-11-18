import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/vln/header';
import { Footer } from '@/components/vln/footer';
import { Hero } from '@/components/vln/hero';
import { Container, Section, Grid } from '@/components/vln';
import { FeatureCard } from '@/components/vln/feature-card';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title={
            <>
              <span className="bg-gradient-to-r from-vln-sage to-vln-bluegray bg-clip-text text-transparent">
                VLN.gg
              </span>
            </>
          }
          description="iGaming Security & Smart Contract Intelligence"
        >
          <Link href="/contact">
            <Button size="lg">Request Audit</Button>
          </Link>
          <Link href="/services">
            <Button size="lg" variant="secondary">
              View Services
            </Button>
          </Link>
        </Hero>

        <Section>
          <Container>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-lg leading-relaxed text-vln-gray-300 md:text-xl">
                Enterprise-grade security consulting, RNG analysis, wallet-flow
                risk modeling, and EVM smart contract auditing for high-risk,
                high-throughput gaming systems.
              </p>
            </div>

            <Grid cols={3} gap="lg">
              <FeatureCard
                title="Platform Security"
                description="Comprehensive application security assessments including penetration testing and code review"
              />
              <FeatureCard
                title="RNG Analysis"
                description="Statistical validation and cryptographic review of random number generators"
              />
              <FeatureCard
                title="Smart Contracts"
                description="EVM security audits with formal verification for blockchain gaming"
              />
            </Grid>
          </Container>
        </Section>

        <Section spacing="md" className="bg-vln-bg/60">
          <Container size="md">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-vln-sage md:text-3xl">
                Elite Security for Gaming Infrastructure
              </h2>
              <p className="mb-8 text-base text-vln-bluegray md:text-lg">
                Trusted by high-throughput gaming platforms for comprehensive
                security assessments and vulnerability analysis.
              </p>
              <Link href="/about">
                <Button variant="secondary">Learn More About Us</Button>
              </Link>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
