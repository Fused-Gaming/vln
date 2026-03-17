"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Step {
  number: number;
  title: string;
  duration: string;
  details: string[];
}

interface ProcessTimelineProps {
  steps: Step[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-vln-sage via-vln-sage/50 to-transparent hidden md:block" />

      <div className="space-y-4 md:space-y-6">
        {steps.map((step, index) => {
          const isExpanded = expandedStep === step.number;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="relative">
              {/* Circle and number */}
              <div className="absolute left-0 top-6 w-16 flex items-center justify-center hidden md:flex">
                <div className="w-10 h-10 rounded-full bg-vln-bg border-2 border-vln-sage flex items-center justify-center font-bold text-vln-sage text-sm">
                  {step.number}
                </div>
              </div>

              {/* Card */}
              <div
                className="md:ml-32 p-6 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light hover:border-vln-sage/40 transition-all duration-300 cursor-pointer glow-lift"
                onClick={() => setExpandedStep(isExpanded ? null : step.number)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2 md:hidden">
                      <div className="w-8 h-8 rounded-full bg-vln-sage/20 border border-vln-sage flex items-center justify-center font-bold text-vln-sage text-xs">
                        {step.number}
                      </div>
                      <h3 className="text-lg font-bold text-vln-white">{step.title}</h3>
                    </div>
                    <div className="hidden md:block">
                      <h3 className="text-lg font-bold text-vln-white mb-1">{step.title}</h3>
                    </div>
                    <p className="text-vln-sage font-mono text-xs uppercase tracking-wider">{step.duration}</p>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-vln-sage flex-shrink-0 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-vln-sage/10 space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-vln-sage mt-2 flex-shrink-0" />
                        <p className="text-vln-gray text-sm">{detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Connector line (mobile) */}
              {!isLast && (
                <div className="md:hidden ml-8 h-4 border-l-2 border-vln-sage/20" />
              )}
            </div>
          );
        })}
      </div>

      {/* Summary at bottom */}
      <div className="mt-12 p-6 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light">
        <p className="text-center text-vln-gray">
          <span className="font-bold text-vln-white">Total timeline:</span> 2-8 weeks depending on investigation tier and scope
        </p>
      </div>
    </div>
  );
}
