'use client';

import { X } from 'lucide-react';
import React from 'react';
import type { PlaygroundExample } from '@/lib/playground';

interface SidebarProps {
  examples: PlaygroundExample[];
  selected: PlaygroundExample;
  onSelect: (e: PlaygroundExample) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const CATEGORY_COLORS = [
  'bg-blue-500/15 text-blue-500',
  'bg-orange-500/15 text-orange-500',
  'bg-green-500/15 text-green-500',
  'bg-purple-500/15 text-purple-500',
  'bg-pink-500/15 text-pink-500',
  'bg-amber-500/15 text-amber-500',
  'bg-teal-500/15 text-teal-500',
];

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function categoryColor(cat: string): string {
  return CATEGORY_COLORS[hashString(cat) % CATEGORY_COLORS.length];
}

function categoryInitial(cat: string): string {
  const trimmed = cat.trim();
  return trimmed.length > 0 ? trimmed[0].toUpperCase() : '#';
}

function SidebarContent({
  examples,
  selected,
  onSelect,
  onItemClick,
}: {
  examples: PlaygroundExample[];
  selected: PlaygroundExample;
  onSelect: (e: PlaygroundExample) => void;
  onItemClick?: () => void;
}) {
  const categories = [...new Set(examples.map((e) => e.category))];

  return (
    <>
      {categories.map((cat) => {
        const items = examples.filter((e) => e.category === cat);
        const color = categoryColor(cat);
        const initial = categoryInitial(cat);
        return (
          <div key={cat} className="mb-4">
            <div className="px-3 mb-2 text-[11px] uppercase tracking-wide text-fd-muted-foreground font-semibold">
              {cat}
            </div>
            <div className="px-2 flex flex-col gap-1">
              {items.map((example) => {
                const isActive = selected.id === example.id;
                return (
                  <button
                    key={example.id}
                    type="button"
                    onClick={() => {
                      onSelect(example);
                      onItemClick?.();
                    }}
                    className={`flex items-center gap-2.5 rounded-lg p-2 text-start transition-colors ${
                      isActive
                        ? 'bg-fd-accent text-fd-accent-foreground ring-1 ring-blue-500/40'
                        : 'hover:bg-fd-muted text-fd-foreground'
                    }`}
                  >
                    <div
                      className={`shrink-0 size-8 rounded-md flex items-center justify-center text-sm font-semibold ${color}`}
                    >
                      {initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-tight truncate">
                        {example.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

export function Sidebar({
  examples,
  selected,
  onSelect,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar (md and up) */}
      <aside className="hidden md:flex w-64 shrink-0 border-r border-fd-border bg-fd-background flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto py-4">
          <SidebarContent
            examples={examples}
            selected={selected}
            onSelect={onSelect}
          />
        </div>
      </aside>

      {/* Mobile drawer (below md) */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          <aside className="relative w-72 max-w-[85%] bg-fd-background border-r border-fd-border flex flex-col overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-3 h-12 border-b border-fd-border shrink-0">
              <span className="font-semibold text-sm">Examples</span>
              <button
                type="button"
                onClick={onMobileClose}
                className="p-1 text-fd-muted-foreground hover:text-fd-foreground rounded"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <SidebarContent
                examples={examples}
                selected={selected}
                onSelect={onSelect}
                onItemClick={onMobileClose}
              />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
