import { Check } from "lucide-react";
import Button from "@/components/ui/button";

interface PricingTierProps {
  tier: {
    name: string;
    price: string;
    badge: string | null;
    methods: string[];
    deliverables: string[];
    description: string;
    cta: string;
    ctaLink: string;
  };
}

export default function PricingTierCard({ tier }: PricingTierProps) {
  const isPopular = tier.badge === "POPULAR";
  const isEnterprise = tier.badge === "ENTERPRISE";

  return (
    <div
      className={`relative p-6 sm:p-8 rounded-vln border-2 transition-all duration-300 h-full flex flex-col ${
        isPopular
          ? "border-vln-sage/60 bg-vln-bg-light glow-lift shadow-[0_0_40px_rgba(166,195,167,0.1)]"
          : "border-vln-sage/20 bg-vln-bg-light hover:border-vln-sage/40 glow-lift"
      }`}
    >
      {tier.badge && (
        <div className="absolute -top-3 left-6">
          <span
            className={`inline-block px-4 py-1 rounded-full text-xs font-mono font-bold tracking-wide ${
              isPopular
                ? "bg-vln-sage text-vln-bg"
                : "bg-vln-bluegray text-vln-bg"
            }`}
          >
            ⭐ {tier.badge}
          </span>
        </div>
      )}

      <div className="mb-6 pt-4">
        <h3 className="text-2xl font-bold text-vln-white mb-2">{tier.name}</h3>
        <p className="text-vln-gray text-sm">{tier.description}</p>
      </div>

      <div className="mb-6 pb-6 border-b border-vln-sage/10">
        <p className="text-vln-sage text-4xl font-bold">{tier.price}</p>
        <p className="text-vln-gray text-sm mt-2">Pricing varies by scope</p>
      </div>

      <div className="space-y-6 flex-grow">
        <div>
          <p className="text-xs font-mono text-vln-sage/70 uppercase tracking-wide mb-3">Investigation Methods</p>
          <div className="space-y-2">
            {tier.methods.map((method, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-vln-sage flex-shrink-0" />
                <span className="text-vln-gray text-sm">{method}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-mono text-vln-sage/70 uppercase tracking-wide mb-3">Deliverables</p>
          <div className="space-y-2">
            {tier.deliverables.map((deliverable, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-vln-sage flex-shrink-0" />
                <span className="text-vln-gray text-sm">{deliverable}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        variant={isPopular ? "primary" : "secondary"}
        size="lg"
        href={tier.ctaLink}
        className="w-full mt-8 group"
      >
        {tier.cta}
        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
      </Button>
    </div>
  );
}
