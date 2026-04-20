'use client';

import type { Config } from './types';

export const DEFAULT_CONFIG: Config = {
  apiKey: 'kLGpgEfCX3iUZG16hpI5zrCH9qxcOdahDY1im6ud',
  apiHost: 'https://campaigns.apps.29next.com/',
  sdkHost: '',
  sdkVersion: 'latest',
  debugger: false,
  debug: false,
};

export const LAYOUT_STYLES: Record<string, string> = {
  center: 'display: flex; align-items: center; justify-content: center; min-height: 100vh;',
};

export const MIN_PREVIEW_WIDTH = 280;
