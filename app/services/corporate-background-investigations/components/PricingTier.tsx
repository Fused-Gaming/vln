"use client";

import Button from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingTierProps {
  name: string;
  price: string;
  badge: string | null;
  description: string;
  features: string[];
  deliverables: string[];
  timeline: string;
  cta: string;
  ctaLink: string;
}

export default function PricingTier({
  name,
  price,
  badge,
  description,
  features,
  deliverables,
  timeline,
  cta,
  ctaLink,
}: PricingTierProps) {
  const isPopular = badge?.includes("POPULAR");

  return (
    <div
      className={`relative p-8 rounded-xl border transition-all duration-300 ${
        isPopular
          ? "border-vln-sage/60 bg-gradient-to-br from-vln-sage/10 via-black to-black shadow-lg shadow-vln-sage/20"
          : "border-vln-sage/20 bg-black hover:border-vln-sage/40"
      }`}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-4 left-8">
          <span className={`px-4 py-1 rounded-full text-sm font-semibold inline-block ${
            isPopular
              ? "bg-vln-sage/20 text-vln-sage border border-vln-sage/40"
              : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
          }`}>
            {badge}
          </span>
        </div>
      )}

      {/* Tier name and price */}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className="text-3xl md:text-4xl font-bold text-vln-sage mb-2">{price}</p>
      <p className="text-gray-400 text-sm mb-6">{description}</p>

      {/* Timeline */}
      <div className="mb-6 p-3 rounded-lg bg-black/50 border border-vln-sage/10">
        <p className="text-sm text-gray-400">
          <span className="text-vln-sage font-semibold">Timeline:</span> {timeline}
        </p>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
          Investigation Methods
        </h4>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
              <Check className="w-4 h-4 text-vln-sage flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Deliverables */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
          Deliverables
        </h4>
        <ul className="space-y-3">
          {deliverables.map((deliverable, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-vln-sage" />
              {deliverable}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <Button
        href={ctaLink}
        className={`w-full py-3 font-semibold rounded-lg transition-all ${
          isPopular
            ? "bg-vln-sage text-black hover:bg-vln-sage/90"
            : "border border-vln-sage/40 text-vln-sage hover:border-vln-sage/60 hover:bg-vln-sage/5"
        }`}
      >
        {cta}
      </Button>
    </div>
  );
}
