import { createMDX } from 'fumadocs-mdx/next';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  webpack(webpackConfig) {
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      // Map Docusaurus site alias to project root
      '@site': __dirname,
      // Map Docusaurus component shims
      '@docusaurus/Link': path.join(__dirname, 'components/compat/Link.tsx'),
      '@docusaurus/useBaseUrl': path.join(__dirname, 'components/compat/useBaseUrl.ts'),
    };
    return webpackConfig;
  },
  async redirects() {
    return [
      // Legacy URL redirects
      { source: '/api/admin', destination: '/docs/admin-api', permanent: true },
      { source: '/apps/oauth', destination: '/docs/apps/oauth', permanent: true },
      { source: '/apps/app-development-flow', destination: '/docs/apps/app-development-flow', permanent: true },
      { source: '/apps', destination: '/docs/apps', permanent: true },
      { source: '/themes', destination: '/docs/storefront/themes', permanent: true },
      { source: '/docs/themes', destination: '/docs/storefront/themes', permanent: true },
      { source: '/docs/themes/event-tracking', destination: '/docs/storefront/event-tracking', permanent: true },
      { source: '/webhooks', destination: '/docs/webhooks', permanent: true },
      // Pattern-based legacy redirects
      { source: '/docs/api/admin/:path*', destination: '/docs/admin-api/:path*', permanent: true },
      { source: '/docs/campaign-cart/:path*', destination: '/docs/campaigns/campaign-cart/:path*', permanent: true },
      { source: '/docs/api/campaigns/:path*', destination: '/docs/campaigns/api/:path*', permanent: true },
    ];
  },
};

export default withMDX(config);
