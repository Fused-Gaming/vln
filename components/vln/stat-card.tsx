"use client";

import Counter from '@/components/animations/counter';
import { cn } from '@/lib/utils';

interface StatCardProps {
  number: string | number;
  label: string;
  color?: 'sage' | 'blue' | 'amber' | 'purple';
  animated?: boolean;
  className?: string;
}

/**
 * Performance-optimized stat card for trust signals
 * Uses CSS animations and optimized counter
 */
export default function StatCard({
  number,
  label,
  color = 'sage',
  animated = true,
  className,
}: StatCardProps) {
  const colorClasses = {
    sage: 'border-vln-sage/20 hover:border-vln-sage/40 glow-lift',
    blue: 'border-vln-bluegray/20 hover:border-vln-bluegray/40 glow-lift-blue',
    amber: 'border-vln-amber/20 hover:border-vln-amber/40 glow-lift-amber',
    purple: 'border-vln-purple/20 hover:border-vln-purple/40 glow-lift-purple',
  };

  const textColorClasses = {
    sage: 'text-vln-sage',
    blue: 'text-vln-bluegray',
    amber: 'text-vln-amber',
    purple: 'text-vln-purple',
  };

  // Parse number for counter
  const parseNumber = (val: string | number): { value: number; prefix: string; suffix: string } => {
    if (typeof val === 'number') {
      return { value: val, prefix: '', suffix: '' };
    }

    // Extract prefix, number, and suffix
    const match = val.match(/^([^\d]*)(\d+\.?\d*)(.*)$/);
    if (match) {
      return {
        prefix: match[1],
        value: parseFloat(match[2]),
        suffix: match[3],
      };
    }

    return { value: 0, prefix: val, suffix: '' };
  };

  const { value, prefix, suffix } = parseNumber(number);
  const isNumeric = value > 0;

  return (
    <div
      className={cn(
        'relative p-6 rounded-vln border-2 bg-vln-bg-light',
        'transition-all duration-300',
        'hover:-translate-y-1',
        'h-full min-h-[160px] sm:min-h-[180px]',
        colorClasses[color],
        className
      )}
    >
      <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
        {/* Number */}
        <div className={cn('text-4xl md:text-5xl font-bold tabular-nums', textColorClasses[color])}>
          {animated && isNumeric ? (
            <Counter
              end={value}
              duration={2000}
              decimals={suffix.includes('M') ? 1 : 0}
              prefix={prefix}
              suffix={suffix}
            />
          ) : (
            <>{number}</>
          )}
        </div>

        {/* Label */}
        <p className="text-sm md:text-base text-vln-gray leading-tight max-w-[200px]">
          {label}
        </p>
      </div>

      {/* Glow overlay on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-vln opacity-0 transition-opacity duration-300',
          'pointer-events-none',
          color === 'sage' && 'bg-vln-sage/5',
          color === 'blue' && 'bg-vln-bluegray/5',
          color === 'amber' && 'bg-vln-amber/5',
          color === 'purple' && 'bg-vln-purple/5'
        )}
        style={{
          opacity: 0,
        }}
      />
    </div>
  );
}
