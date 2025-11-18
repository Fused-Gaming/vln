import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group relative rounded-vln border border-vln-bluegray/20 bg-vln-bg/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-vln-sage/40 hover:shadow-vln-lift md:p-8',
        className
      )}
    >
      {icon && (
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-vln-sage/10 text-vln-sage transition-all group-hover:bg-vln-sage/20 md:h-14 md:w-14">
          {icon}
        </div>
      )}

      <h3 className="mb-2 text-lg font-bold text-vln-sage md:text-xl">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-vln-bluegray md:text-base">
        {description}
      </p>
    </div>
  );
}
