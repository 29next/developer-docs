'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BundleSalePreview } from './previews/bundle-sale';
import { AddonsPreview } from './previews/addons';
import { PackageSelectorPreview } from './previews/package-selector';
import { CartSummaryPreview } from './previews/cart-summary';
import { CheckoutFormPreview } from './previews/checkout-form';

// ── Guide data ────────────────────────────────────────────────────────────────
const GUIDES = [
  {
    href: '/docs/campaigns/guides/bundle-set-sale',
    title: 'Bundle Set Sale',
    description:
      'Offer a Buy 1 / Buy 2 / Buy 3 selector where clicking a card instantly swaps the cart to that bundle — with backend-calculated prices, tiered discounts, and automatic coupon codes per tier.',
    accentColor: 'text-blue-500',
    accentBg: 'bg-blue-500/10',
    accentBorder: 'border-blue-500/30',
    accentHoverBorder: 'hover:border-blue-500/60',
    previewBg: 'bg-gradient-to-br from-blue-500/5 via-fd-card to-blue-500/10',
    tags: ['BundleSelector', 'Coupon'],
    Preview: BundleSalePreview,
    featured: true,
  },
  {
    href: '/docs/campaigns/guides/selling-addons',
    title: 'Selling Add-ons',
    description:
      'Offer optional warranties, insurance, and accessories visitors can toggle on or off, with quantity sync support.',
    accentColor: 'text-green-500',
    accentBg: 'bg-green-500/10',
    accentBorder: 'border-green-500/30',
    accentHoverBorder: 'hover:border-green-500/60',
    previewBg: 'bg-gradient-to-br from-green-500/5 via-fd-card to-green-500/10',
    tags: ['CartToggle', 'QuantitySync'],
    Preview: AddonsPreview,
  },
  {
    href: '/docs/campaigns/guides/package-selector-with-button',
    title: 'Package Selector + Add to Cart',
    description:
      'Classic pick-your-option + button pattern: selector cards track the choice, one button adds to cart.',
    accentColor: 'text-orange-500',
    accentBg: 'bg-orange-500/10',
    accentBorder: 'border-orange-500/30',
    accentHoverBorder: 'hover:border-orange-500/60',
    previewBg: 'bg-gradient-to-br from-orange-500/5 via-fd-card to-orange-500/10',
    tags: ['PackageSelector', 'AddToCart'],
    Preview: PackageSelectorPreview,
  },
  {
    href: '/docs/campaigns/guides/cart-summary',
    title: 'Cart Summary',
    description:
      'Display a live cart totals block with subtotal, discounts, shipping, and line item breakdown.',
    accentColor: 'text-purple-500',
    accentBg: 'bg-purple-500/10',
    accentBorder: 'border-purple-500/30',
    accentHoverBorder: 'hover:border-purple-500/60',
    previewBg: 'bg-gradient-to-br from-purple-500/5 via-fd-card to-purple-500/10',
    tags: ['CartSummary', 'CartDisplay'],
    Preview: CartSummaryPreview,
  },
  {
    href: '/docs/campaigns/guides/checkout-form',
    title: 'Building a Checkout Form',
    description:
      'Build a complete single-page checkout with address, credit card, payment method tabs, and express checkout.',
    accentColor: 'text-rose-500',
    accentBg: 'bg-rose-500/10',
    accentBorder: 'border-rose-500/30',
    accentHoverBorder: 'hover:border-rose-500/60',
    previewBg: 'bg-gradient-to-br from-rose-500/5 via-fd-card to-rose-500/10',
    tags: ['CheckoutForm', 'PaymentTabs'],
    Preview: CheckoutFormPreview,
  },
];

type GuideData = (typeof GUIDES)[number];

// ── Tags ──────────────────────────────────────────────────────────────────────
function Tags({
  tags,
  accentBg,
  accentColor,
  size = 'sm',
}: {
  tags: string[];
  accentBg: string;
  accentColor: string;
  size?: 'sm' | 'md';
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map(tag => (
        <span
          key={tag}
          className={`rounded-full font-semibold uppercase tracking-wide ${accentBg} ${accentColor} ${
            size === 'md' ? 'px-2.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[9px]'
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// ── Featured card ─────────────────────────────────────────────────────────────
function FeaturedCard({ guide }: { guide: GuideData }) {
  const {
    href, title, description,
    accentColor, accentBg, accentBorder, accentHoverBorder,
    previewBg, tags, Preview,
  } = guide;
  return (
    <Link
      href={href}
      className={`group relative flex flex-col overflow-hidden rounded-xl border-2 ${accentBorder} ${accentHoverBorder} bg-fd-card shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:shadow-xl hover:-translate-y-0.5 sm:flex-row`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
        style={{ background: 'linear-gradient(90deg, transparent, currentColor, transparent)' }} />

      <div className={`relative h-52 overflow-hidden border-b ${accentBorder} ${previewBg} sm:h-auto sm:w-[55%] sm:border-b-0 sm:border-r`}>
        <div className="pointer-events-none select-none" aria-hidden="true">
          <Preview />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-l from-fd-card to-transparent sm:block" />
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-fd-card to-transparent sm:hidden" />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-5 p-7">
        <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${accentBg} ${accentColor}`}>
          Featured Guide
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold leading-tight text-fd-foreground">{title}</h3>
          <p className="text-sm leading-relaxed text-fd-muted-foreground">{description}</p>
        </div>
        <Tags tags={tags} accentBg={accentBg} accentColor={accentColor} size="md" />
        <div className={`flex items-center gap-1.5 text-sm font-semibold ${accentColor}`}>
          View guide
          <ArrowRight
            size={14}
            className="-translate-x-0.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}


// ── Regular card ──────────────────────────────────────────────────────────────
function GuideCard({ guide }: { guide: GuideData }) {
  const {
    href, title, description,
    accentColor, accentBg, accentBorder, accentHoverBorder,
    previewBg, tags, Preview,
  } = guide;
  return (
    <Link
      href={href}
      className={`group relative h-96 overflow-hidden rounded-xl border-2 ${accentBorder} ${accentHoverBorder} bg-fd-card shadow-sm transition-[box-shadow,border-color] duration-300 hover:shadow-xl`}
    >
      {/* Preview — fills full card */}
      <div className={`absolute inset-0 ${previewBg}`}>
        <div className="pointer-events-none select-none" aria-hidden="true">
          <Preview />
        </div>
      </div>

      {/* Content panel — slides up on hover */}
      <div
        className={`absolute inset-x-0 bottom-0 flex translate-y-[calc(100%-3.75rem)] flex-col gap-3 border-t-2 ${accentBorder} bg-fd-card p-5 transition-transform duration-300 ease-out group-hover:translate-y-0`}
      >
        {/* Always-visible row: title + arrow */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-bold leading-tight text-fd-foreground">{title}</h3>
          <ArrowRight
            size={14}
            className={`shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${accentColor}`}
            aria-hidden="true"
          />
        </div>
        {/* Hidden until hover */}
        <p className="text-sm leading-relaxed text-fd-muted-foreground">{description}</p>
        <Tags tags={tags} accentBg={accentBg} accentColor={accentColor} size="sm" />
      </div>
    </Link>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function CampaignGuidesGrid() {
  const featured = GUIDES.filter(g => g.featured);
  const rest = GUIDES.filter(g => !g.featured);
  return (
    <div className="flex flex-col gap-4 not-prose">
      {featured.map(guide => (
        <FeaturedCard key={guide.href} guide={guide} />
      ))}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {rest.map(guide => (
          <GuideCard key={guide.href} guide={guide} />
        ))}
      </div>
    </div>
  );
}
