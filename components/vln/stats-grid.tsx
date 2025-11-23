"use client";

import StatCard from './stat-card';
import CSSFade from '@/components/animations/css-fade';
import StaggerFade from '@/components/animations/stagger-fade';

/**
 * Pre-configured stats grid for VLN homepage
 * Displays 8 key trust metrics
 */
export default function StatsGrid() {
  const stats = [
    { number: '47', label: 'Critical Vulns Discovered', color: 'sage' as const },
    { number: '$5.2M', label: 'Funds Recovered Through Forensics', color: 'blue' as const },
    { number: '200+', label: 'Developers Trained in Secure Practices', color: 'amber' as const },
    { number: '100%', label: 'Zero Post-Audit Hacks', color: 'purple' as const },
    { number: '12', label: 'Years Blockchain Security Experience', color: 'sage' as const },
    { number: '3', label: 'Legal Cases Supported w/ Expert Testimony', color: 'blue' as const },
    { number: '48', label: 'Hours Critical Bug Reporting SLA', color: 'amber' as const },
    { number: '24/7', label: 'Forensics Response Available', color: 'purple' as const },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <CSSFade>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">
            Proven <span className="text-vln-sage">Track Record</span>
          </h2>
        </CSSFade>

        <StaggerFade
          staggerDelay={100}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              color={stat.color}
              animated={true}
            />
          ))}
        </StaggerFade>
      </div>
    </section>
  );
}
