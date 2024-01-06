import { PropsWithChildren, ReactNode } from 'react';

import Image from 'next/image';

interface TheLayoutProps extends PropsWithChildren {
  header: ReactNode;
}

export function TheLayout({ children, header }: TheLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      {header}

      <div className="flex-1 relative flex flex-col overflow-y-auto">
        <Image
          src="/images/pizza-presentation.jpg"
          alt="Pizza"
          height={2000}
          width={2000}
          className="object-cover z-0 flex-1 absolute h-full"
        />

        <main className="flex-1 flex flex-col self-center max-w-[1400px] w-full z-10 h-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
