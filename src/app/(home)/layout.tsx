import { PropsWithChildren } from 'react';

import { CartSidebar } from '@/features/cart';
import { TheHeader } from '@/widgets/the-header';
import { TheLayout } from '@/widgets/the-layout';
import { TheNavbar } from '@/widgets/the-navbar';

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <TheLayout
      header={
        <>
          <TheHeader withActions />
          <CartSidebar />
        </>
      }>
      <div className="bg-white h-full flex flex-col relative overflow-y-auto">
        <TheNavbar className="flex" />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </TheLayout>
  );
}
