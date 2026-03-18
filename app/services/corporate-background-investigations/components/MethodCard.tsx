"use client";

import { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface MethodCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink?: string;
}

export default function MethodCard({
  icon: Icon,
  title,
  subtitle,
  description,
  features,
  cta,
  ctaLink,
}: MethodCardProps) {
  return (
    <div className="group relative p-8 rounded-xl border border-vln-sage/20 bg-gradient-to-br from-black via-black to-vln-sage/5 hover:border-vln-sage/40 transition-all duration-300">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-vln-sage/10 to-transparent blur-xl -z-10" />

      {/* Icon */}
      <div className="mb-6 p-3 w-fit rounded-lg bg-vln-sage/10 group-hover:bg-vln-sage/20 transition-colors">
        <Icon className="w-6 h-6 text-vln-sage" />
      </div>

      {/* Title and subtitle */}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-vln-sage font-semibold mb-4">{subtitle}</p>

      {/* Description */}
      <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>

      {/* Features list */}
      <div className="mb-8">
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
              <span className="text-vln-sage mt-1">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      {ctaLink ? (
        <Link href={ctaLink} className="inline-flex items-center gap-2 text-vln-sage font-semibold text-sm hover:gap-3 transition-all">
          {cta}
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : (
        <button className="inline-flex items-center gap-2 text-vln-sage font-semibold text-sm hover:gap-3 transition-all cursor-not-allowed opacity-50">
          {cta}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
