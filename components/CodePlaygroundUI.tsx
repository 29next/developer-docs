'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { ExternalLink } from 'lucide-react';
import { buildIframeHtml } from '@/lib/playground/utils';
import { DEFAULT_CONFIG } from '@/lib/playground/constants';

export interface CodePlaygroundUIProps {
  content?: string;
  layout?: string;
  height?: number;
  src?: string;
}

export function CodePlaygroundUI({
  content = '',
  layout = '',
  height = 420,
  src,
}: CodePlaygroundUIProps) {
  const [iframeSrc, setIframeSrc] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const blobUrlRef = useRef<string | null>(null);
  const isDraggingRef = useRef(false);

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
    const fullHtml = buildIframeHtml(content, DEFAULT_CONFIG, layout);
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
  }, [content, layout]);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;

    const container = containerRef.current;
    if (!container) return;

    const onMove = (ev: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const rect = container.getBoundingClientRect();
      const newWidth = ev.clientX - rect.left;
      setPreviewWidth(Math.min(rect.width, Math.max(200, newWidth)));
    };

    const onUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, []);

  const playgroundUrl = src ? `/playground?preset=${src}` : '/playground';

  return (
    <Tabs items={['Preview', 'Code']}>
      <Tab value="Preview" className="p-0 rounded-t-xl overflow-hidden">
        <div
          ref={containerRef}
          className="relative overflow-hidden flex"
          style={{
            height,
            backgroundColor: isDark ? '#0f1117' : '#f1f5f9',
            backgroundImage: isDark
              ? 'radial-gradient(circle, #2d3748 1px, transparent 1px)'
              : 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          {/* Iframe panel */}
          <div
            className="relative h-full shrink-0 overflow-hidden"
            style={{ width: previewWidth ?? '100%' }}
          >
            {iframeSrc && (
              <iframe
                key={iframeSrc}
                src={iframeSrc}
                title="Preview"
                className="w-full h-full border-0"
                style={isDraggingRef.current ? { pointerEvents: 'none' } : undefined}
              />
            )}
          </div>

          {/* Drag handle */}
          <div
            className="absolute top-0 bottom-0 w-3 flex items-center justify-center cursor-col-resize z-10 group"
            style={{
              left: previewWidth != null ? `${previewWidth - 6}px` : 'calc(100% - 6px)',
            }}
            onMouseDown={handleDragStart}
          >
            <div className="w-1 h-10 rounded-full bg-fd-border group-hover:bg-blue-500 transition-colors" />
          </div>

          {/* Top-right actions */}
          <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
            {previewWidth != null && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-fd-background/90 text-fd-muted-foreground font-mono border border-fd-border">
                {Math.round(previewWidth)}px
              </span>
            )}
            <a
              href={playgroundUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in Playground"
              className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-fd-border bg-fd-background/90 text-fd-foreground hover:bg-fd-muted transition-colors"
            >
              <ExternalLink size={12} />
              Playground
            </a>
          </div>
        </div>
      </Tab>

      <Tab value="Code">
        <DynamicCodeBlock lang="html" code={content} />
      </Tab>
    </Tabs>
  );
}
