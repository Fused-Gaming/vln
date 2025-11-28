"use client";

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialProps {
  rating: number;
  quote: string;
  impact?: string;
  author: string;
  role: string;
  company: string;
  verified?: boolean;
  date?: string;
  service?: string;
  className?: string;
}

/**
 * Testimonial card with social proof elements
 * Optimized for conversion (verified badges, impact statements)
 */
export default function Testimonial({
  rating,
  quote,
  impact,
  author,
  role,
  company,
  verified = false,
  date,
  service,
  className,
}: TestimonialProps) {
  return (
    <div
      className={cn(
        'relative p-6 sm:p-8 rounded-vln border-2 border-vln-sage/20',
        'bg-vln-bg-light hover:border-vln-sage/40',
        'transition-all duration-300 hover:-translate-y-1',
        'glow-lift h-full flex flex-col',
        className
      )}
    >
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-5 h-5',
              i < rating ? 'fill-vln-amber text-vln-amber' : 'text-vln-gray-dark'
            )}
          />
        ))}
      </div>

      {/* Impact (if provided) */}
      {impact && (
        <h3 className="text-xl font-bold text-vln-white mb-4">
          &ldquo;{impact}&rdquo;
        </h3>
      )}

      {/* Quote */}
      <blockquote className="text-vln-gray text-base leading-relaxed mb-6 flex-grow">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-vln-sage/10 mt-auto">
        <div>
          <p className="text-vln-white font-medium">
            {author}
          </p>
          <p className="text-vln-gray-dark text-sm">
            {role} @ {company}
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-1">
          {verified && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-vln-sage/10 text-vln-sage text-xs font-medium">
              ✓ Verified Client
            </span>
          )}
          {service && (
            <span className="text-vln-gray-dark text-xs">
              {service}
            </span>
          )}
          {date && (
            <span className="text-vln-gray-dark text-xs">
              {date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
