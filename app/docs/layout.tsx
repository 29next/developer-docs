import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.getPageTree()}
      sidebar={{
        tabs: {
          transform(option, node) {
            // Hide version subdirectory roots from the section switcher dropdown
            // option.url is the first page URL inside the folder, e.g.
            // /docs/admin-api/reference/2023-02-10/apps/some-page
            // so match the version segment anywhere in the path, not just at end
            const url = option.url ?? '';
            if (/\/(?:\d{4}-\d{2}-\d{2}|unstable)\//.test(url)) return null;
            return option;
          },
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
