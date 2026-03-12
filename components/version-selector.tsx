'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChevronsUpDown, Check } from 'lucide-react';
import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';

interface Version {
  slug: string;
  label: string;
  description: string;
}

interface SectionConfig {
  /** Prefix used to decide whether to show the selector */
  showPrefix: string;
  /** Prefix used as the base for building versioned reference paths */
  referencePrefix: string;
  versions: Version[];
  versionSlugs: string[];
}

const SECTIONS: SectionConfig[] = [
  {
    showPrefix: '/docs/admin-api/reference',
    referencePrefix: '/docs/admin-api/reference',
    versionSlugs: ['2023-02-10', 'unstable'],
    versions: [
      { slug: '',           label: '2024-04-01', description: 'Stable'   },
      { slug: '2023-02-10', label: '2023-02-10', description: 'Legacy'   },
      { slug: 'unstable',   label: 'unstable',   description: 'Unstable' },
    ],
  },
  {
    showPrefix: '/docs/campaigns/api',
    referencePrefix: '/docs/campaigns/api',
    versionSlugs: [],
    versions: [
      { slug: '', label: 'v1', description: 'Current' },
    ],
  },
  {
    showPrefix: '/docs/webhooks/reference',
    referencePrefix: '/docs/webhooks/reference',
    versionSlugs: ['2023-02-10', 'unstable'],
    versions: [
      { slug: '',           label: '2024-04-01', description: 'Stable'   },
      { slug: '2023-02-10', label: '2023-02-10', description: 'Legacy'   },
      { slug: 'unstable',   label: 'unstable',   description: 'Unstable' },
    ],
  },
];

function parseSection(pathname: string): { section: SectionConfig; slug: string; relativePath: string } | null {
  for (const section of SECTIONS) {
    if (!pathname.startsWith(section.showPrefix)) continue;
    // Only parse version slug + relative path when inside the reference prefix
    if (pathname.startsWith(section.referencePrefix)) {
      const after = pathname.slice(section.referencePrefix.length);
      const parts = after.split('/').filter(Boolean);
      if (parts.length > 0 && section.versionSlugs.includes(parts[0])) {
        return { section, slug: parts[0], relativePath: parts.slice(1).join('/') };
      }
      return { section, slug: '', relativePath: parts.join('/') };
    }
    // On non-reference pages (guides etc.) — show stable, navigate to reference root on switch
    return { section, slug: '', relativePath: '' };
  }
  return null;
}

function buildPath(referencePrefix: string, slug: string, relativePath: string): string {
  const versionPart = slug ? `/${slug}` : '';
  const relPart = relativePath ? `/${relativePath}` : '';
  return `${referencePrefix}${versionPart}${relPart}`;
}

export function VersionSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const parsed = parseSection(pathname);
  if (!parsed || parsed.section.versions.length <= 1) return null;

  const { section, slug, relativePath } = parsed;
  const current = section.versions.find((v) => v.slug === slug) ?? section.versions[0];

  function select(version: Version) {
    setOpen(false);
    if (version.slug === slug) return;
    router.push(buildPath(section.referencePrefix, version.slug, relativePath));
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className="flex w-fit items-center gap-2 rounded-lg p-2 border bg-fd-secondary/50 text-start text-fd-secondary-foreground transition-colors hover:bg-fd-accent data-[state=open]:bg-fd-accent data-[state=open]:text-fd-accent-foreground">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium leading-none">{current.label}</span>
          <span className="text-sm text-fd-muted-foreground">{current.description}</span>
        </div>
        <ChevronsUpDown className="shrink-0 ms-auto size-4 text-fd-muted-foreground" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-50 flex flex-col gap-1 min-w-[var(--radix-popover-trigger-width)] w-max rounded-lg border bg-fd-popover p-1 shadow-md"
          sideOffset={4}
          align="start"
        >
          {section.versions.map((v) => {
            const isActive = v.slug === slug;
            return (
              <button
                key={v.slug || 'default'}
                onClick={() => select(v)}
                className="flex items-center gap-2 rounded-lg p-1.5 text-start hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
              >
                <div className="flex items-center gap-1.5 flex-1">
                  <span className="text-sm font-medium leading-none">{v.label}</span>
                  <span className="text-sm text-fd-muted-foreground">{v.description}</span>
                </div>
                <Check className={`shrink-0 ms-auto size-3.5 text-fd-primary ${isActive ? '' : 'invisible'}`} />
              </button>
            );
          })}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
