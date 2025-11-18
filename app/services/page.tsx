import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/vln/header';
import { Footer } from '@/components/vln/footer';
import { Hero } from '@/components/vln/hero';
import { Container, Section, Grid } from '@/components/vln';
import { ServiceCard } from '@/components/vln/service-card';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Security Services',
  description:
    'Enterprise-grade security consulting services for iGaming platforms and blockchain systems.',
};

const services = [
  {
    title: 'Platform Security',
    description:
      'Comprehensive application security assessments including penetration testing, code review, and vulnerability analysis for high-throughput gaming platforms.',
    href: '/services/platform-security',
    features: [
      'Penetration Testing',
      'Code Security Review',
      'Vulnerability Assessment',
      'Security Architecture Review',
    ],
  },
  {
    title: 'RNG Analysis',
    description:
      'Statistical validation and cryptographic review of random number generators to ensure fairness and compliance in gaming systems.',
    href: '/services/rng-analysis',
    features: [
      'Statistical Distribution Analysis',
      'Cryptographic RNG Review',
      'Predictability Testing',
      'Compliance Certification',
    ],
  },
  {
    title: 'Smart Contract Auditing',
    description:
      'EVM security audits with formal verification for Solidity and Vyper smart contracts, protecting blockchain gaming assets.',
    href: '/services/smart-contracts',
    features: [
      'Manual Code Review',
      'Automated Static Analysis',
      'Formal Verification',
      'Gas Optimization',
    ],
  },
  {
    title: 'Wallet Flow Analysis',
    description:
      'Transaction pattern analysis and fraud detection for gaming wallets, identifying risks and suspicious activities.',
    href: '/services/wallet-flow',
    features: [
      'Transaction Pattern Analysis',
      'Fraud Detection',
      'Risk Modeling',
      'AML/KYC Compliance',
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Security Services"
          description="Enterprise-grade security consulting for iGaming platforms and blockchain systems"
        >
          <Link href="/contact">
            <Button size="lg">Request Audit</Button>
          </Link>
        </Hero>

        <Section>
          <Container>
            <Grid cols={2} gap="lg">
              {services.map((service) => (
                <ServiceCard key={service.href} {...service} />
              ))}
            </Grid>
          </Container>
        </Section>

        <Section spacing="md" className="bg-vln-bg/60">
          <Container size="md">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-vln-sage md:text-3xl">
                Ready to Secure Your Platform?
              </h2>
              <p className="mb-8 text-base text-vln-bluegray md:text-lg">
                Get started with a comprehensive security assessment today.
              </p>
              <Link href="/contact">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
