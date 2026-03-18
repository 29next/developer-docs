import { createMDX } from 'fumadocs-mdx/next';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const docusaurusAliases = {
  '@theme/Tabs':    path.resolve(__dirname, 'components/docusaurus-tabs.tsx'),
  '@theme/TabItem': path.resolve(__dirname, 'components/docusaurus-tab-item.tsx'),
  // @site is Docusaurus's alias for the project root; snippets live in content/_snippets/
  '@site':          path.resolve(__dirname),
};

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      '@theme/Tabs':    './components/docusaurus-tabs.tsx',
      '@theme/TabItem': './components/docusaurus-tab-item.tsx',
      '@site':          './',
    },
  },
  webpack(webpackConfig) {
    Object.assign(webpackConfig.resolve.alias, docusaurusAliases);
    return webpackConfig;
  },
};

const withMDX = createMDX();

export default withMDX(config);
