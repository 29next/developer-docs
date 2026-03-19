import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    template: `%s | Developers | ${siteConfig.companyName}`,
    default: `Developers | ${siteConfig.companyName}`,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans">
        <RootProvider search={{ enabled: false }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
