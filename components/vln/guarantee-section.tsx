"use client";

import { Check } from 'lucide-react';
import CSSFade from '@/components/animations/css-fade';
import Button from '@/components/ui/button';

/**
 * VLN Guarantee - Risk reversal for conversions
 */
export default function GuaranteeSection() {
  const guarantees = [
    'If we find zero vulnerabilities, you pay nothing*',
    '30-day free fix verification on all findings',
    'Critical bugs flagged within 48 hours',
    'Detailed, actionable remediation steps included',
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-vln-bg via-vln-sage/5 to-vln-bg">
      <div className="container mx-auto px-4 sm:px-6">
        <CSSFade>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vln-sage/20 mb-6">
                <span className="text-4xl">💚</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                The <span className="text-vln-sage">VLN Guarantee</span>
              </h2>
              <p className="text-vln-gray text-lg">
                We stand behind our work with industry-leading guarantees
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {guarantees.map((guarantee, index) => (
                <CSSFade key={index} delay={index * 100}>
                  <div className="flex items-start gap-3 p-4 rounded-vln bg-vln-bg-light border border-vln-sage/20">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="w-5 h-5 text-vln-sage" />
                    </div>
                    <p className="text-vln-white">{guarantee}</p>
                  </div>
                </CSSFade>
              ))}
            </div>

            <CSSFade delay={400}>
              <div className="text-center">
                <p className="text-vln-gray-dark text-sm mb-6">
                  * Applies to prevention audits only. Small review fee may apply for comprehensive analysis.
                </p>
                <Button variant="primary" size="xl" href="/contact" className="group">
                  Start Your Free Scan
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
              </div>
            </CSSFade>
          </div>
        </CSSFade>
      </div>
    </section>
  );
}
