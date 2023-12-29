import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import './globals.css';

const font = Montserrat({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'React Pizza',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={font.className}>{children}</body>
    </html>
  );
}
