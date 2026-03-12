'use client';

import { use, useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

const cache = new Map<string, Promise<unknown>>();

function cachePromise<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached) return cached as Promise<T>;
  const p = fn();
  cache.set(key, p);
  return p;
}

export function Mermaid({ chart }: { chart: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <MermaidContent chart={chart} />;
}

function MermaidContent({ chart }: { chart: string }) {
  const id = useId();
  const { resolvedTheme } = useTheme();
  const { default: mermaid } = use(
    cachePromise('mermaid', () => import('mermaid')),
  );

  const isDark = resolvedTheme === 'dark';
  const textColor = isDark ? '#e5e7eb' : '#111111';
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    fontFamily: 'inherit',
    theme: 'base',
    themeVariables: {
      primaryColor: 'transparent',
      primaryTextColor: textColor,
      primaryBorderColor: 'hsl(217, 91%, 60%)',
      lineColor: 'hsl(217, 91%, 60%)',
      background: 'transparent',
      mainBkg: 'transparent',
      nodeBorder: 'hsl(217, 91%, 60%)',
      clusterBkg: 'transparent',
      titleColor: textColor,
      edgeLabelBackground: isDark ? '#1a1a1a' : '#ffffff',
      tertiaryColor: 'transparent',
    },
  });

  const { svg, bindFunctions } = use(
    cachePromise(`${chart}-${resolvedTheme}`, () =>
      mermaid.render(id, chart.replaceAll('\\n', '\n')),
    ),
  );

  return (
    <div
      ref={(container) => {
        if (container) bindFunctions?.(container);
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
