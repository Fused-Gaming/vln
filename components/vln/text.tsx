import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'default' | 'muted' | 'accent';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  as?: 'p' | 'span' | 'div';
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      variant = 'default',
      size = 'base',
      as: Component = 'p',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'leading-relaxed',
          {
            'text-vln-white': variant === 'default',
            'text-vln-bluegray': variant === 'muted',
            'text-vln-sage': variant === 'accent',
          },
          {
            'text-xs': size === 'xs',
            'text-sm': size === 'sm',
            'text-base': size === 'base',
            'text-lg sm:text-xl': size === 'lg',
            'text-xl sm:text-2xl': size === 'xl',
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export { Text };
