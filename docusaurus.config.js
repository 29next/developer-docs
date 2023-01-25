// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

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
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
        [
            'redocusaurus',
            {
                specs: [
                    {
                        spec: 'openapi/swagger.json',
                        route: '/docs/api/admin/reference/',
                    },
                ],
                theme: {
                    primaryColor: '#2856ED',
                },
            },
        ]
    ],
    markdown: {
        mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],
    plugins: [
        [
            'client-redirects',
            /** @type {import('@docusaurus/plugin-client-redirects').Options} */
            ({
                fromExtensions: ['html'],
                createRedirects(routePath) {
                    // Redirect to /docs from /docs/introduction (now docs root doc)
                    if (routePath === '/docs' || routePath === '/docs/') {
                        return [`${routePath}/introduction`];
                    }
                    return [];
                },
                redirects: [
                    {
                        from: ['/api/admin'],
                        to: '/docs/api/admin',
                    },
                ],
            }),
        ]
    ],
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
                    { to: '/docs/api/', label: 'APIs', position: 'left' },
                    { to: '/docs/themes/', label: 'Themes', position: 'left' },
                    { to: '/docs/apps/', label: 'Apps', position: 'left' },
                    { to: '/docs/webhooks/', label: 'Webhooks', position: 'left' },
                    { href: 'https://github.com/29next/', position: 'right', className: 'header-github-link' },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Next Commerce`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['django'],
            },
            mermaid: {
                theme: { light: 'neutral', dark: 'dark' },
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
