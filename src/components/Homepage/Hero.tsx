import React from 'react';
import Link from '@docusaurus/Link';
import {
    Terminal,
    Code,
    Layout,
    Radio,
    ArrowRight
} from 'react-feather';
import clsx from 'clsx';

const PRODUCTS = [
    {
        title: 'Campaigns API',
        link: '/docs/api/campaigns/',
        icon: Code,
        text: 'Headless APIs to integrate your campaign funnels, no server required.',
    },
    {
        title: 'Admin API',
        link: '/docs/api/admin/',
        icon: Terminal,
        text: 'REST APIs to create new sales channels and extend core functionality with custom business logic.',
    },
    {
        title: 'Storefront Themes',
        link: '/docs/storefront/themes/',
        icon: Layout,
        text: 'Create unique branded storefronts for customers with our theme framework.',
    },
    {
        title: 'Webhooks',
        link: '/docs/webhooks/',
        icon: Radio,
        text: 'Use webhooks to create event subscriptions to notify external applications.',
    }
];

function HeroProduct({
    link,
    title,
    icon: Icon,
    text,
}: (typeof PRODUCTS)[0]) {
    return (
        <Link
            to={link}
            style={{
                borderWidth: '1px',
            }}
            className={clsx(
                'group relative cursor-pointer overflow-clip rounded-lg border-secondary border-solid text-black transition-all hover:text-primary hover:no-underline',
                'dark:bg-black dark:text-white border-3 border-secondary-100 hover:border-primary'
            )}
        >
            <div className="p-6 !pb-0">
                <h3 className="mb-1.5 flex items-center gap-3 group-hover:text-primary">
                    <Icon className={`h-7 w-7`} />
                    {title}
                </h3>
                <p className=" text-sm text-zinc-400">{text}</p>
            </div>
        </Link>
    );
}

export default function HeroSection() {
    return (
        <>
            <section className="noise-bg no-underline-links px-4 lg:pt-10 lg:py-0">
                <div className="flex flex-col items-center justify-between lg:my-10 py-10">
                    <h1 className="mb-4 sm:text-xl lg:text-5xl text-center font-bold dark:text-white">
                        Build Amazing Ecommerce Solutions
                    </h1>
                    <p className="max-w-xl text-center dark:text-white">
                        Craft tailor-made high-performance brand experiences with our APIs.
                    </p>
                    <Link
                        className="text-lg font-bold flex"
                        to="/docs/"> Explore Docs <ArrowRight className='mx-2' />
                    </Link>
                </div>
            </section>

            <section className="mx-auto grid w-full max-w-5xl grid-cols-1 grid-rows-2 gap-6 px-4 md:grid-cols-2">
                {PRODUCTS.map((product) => (
                    <HeroProduct {...product} key={product.title} />
                ))}
            </section>
        </>
    );
}
