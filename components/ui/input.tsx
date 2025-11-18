import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-vln border bg-vln-bg px-4 py-2 text-base ring-offset-vln-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-vln-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-vln-danger/50 focus-visible:ring-vln-danger'
            : 'border-vln-bluegray/20 focus-visible:ring-vln-sage',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
