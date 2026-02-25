import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { Layers, Terminal, LayoutTemplate, Package, Webhook } from 'lucide-react';
import styles from './styles.module.css';

const IntroCardsData = [
    {
        icon: Layers,
        title: 'Campaigns',
        description: 'Build external checkout funnels — landing pages, checkout, upsell flows, and receipts.',
        href: '/docs/campaigns/',
    },
    {
        icon: Terminal,
        title: 'Admin API',
        description: 'Manage orders, subscriptions, products, customers, and fulfillment via REST API.',
        href: '/docs/admin-api/',
    },
    {
        icon: Package,
        title: 'Apps',
        description: 'Package integrations as installable units that work across multiple stores.',
        href: '/docs/apps/',
    },
    {
        icon: LayoutTemplate,
        title: 'Storefront',
        description: 'Customize your storefront theme — product pages, catalog, cart, and checkout.',
        href: '/docs/storefront/',
    },
    {
        icon: Webhook,
        title: 'Webhooks',
        description: 'Subscribe to store events and notify external systems in real time.',
        href: '/docs/webhooks/',
    },
];

interface CardItem {
    href: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    description: string;
}

function IntroCard({ item }: { item: CardItem }): JSX.Element {
    const Icon = item.icon;
    return (
        <Link
            href={item.href}
            className={clsx('card padding--lg', styles.cardContainer)}>
            <div className={styles.cardHeader}>
                <Icon size={26} strokeWidth={2.5} className={styles.cardIcon} />
                <Heading
                    as="h2"
                    className={clsx('text--truncate', styles.cardTitle)}
                    title={item.title}>
                    {item.title}
                </Heading>
            </div>
            <p
                className={clsx(styles.cardDescription)}
                title={item.description}>
                {item.description}
            </p>
        </Link>
    );
}

export default function IntroCards(): JSX.Element {
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
