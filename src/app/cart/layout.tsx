import type { Metadata } from 'next';

import { TheHeader } from '@/widgets/the-header';
import { TheLayout } from '@/widgets/the-layout';

export const metadata: Metadata = {
  title: 'React Pizza | Cart',
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <TheLayout header={<TheHeader withActions />}>
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <div className="bg-white h-full relative overflow-y-auto">{children}</div>
      </div>
    </TheLayout>
  );
}
