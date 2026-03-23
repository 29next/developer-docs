import fs from 'node:fs';
import path from 'node:path';

const PLAYGROUND_DIR = path.join(process.cwd(), 'content/playground');

export interface ParsedPlaygroundFile {
  meta: Record<string, string>;
  html: string;
  css: string;
  js: string;
}

function parseFrontmatter(raw: string): {
  meta: Record<string, string>;
  body: string;
} {
  const match = raw.match(/^<!--\s*([\s\S]*?)-->/);
  if (!match) return { meta: {}, body: raw.trim() };

  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    if (key) meta[key] = value;
  }

  return { meta, body: raw.slice(match[0].length).trim() };
}

function extractSection(body: string, marker: string): string {
  const tag = `<!-- @${marker} -->`;
  const start = body.indexOf(tag);
  if (start === -1) return '';

  const contentStart = start + tag.length;
  // Find the next section marker or end of string
  const nextMatch = body.slice(contentStart).search(/<!--\s*@\w+\s*-->/);
  const content =
    nextMatch === -1
      ? body.slice(contentStart)
      : body.slice(contentStart, contentStart + nextMatch);

  return content.trim();
}

export function parsePlaygroundFile(src: string): ParsedPlaygroundFile {
  const filePath = path.join(PLAYGROUND_DIR, `${src}.html`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { meta, body } = parseFrontmatter(raw);

  const hasSections = /<!--\s*@\w+\s*-->/.test(body);

  if (!hasSections) {
    // Backward compat: no section markers → entire body is HTML
    return { meta, html: body, css: '', js: '' };
  }

  return {
    meta,
    html: extractSection(body, 'html'),
    css: extractSection(body, 'css'),
    js: extractSection(body, 'js'),
  };
}
