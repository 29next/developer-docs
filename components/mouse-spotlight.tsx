'use client';

import { useRef, useCallback } from 'react';
import type { ReactNode } from 'react';

interface MouseSpotlightProps {
  className?: string;
  children: ReactNode;
}

/**
 * Wraps the hero <section>. Tracks mouse position and renders a large
 * radial glow that follows the cursor over the dot-grid background.
 */
export function MouseSpotlight({ className, children }: MouseSpotlightProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current || !glowRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    glowRef.current.style.setProperty('--mx', `${e.clientX - left}px`);
    glowRef.current.style.setProperty('--my', `${e.clientY - top}px`);
  }, []);

  const show = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '1';
  }, []);

  const hide = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  return (
    <section
      ref={sectionRef}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* Large cursor glow — illuminates the dot grid */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          opacity: 0,
          transition: 'opacity 600ms ease',
          background:
            'radial-gradient(700px circle at var(--mx, 50%) var(--my, 50%), rgba(60, 125, 255, 0.12), transparent 65%)',
        }}
      />
      {children}
    </section>
  );
}
