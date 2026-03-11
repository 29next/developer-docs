import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { APIPage } from '@/components/api-page';
import { VersionSelector } from '@/components/version-selector';
import { MethodBadge } from '@/components/method-badge';
import type { Metadata } from 'next';
import type { ComponentProps, FC } from 'react';

interface MDXData {
  body: FC<{ components?: Record<string, unknown> }>;
  toc: ComponentProps<typeof DocsPage>['toc'];
  full?: boolean;
  title: string;
  description?: string;
  _openapi?: {
    method?: string;
    route?: string;
  };
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

const ADMIN_VERSION_SLUGS = ['2023-02-10', 'unstable'];
const ADMIN_DEFAULT_VERSION = '2024-04-01';

const ADMIN_VERSIONS = [
  { value: ADMIN_DEFAULT_VERSION, label: '2024-04-01 (stable)', path: '/docs/admin-api/reference' },
  { value: '2023-02-10', label: '2023-02-10', path: '/docs/admin-api/reference/2023-02-10' },
  { value: 'unstable', label: 'Unstable', path: '/docs/admin-api/reference/unstable' },
];

const CAMPAIGNS_VERSIONS = [
  { value: 'v1', label: 'v1', path: '/docs/campaigns/api/reference' },
];

function getVersionInfo(slug: string[] | undefined) {
  if (!slug) return null;

  // /docs/admin-api/reference/... — either default (no version folder) or versioned
  if (slug[0] === 'admin-api' && slug[1] === 'reference') {
    const isVersionedSlug = ADMIN_VERSION_SLUGS.includes(slug[2]);
    // relativePath is the part after the version prefix, e.g. "/apps/apps-retrieve"
    const relativeParts = isVersionedSlug ? slug.slice(3) : slug.slice(2);
    const relativePath = relativeParts.length > 0 ? '/' + relativeParts.join('/') : '';
    const versions = ADMIN_VERSIONS.map((v) => ({
      ...v,
      path: v.path + relativePath,
    }));
    return {
      versions,
      currentVersion: isVersionedSlug ? slug[2] : ADMIN_DEFAULT_VERSION,
    };
  }

  // /docs/campaigns/api/reference/... — single version, always v1
  if (slug[0] === 'campaigns' && slug[1] === 'api' && slug[2] === 'reference') {
    return {
      versions: CAMPAIGNS_VERSIONS,
      currentVersion: 'v1',
    };
  }

  return null;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const data = page.data as unknown as MDXData;
  const MDX = data.body;
  const versionInfo = getVersionInfo(slug);

  const openapi = data._openapi;

  return (
    <DocsPage toc={data.toc} full={data.full} article={data.full ? { className: 'max-w-none' } : undefined}>
      {openapi?.method && (
        <div className="mb-2 flex items-center gap-2">
          <MethodBadge method={openapi.method} />
          {openapi.route && (
            <code className="text-sm text-fd-muted-foreground">{openapi.route}</code>
          )}
        </div>
      )}
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      {versionInfo && (
        <div className="mb-4 flex items-center gap-2 text-sm text-fd-muted-foreground">
          <span>Version</span>
          <VersionSelector
            versions={versionInfo.versions}
            currentVersion={versionInfo.currentVersion}
          />
        </div>
      )}
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents, APIPage }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const data = page.data as unknown as MDXData;
  return {
    title: data.title,
    description: data.description,
  };
}
