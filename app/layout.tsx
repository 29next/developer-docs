import { RootProvider } from 'fumadocs-ui/provider/next';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: `%s | Developers | ${siteConfig.companyName}`,
    default: `Developers | ${siteConfig.companyName}`,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider search={{ enabled: false }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
