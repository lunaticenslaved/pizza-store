import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import { cn } from '@/shared/lib';

import './globals.css';

const font = Montserrat({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'React Pizza',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={cn(font.className, 'antialiased')}>{children}</body>
    </html>
  );
}
