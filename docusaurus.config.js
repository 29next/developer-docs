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
                    // { to: '/blog/', label: 'Blog', position: 'left' },
                    { to: '/docs/api/admin/reference/', label: 'Admin API Reference', position: 'right' },
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
            },
            mermaid: {
                theme: { light: 'neutral', dark: 'dark' },
            },
        }),
};



module.exports = config;
