'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';

const OPTIONS = [
  {
    id: 0,
    label: 'Starter',
    desc: '1 unit',
    image: '/assets/mockup/skincare2.jpg',
    price: 19,
    originalPrice: 24,
    recommended: false,
  },
  {
    id: 1,
    label: 'Standard',
    desc: '2 units',
    image: '/assets/mockup/skincare3.jpg',
    price: 39,
    originalPrice: 48,
    recommended: true,
  },
  {
    id: 2,
    label: 'Premium',
    desc: '4 units',
    image: '/assets/mockup/skincare6.jpg',
    price: 59,
    originalPrice: 76,
    recommended: false,
  },
];

export function PackageSelectorPreview() {
  const [selected, setSelected] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-center gap-2 mb-0.5">
        <div className="text-xs font-semibold text-fd-foreground leading-tight">
          Choose Your Pack
          <span className="block text-[10px] font-normal text-fd-muted-foreground">Select a size below</span>
        </div>
      </div>

      {OPTIONS.map(o => {
        const active = selected === o.id;
        const savingsPct = Math.round(((o.originalPrice - o.price) / o.originalPrice) * 100);
        const savingsAmt = o.originalPrice - o.price;

        return (
          <button
            key={o.id}
            onClick={() => setSelected(o.id)}
            className={`group relative flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-xs
              transition-all duration-200 ease-out
              hover:-translate-y-0.5 hover:shadow-md
              active:scale-[0.98] active:translate-y-0
              ${
                active
                  ? 'border-orange-500 bg-orange-500/10 shadow-sm'
                  : 'border-fd-border bg-fd-card/50 hover:border-orange-500/40 hover:bg-orange-500/5'
              }`}
          >
            {/* Recommended badge */}
            {o.recommended && (
              <span
                className={`absolute -top-2 right-3 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide
                  transition-all duration-300 ${
                    active
                      ? 'bg-orange-500 text-white'
                      : 'bg-fd-muted text-fd-muted-foreground group-hover:bg-orange-500/20 group-hover:text-orange-400'
                  }`}
              >
                Recommended
              </span>
            )}

            {/* Radio */}
            <div
              className={`flex size-3.5 shrink-0 items-center justify-center rounded-full border-2
                transition-all duration-250 ${
                  active
                    ? 'border-orange-500 bg-orange-500 scale-110'
                    : 'border-fd-border group-hover:border-orange-400/60'
                }`}
            >
              <div
                className={`rounded-full bg-white transition-all duration-200 ${
                  active ? 'size-1 opacity-100 scale-100' : 'size-0 opacity-0 scale-0'
                }`}
              />
            </div>

            {/* Product image */}
            <img
              src={o.image}
              alt=""
              width={44}
              height={44}
              className={`size-10 rounded-lg object-cover border-2 shrink-0 transition-all duration-300 ${
                active
                  ? 'border-orange-500/70 shadow-[0_0_8px_rgba(249,115,22,0.3)] scale-105'
                  : 'border-fd-border scale-100'
              }`}
            />

            {/* Label + tags */}
            <div className="flex flex-1 items-center justify-between gap-1 min-w-0">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-fd-foreground leading-tight">{o.label}</span>
                  <span className="rounded-full bg-green-500/20 px-1.5 py-0.5 text-[9px] font-bold text-green-400">
                    Save {savingsPct}%
                  </span>
                </div>
                <div className="mt-0.5 text-[9px] text-fd-muted-foreground">{o.desc}</div>
              </div>

              {/* Price column */}
              <div className="shrink-0 text-right">
                <div className={`text-sm font-bold transition-all duration-200 ${
                  active ? 'text-orange-500 scale-105' : 'text-fd-foreground scale-100'
                }`}>
                  ${o.price}
                </div>
                <div className="text-[9px] text-fd-muted-foreground line-through">${o.originalPrice}</div>
                <div className="text-[9px] font-semibold text-green-400">Save ${savingsAmt}</div>
              </div>
            </div>
          </button>
        );
      })}

      <button
        onClick={handleAdd}
        className={`flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold text-white
          transition-all duration-200
          hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/25
          active:scale-[0.97]
          ${added ? 'bg-green-600 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'}`}
      >
        {added ? (
          <>
            <Check size={11} aria-hidden="true" />
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
