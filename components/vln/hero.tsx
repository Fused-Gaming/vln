import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';

export interface HeroProps {
  title: string | React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Hero({ title, description, children, className }: HeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-vln-bluegray/20 bg-gradient-to-b from-vln-bg to-vln-bg/60 py-16 md:py-24 lg:py-32',
        className
      )}
    >
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {typeof title === 'string' ? (
              <span className="bg-gradient-to-r from-vln-sage to-vln-bluegray bg-clip-text text-transparent">
                {title}
              </span>
            ) : (
              title
            )}
          </h1>

          {description && (
            <p className="mx-auto mb-8 max-w-2xl text-lg text-vln-bluegray sm:text-xl md:mb-12 md:text-2xl">
              {description}
            </p>
          )}

          {children && (
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {children}
            </div>
          )}
        </div>
      </Container>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-vln-sage/5 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 h-64 w-64 rounded-full bg-vln-bluegray/5 blur-3xl" />
      </div>
    </section>
  );
}
