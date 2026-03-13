import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from 'ai';
import { z } from 'zod';
import { source } from '@/lib/source';
import { Document, type DocumentData } from 'flexsearch';

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
  const reqJson: { messages?: UIMessage[]; pageUrl?: string } = await req.json();

  let contextPrompt = systemPrompt;
  if (reqJson.pageUrl) {
    const page = source.getPages().find((p) => p.url === reqJson.pageUrl);
    if (page) {
      contextPrompt += `\n\nThe user is currently viewing the page "${page.data.title}" (${reqJson.pageUrl}). Use this to prioritize relevant search results.`;
    }
  }

  const result = streamText({
    model: openrouter.chat(process.env.OPENROUTER_MODEL ?? 'anthropic/claude-3.5-sonnet'),
    stopWhen: stepCountIs(5),
    tools: {
      search: searchTool,
    },
    messages: [
      { role: 'system', content: contextPrompt },
      ...(await convertToModelMessages(reqJson.messages ?? [])),
    ],
    toolChoice: 'auto',
  });

  return result.toUIMessageStreamResponse();
}

const searchTool = tool({
  description: 'Search the docs content and return raw JSON results.',
  inputSchema: z.object({
    query: z.string(),
    limit: z.number().int().min(1).max(100).default(10),
  }),
  async execute({ query, limit }) {
    const search = await searchServer;
    return await search.searchAsync(query, { limit, merge: true, enrich: true });
  },
});

export type SearchTool = typeof searchTool;
