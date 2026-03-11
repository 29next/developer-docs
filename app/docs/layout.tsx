import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import {
  Megaphone,
  ShoppingBag,
  Puzzle,
  Database,
  Webhook,
} from 'lucide-react';
import type { ReactNode } from 'react';

const SECTION_TABS = [
  {
    url: '/docs/campaigns',
    title: 'Campaigns',
    description: 'Campaign funnels & checkout',
    icon: <Megaphone className="size-4" />,
  },
  {
    url: '/docs/storefront',
    title: 'Storefront',
    description: 'Themes & storefronts',
    icon: <ShoppingBag className="size-4" />,
  },
  {
    url: '/docs/apps',
    title: 'Apps',
    description: 'Build & distribute apps',
    icon: <Puzzle className="size-4" />,
  },
  {
    url: '/docs/admin-api',
    title: 'Admin API',
    description: 'Store management API',
    icon: <Database className="size-4" />,
  },
  {
    url: '/docs/webhooks',
    title: 'Webhooks',
    description: 'Event notifications',
    icon: <Webhook className="size-4" />,
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: 'Next Commerce Docs',
      }}
      githubUrl="https://github.com/29next/developer-docs"
      sidebar={{
        tabs: SECTION_TABS,
      }}
    >
      {children}
    </DocsLayout>
  );
}
