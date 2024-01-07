import { PropsWithChildren } from 'react';

import { TheNavbar } from '@/widgets/the-navbar';

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col">
      <TheNavbar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
