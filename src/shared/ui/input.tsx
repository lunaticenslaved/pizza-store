import * as React from 'react';

import { cn } from '@/shared/lib';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prepend?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prepend, ...props }, ref) => {
    return (
      <div
        className={cn(
          'focus-within:ring-1 focus-within:ring-ring flex items-center border border-input rounded-md h-14 shadow-sm',
          className,
        )}>
        <div className="ml-4 shrink-0">{prepend}</div>
        <input
          style={{ boxShadow: 'none' }}
          type={type}
          className={cn(
            'min-w-0 flex-1 outline-offset-0 shrink border-none outline-none px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
