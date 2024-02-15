import React from 'react';
import Link from '@docusaurus/Link';


const REQUESTS = [
    {
        title: 'Create Cart',
        link: '/docs/api/campaigns/#create-cart',
        text: 'Capture customer and product interest.',
    },
    {
        title: 'Create Order',
        link: '/docs/api/campaigns/#create-order',
        text: 'Capture customer and product interest.',
    },
    {
        title: 'Add Upsell',
        link: '/docs/api/campaigns/#adding-upsells',
        text: 'Capture customer and product interest.',
    },
];


function ExampleRequests({ title, link, text }: (typeof REQUESTS)[0]) {
    return (
        <div>
            <Link
                href={link}
                className="group  font-semibold text-current"
            >
                {title}
                <span className="ml-2 opacity-0 transition group-hover:translate-x-2 group-hover:opacity-100">
                    &rarr;
                </span>

            </Link>
            <div className="text-zinc-400">
                {text}
            </div>
        </div>
    );
}


export default function APIReferenceSection() {
    return (
        <section className="no-underline-links relative px-6 mb-40">
            <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 rounded-xl bg-black to-zinc-800 py-10 text-center text-white dark:from-zinc-100 lg:flex-row lg:py-10 lg:px-20 lg:text-left">

                <div className="flex-1">
                    <h2 className="text-4xl">Campaigns API Reference</h2>
                    <p className="text-zinc-400">
                        Use our developer-friendly Campaign APIs and integrate your headless campaign funnel order flow.
                    </p>
                    <Link
                        href="/docs/api/campaigns/"
                        className="font-semibold"
                    >
                        Get started with 29 Next Campaigns APIs &rarr;
                    </Link>

                </div>
                <div className="flex">
                    <ul className="mt-10 flex list-none flex-col gap-4 text-left lg:pl-0">
                        {REQUESTS.map((request) => (
                            <ExampleRequests {...request} key={request.title} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
