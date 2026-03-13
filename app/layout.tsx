import { RootProvider } from 'fumadocs-ui/provider/next';
import { AlgoliaDialog } from '@/components/search';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { MessageCircleIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import './globals.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider search={{ SearchDialog: AlgoliaDialog }}>
          <AISearch>
            <AISearchPanel />
            <AISearchTrigger
              position="float"
              className="fixed bottom-4 end-4 z-20 flex items-center gap-2 rounded-2xl bg-fd-secondary px-4 py-2 text-sm text-fd-secondary-foreground shadow-lg"
            >
              <MessageCircleIcon className="size-4" />
              Ask AI
            </AISearchTrigger>
            {children}
          </AISearch>
        </RootProvider>
      </body>
    </html>
  );
}
