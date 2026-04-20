'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PlaygroundExample } from '@/lib/playground';
import { ConfigModal } from '@/components/Playground/ConfigModal';
import { Sidebar } from '@/components/Playground/Sidebar';
import { TopBar } from '@/components/Playground/TopBar';
import { EditorPanel } from '@/components/Playground/EditorPanel';
import { PreviewPanel } from '@/components/Playground/PreviewPanel';
import {
  encodeCode,
  pushPresetParam,
} from '@/lib/playground/utils';
import { useDarkMode } from '@/hooks/useDarkMode';
import { usePlaygroundState } from '@/hooks/usePlaygroundState';
import { usePreviewUpdater } from '@/hooks/usePreviewUpdater';
import type { Config } from '@/lib/playground/types';

export function PlaygroundClient({
  examples,
}: {
  examples: PlaygroundExample[];
}) {
  const isDark = useDarkMode();
  const [state, actions] = usePlaygroundState(examples);
  const contentRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const { runPreview } = usePreviewUpdater(
    actions.setIframeSrc,
    state.currentExample,
  );

  // Track the code currently rendered in the preview so we can detect
  // unapplied edits and show an "Update Preview" button.
  const [appliedCode, setAppliedCode] = useState(state.code);
  // Forces the iframe to remount even if the URL is unchanged (e.g. Reset).
  const [reloadNonce, setReloadNonce] = useState(0);
  // Mobile sidebar drawer state (below md).
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const applyPreview = useCallback(
    (html: string, cfg: Config, lyt: string) => {
      runPreview(html, cfg, lyt);
      setAppliedCode(html);
    },
    [runPreview],
  );

  // Run preview on mount and whenever the example/config/layout changes.
  // Code edits no longer auto-trigger — the user clicks "Update Preview".
  useEffect(() => {
    applyPreview(state.code, state.config, state.layout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentExample.id, state.config, state.layout]);

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      actions.setCode(value ?? '');
    },
    [actions],
  );

  const handleApplyChanges = useCallback(() => {
    applyPreview(state.code, state.config, state.layout);
  }, [state.code, state.config, state.layout, applyPreview]);

  // Handle example selection (also used by Reset with the current example)
  const handleSelectExample = useCallback(
    (example: PlaygroundExample) => {
      // Clear all next-* session keys
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('next-')) {
          sessionStorage.removeItem(key);
        }
      });
      actions.setCurrentExample(example);
      actions.setCode(example.code);
      actions.setLayout(example.layout);
      applyPreview(example.code, state.config, example.layout);
      setReloadNonce((n) => n + 1);
      pushPresetParam(example.id);
    },
    [state.config, actions, applyPreview],
  );

  // Share button
  const handleShare = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('preset', state.currentExample.id);
    if (state.code !== state.currentExample.code) {
      url.searchParams.set('code', encodeCode(state.code));
    } else {
      url.searchParams.delete('code');
    }
    if (state.config.sdkHost) url.searchParams.set('sdkHost', state.config.sdkHost);
    if (state.config.sdkVersion) url.searchParams.set('sdkVersion', state.config.sdkVersion);
    navigator.clipboard.writeText(url.toString()).then(() => {
      actions.setCopied(true);
      setTimeout(() => actions.setCopied(false), 2000);
    });
  }, [state, actions]);

  // Handle config save
  const handleSaveConfig = useCallback(
    (newConfig: Config) => {
      actions.setConfig(newConfig);
      localStorage.setItem('next-playground-config', JSON.stringify(newConfig));
    },
    [actions],
  );

  // Drag handle for editor/preview splitter
  const handleDragStart = useCallback(() => {
    isDraggingRef.current = true;
    actions.setIsDragging(true);

    const container = contentRef.current;
    if (!container) return;

    const onMove = (ev: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const rect = container.getBoundingClientRect();
      const pct = ((ev.clientX - rect.left) / rect.width) * 100;
      actions.setEditorWidthPct(Math.min(80, Math.max(20, pct)));
    };

    const onUp = () => {
      isDraggingRef.current = false;
      actions.setIsDragging(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [actions]);

  return (
    <div className="flex flex-col h-screen bg-fd-background text-fd-foreground">
      {/* Top bar */}
      <TopBar
        onMenuOpen={() => setMobileSidebarOpen(true)}
        onReset={() => handleSelectExample(state.currentExample)}
        onShare={handleShare}
        onConfigOpen={() => actions.setShowConfig(true)}
        copied={state.copied}
      />

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <Sidebar
          examples={examples}
          selected={state.currentExample}
          onSelect={handleSelectExample}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        {/* Editor + Drag + Preview wrapper */}
        <div ref={contentRef} className="flex flex-1 min-w-0 min-h-0">
          {/* Editor */}
          <EditorPanel
            example={state.currentExample}
            code={state.code}
            isDark={isDark}
            isDragging={state.isDragging}
            editorWidthPct={state.editorWidthPct}
            expanded={state.previewExpanded}
            hasPendingChanges={state.code !== appliedCode}
            onCodeChange={handleEditorChange}
            onApplyChanges={handleApplyChanges}
          />

          {/* Drag handle — desktop only */}
          {!state.previewExpanded && (
            <div
              className="hidden lg:block w-1 shrink-0 cursor-col-resize hover:bg-blue-500 active:bg-blue-600 transition-colors bg-fd-border"
              onMouseDown={(e) => {
                e.preventDefault();
                handleDragStart();
              }}
            />
          )}

          {/* Preview */}
          <PreviewPanel
            iframeSrc={state.iframeSrc}
            reloadNonce={reloadNonce}
            isDark={isDark}
            isDragging={state.isDragging}
            previewWidth={state.previewWidth}
            onPreviewWidthChange={actions.setPreviewWidth}
            onExpandToggle={() => actions.setPreviewExpanded(!state.previewExpanded)}
            expanded={state.previewExpanded}
            config={state.config}
            code={state.code}
            layout={state.layout}
          />
        </div>
      </div>

      {/* Config modal */}
      {state.showConfig && (
        <ConfigModal
          config={state.config}
          onSave={handleSaveConfig}
          onClose={() => actions.setShowConfig(false)}
        />
      )}
    </div>
  );
}
