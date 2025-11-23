"use client";

import { Shield, Search, GraduationCap, BookOpen, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import CSSFade from '@/components/animations/css-fade';
import StaggerFade from '@/components/animations/stagger-fade';
import Button from '@/components/ui/button';

interface ServicePillar {
  icon: typeof Shield;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  turnaround: string;
  cta: string;
  ctaHref: string;
  color: 'sage' | 'amber' | 'blue' | 'purple';
}

/**
 * Service Pillars - 4 core VLN offerings
 * Prevention, Forensics, Training, Education
 */
export default function ServicePillars() {
  const services: ServicePillar[] = [
    {
      icon: Shield,
      title: 'Prevention',
      subtitle: 'Smart Contract Audits',
      description:
        'Comprehensive vulnerability discovery, CVSS scoring, PoC development, and fix verification for EVM smart contracts.',
      price: '$2K-10K',
      turnaround: '3-7 days',
      cta: 'Start Free 30-Min Scan',
      ctaHref: '/contact?service=prevention',
      color: 'sage',
    },
    {
      icon: Search,
      title: 'Forensics',
      subtitle: 'Post-Exploit Investigation',
      description:
        'Emergency response, fund tracing, exploit analysis, expert testimony, and court-ready reports for legal proceedings.',
      price: '$15K-50K',
      turnaround: '< 24hr response',
      cta: '24/7 Emergency Hotline',
      ctaHref: '/contact?service=forensics',
      color: 'amber',
    },
    {
      icon: GraduationCap,
      title: 'Training',
      subtitle: 'Corporate Workshops',
      description:
        'Full-day workshops and multi-day programs teaching your team to identify and prevent vulnerabilities in-house.',
      price: '$3.5K/day',
      turnaround: '1-2 weeks',
      cta: 'Book Workshop',
      ctaHref: '/contact?service=training',
      color: 'blue',
    },
    {
      icon: BookOpen,
      title: 'Education (VISE)',
      subtitle: 'Online Courses & Certifications',
      description:
        'Self-paced learning platform with free modules, paid certification tracks, and on-chain credentials for Web3 security.',
      price: 'Free - $500',
      turnaround: 'Self-paced',
      cta: 'Start Free Module',
      ctaHref: '/vise',
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string) => {
    const classes = {
      sage: {
        border: 'border-vln-sage/20 hover:border-vln-sage/40',
        icon: 'text-vln-sage',
        glow: 'glow-lift',
        bg: 'bg-vln-sage/5',
      },
      amber: {
        border: 'border-vln-amber/20 hover:border-vln-amber/40',
        icon: 'text-vln-amber',
        glow: 'glow-lift-amber',
        bg: 'bg-vln-amber/5',
      },
      blue: {
        border: 'border-vln-bluegray/20 hover:border-vln-bluegray/40',
        icon: 'text-vln-bluegray',
        glow: 'glow-lift-blue',
        bg: 'bg-vln-bluegray/5',
      },
      purple: {
        border: 'border-vln-purple/20 hover:border-vln-purple/40',
        icon: 'text-vln-purple',
        glow: 'glow-lift-purple',
        bg: 'bg-vln-purple/5',
      },
    };
    return classes[color as keyof typeof classes];
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <CSSFade>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-vln-sage">Services</span>
            </h2>
            <p className="text-vln-gray text-lg max-w-2xl mx-auto">
              Comprehensive security solutions for every stage of your Web3 project
            </p>
          </div>
        </CSSFade>

        <StaggerFade
          staggerDelay={150}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const colors = getColorClasses(service.color);

            return (
              <div
                key={index}
                className={cn(
                  'relative p-6 sm:p-8 rounded-vln border-2 bg-vln-bg-light',
                  'transition-all duration-300 hover:-translate-y-1',
                  colors.border,
                  colors.glow
                )}
              >
                {/* Icon */}
                <div className={cn('inline-flex p-3 rounded-vln mb-4', colors.bg)}>
                  <Icon className={cn('w-8 h-8', colors.icon)} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-vln-white mb-2">
                  {service.title}
                </h3>
                <p className={cn('text-sm font-medium mb-4', colors.icon)}>
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-vln-gray leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Pricing & Turnaround */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-vln-sage/10">
                  <div>
                    <p className="text-xs text-vln-gray-dark mb-1">Starting at</p>
                    <p className={cn('text-xl font-bold', colors.icon)}>
                      {service.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-vln-gray-dark mb-1">Turnaround</p>
                    <p className="text-sm font-medium text-vln-white">
                      {service.turnaround}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant={service.color === 'sage' ? 'primary' : 'secondary'}
                  size="md"
                  href={service.ctaHref}
                  className="w-full group"
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            );
          })}
        </StaggerFade>
      </div>
    </section>
  );
}
