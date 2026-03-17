"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface TimelineStep {
  number: number;
  title: string;
  description: string;
  duration: string;
  details: string[];
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {steps.map((step, idx) => (
        <div key={idx}>
          {/* Timeline item */}
          <button
            onClick={() =>
              setExpandedStep(expandedStep === step.number ? null : step.number)
            }
            className="w-full group relative p-6 rounded-xl border border-vln-sage/20 bg-gradient-to-r from-black via-black to-vln-sage/5 hover:border-vln-sage/40 transition-all text-left"
          >
            {/* Number indicator */}
            <div className="absolute -left-6 top-6 w-12 h-12 rounded-full bg-vln-sage/20 border-2 border-vln-sage/40 flex items-center justify-center group-hover:bg-vln-sage/30 transition-all">
              <span className="font-bold text-vln-sage text-lg">{step.number}</span>
            </div>

            {/* Content */}
            <div className="pl-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{step.description}</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-vln-sage/10 text-vln-sage text-xs font-semibold">
                    {step.duration}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-vln-sage transition-transform ${
                    expandedStep === step.number ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </button>

          {/* Expanded details */}
          {expandedStep === step.number && (
            <div className="mt-2 p-6 rounded-xl bg-vln-sage/5 border border-vln-sage/10 ml-6">
              <ul className="space-y-3">
                {step.details.map((detail, detailIdx) => (
                  <li
                    key={detailIdx}
                    className="flex items-start gap-3 text-gray-300 text-sm"
                  >
                    <span className="text-vln-sage font-bold mt-1">→</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Connector line */}
          {idx < steps.length - 1 && (
            <div className="h-4 w-0.5 bg-gradient-to-b from-vln-sage/20 to-transparent ml-auto -mr-2 translate-x-6" />
          )}
        </div>
      ))}
    </div>
  );
}
