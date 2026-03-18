"use client";

import { Quote } from "lucide-react";

interface CaseStudyCardProps {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  quote: string;
}

export default function CaseStudyCard({
  title,
  industry,
  challenge,
  solution,
  outcome,
  quote,
}: CaseStudyCardProps) {
  return (
    <div className="group relative p-8 rounded-xl border border-vln-sage/20 bg-gradient-to-br from-black via-black to-vln-sage/5 hover:border-vln-sage/40 transition-all">
      {/* Industry badge */}
      <div className="mb-6 inline-block px-3 py-1 rounded-full bg-vln-sage/10 border border-vln-sage/30">
        <span className="text-xs font-semibold text-vln-sage">{industry}</span>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold mb-6">{title}</h3>

      {/* Content sections */}
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
            Challenge
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">{challenge}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
            Solution
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">{solution}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
            Outcome
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">{outcome}</p>
        </div>
      </div>

      {/* Quote */}
      <div className="pt-6 border-t border-vln-sage/10">
        <div className="flex items-start gap-3 text-sm text-gray-400">
          <Quote className="w-4 h-4 text-vln-sage flex-shrink-0 mt-1" />
          <p className="italic">"{quote}"</p>
        </div>
        <p className="mt-3 text-xs text-gray-500">Anonymous Client</p>
      </div>
    </div>
  );
}
