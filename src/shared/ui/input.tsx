import * as React from 'react';
import { forwardRef, useRef } from 'react';
import { RiCloseFill } from 'react-icons/ri';

import { cn } from '@/shared/lib';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prepend?: React.ReactNode;
  clearable?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type, prepend, clearable, ...props },
  ref,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className={cn(
        'focus-within:ring-1 focus-within:ring-ring flex items-center border border-input rounded-md h-14 shadow-sm',
        className,
      )}>
      {!!prepend && <div className="ml-3 shrink-0">{prepend}</div>}
      <input
        style={{ boxShadow: 'none' }}
        type={type}
        className={cn(
          'min-w-0 flex-1 outline-offset-0 shrink border-none outline-none px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        )}
        ref={r => {
          if (typeof ref === 'function') {
            ref(r);
          } else if (ref) {
            ref.current = r;
          }

          inputRef.current = r;
        }}
        {...props}
      />
      {!!clearable && inputRef.current?.value && (
        <span
          className="mr-3 shrink-0 inline-block"
          role="button"
          onClick={() => {
            if (inputRef.current) {
              const valueSetter = Object.getOwnPropertyDescriptor(inputRef.current, 'value')?.set;
              const prototype = Object.getPrototypeOf(inputRef.current);
              const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

              if (prototypeValueSetter && valueSetter && valueSetter !== prototypeValueSetter) {
                prototypeValueSetter.call(inputRef.current, '');
              } else if (valueSetter) {
                valueSetter.call(inputRef.current, '');
              }

              inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }}>
          <RiCloseFill className="h-6 w-6" />
        </span>
      )}
    </div>
  );
});
