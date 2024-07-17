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
                    from: '/themes',
                    to: '/docs/themes',
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
    title: '29 Next Developer Docs',
    tagline: 'Documentation and Guides for Developers on the 29 Next platform.',
    url: 'https://developers.29next.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/logo.png',
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

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
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
                title: '29 Next Developers',
                logo: {
                    alt: '29 Next Logo',
                    src: 'img/logo.png',
                },
                items: [
                    {
                        type: 'dropdown',
                        label: 'APIs',
                        position: 'left',
                        items: [
                            {
                                label: 'Docs',
                                to: '/docs/api/',
                            },
                            {
                                label: 'Admin API Reference',
                                href: '/docs/api/admin/reference/',
                            },
                            {
                                label: 'Campaigns API Reference',
                                href: '/docs/api/campaigns/reference/',
                            }
                        ],
                    },
                    // { to: '/docs/api/', label: 'APIs', position: 'left' },
                    { to: '/docs/themes/', label: 'Themes', position: 'left' },
                    { to: '/docs/apps/', label: 'Apps', position: 'left' },
                    { to: '/docs/webhooks/', label: 'Webhooks', position: 'left' },
                    { href: 'https://github.com/29next/', position: 'right', className: 'header-github-link' },
                ],
            },
            colorMode: {
                defaultMode: 'dark'
            },
            footer: {
                style: 'light',
                links: [
                    {
                        html: `
                            <iframe
                            src="https://29next.instatus.com/embed-status/f343a721/dark-sm"
                            width="230"
                            height="61"
                            frameBorder="0"
                            scrolling="no"
                            style="border: none;"
                            >
                            </iframe>
                        `,
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Next Commerce`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['django'],
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
                searchParameters: {},
                searchPagePath: 'search',
            },
        }),
};



module.exports = config;
