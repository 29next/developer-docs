'use client';

import { useState, useEffect, useRef } from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { buildIframeHtml } from '@/lib/playground/utils';
import { DEFAULT_CONFIG } from '@/lib/playground/constants';
import { PreviewPanel } from '@/components/Playground/PreviewPanel';
import type { Viewport } from '@/lib/playground/types';

export interface CodePlaygroundUIProps {
  html?: string;
  css?: string;
  js?: string;
  layout?: string;
  height?: number;
}

export function CodePlaygroundUI({
  html = '',
  css,
  js,
  layout = '',
  height = 420,
}: CodePlaygroundUIProps) {
  const [iframeSrc, setIframeSrc] = useState('');
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [isDark, setIsDark] = useState(false);
  const blobUrlRef = useRef<string | null>(null);

  const combinedHtml = [html, css, js,]
    .filter(Boolean)
    .join('\n');

  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains('dark'));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fullHtml = buildIframeHtml(combinedHtml, DEFAULT_CONFIG, layout);
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    blobUrlRef.current = url;
    setIframeSrc(url);

    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [combinedHtml, layout]);

  const tabItems = [
    'Preview',
    ...(html ? ['HTML'] : []),
    ...(css ? ['CSS'] : []),
    ...(js ? ['JS'] : []),
  ];

  return (
   <Tabs items={tabItems}>
        <Tab value="Preview" className='p-0 rounded-t-xl overflow-hidden'>
          <div className="flex" style={{ height }}>
            <PreviewPanel
              iframeSrc={iframeSrc}
              isDark={isDark}
              viewport={viewport}
              onViewportChange={setViewport}
              layout={layout}
              floatingViewports
            />
          </div>
        </Tab>

        {html && (
          <Tab value="HTML">
            <DynamicCodeBlock lang="html" code={html} />
          </Tab>
        )}
        {css && (
          <Tab value="CSS">
            <DynamicCodeBlock lang="css" code={css.replace(/<\/?style>/g, '')} />
          </Tab>
        )}
        {js && (
          <Tab value="JS">
            <DynamicCodeBlock lang="js" code={js.replace(/<\/?script>/g, '')} />
          </Tab>
        )}
      </Tabs>
  );
}
