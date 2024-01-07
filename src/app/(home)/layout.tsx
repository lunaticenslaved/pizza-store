import { PropsWithChildren } from 'react';

import { TheHeader } from '@/widgets/the-header';
import { TheLayout } from '@/widgets/the-layout';

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <TheLayout
      header={
        <>
          <TheHeader withActions />
        </>
      }>
      <div className="bg-white h-full flex flex-col relative overflow-y-auto">{children}</div>
    </TheLayout>
  );
}
