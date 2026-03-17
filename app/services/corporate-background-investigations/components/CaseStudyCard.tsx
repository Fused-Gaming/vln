import { Star } from "lucide-react";

interface CaseStudy {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  quote: string;
  client: string;
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <div className="p-6 sm:p-8 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light hover:border-vln-sage/40 transition-all duration-300 glow-lift flex flex-col h-full">
      {/* Header */}
      <div className="mb-6 pb-6 border-b border-vln-sage/10">
        <p className="text-vln-sage text-sm font-mono uppercase tracking-wide mb-2">{caseStudy.industry}</p>
        <h3 className="text-2xl font-bold text-vln-white">{caseStudy.title}</h3>
      </div>

      {/* Content Sections */}
      <div className="space-y-6 flex-grow">
        <div>
          <p className="text-xs font-mono text-vln-sage/70 uppercase tracking-wide mb-2">Challenge</p>
          <p className="text-vln-gray">{caseStudy.challenge}</p>
        </div>

        <div>
          <p className="text-xs font-mono text-vln-sage/70 uppercase tracking-wide mb-2">Solution</p>
          <p className="text-vln-gray">{caseStudy.solution}</p>
        </div>

        <div>
          <p className="text-xs font-mono text-vln-sage/70 uppercase tracking-wide mb-2">Outcome</p>
          <p className="text-vln-gray">{caseStudy.outcome}</p>
        </div>
      </div>

      {/* Quote */}
      <div className="mt-8 pt-6 border-t border-vln-sage/10">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-vln-sage text-vln-sage" />
          ))}
        </div>
        <p className="text-vln-gray italic mb-3">"{caseStudy.quote}"</p>
        <p className="text-vln-sage/80 font-mono text-xs uppercase tracking-wide">— {caseStudy.client}</p>
      </div>
    </div>
  );
}
