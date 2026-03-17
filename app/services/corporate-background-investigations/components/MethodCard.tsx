import { Check, LucideIcon } from "lucide-react";

interface ColorClass {
  border: string;
  text: string;
  bg: string;
  glow: string;
  badge: string;
}

interface MethodCardProps {
  method: {
    icon: LucideIcon;
    title: string;
    tagline: string;
    description: string;
    features: string[];
    color: "sage" | "blue" | "amber" | "purple";
  };
  colorClasses: Record<string, ColorClass>;
}

export default function MethodCard({ method, colorClasses }: MethodCardProps) {
  const Icon = method.icon;
  const colors = colorClasses[method.color];

  return (
    <div
      className={`p-6 sm:p-8 rounded-vln border-2 ${colors.border} bg-vln-bg-light transition-all duration-300 ${colors.glow} h-full flex flex-col`}
    >
      <div className={`inline-flex items-center justify-center p-4 rounded-vln ${colors.bg} mb-6 w-fit`}>
        <Icon className={`w-8 h-8 ${colors.text}`} />
      </div>

      <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${colors.text}`}>{method.title}</h3>
      <p className="text-vln-gray-dark text-lg mb-4 font-medium">{method.tagline}</p>
      <p className="text-vln-gray mb-6 flex-grow">{method.description}</p>

      <div className="space-y-3">
        <p className="text-sm font-mono text-vln-sage/70 uppercase tracking-wide">Includes:</p>
        {method.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
            <span className="text-vln-gray text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
