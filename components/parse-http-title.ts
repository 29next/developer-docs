/**
 * Parse a title string encoded as `__http:METHOD:url` by the remark plugin.
 * Uses the first colon after `__http:` as the method/url delimiter — safe
 * because HTTP methods never contain colons.
 */
export function parseHttpTitle(title: string): { method: string; target: string } | null {
  if (!title.startsWith('__http:')) return null;
  const rest = title.slice('__http:'.length);
  const colonIdx = rest.indexOf(':');
  if (colonIdx === -1) return null;
  return { method: rest.slice(0, colonIdx), target: rest.slice(colonIdx + 1) };
}
