import { Geist, Geist_Mono } from 'next/font/google';

import { Toaster } from '@/shared/lib/toaster';
import { cn } from '@/shared/lib/utils/cn';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
