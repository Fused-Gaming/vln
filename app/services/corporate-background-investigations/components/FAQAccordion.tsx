"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
          className="w-full group relative text-left"
        >
          {/* Question bar */}
          <div className="p-6 rounded-lg border border-vln-sage/20 bg-black hover:border-vln-sage/40 transition-all">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold group-hover:text-vln-sage transition-colors">
                {item.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-vln-sage transition-transform flex-shrink-0 ml-4 ${
                  expandedIndex === idx ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {/* Answer - Expanded */}
          {expandedIndex === idx && (
            <div className="mt-2 p-6 rounded-lg bg-vln-sage/5 border border-vln-sage/10 text-gray-300 text-sm leading-relaxed">
              {item.answer}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
