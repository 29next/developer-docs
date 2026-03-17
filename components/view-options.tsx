'use client';

import { ViewOptionsPopover } from 'fumadocs-ui/layouts/docs/page';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

/**
 * Wraps fumadocs ViewOptionsPopover with a key tied to the current pathname.
 * This forces a full remount on every navigation so that window.location.href
 * (used internally by fumadocs for "Open in ChatGPT/Claude" links) is fresh.
 */
export function ViewOptions(props: ComponentProps<typeof ViewOptionsPopover>) {
  const pathname = usePathname();
  return <ViewOptionsPopover key={pathname} {...props} />;
}
