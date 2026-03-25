import Link from 'next/link';
import {
  ChevronsLeftRightEllipsis,
  Megaphone,
  ShoppingBag,
  Puzzle,
  Webhook,
  ArrowRight,
  BookOpen,
  Zap,
  Globe,
  Code2,
  Activity,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { AlgoliaDocSearch, AlgoliaDocSearchMobile } from '@/components/search';
import { HeroFlow } from '@/components/hero-flow';
import { MouseSpotlight } from '@/components/mouse-spotlight';
import { SpotlightCard, type SectionData } from '@/components/spotlight-card';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

const sections: SectionData[] = [
  {
    title: 'Campaigns',
    description: 'Build high-converting funnels with custom checkout flows, upsells, and A/B testing.',
    href: '/docs/campaigns',
    icon: <Megaphone size={20} />,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    hoverBorder: 'hover:border-orange-500/40',
    features: [
      'Custom checkout flows & upsells',
      'A/B testing & conversion optimization',
      'Campaign Cart SDK integration',
    ],
    wide: true,
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

const QUICK_START_CODE = `# Fetch orders from the Admin API
import requests

response = requests.get(
  'https://{store}.29next.store/api/admin/orders/',
  headers={
    'Authorization': 'Bearer {api_key}',
    'X-29next-API-Version': '2024-04-01',
    'Content-Type': 'application/json',
  }
)

orders = response.json()['results']

# Filter and process pending orders
pending = [o for o in orders if o['status'] == 'pending']`;

function ResourceCard({ title, description, href, icon }: (typeof resources)[0]) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-lg border border-fd-border p-4 transition-colors duration-200 hover:bg-fd-accent/50"
    >
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-fd-muted text-fd-muted-foreground">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-fd-foreground transition-colors duration-200 group-hover:text-fd-primary">
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
        <div className="mx-auto flex sm:grid h-14 max-w-6xl sm:grid-cols-[auto_1fr_auto] items-center justify-between gap-4 px-6">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo-light.png" alt={siteConfig.companyName} width={105} height={21} className="dark:hidden" />
            <img src="/logo-dark.png" alt={siteConfig.companyName} width={105} height={21} className="hidden dark:block" />
            <span className="hidden sm:inline text-xs font-medium text-fd-muted-foreground border-l border-fd-border pl-3">
              Developers
            </span>
          </Link>
          {/* Center: Search */}
          <div className="hidden sm:flex justify-center max-w-sm mx-auto w-full">
            <AlgoliaDocSearch />
          </div>
          {/* Right: Nav links + CTA */}
          <nav className="flex items-center gap-1">
            <div className="sm:hidden">
              <AlgoliaDocSearchMobile />
            </div>
            <Link
              href="/docs/campaigns"
              className="hidden sm:inline-flex px-3 py-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors duration-150"
            >
              Campaigns
            </Link>
            <Link
              href="/docs/admin-api"
              className="hidden sm:inline-flex px-3 py-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors duration-150"
            >
              Admin API
            </Link>
            <Link
              href="/docs/storefront"
              className="hidden sm:inline-flex px-3 py-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors duration-150"
            >
              Storefront
            </Link>
            <Link
              href="/docs"
              className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-fd-border px-3.5 py-1.5 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors duration-150"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <MouseSpotlight className="relative overflow-hidden">
          {/* Dot grid + floating orbs */}
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <div
              className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,transparent_20%,black_70%)]"
              style={{
                backgroundImage: 'radial-gradient(circle, var(--color-fd-muted-foreground) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 0.2,
              }}
            />
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
            {/* Badge */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-fd-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Code2 size={13} className="text-blue-400" aria-hidden="true" />
                <span>175+ REST Endpoints</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={13} className="text-orange-400" aria-hidden="true" />
                <span>22 Webhook Events</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe size={13} className="text-green-400" aria-hidden="true" />
                <span>GraphQL Storefront API</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Build on{' '}
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Next Commerce
              </span>
            </h1>

            <p className="text-lg text-fd-muted-foreground leading-relaxed max-w-2xl">
              APIs, SDKs, and webhooks for building AI-powered commerce experiences — from headless storefronts to automated fulfillment pipelines.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-md bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground hover:opacity-90 transition-opacity duration-150"
              >
                Start Building
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link
                href="/docs/admin-api"
                className="inline-flex items-center gap-2 rounded-md border border-fd-border px-5 py-2.5 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors duration-150"
              >
                API Reference
              </Link>
            </div>
            

            <div className="w-full max-w-130 pt-2">
              <HeroFlow />
            </div>
          </div>

          {/* Section Cards — bento grid */}
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, var(--color-fd-muted-foreground) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 0.15,
              }}
            />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-semibold text-fd-foreground">Explore the Platform</h2>
                <p className="mt-1.5 text-sm text-fd-muted-foreground">
                  Everything you need to integrate, extend, and build on Next Commerce.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sections.map((section) => (
                  <SpotlightCard key={section.title} {...section} />
                ))}
              </div>
            </div>
          </div>
        </MouseSpotlight>

        {/* Quick Start */}
        <section className="border-t border-fd-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left */}
              <div className="flex flex-col gap-6">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-fd-border px-3 py-1 text-xs font-medium text-fd-muted-foreground">
                  <Code2 size={12} aria-hidden="true" />
                  Quick Start
                </span>
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-bold tracking-tight text-fd-foreground md:text-3xl">
                    Start integrating in minutes
                  </h2>
                  <p className="text-fd-muted-foreground leading-relaxed">
                    Authenticate with an API key and start making requests. Full REST and GraphQL support with comprehensive reference docs.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/docs/admin-api"
                    className="inline-flex items-center gap-2 rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground hover:opacity-90 transition-opacity duration-150"
                  >
                    API Reference
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/docs"
                    className="inline-flex items-center gap-2 rounded-md border border-fd-border px-4 py-2 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors duration-150"
                  >
                    Read the Docs
                  </Link>
                </div>
              </div>

              {/* Right: Code block */}
              <DynamicCodeBlock
                lang="python"
                code={QUICK_START_CODE}
                codeblock={{ title: 'orders.py' }}
              />
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="border-t border-fd-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-semibold text-fd-foreground">Resources</h2>
                <p className="mt-1.5 text-sm text-fd-muted-foreground">
                  Guides and references to help you build faster.
                </p>
              </div>
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
            <Link href="https://www.nextcommerce.com" className="text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors duration-150">
              nextcommerce.com
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
