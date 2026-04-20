'use client';

import type { Config } from './types';

export const DEFAULT_CONFIG: Config = {
  sdkHost: '',
  sdkVersion: '0.4.18',
  debugger: false,
  debug: false,
};

export const LAYOUT_STYLES: Record<string, string> = {
  center: 'display: flex; align-items: center; justify-content: center; min-height: 100vh;',
};

export const MIN_PREVIEW_WIDTH = 280;
