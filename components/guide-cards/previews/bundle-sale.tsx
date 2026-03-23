'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

const BUNDLE_TIERS = [
  {
    id: 0,
    name: 'Buy 1',
    itemCount: 1,
    price: 39,
    originalPrice: 39,
    discount: 0,
    badge: null as string | null,
    freeShipping: false,
    items: [{ name: 'Glow Serum', qty: 1 }],
  },
  {
    id: 1,
    name: 'Buy 2',
    itemCount: 2,
    price: 69,
    originalPrice: 78,
    discount: 12,
    badge: 'Most Popular',
    freeShipping: true,
    items: [{ name: 'Glow Serum', qty: 2 }],
  },
  {
    id: 2,
    name: 'Buy 3',
    itemCount: 3,
    price: 89,
    originalPrice: 117,
    discount: 24,
    badge: 'Best Value',
    freeShipping: true,
    items: [{ name: 'Glow Serum', qty: 3 }],
  },
];

function BundleImage({ itemCount, active }: { itemCount: number; active: boolean }) {
  return (
    <div className="relative shrink-0">
      <img
        src="/assets/mockup/skincare3.jpg"
        alt=""
        width={44}
        height={44}
        className={`size-16 rounded-lg object-cover border-2 transition-all duration-300 ${
          active
            ? 'border-blue-500/70 shadow-[0_0_10px_rgba(59,130,246,0.3)] scale-105'
            : 'border-fd-border scale-100'
        }`}
      />
      <span
        className={`absolute -bottom-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[8px] font-bold transition-all duration-300 ${
          active
            ? 'bg-blue-500 text-white scale-110'
            : 'bg-fd-muted text-fd-muted-foreground scale-100'
        }`}
      >
        {itemCount}×
      </span>
    </div>
  );
}

export function BundleSalePreview() {
  const [selected, setSelected] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-center gap-2.5 mb-0.5">
        <div className="text-xs font-semibold text-fd-foreground leading-tight">
          Bundle Selector
          <span className="block text-[10px] font-normal text-fd-muted-foreground">Choose your quantity</span>
        </div>
      </div>

      {BUNDLE_TIERS.map((t) => (
        <button
          key={t.id}
          onClick={() => setSelected(t.id)}
          className={`group relative flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left text-xs
            transition-all duration-200 ease-out
            hover:-translate-y-0.5 hover:shadow-md
            active:scale-[0.98] active:translate-y-0
            ${
              selected === t.id
                ? 'border-blue-500 bg-blue-500/10 shadow-sm'
                : 'border-fd-border bg-fd-card/50 hover:border-blue-500/40 hover:bg-blue-500/5'
            }`}
        >
          {t.badge && (
            <span
              className={`absolute -top-2 right-3 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide
                transition-all duration-300 ${
                  selected === t.id
                    ? 'bg-blue-500 text-white scale-100'
                    : 'bg-fd-muted text-fd-muted-foreground group-hover:bg-blue-500/20 group-hover:text-blue-400'
                }`}
            >
              {t.badge}
            </span>
          )}

          {/* Radio / Check */}
          <div
            className={`self-center flex size-3.5 shrink-0 items-center justify-center rounded-full border-2
              transition-all duration-250 ${
                selected === t.id
                  ? 'border-green-500 bg-green-500 scale-110'
                  : 'border-fd-border group-hover:border-green-400/60'
              }`}
          >
            {selected === t.id ? (
              <Check size={8} className="text-white" strokeWidth={3} aria-hidden="true" />
            ) : (
              <div className="size-0 opacity-0" />
            )}
          </div>

          <BundleImage itemCount={t.itemCount} active={selected === t.id} />

          <div className="flex flex-1 items-start justify-between gap-1 min-w-0">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-fd-foreground leading-tight">{t.name}</span>
                <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-400">
                  Save {t.discount}%
                </span>
                {t.freeShipping && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold transition-colors duration-200 ${
                    selected === t.id ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-500/15 text-blue-400'
                  }`}>
                    Free Shipping
                  </span>
                )}
              </div>
              <ul className="mt-0.5 flex flex-col gap-0.5">
                {t.items.map(i => (
                  <li key={i.name} className="flex items-center gap-1 text-[9px] text-fd-muted-foreground">
                    <span className={`shrink-0 font-semibold transition-colors duration-200 ${
                      selected === t.id ? 'text-blue-400' : 'text-fd-muted-foreground'
                    }`}>
                      {i.qty}×
                    </span>
                    {i.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 text-right">
              <div className={`text-base font-bold transition-all duration-200 ${
                selected === t.id ? 'text-blue-500 scale-105' : 'text-fd-foreground scale-100'
              }`}>
                ${t.price}
              </div>
              <div className="text-[9px] text-fd-muted-foreground line-through">${t.originalPrice}</div>
              <div className="text-[9px] font-semibold text-green-400">
                Save ${t.originalPrice - t.price}
              </div>
            </div>
          </div>
        </button>
      ))}

      <button
        onClick={handleAddToCart}
        className={`flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold text-white
          transition-all duration-200
          hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25
          active:scale-[0.97]
          ${added ? 'bg-green-600 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-500'}`}
      >
        {added ? (
          <>
            <Check size={11} aria-hidden="true" className="animate-[scale-in_0.15s_ease-out]" />
            Added!
          </>
        ) : (
          <>
            <ShoppingCart size={11} aria-hidden="true" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
