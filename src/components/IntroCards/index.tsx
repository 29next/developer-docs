import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const IntroCardsData = [
    {
        icon: '⚡️',
        title: 'Admin API',
        description: 'Use our APIs to create new sales channels and extend core functionality with custom business logic.',
        href: '/docs/admin-api/',
    },
    {
        icon: '🚀',
        title: 'Campaigns',
        description: 'Build and integrate your campaign funnels with our Campaigns App.',
        href: '/docs/campaigns/',
    },
    {
        icon: '🎯',
        title: 'Themes',
        description: 'Create unique brand experiences for customers with our theme framework.',
        href: '/docs/storefront/',
    },
    {
        icon: '🧩',
        title: 'Apps',
        description: 'Build Apps to bundle your integration into an installable App that can be easily installed on many stores.',
        href: '/docs/apps/',
    },
    {
        icon: '🔗',
        title: 'Webhooks',
        description: 'Use webhooks to create event subscriptions to notify external applications.',
        href: '/docs/webhooks/',
    },
]


interface Props {
    href: string;
    icon: string;
    title: string;
    description: string;
}

function IntroCard({ item }): JSX.Element {
    return (
        <Link
            href={item.href}
            className={clsx('card padding--lg', styles.cardContainer)}>
            <Heading
                as="h2"
                className={clsx('text--truncate', styles.cardTitle)}
                title={item.title}>
                {item.icon} {item.title}
            </Heading>
            <p
                className={clsx('text--truncate', styles.cardDescription)}
                title={item.description}>
                {item.description}
            </p>
        </Link>
    );
}

export default function IntroCards(props: Props): JSX.Element {
    return (
        <section className={clsx('row')}>
            {IntroCardsData.map((item, index) => (
                <article key={index} className="col col--6 margin-bottom--lg">
                    <IntroCard item={item} />
                </article>
            ))}
        </section>
    );
}
