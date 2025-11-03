// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

const { webpackPlugin } = require('./plugins/webpack-plugin.cjs');
const tailwindPlugin  = require('./plugins/tailwind-plugin.cjs');

const plugins = [
    tailwindPlugin,
    webpackPlugin,
    [
        '@docusaurus/plugin-client-redirects',
        /** @type {import('@docusaurus/plugin-client-redirects').Options} */
        ({
            redirects: [
                {
                    from: '/api/',
                    to: '/docs/api',
                },
                {
                    from: '/api/admin',
                    to: '/docs/api/admin',
                },
                {
                    from: '/api/checkout-links',
                    to: '/docs/api/checkout-links',
                },
                {
                    from: '/apps/oauth',
                    to: '/docs/apps/oauth',
                },
                {
                    from: '/apps/app-development-flow',
                    to: '/docs/apps/app-development-flow'
                },
                {
                    from: '/apps',
                    to: '/docs/apps',
                },
                {
                    from: '/docs/themes/event-tracking',
                    to: '/docs/storefront/event-tracking',
                },
                {
                    from: '/themes',
                    to: '/docs/storefront/themes',
                },
                {
                    from: '/docs/themes',
                    to: '/docs/storefront/themes',
                },
                {
                    from: '/webhooks',
                    to: '/docs/webhooks',
                },
            ],
        }),
    ]
]


/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Next Commerce Developer Docs',
    tagline: 'Documentation and Guides for Developers on the Next Commerce platform.',
    url: 'https://developers.29next.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenAnchors: 'ignore',
    // onBrokenMarkdownLinks: 'warn',
    favicon: 'img/logo-icon.png',
    trailingSlash: true,
    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: '29next', // Usually your GitHub org/user name.
    projectName: 'developer-docs', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },
    markdown: {
        mermaid: true,
        hooks: {
            onBrokenMarkdownLinks: 'warn',
        },
    },
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/docs',
                    sidebarPath: require.resolve('./sidebars.js'),
                    include: ['**/*.md', '**/*.mdx'],
                    exclude: [
                        'node_modules/**/*.md*',
                        '**/node_modules/**/*.md*',
                        '**/build/**/*.md*',
                        '**/dist/**/*.md*',
                        '**/__tests__/**/*.md*',
                        '**/pages/**/*.md*',
                        '**/*.ts*',
                        'README.md*',
                    ],
                },
                blog: {
                    showReadingTime: true,
                },
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                    ignorePatterns: ['/tags/**'],
                    filename: 'sitemap.xml',
                },
                gtag: {
                    trackingID: 'G-PW101GSQMJ',
                    anonymizeIP: true,
                },
                theme: {
                    customCss: [
                        require.resolve('./src/css/custom.css'),
                        require.resolve('./src/css/api-reference.css')
                    ]
                },
            }),
        ]
    ],
    markdown: {
        mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],
    plugins: plugins,
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: '',
                logo: {
                    alt: 'Next Commerce Logo',
                    src: 'img/logo-light.png',
                    srcDark: 'img/logo-dark.png',
                },
                items: [
                    {
                        type: 'dropdown',
                        label: 'APIs',
                        position: 'left',
                        items: [
                            {
                                label: 'Campaigns API',
                                href: '/docs/api/campaigns/',
                            },
                            {
                                label: 'Admin API',
                                href: '/docs/api/admin/',
                            },
                        ],
                    },
                    { to: '/docs/apps/', label: 'Apps', position: 'left' },
                    { to: '/docs/storefront/', label: 'Storefront', position: 'left' },
                    { to: '/docs/webhooks/', label: 'Webhooks', position: 'left' },
                    { href: 'https://github.com/29next/', position: 'right', className: 'header-github-link' },
                ],
            },
            colorMode: {
                defaultMode: 'dark'
            },
            footer: {
                style: 'light',
                links: [],
                copyright: `Copyright © ${new Date().getFullYear()} Next Commerce`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['python', 'markup-templating'],
            },
            mermaid: {
                theme: {
                    light: 'neutral',
                    dark: 'base'
                },
                options: {
                    themeVariables: {
                        background: '#161616',
                        primaryColor: '#161616',
                        primaryBorderColor: '#2f81f7',
                        primaryTextColor: '#d3d3d3'
                    }
                }
            },
            algolia: {
                appId: 'GNSJUJD786',
                apiKey: '384f2da9c9bcc8dad6907d70da1894e9',
                indexName: 'docs',
                // contextualSearch: false,
                // searchParameters: {},
                // searchPagePath: 'search',
            },
        }),
};



module.exports = config;
