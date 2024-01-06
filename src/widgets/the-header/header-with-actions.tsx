'use client';

import { ShoppingCartIcon } from '@heroicons/react/20/solid';

import { useCurrentUser } from '@/entities/viewer';
import { LogoutButton, SignInButton } from '@/features/auth';
import {
  useCartSidebar,
  useItemsInCartCountSelector,
  useTotalPriceSelector,
} from '@/features/cart';
import { Button } from '@/shared/ui/button';

import { BaseHeader, BaseHeaderProps } from './base-header';

export function HeaderWithActions({ className }: Omit<BaseHeaderProps, 'children'>) {
  const totalPrice = useTotalPriceSelector();
  const itemsInCartCount = useItemsInCartCountSelector();
  const { openSidebar } = useCartSidebar();
  const viewer = useCurrentUser();

  return (
    <BaseHeader className={className}>
      <div className="flex items-center justify-center gap-x-4">
        {!viewer ? <SignInButton /> : <LogoutButton />}

        <Button onClick={openSidebar}>
          <span>{totalPrice} ₽</span>

          <div className="border-r-2 border-orange-400 opacity-50 mx-2 sm:mx-4 hidden sm:block"></div>

          <div className="items-center min-w-12 justify-center hidden sm:flex">
            <ShoppingCartIcon className="h-4 w-4 mb-1 mr-2" />
            <span>{itemsInCartCount}</span>
          </div>
        </Button>
      </div>
    </BaseHeader>
  );
}
