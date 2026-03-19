'use client';

import * as Tooltip from '@radix-ui/react-tooltip';

const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  POST: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  PUT: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  PATCH: 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
  DELETE: 'bg-red-500/15 text-red-600 dark:text-red-400',
};

const RECOMMENDED_API_VERSION = '2024-04-01';
const BASE_URL_PATTERN = /^https?:\/\/\{store\}\.29next\.store/;

function stripBaseUrl(url: string): string {
  return url.replace(BASE_URL_PATTERN, '');
}

export function HttpRequestRow({ method, target }: { method: string; target: string }) {
  const upperMethod = method.toUpperCase();
  const colorClass = METHOD_COLORS[upperMethod] ?? 'bg-fd-muted text-fd-muted-foreground';
  const shortTarget = stripBaseUrl(target);
  const wasStripped = shortTarget !== target;

  return (
    <Tooltip.Provider delayDuration={200}>
      <span className="flex items-center gap-2.5 text-[0.8125rem] w-full">
        {upperMethod && (
          <span
            className={`inline-flex items-center rounded-md px-1.5 py-0.5 font-semibold text-xs shrink-0 ${colorClass}`}
          >
            {upperMethod}
          </span>
        )}
        {target && (
          wasStripped ? (
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="text-fd-foreground font-mono font-medium truncate cursor-help">
                  {shortTarget}
                </span>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="bottom"
                  align="start"
                  sideOffset={6}
                  className="z-50 rounded-md bg-fd-popover border border-fd-border px-3 py-2 text-xs text-fd-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
                >
                  <code className="font-mono text-[0.6875rem]">{target}</code>
                  <Tooltip.Arrow className="fill-fd-border" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          ) : (
            <span className="text-fd-foreground font-mono font-medium truncate">{target}</span>
          )
        )}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <span className="ml-auto shrink-0 text-[0.6875rem] text-fd-muted-foreground/60 font-mono cursor-help">
              {RECOMMENDED_API_VERSION}
            </span>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="bottom"
              align="end"
              sideOffset={6}
              className="z-50 rounded-md bg-fd-popover border border-fd-border px-3 py-2 text-xs text-fd-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
            >
              <span className="block font-medium mb-1">Required Header</span>
              <code className="font-mono text-[0.6875rem] text-fd-muted-foreground">
                X-29Next-Api-Version: {RECOMMENDED_API_VERSION}
              </code>
              <Tooltip.Arrow className="fill-fd-border" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </span>
    </Tooltip.Provider>
  );
}
