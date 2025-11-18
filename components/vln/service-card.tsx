import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href: string;
  features?: string[];
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  href,
  features,
  className,
}: ServiceCardProps) {
  return (
    <Link href={href} className={cn('group block', className)}>
      <Card glow className="h-full transition-all duration-300 group-hover:border-vln-sage/40">
        <div className="flex flex-col h-full">
          {icon && (
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-vln-sage/10 text-vln-sage transition-all group-hover:bg-vln-sage/20 group-hover:shadow-vln-glow">
              {icon}
            </div>
          )}

          <h3 className="mb-3 text-xl font-bold text-vln-sage md:text-2xl">
            {title}
          </h3>

          <p className="mb-4 flex-grow text-sm leading-relaxed text-vln-bluegray md:text-base">
            {description}
          </p>

          {features && features.length > 0 && (
            <ul className="space-y-2 border-t border-vln-bluegray/20 pt-4">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm text-vln-bluegray"
                >
                  <span className="mr-2 mt-1 text-vln-sage">→</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex items-center text-sm font-medium text-vln-sage transition-all group-hover:translate-x-1">
            Learn more
            <span className="ml-2">→</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
