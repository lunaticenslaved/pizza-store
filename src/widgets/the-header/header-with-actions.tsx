'use client';

import { useCurrentUser } from '@/entities/viewer';
import { AccountButton, LogoutButton, SignInButton } from '@/features/auth';
import { CartSidebar } from '@/features/cart';

import { BaseHeader, BaseHeaderProps } from './base-header';

export function HeaderWithActions({ className }: Omit<BaseHeaderProps, 'children'>) {
  const viewer = useCurrentUser();

  return (
    <BaseHeader className={className}>
      <div className="flex items-center justify-center gap-x-4">
        {!viewer ? (
          <SignInButton />
        ) : (
          <>
            <LogoutButton />
            <AccountButton />
          </>
        )}

        <CartSidebar />
      </div>
    </BaseHeader>
  );
}
