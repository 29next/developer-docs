'use client';

import Editor, { type OnMount } from '@monaco-editor/react';
import { Play } from 'lucide-react';
import React, { useRef } from 'react';
import type { PlaygroundExample } from '@/lib/playground';

interface EditorPanelProps {
  example: PlaygroundExample;
  code: string;
  isDark: boolean;
  isDragging: boolean;
  editorWidthPct: number;
  expanded: boolean;
  hasPendingChanges: boolean;
  onCodeChange: (value: string | undefined) => void;
  onApplyChanges: () => void;
}

export function EditorPanel({
  example,
  code,
  isDark,
  isDragging,
  editorWidthPct,
  expanded,
  hasPendingChanges,
  onCodeChange,
  onApplyChanges,
}: EditorPanelProps) {
  const onApplyChangesRef = useRef(onApplyChanges);
  onApplyChangesRef.current = onApplyChanges;

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
      () => onApplyChangesRef.current(),
    );
  };

  if (expanded) return null;

  return (
    <div className="hidden lg:flex flex-col border-r border-fd-border min-w-0" style={{ width: `${editorWidthPct}%` }}>
      <div className="px-3 py-2 border-b border-fd-border bg-fd-muted/30 flex items-center gap-2 min-w-0">
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-medium text-fd-foreground truncate">{example.title}</span>
          {example.description && (
            <span className="text-xs text-fd-muted-foreground">{example.description}</span>
          )}
        </div>
        {hasPendingChanges && (
          <button
            type="button"
            onClick={onApplyChanges}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            <Play size={11} /> Update Preview
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language="html"
          theme={isDark ? 'vs-dark' : 'vs-light'}
          value={code}
          onChange={onCodeChange}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            padding: { top: 12, bottom: 12 },
            renderLineHighlight: 'gutter',
            tabSize: 2,
          }}
        />
      </div>
      {/* Suppress isDragging prop warning — used for pointer-events only */}
      {isDragging && (
        <div className="absolute inset-0 pointer-events-none" />
      )}
    </div>
  );
}
