import Link from 'next/link';
import {
  ChevronsLeftRightEllipsis,
  Megaphone,
  ShoppingBag,
  Puzzle,
  Webhook,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { HeroFlow } from '@/components/hero-flow';
import type { ReactNode } from 'react';

const sections = [
  {
    title: 'Campaigns',
    description: 'Build high-converting funnels with custom checkout flows, upsells, and A/B testing.',
    href: '/docs/campaigns',
    icon: <Megaphone size={20} />,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    hoverBorder: 'hover:border-orange-500/40',
  },
  {
    title: 'Admin API',
    description: 'Manage orders, products, customers, and store resources with a comprehensive REST API.',
    href: '/docs/admin-api',
    icon: <ChevronsLeftRightEllipsis size={20} />,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    hoverBorder: 'hover:border-blue-500/40',
  },
  {
    title: 'Storefront',
    description: 'Customize themes with templates, build headless storefronts with the GraphQL API.',
    href: '/docs/storefront',
    icon: <ShoppingBag size={20} />,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    hoverBorder: 'hover:border-green-500/40',
  },
  {
    title: 'Apps',
    description: 'Extend platform functionality with OAuth apps, webhooks, and event tracking.',
    href: '/docs/apps',
    icon: <Puzzle size={20} />,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    hoverBorder: 'hover:border-purple-500/40',
  },
  {
    title: 'Webhooks',
    description: 'Subscribe to real-time store events for orders, payments, fulfillment, and more.',
    href: '/docs/webhooks',
    icon: <Webhook size={20} />,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    hoverBorder: 'hover:border-pink-500/40',
  },
];

const resources = [
  {
    title: 'Campaign Cart SDK',
    description: 'Build custom campaign funnels and checkout flows',
    href: '/docs/campaigns/campaign-cart',
    icon: <Megaphone size={16} />,
  },
  {
    title: 'Admin API Guides',
    description: 'Order management, checkout flows, and more',
    href: '/docs/admin-api/guides/external-checkout',
    icon: <BookOpen size={16} />,
  },
  {
    title: 'App Development Guides',
    description: 'Build and distribute apps on the platform',
    href: '/docs/apps',
    icon: <Puzzle size={16} />,
  },
  {
    title: 'Storefront Theme Guides',
    description: 'Customize themes, templates, and storefronts',
    href: '/docs/storefront/themes',
    icon: <ShoppingBag size={16} />,
  },
];

function SectionCard({
  title,
  description,
  href,
  icon,
  color,
  bg,
  border,
  hoverBorder,
}: (typeof sections)[0]) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col gap-4 rounded-xl border ${border} ${hoverBorder} bg-fd-card p-6 transition-all duration-200 hover:shadow-sm`}
    >
      <div className={`flex size-10 items-center justify-center rounded-md ${bg} ${color}`}>
        {icon}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-semibold text-fd-foreground flex items-center gap-2">
          {title}
          <ArrowRight
            size={14}
            className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-70 group-hover:translate-x-0"
          />
        </h3>
        <p className="text-sm text-fd-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}

function ResourceCard({ title, description, href, icon }: (typeof resources)[0]) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-md border border-fd-border p-4 transition-colors duration-200 hover:bg-fd-accent/50"
    >
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-fd-muted text-fd-muted-foreground">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-fd-foreground group-hover:text-fd-primary transition-colors">
          {title}
        </span>
        <span className="text-xs text-fd-muted-foreground">{description}</span>
      </div>
    </Link>
  );
}


export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-fd-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-fd-border bg-fd-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo-light.png" alt={siteConfig.companyName} width={105} height={21} className="dark:hidden" />
            <img src="/logo-dark.png" alt={siteConfig.companyName} width={105} height={21} className="hidden dark:block" />
            <span className="text-xs font-medium text-fd-muted-foreground border-l border-fd-border pl-3">
              Developers
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/docs/campaigns"
              className="hidden sm:inline-flex px-3 py-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Campaigns
            </Link>
            <Link
              href="/docs/admin-api"
              className="hidden sm:inline-flex px-3 py-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Admin API
            </Link>
            <Link
              href="/docs/storefront"
              className="hidden sm:inline-flex px-3 py-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Storefront
            </Link>
            <Link
              href="/docs"
              className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-fd-border px-3.5 py-1.5 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Dot grid + floating orbs — hero only */}
          <div className="pointer-events-none absolute inset-0 z-0">
            {/* Gray dots — visible at edges, fading toward center */}
            <div
              className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,transparent_20%,black_70%)]"
              style={{
                backgroundImage: 'radial-gradient(circle, var(--color-fd-muted-foreground) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 0.2,
              }}
            />
            {/* Blue dots — visible at center, fading toward edges */}
            <div
              className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,black_10%,transparent_60%)]"
              style={{
                backgroundImage: 'radial-gradient(circle, #3C7DFF 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 0.3,
              }}
            />
            <div className="absolute -top-40 -left-40 w-125 h-125 rounded-full bg-blue-500/3 blur-[100px]" style={{ animation: 'float1 20s ease-in-out infinite' }} />
            <div className="absolute -bottom-40 -right-40 w-150 h-150 rounded-full bg-purple-500/3 blur-[120px]" style={{ animation: 'float2 25s ease-in-out infinite' }} />
            <div className="absolute top-1/3 left-1/2 w-100 h-100 rounded-full bg-orange-500/2 blur-[100px]" style={{ animation: 'float3 22s ease-in-out infinite' }} />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-28 md:pb-16 flex flex-col items-center text-center gap-6">
            <h1 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Build on Next Commerce
            </h1>
            <p className="text-lg text-fd-foreground leading-relaxed max-w-2xl">
              Build custom campaign funnels, high-converting checkout flows, and scalable integrations on the performance ecommerce platform.
            </p>
            <div className="pt-1">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-md border border-fd-border px-5 py-2.5 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
              >
                Start Building
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="w-full max-w-130 pt-4">
              <HeroFlow />
            </div>
          </div>
        </section>

        {/* Section Cards */}
        <section className="relative overflow-hidden pb-16 md:pb-20">
          {/* Dot grid background */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, var(--color-fd-muted-foreground) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 0.15,
              }}
            />
          </div>
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-semibold text-fd-foreground">Explore the Platform</h2>
                <p className="mt-1.5 text-sm text-fd-muted-foreground">
                  Everything you need to integrate, extend, and build on Next Commerce.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sections.map((section) => (
                  <SectionCard key={section.title} {...section} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="border-t border-fd-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="flex flex-col gap-8">
              <h2 className="text-xl font-semibold text-fd-foreground">Resources</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {resources.map((resource) => (
                  <ResourceCard key={resource.title} {...resource} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-fd-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <span className="text-xs text-fd-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.companyName}
          </span>
          <div className="flex items-center gap-4">
            <Link href="https://www.nextcommerce.com" className="text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors">
              nextcommerce.com
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
