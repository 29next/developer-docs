const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  POST: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  PUT: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  PATCH: 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
  DELETE: 'bg-red-500/15 text-red-600 dark:text-red-400',
};

export function HttpRequestRow({ method, target }: { method: string; target: string }) {
  const upperMethod = method.toUpperCase();
  const colorClass = METHOD_COLORS[upperMethod] ?? 'bg-fd-muted text-fd-muted-foreground';

  return (
    <span className="flex items-center gap-2.5 text-[0.8125rem]">
      {upperMethod && (
        <span
          className={`inline-flex items-center rounded-md px-1.5 py-0.5 font-semibold text-xs ${colorClass}`}
        >
          {upperMethod}
        </span>
      )}
      {target && (
        <span className="text-fd-foreground font-mono font-medium truncate">{target}</span>
      )}
    </span>
  );
}

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
