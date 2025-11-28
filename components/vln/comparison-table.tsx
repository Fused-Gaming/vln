"use client";

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import CSSFade from '@/components/animations/css-fade';

/**
 * Comparison table showing VLN vs competitors
 * Highlights unique value propositions
 */
export default function ComparisonTable() {
  const features = [
    { name: 'Prevention Audits', vln: true, typical: true, automated: true },
    { name: 'Post-Exploit Forensics', vln: true, typical: false, automated: false },
    { name: 'Expert Testimony', vln: true, typical: false, automated: false },
    { name: 'Team Training', vln: true, typical: false, automated: false },
    { name: 'On-Chain Certification', vln: true, typical: false, automated: false },
    { name: 'Gaming Focus', vln: true, typical: false, automated: false },
    { name: '48hr Critical Alerts', vln: true, typical: false, automated: true },
    { name: 'Human Review', vln: true, typical: true, automated: false },
    { name: 'Fix Verification', vln: true, typical: 'sometimes', automated: false },
    { name: 'Government Experience', vln: true, typical: false, automated: false },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-vln-bg-light">
      <div className="container mx-auto px-4 sm:px-6">
        <CSSFade>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-vln-sage">VLN</span>?
            </h2>
            <p className="text-vln-gray text-lg max-w-2xl mx-auto">
              See how VLN compares to typical auditors and automated tools
            </p>
          </div>
        </CSSFade>

        <CSSFade delay={200}>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-2 border-vln-sage/20 rounded-vln overflow-hidden">
              <thead>
                <tr className="bg-vln-bg">
                  <th className="px-4 sm:px-6 py-4 text-left text-vln-white font-bold text-sm sm:text-base">
                    Feature
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-center bg-vln-sage/10">
                    <div className="text-vln-sage font-bold text-base sm:text-lg">VLN</div>
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-center text-vln-gray-dark font-medium text-sm sm:text-base">
                    Typical Auditor
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-center text-vln-gray-dark font-medium text-sm sm:text-base">
                    Automated Tool
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className={cn(
                      'border-t border-vln-sage/10',
                      index % 2 === 0 && 'bg-vln-bg/50'
                    )}
                  >
                    <td className="px-4 sm:px-6 py-3 text-vln-white text-sm sm:text-base">
                      {feature.name}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-center bg-vln-sage/5">
                      <div className="flex justify-center">
                        {renderCheck(feature.vln, 'sage')}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-center">
                      <div className="flex justify-center">
                        {renderCheck(feature.typical, 'gray')}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-center">
                      <div className="flex justify-center">
                        {renderCheck(feature.automated, 'gray')}
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Pricing rows */}
                <tr className="border-t-2 border-vln-sage/20 bg-vln-bg">
                  <td className="px-4 sm:px-6 py-3 text-vln-white font-bold text-sm sm:text-base">
                    Price Range
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-center bg-vln-sage/10 text-vln-sage font-bold text-sm sm:text-base">
                    $2K-10K
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-center text-vln-gray text-sm sm:text-base">
                    $5K-50K
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-center text-vln-gray text-sm sm:text-base">
                    $100-500
                  </td>
                </tr>
                <tr className="border-t border-vln-sage/10 bg-vln-bg/50">
                  <td className="px-4 sm:px-6 py-3 text-vln-white font-bold text-sm sm:text-base">
                    Turnaround
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-center bg-vln-sage/10 text-vln-sage font-bold text-sm sm:text-base">
                    3-7 days
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-center text-vln-gray text-sm sm:text-base">
                    2-6 weeks
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-center text-vln-gray text-sm sm:text-base">
                    Minutes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CSSFade>

        <CSSFade delay={400} className="text-center mt-8">
          <p className="text-vln-gray-dark text-sm">
            * Pricing and features as of November 2024. Individual results may vary.
          </p>
        </CSSFade>
      </div>
    </section>
  );
}

function renderCheck(value: boolean | string, color: 'sage' | 'gray') {
  if (value === true) {
    return (
      <Check
        className={cn(
          'w-5 h-5',
          color === 'sage' ? 'text-vln-sage' : 'text-vln-bluegray'
        )}
      />
    );
  }

  if (value === false) {
    return <X className="w-5 h-5 text-vln-gray-dark" />;
  }

  if (value === 'sometimes') {
    return <span className="text-vln-gray-dark text-sm">Sometimes</span>;
  }

  return null;
}
