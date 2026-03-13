import { source } from '@/lib/source';
import { readFile } from 'fs/promises';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page || !page.absolutePath) notFound();

  const content = await readFile(page.absolutePath, 'utf-8');
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

export async function generateStaticParams() {
  return source.generateParams();
}
