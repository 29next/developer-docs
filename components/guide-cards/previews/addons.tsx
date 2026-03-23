'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

const SELECTED_BUNDLE = {
  name: 'Complete Glow Kit',
  itemCount: 4,
  image: '/assets/mockup/survival_kit.jpg',
  price: 79.99,
  originalPrice: 129.99,
  items: [
    { name: 'Tactical Knife', qty: 1 },
    { name: 'Fire Starter', qty: 1 },
    { name: 'Must have items', qty: '+13' },
  ]
};

const ADDON_ITEMS = [
  {
    id: 'backpack',
    label: 'Tactical Backpack',
    image: '/assets/mockup/backpack.jpg',
    price: 29,
    originalPrice: 45,
    recommended: false,
  },
  {
    id: 'firstaid',
    label: 'First Aid Kit',
    image: '/assets/mockup/first_aid.jpg',
    price: 12,
    originalPrice: 19,
    recommended: true,
  },
  {
    id: 'walkie',
    label: 'Mini Walkie-Talkie',
    image: '/assets/mockup/walkie.jpg',
    price: 18,
    originalPrice: 28,
    recommended: false,
  },
];

export function AddonsPreview() {
  const [addons, setAddons] = useState<Record<string, boolean>>({
    backpack: true,
    firstaid: true,
    walkie: false,
  });
  const toggle = (id: string) =>
    setAddons(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-col gap-2 p-4">
      {/* Selected bundle row */}
      <div className="relative mb-0.5 mt-3 rounded-lg border border-green-500/40 bg-green-500/5 px-3 pb-2.5 pt-3 text-xs">
        <span className="absolute -top-2 left-3 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide bg-green-500 text-white">
          Selected Bundle
        </span>

        <div className="flex items-start gap-2.5">
          {/* Image with item count badge */}
          <div className="relative shrink-0">
            <img
              src={SELECTED_BUNDLE.image}
              alt=""
              width={44}
              height={44}
              className="size-14 rounded-lg object-cover border-2 border-green-500/60 shadow-[0_0_8px_rgba(34,197,94,0.2)]"
            />
            <span className="absolute -bottom-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[8px] font-bold bg-green-500 text-white">
              {SELECTED_BUNDLE.itemCount}×
            </span>
          </div>

          {/* Name + items */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-fd-foreground leading-tight">{SELECTED_BUNDLE.name}</span>
              <span className="rounded-full bg-green-500/20 px-1.5 py-0.5 text-[9px] font-bold text-green-400">
                Save {Math.round(((SELECTED_BUNDLE.originalPrice - SELECTED_BUNDLE.price) / SELECTED_BUNDLE.originalPrice) * 100)}%
              </span>
            </div>
            <ul className="mt-1 flex flex-col gap-0.5">
              {SELECTED_BUNDLE.items.map(i => (
                <li key={i.name} className="flex items-center gap-1 text-[9px] text-fd-muted-foreground">
                  <span className="shrink-0 font-semibold text-green-400">{i.qty}×</span>
                  {i.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Price block + check */}
          <div className="shrink-0 flex items-start gap-1.5">
            <div className="text-right">
              <div className="text-base font-bold text-green-500">${SELECTED_BUNDLE.price.toFixed(2)}</div>
              <div className="text-[9px] text-fd-muted-foreground line-through">${SELECTED_BUNDLE.originalPrice.toFixed(2)}</div>
              <div className="text-[9px] font-semibold text-green-400">
                Save ${(SELECTED_BUNDLE.originalPrice - SELECTED_BUNDLE.price).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[9px] font-semibold uppercase tracking-wider text-fd-muted-foreground px-0.5">
        Optional Add-ons
      </div>

      {ADDON_ITEMS.map(item => {
        const active = addons[item.id];
        const savingsPct = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
        const savingsAmt = item.originalPrice - item.price;

        return (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`group relative flex items-center gap-2.5 rounded-lg border px-3 py-2 text-xs
              transition-all duration-200 ease-out
              hover:-translate-y-0.5 hover:shadow-md
              active:scale-[0.98] active:translate-y-0
              ${
                active
                  ? 'border-green-500/50 bg-green-500/8 shadow-sm'
                  : 'border-fd-border bg-fd-card/40 opacity-80 hover:border-green-500/30 hover:bg-green-500/5 hover:opacity-100'
              }`}
          >
            {/* Recommended badge */}
            {item.recommended && (
              <span
                className={`absolute -top-2 right-3 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide
                  transition-all duration-300 ${
                    active
                      ? 'bg-green-500 text-white'
                      : 'bg-fd-muted text-fd-muted-foreground group-hover:bg-green-500/20 group-hover:text-green-400'
                  }`}
              >
                Recommended
              </span>
            )}

            {/* Checkbox */}
            <div
              className={`flex size-4 shrink-0 items-center justify-center rounded border-2
                transition-all duration-200 ${
                  active
                    ? 'border-green-500 bg-green-500 scale-105'
                    : 'border-fd-border bg-transparent group-hover:border-green-400/60'
                }`}
            >
              {active && (
                <Check size={9} className="text-white" strokeWidth={3} aria-hidden="true" />
              )}
            </div>

            {/* Product image */}
            <img
              src={item.image}
              alt=""
              width={40}
              height={40}
              className={`size-11 rounded-lg object-cover border-2 shrink-0 transition-all duration-300 ${
                active
                  ? 'border-green-500/60 shadow-[0_0_8px_rgba(34,197,94,0.25)] scale-105'
                  : 'border-fd-border scale-100'
              }`}
            />

            {/* Label + tags */}
            <div className="flex flex-1 items-center justify-between gap-1 min-w-0">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-fd-foreground leading-tight">{item.label}</span>
                  <span className="rounded-full bg-green-500/20 px-1.5 py-0.5 text-[9px] font-bold text-green-400">
                    Save {savingsPct}%
                  </span>
                </div>
              </div>

              {/* Price column */}
              <div className="shrink-0 text-right">
                <div className={`text-sm font-bold transition-all duration-200 ${
                  active ? 'text-green-500 scale-105' : 'text-fd-foreground scale-100'
                }`}>
                  +${item.price}
                </div>
                <div className="text-[9px] text-fd-muted-foreground line-through">${item.originalPrice}</div>
                <div className="text-[9px] font-semibold text-green-400">Save ${savingsAmt}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
