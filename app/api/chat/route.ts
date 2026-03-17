import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, tool, type UIMessage } from 'ai';
import { z } from 'zod';
import { liteClient } from 'algoliasearch/lite';
import { siteConfig } from '@/lib/config';

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
  'about','other','another','also','too','more','any','some','just','even',
  'still','like','else','same','different','similar','related','using','use',
  'cool','great','awesome','nice','good','bad','okay','ok','yes','no','sure',
  'hey','hi','hello','thanks','thank','please','help','tell','show','explain',
  'want','need','trying','try','get','make','know','think','see','look','find',
  'works','working','work','thing','things','way','ways','go','going','got',
]);

function buildSearchQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[?!.,;:]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
    .join(' ');
}

async function runSearch(query: string, maxPages = 8) {
  const searchQuery = buildSearchQuery(query);
  const { results } = await algolia.search({
    requests: [
      {
        indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX!,
        query: searchQuery,
        hitsPerPage: 60,
        removeWordsIfNoResults: 'allOptional',
      },
    ],
  });

  // Group all chunks by url+section, preserving rank order of first appearance
  const groups = new Map<string, { url: string; title: string; section: string; parts: string[] }>();
  const order: string[] = [];

  for (const hit of (results[0] as any).hits ?? []) {
    const url = hit.url ?? hit.objectID;
    const section = (hit.section ?? '') as string;
    const content = (hit.content ?? '') as string;
    if (!content.trim()) continue;
    const key = `${url}|${section}`;
    if (!groups.has(key)) {
      groups.set(key, { url, title: hit.title ?? '', section, parts: [] });
      order.push(key);
    }
    groups.get(key)!.parts.push(content);
  }

  return order.slice(0, maxPages).map((key) => {
    const g = groups.get(key)!;
    return { url: g.url, title: g.title, section: g.section, content: g.parts.join(' | ') };
  });
}

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const systemPrompt = [
  `You are a helpful technical assistant for ${siteConfig.companyName} developer documentation.`,
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

  const lastUserMessage = messages.filter((m) => m.role === 'user').at(-1);
  const lastUserText =
    lastUserMessage?.parts
      ?.filter((p: any) => p.type === 'text')
      .map((p: any) => p.text as string)
      .join(' ') ?? '';

  console.log('[chat] searching for:', lastUserText);
  const docs = lastUserText ? await runSearch(lastUserText) : [];
  console.log('[chat] got', docs.length, 'results:', docs.map(d => `${d.url} [${d.section}] "${d.content.slice(0, 80)}""`));

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
      { role: 'system', content: `${systemPrompt}\n\n${contextBlock}\n\nCurrent question: ${lastUserText}` },
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
