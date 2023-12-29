'use client';

import { PropsWithChildren, useMemo, useState } from 'react';

import { CartSidebar, useItemsInCartCountSelector, useTotalPriceSelector } from '@/features/cart';
import { TheHeader } from '@/widgets/the-header';

export function Layout({ children }: PropsWithChildren) {
  const totalPrice = useTotalPriceSelector();
  const itemsInCartFlatCount = useItemsInCartCountSelector();
  const [isCartSidebarOpen, setCartSidebarOpen] = useState(false);

  const { openCartSidebar, closeCartSidebar } = useMemo(
    () => ({
      openCartSidebar() {
        setCartSidebarOpen(true);
      },
      closeCartSidebar() {
        setCartSidebarOpen(false);
      },
    }),
    [],
  );

  return (
    <div className="flex flex-col h-full relative">
      <TheHeader
        totalPrice={totalPrice}
        itemsInCartCount={itemsInCartFlatCount}
        className="px-8"
        onCartClick={openCartSidebar}
      />

      <CartSidebar isOpen={isCartSidebarOpen} onClose={closeCartSidebar} />

      <main className="flex-1 flex flex-col self-center max-w-[1400px] w-full">{children}</main>
    </div>
  );
}
