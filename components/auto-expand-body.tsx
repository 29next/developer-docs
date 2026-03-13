'use client';

import { useEffect } from 'react';

/**
 * Auto-expands the "Body" accordion item inside the Example Requests panel on
 * webhook pages. Scoped to [data-api-requests] to avoid opening other
 * collapsibles on the page.
 */
export function AutoExpandBody() {
  useEffect(() => {
    const panel = document.querySelector('[data-api-requests]');
    if (!panel) return;
    const triggers = panel.querySelectorAll<HTMLButtonElement>(
      'button[data-state="closed"]',
    );
    triggers.forEach((btn) => btn.click());
  }, []);

  return null;
}
