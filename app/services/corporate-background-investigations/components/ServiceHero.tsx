"use client";

import Button from "@/components/ui/button";

interface ServiceHeroProps {
  headline: string;
  subheading: string;
  description: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

export default function ServiceHero({
  headline,
  subheading,
  description,
  primaryCta,
  secondaryCta,
}: ServiceHeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-20 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-vln-sage/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-vln-sage/10 via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {headline}
        </h1>
        <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
          {subheading}
        </p>
        <p className="text-lg text-gray-400 mb-12">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href={primaryCta.href}
            className="px-8 py-4 bg-vln-sage text-black font-semibold rounded-lg hover:bg-vln-sage/90 transition-all shadow-lg hover:shadow-xl"
          >
            {primaryCta.text}
          </Button>
          <Button
            href={secondaryCta.href}
            className="px-8 py-4 border-2 border-vln-sage text-vln-sage font-semibold rounded-lg hover:bg-vln-sage/10 transition-all"
          >
            {secondaryCta.text}
          </Button>
        </div>
      </div>
    </section>
  );
}
