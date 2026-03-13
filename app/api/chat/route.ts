import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { convertToModelMessages, streamText, tool, type UIMessage } from 'ai';
import { z } from 'zod';
import { source } from '@/lib/source';
import { Document, type DocumentData } from 'flexsearch';
import apiEndpoints from '@/lib/generated/api-endpoints.json';

interface CustomDocument extends DocumentData {
  url: string;
  title: string;
  description: string;
  content: string;
}

const searchServer = createSearchServer();

async function createSearchServer() {
  const search = new Document<CustomDocument>({
    document: {
      id: 'url',
      index: ['title', 'description', 'content'],
      store: true,
    },
  });

  const docs = await chunkedAll(
    source.getPages().map(async (page) => {
      if (!('getText' in page.data)) return null;

      return {
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        content: await page.data.getText('processed'),
      } as CustomDocument;
    }),
  );

  for (const doc of docs) {
    if (doc) search.add(doc);
  }

  for (const ep of apiEndpoints) {
    search.add(ep as CustomDocument);
  }

  return search;
}

async function chunkedAll<O>(promises: Promise<O>[]): Promise<O[]> {
  const SIZE = 50;
  const out: O[] = [];
  for (let i = 0; i < promises.length; i += SIZE) {
    out.push(...(await Promise.all(promises.slice(i, i + SIZE))));
  }
  return out;
}

async function runSearch(query: string, limit = 8): Promise<CustomDocument[]> {
  const search = await searchServer;
  const results = await search.searchAsync(query, { limit, merge: true, enrich: true });
  return (results as any[])
    .flatMap((r) => r.result ?? [])
    .map((d) => ({
      ...d.doc,
      content: d.doc?.content?.slice(0, 1200) ?? '',
    }))
    .filter((d) => d.url);
}

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const systemPrompt = [
  'You are a helpful technical assistant for Next Commerce developer documentation.',
  'Your job is to answer developer questions clearly and concisely based on the documentation provided in context.',
  'Base your answers on the documentation context below. Cite sources as markdown links using the document URL.',
  'When writing code examples, use the language shown in the documentation.',
  'If the documentation context does not contain enough information to answer the question, say so honestly.',
  'Do not make up API endpoints, parameters, or behaviours that are not in the documentation.',
  'Keep answers focused and practical. Avoid lengthy preambles — get straight to the answer.',
].join('\n');

export async function POST(req: Request) {
  const reqJson: { messages?: UIMessage[] } = await req.json();
  const messages = reqJson.messages ?? [];

  // Extract latest user question and search server-side — don't rely on model to call tools
  const lastUserText = messages
    .filter((m) => m.role === 'user')
    .at(-1)
    ?.parts?.filter((p: any) => p.type === 'text')
    .map((p: any) => p.text as string)
    .join(' ') ?? '';

  const docs = lastUserText ? await runSearch(lastUserText) : [];

  const contextBlock =
    docs.length > 0
      ? 'Relevant documentation:\n\n' +
        docs.map((d) => `### [${d.title}](${d.url})\n${d.description ? d.description + '\n' : ''}${d.content}`).join('\n\n---\n\n')
      : 'No relevant documentation found.';

  const result = streamText({
    model: openrouter.chat(process.env.OPENROUTER_MODEL ?? 'anthropic/claude-3.5-sonnet'),
    messages: [
      { role: 'system', content: `${systemPrompt}\n\n${contextBlock}` },
      ...(await convertToModelMessages(messages)),
    ],
  });

  return result.toUIMessageStreamResponse();
}

// Keep tool definition so the UI type import still works
const searchTool = tool({
  description: 'Search the docs content and return raw JSON results.',
  inputSchema: z.object({
    query: z.string(),
    limit: z.number().int().min(1).max(20).default(8),
  }),
  async execute({ query, limit }) {
    return runSearch(query, limit);
  },
});

export type SearchTool = typeof searchTool;
