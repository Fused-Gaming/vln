"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import CSSFade from '@/components/animations/css-fade';
import Button from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * FAQ Section with objection handling
 * Accordion-style for better UX
 */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Why should I pay for an audit when there are free tools?',
      answer:
        "Automated tools catch ~40% of vulnerabilities. Human experts catch logic errors, business logic flaws, and context-specific issues that tools miss. 60% of exploits come from these 'invisible' bugs that only experienced auditors can find.",
    },
    {
      question: "How do I know you won't steal my code or exploit the vulnerabilities?",
      answer:
        "We sign NDAs for every engagement. Our reputation depends on trust. We've worked with government agencies and legal teams - our ethics are our business. Plus, we're in this for the long haul, not a quick buck.",
    },
    {
      question: 'Can you guarantee my contract is 100% secure after your audit?',
      answer:
        "No one can guarantee 100% security - anyone who claims otherwise is lying. What we guarantee: thorough review, honest findings, and actionable fixes. Our track record: 0 post-audit exploits on contracts where clients implemented our recommendations.",
    },
    {
      question: 'What if I get exploited after your audit?',
      answer:
        "If an exploit occurs in code we audited AND it's a vulnerability we missed, we'll provide free forensic investigation. But in 12 years, this has never happened to a client who implemented our fixes.",
    },
    {
      question: 'Do you work with legal teams and law enforcement?',
      answer:
        "Yes. We've provided expert testimony in 3 legal proceedings and worked with government agencies on blockchain investigations. Our reports are court-admissible and chain of custody is maintained.",
    },
    {
      question: 'How long does an audit take?',
      answer:
        'Small contracts (< 500 lines): 3-5 days. Medium projects (500-2K lines): 5-7 days. Large platforms (2K+ lines): 1-2 weeks. We flag critical bugs within 48 hours regardless of project size.',
    },
    {
      question: "What's included in the free 30-minute scan?",
      answer:
        "We'll review your contract architecture, identify potential high-risk areas, and provide a preliminary assessment with 2-3 specific concerns. If we find critical issues, we'll flag them immediately. No strings attached.",
    },
    {
      question: 'Do you offer ongoing support or retainer services?',
      answer:
        'Yes. We offer monthly retainers starting at $1,500/mo for ongoing code review, security consultations, and priority support. Many clients start with a one-time audit and upgrade to a retainer for continuous protection.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <CSSFade>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-vln-sage">Questions</span>
            </h2>
            <p className="text-vln-gray text-lg">
              Common questions about VLN security services
            </p>
          </div>
        </CSSFade>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <CSSFade key={index} delay={index * 50}>
              <div
                className={cn(
                  'rounded-vln border-2 transition-all duration-300',
                  openIndex === index
                    ? 'border-vln-sage/40 bg-vln-bg-light'
                    : 'border-vln-sage/20 bg-vln-bg-light/50'
                )}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-vln-bg-light/80"
                >
                  <span className="text-lg font-medium text-vln-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-vln-sage transition-transform flex-shrink-0',
                      openIndex === index && 'transform rotate-180'
                    )}
                  />
                </button>

                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  )}
                >
                  <div className="px-6 pb-4 text-vln-gray leading-relaxed border-t border-vln-sage/10 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </CSSFade>
          ))}
        </div>

        <CSSFade delay={400} className="text-center mt-8">
          <Button variant="ghost" size="lg" href="/faq">
            See All 23 Questions →
          </Button>
        </CSSFade>
      </div>
    </section>
  );
}
