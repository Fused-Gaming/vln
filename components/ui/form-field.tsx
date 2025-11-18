import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './label';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, label, required, error, hint, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && <Label required={required}>{label}</Label>}
        {children}
        {error && <p className="text-sm text-vln-danger">{error}</p>}
        {hint && !error && <p className="text-sm text-vln-gray-500">{hint}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export { FormField };
