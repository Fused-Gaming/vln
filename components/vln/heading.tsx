import * as React from 'react';
import { cn } from '@/lib/utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  gradient?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = 'h2', gradient = false, children, ...props }, ref) => {
    const baseStyles = 'font-bold tracking-tight';

    const sizeStyles = {
      h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
      h2: 'text-3xl sm:text-4xl md:text-5xl',
      h3: 'text-2xl sm:text-3xl md:text-4xl',
      h4: 'text-xl sm:text-2xl md:text-3xl',
      h5: 'text-lg sm:text-xl md:text-2xl',
      h6: 'text-base sm:text-lg md:text-xl',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[Component],
          gradient &&
            'bg-gradient-to-r from-vln-sage to-vln-bluegray bg-clip-text text-transparent',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export { Heading };
