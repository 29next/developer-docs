'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PageTree } from 'fumadocs-core/server';
import apiMethods from '@/lib/generated/api-methods.json';

const METHOD_STYLES: Record<string, string> = {
  GET: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  POST: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  PUT: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  PATCH: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
};

const BASE =
  'flex flex-row items-center gap-2 rounded-md p-2 text-start text-fd-muted-foreground md:py-1.5';
const ACTIVE = 'bg-fd-primary/10 font-medium text-fd-primary';
const INACTIVE =
  'transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none';

export function ApiMethodSidebarItem({ item }: { item: PageTree.Item }) {
  const pathname = usePathname();
  const active =
    item.url === pathname ||
    (item.url !== '/' && pathname.startsWith(`${item.url}/`));

  const method = (apiMethods as Record<string, string>)[item.url];
  const methodStyles = method ? METHOD_STYLES[method] : undefined;

  return (
    <Link
      href={item.url}
      data-active={active}
      className={`${BASE} ${active ? ACTIVE : INACTIVE}`}
    >
      {item.icon && !methodStyles && <span className="[&_svg]:size-4 [&_svg]:shrink-0">{item.icon}</span>}
      <span className="flex-1 [overflow-wrap:anywhere]">{item.name}</span>
      {methodStyles && (
        <span
          className={`ml-auto inline-flex shrink-0 items-center justify-center rounded px-1 py-0.5 text-[10px] font-bold font-mono leading-none ${methodStyles}`}
        >
          {method}
        </span>
      )}
    </Link>
  );
}
