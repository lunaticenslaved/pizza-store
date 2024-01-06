import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Montserrat } from 'next/font/google';

import { auth } from '@/auth';
import { cn } from '@/shared/lib';

import './globals.css';

const font = Montserrat({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'React Pizza',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="ru">
      <body className={cn(font.className, 'antialiased')}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
