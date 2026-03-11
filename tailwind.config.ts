import type { Config } from 'tailwindcss';
import { createPreset } from 'fumadocs-ui/tailwind-plugin';

const config: Config = {
  darkMode: 'class',
  presets: [createPreset()],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './node_modules/fumadocs-ui/dist/**/*.js',
    './node_modules/fumadocs-openapi/dist/**/*.js',
  ],
};

export default config;
