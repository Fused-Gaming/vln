import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-vln font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vln-sage focus-visible:ring-offset-2 focus-visible:ring-offset-vln-bg disabled:pointer-events-none disabled:opacity-50',
          // Variants
          {
            'bg-vln-sage text-vln-bg hover:shadow-vln-glow hover:brightness-110':
              variant === 'primary',
            'border border-vln-sage text-vln-sage hover:bg-vln-sage/10 hover:shadow-vln-glow':
              variant === 'secondary',
            'text-vln-sage hover:bg-vln-sage/10': variant === 'ghost',
            'bg-vln-danger text-vln-white hover:bg-vln-danger-hover hover:shadow-vln-glow':
              variant === 'danger',
          },
          // Sizes
          {
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
