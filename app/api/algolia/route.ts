import { source } from '@/lib/source';
import { sync } from 'fumadocs-core/search/algolia';
import { algoliasearch } from 'algoliasearch';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token');
  if (token !== process.env.ALGOLIA_INDEX_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.ALGOLIA_ADMIN_KEY!,
  );

  const pages = source.getPages();

  await sync(client, {
    indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX!,
    documents: pages.map((page) => ({
      _id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structured: page.data.structuredData,
      breadcrumbs: [],
    })),
  });

  return Response.json({ ok: true, indexed: pages.length });
}
