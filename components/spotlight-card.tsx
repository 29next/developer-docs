'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { useRef, useCallback } from 'react';
import type { ReactNode } from 'react';

export type SectionData = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  color: string;
  bg: string;
  border: string;
  hoverBorder: string;
  features?: string[];
  wide?: boolean;
};

/**
 * Section card with a subtle inner radial glow that tracks the mouse
 * position within the card on hover.
 */
export function SpotlightCard({
  title,
  description,
  href,
  icon,
  color,
  bg,
  border,
  hoverBorder,
  features,
  wide,
}: SectionData) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    glowRef.current.style.setProperty('--cx', `${e.clientX - left}px`);
    glowRef.current.style.setProperty('--cy', `${e.clientY - top}px`);
  }, []);

  return (
    <Link
      ref={cardRef}
      href={href}
      onMouseMove={handleMove}
      className={`group relative flex flex-col gap-4 overflow-hidden rounded-xl border ${border} ${hoverBorder} bg-fd-card p-6 transition-colors duration-200 hover:shadow-sm${wide ? ' sm:col-span-2 lg:col-span-2' : ''}`}
    >
      {/* Inner card spotlight glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(220px circle at var(--cx, 50%) var(--cy, 50%), rgba(60, 125, 255, 0.07), transparent 70%)',
        }}
      />

      <div className={`relative flex size-10 items-center justify-center rounded-lg ${bg} ${color}`}>
        {icon}
      </div>

      <div className="relative flex flex-col gap-2">
        <h3 className="flex items-center gap-2 font-semibold text-fd-foreground">
          {title}
          <ArrowRight
            size={14}
            className="-translate-x-1 opacity-0 transition-[transform,opacity] duration-200 group-hover:translate-x-0 group-hover:opacity-70"
            aria-hidden="true"
          />
        </h3>
        <p className="text-sm leading-relaxed text-fd-muted-foreground">{description}</p>
        {features && (
          <ul className="mt-2 flex flex-col gap-1.5">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-fd-muted-foreground">
                <Check size={12} className={`${color} shrink-0`} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
