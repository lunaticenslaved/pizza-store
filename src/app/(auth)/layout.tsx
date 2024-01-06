import type { Metadata } from 'next';

import { TheHeader } from '@/widgets/the-header';
import { TheLayout } from '@/widgets/the-layout';

export const metadata: Metadata = {
  title: 'React Pizza | Auth',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <TheLayout header={<TheHeader />}>
      <div className="flex-1 flex flex-col items-center justify-center z-10">{children}</div>
    </TheLayout>
  );
}
