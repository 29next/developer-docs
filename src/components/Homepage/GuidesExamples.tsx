import React from 'react';
import Link from '@docusaurus/Link';
import {
    AppsAddInRegular,
    ArrowRightFilled,
    DocumentRegular,
    OpenRegular,
    RecordRegular,
    VideoRegular,
} from '@fluentui/react-icons';
import clsx from 'clsx';
import {
    ChevronRight,
    GitHub,
    Code,
    Layout,
    Terminal,
    Zap,
    CheckSquare
} from 'react-feather';

interface Guide {
    title: string;
    icon: any;
    text: string;
    link: string;
}

const guides: Guide[] = [
    {
        title: 'Campaigns API Checkout Flow',
        icon: Code,
        text: 'Implement a campaign flow using our headless Campaigns API',
        link: '/docs/api/campaigns/',
    },
    {
        title: 'Getting Started with Themes',
        icon: Layout,
        text: 'Learn how to build customized storefronts with Themes.',
        link: '/docs/themes/',
    },
    // {
    //     title: 'Getting Start with Apps',
    //     icon: Zap,
    //     text: 'Get started with Apps to extend core functionality.',
    //     link: '/docs/apps/',
    // },
    {
        title: 'Testing Guide',
        icon: CheckSquare,
        text: 'Use test cards to test your external checkout flow.',
        link: '/docs/api/admin/',
    },
];

interface Sample {
    title: string;
    category?: string;
    source?: string
}

const samples: Sample[] = [
    {
        title: 'Theme Kit',
        category: 'Tools',
        source: 'https://github.com/29next/theme-kit'
    },
    {
        title: 'Intro Bootstrap Theme',
        category: 'Theme',
        source: 'https://github.com/29next/intro-bootstrap'
    },
    {
        title: 'Google Analytics 4 App',
        category: 'Apps',
        source: 'https://github.com/29next/google-analytics-4'
    },
    {
        title: 'Example Fulfillment App',
        category: 'Apps',
        source: 'https://github.com/29next/demo-fulfillment-service-app'
    },
];

function Guide({ title, text, icon: Icon, link }: (typeof guides)[0]) {
    return (
        <Link
            to={link}
            className="group flex cursor-pointer items-start gap-1 rounded-lg border-2 border-transparent p-3 text-inherit transition-colors hover:border-primary hover:text-primary"
        >
            <Icon className="h-6 w-6 mr-3" />

            <div className="flex flex-col">
                <h4 className="mb-1 font-semibold">{title}</h4>
                <p className="mb-0 text-sm text-text-400">{text}</p>
            </div>

            <ChevronRight className="ml-auto h-5 w-5 self-center opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
    );
}

function Sample({ title, category, source }: Sample) {
    return (
        <div className="group flex cursor-pointer items-center justify-between rounded-lg border-2 border-transparent p-3 text-text-400/60 transition-colors hover:border-primary hover:text-primary">
            <div className="flex flex-col">
                <h4 className="mb-1 text-black group-hover:text-primary dark:text-white">
                    {title}
                </h4>

            </div>

            <div className="flex items-center gap-3">
                {source && (
                    <Link to={source} className="text-inherit">
                        <OpenRegular className="h-5 w-5" />
                    </Link>
                )}
                {source && (
                    <Link
                        to={source}
                        className="flex items-center gap-2 rounded-lg py-1 px-3 text-inherit transition-colors group-hover:bg-primary group-hover:text-white"
                    >
                        <GitHub className="h-4 w-4" />
                        <span className="font-semibold">Clone</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default function GuidesAndSamples() {
    return (
        <section className="no-underline-links my-20 mx-auto flex w-full max-w-5xl flex-col gap-10 p-4 py-0 md:flex-row md:gap-0">
            <div className="flex-1">
                <div className="mb-8 flex items-center justify-between">
                    <h3 className="m-0">Popular Guides</h3>

                    <Link to="/docs/tags/guide/" className=" text-sm font-semibold">
                        View More Guides <ArrowRightFilled className="ml-1" />
                    </Link>
                </div>

                <div className="flex flex-col gap-4">
                    {guides.map((guide) => (
                        <Guide {...guide} key={guide.title} />
                    ))}
                </div>
            </div>

            <div
                className={clsx(
                    'mx-8 block flex-shrink-0 bg-gradient-to-b from-transparent via-secondary-700 to-transparent',
                    'hidden w-px md:block'
                )}
            />

            <div className="w-full md:max-w-sm">
                <div className="mb-8 flex items-center justify-between">
                    <h3 className="m-0">Tools, Themes & Apps</h3>

                    <Link
                        to="https://github.com/29next"
                        className=" text-sm font-semibold"
                    >
                        All Examples <ArrowRightFilled className="ml-1" />
                    </Link>
                </div>

                <div className="flex flex-col gap-1">
                    {samples.map((sample) => (
                        <Sample {...sample} key={sample.title} />
                    ))}
                </div>
            </div>
        </section>
    );
}
