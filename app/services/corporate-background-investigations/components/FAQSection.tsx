"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <div
            key={index}
            className="rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light hover:border-vln-sage/40 transition-all duration-300 overflow-hidden"
          >
            <button
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
              className="w-full p-6 flex items-start justify-between gap-4 hover:bg-vln-bg-light/50 transition-colors"
              aria-expanded={isExpanded}
            >
              <h3 className="text-lg font-bold text-vln-white text-left">{faq.question}</h3>
              <ChevronDown
                className={`w-5 h-5 text-vln-sage flex-shrink-0 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {isExpanded && (
              <div className="px-6 pb-6 border-t border-vln-sage/10 pt-4">
                <p className="text-vln-gray leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
