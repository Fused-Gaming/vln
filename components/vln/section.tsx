import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = 'lg', children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          {
            'py-8': spacing === 'sm',
            'py-12 md:py-16': spacing === 'md',
            'py-16 md:py-24': spacing === 'lg',
            'py-24 md:py-32': spacing === 'xl',
          },
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
