import * as React from 'react';
import { cn } from '@/lib/utils';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 3, gap = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          {
            'grid-cols-1': cols === 1,
            'grid-cols-1 md:grid-cols-2': cols === 2,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': cols === 3,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': cols === 4,
          },
          {
            'gap-4': gap === 'sm',
            'gap-6': gap === 'md',
            'gap-8': gap === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export { Grid };
