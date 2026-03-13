import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from 'ai';
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

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const systemPrompt = [
  'You are a helpful technical assistant for Next Commerce developer documentation.',
  'Your job is to answer developer questions clearly and concisely based on the documentation.',
  'Always use the `search` tool first to find relevant documentation before answering.',
  'Base your answers on the search results. Cite sources as markdown links using the document `url` field.',
  'When writing code examples, use the language shown in the documentation.',
  'If the search results do not contain enough information to answer the question, say so honestly.',
  'Do not make up API endpoints, parameters, or behaviours that are not in the documentation.',
  'Keep answers focused and practical. Avoid lengthy preambles — get straight to the answer.',
].join('\n');

export async function POST(req: Request) {
  const reqJson: { messages?: UIMessage[] } = await req.json();

  const result = streamText({
    model: openrouter.chat(process.env.OPENROUTER_MODEL ?? 'anthropic/claude-3.5-sonnet'),
    stopWhen: stepCountIs(5),
    tools: {
      search: searchTool,
    },
    messages: [
      { role: 'system', content: systemPrompt },
      ...(await convertToModelMessages(reqJson.messages ?? [])),
    ],
    prepareStep: ({ stepNumber }) => ({
      toolChoice: stepNumber === 0 ? 'required' : 'auto',
    }),
  });

  return result.toUIMessageStreamResponse();
}

const searchTool = tool({
  description: 'Search the docs content and return raw JSON results.',
  inputSchema: z.object({
    query: z.string(),
    limit: z.number().int().min(1).max(20).default(5),
  }),
  async execute({ query, limit }) {
    const search = await searchServer;
    const results = await search.searchAsync(query, { limit, merge: true, enrich: true });
    // Truncate content to avoid flooding the context window
    return results.map((r: any) => ({
      ...r,
      result: r.result?.map((doc: any) => ({
        ...doc,
        doc: doc.doc
          ? { ...doc.doc, content: doc.doc.content?.slice(0, 1500) }
          : doc.doc,
      })),
    }));
  },
});

export type SearchTool = typeof searchTool;
