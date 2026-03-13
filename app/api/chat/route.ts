import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, tool, type UIMessage } from 'ai';
import { z } from 'zod';
import { liteClient } from 'algoliasearch/lite';

const algolia = liteClient(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);

const STOP_WORDS = new Set([
  'a','an','the','is','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','could','should','may','might','shall','can',
  'i','you','he','she','it','we','they','what','which','who','how','when','where',
  'why','and','or','but','not','in','on','at','to','for','of','with','by','from',
  'this','that','these','those','my','your','his','her','its','our','their',
]);

function buildSearchQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[?!.,;:]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
    .join(' ');
}

async function runSearch(query: string, limit = 8) {
  const searchQuery = buildSearchQuery(query);
  const { results } = await algolia.search({
    requests: [
      {
        indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX!,
        query: searchQuery,
        hitsPerPage: limit,
      },
    ],
  });

  return ((results[0] as any).hits ?? []).map((hit: any) => ({
    url: hit.url ?? hit.objectID,
    title: hit.title ?? '',
    section: hit.section ?? '',
    content: hit.content ?? '',
  }));
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
        docs
          .map((d: any) => `### [${d.title}${d.section ? ` — ${d.section}` : ''}](${d.url})\n${d.content}`)
          .join('\n\n---\n\n')
      : 'No relevant documentation found for this query.';

  const result = streamText({
    model: openrouter.chat(process.env.OPENROUTER_MODEL ?? 'anthropic/claude-3.5-sonnet'),
    maxOutputTokens: 1024,
    messages: [
      { role: 'system', content: `${systemPrompt}\n\n${contextBlock}` },
      ...messages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({
          role: m.role as 'user' | 'assistant',
          content:
            m.parts
              ?.filter((p: any) => p.type === 'text')
              .map((p: any) => p.text as string)
              .join('') ?? '',
        })),
    ],
  });

  return result.toUIMessageStreamResponse();
}

// Kept for UI type compatibility
const searchTool = tool({
  description: 'Search the docs.',
  inputSchema: z.object({ query: z.string() }),
  async execute({ query }) {
    return runSearch(query);
  },
});

export type SearchTool = typeof searchTool;
