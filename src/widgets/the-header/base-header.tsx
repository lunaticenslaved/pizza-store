import { PropsWithChildren } from 'react';

import classNames from 'classnames';

import { Logo } from './logo';

export interface BaseHeaderProps extends PropsWithChildren {
  className?: string;
}

export function BaseHeader({ children, className }: BaseHeaderProps) {
  return (
    <header
      className={classNames(
        'h-[80px] px-8 flex justify-between items-center border-b-2 border-neutral-100 sticky top-0 z-50 bg-white',
        className,
      )}>
      <Logo />

      {children}
    </header>
  );
}
