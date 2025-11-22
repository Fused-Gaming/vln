"use client";

import Testimonial from './testimonial';
import CSSFade from '@/components/animations/css-fade';
import StaggerFade from '@/components/animations/stagger-fade';
import Button from '@/components/ui/button';

/**
 * Testimonials section with social proof
 * Pre-populated with key customer success stories
 */
export default function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      impact: 'Saved us $2M',
      quote:
        'VLN found a critical reentrancy bug in our staking contract that could have drained our entire treasury. Their report was detailed, actionable, and delivered in 4 days.',
      author: 'Sarah Chen',
      role: 'CTO',
      company: 'DeFi Gaming Protocol',
      verified: true,
      date: 'November 2024',
      service: 'Prevention Audit',
    },
    {
      rating: 5,
      impact: 'Expert testimony was crucial',
      quote:
        "After a $1.5M exploit, VLN's forensic analysis and expert testimony were instrumental in our legal case. Their court-ready reports and professional demeanor made all the difference.",
      author: 'Michael Torres',
      role: 'Legal Counsel',
      company: 'BlockPlay Studios',
      verified: true,
      date: 'October 2024',
      service: 'Forensics',
    },
    {
      rating: 5,
      impact: 'Training transformed our team',
      quote:
        "VLN's full-day workshop gave our development team practical skills to identify and prevent vulnerabilities. We now have internal security expertise that saves us time and money.",
      author: 'James Park',
      role: 'VP Engineering',
      company: 'NFT Gaming Inc',
      verified: true,
      date: 'September 2024',
      service: 'Training',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-vln-bg-light">
      <div className="container mx-auto px-4 sm:px-6">
        <CSSFade>
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-vln-amber text-2xl">★</span>
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Trusted by <span className="text-vln-sage">Blockchain Leaders</span>
            </h2>
            <p className="text-vln-gray text-lg max-w-2xl mx-auto">
              Don&apos;t just take our word for it. See what our clients say about VLN Security.
            </p>
          </div>
        </CSSFade>

        <StaggerFade
          staggerDelay={150}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-12"
        >
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </StaggerFade>

        <CSSFade delay={600} className="text-center">
          <Button variant="secondary" size="lg" href="/testimonials">
            View All 47 Reviews
          </Button>
        </CSSFade>
      </div>
    </section>
  );
}
