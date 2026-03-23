export function CartSummaryPreview() {
  return (
    <div className="flex flex-col gap-0 p-4">
      <div className="rounded-lg border border-fd-border bg-fd-card/50 overflow-hidden">
        <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-fd-muted-foreground border-b border-fd-border">
          Order Summary
        </div>

        <div className="divide-y divide-fd-border">
          {/* Item 1 */}
          <div className="flex items-center justify-between px-3 py-1.5 text-xs gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src="/assets/mockup/skincare.jpg"
                alt=""
                width={20}
                height={20}
                className="size-5 rounded object-cover shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-fd-foreground truncate">Glow Serum × 2</span>
                <span className="text-[10px] text-green-500">Save $12.00</span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-fd-foreground font-medium">$46.00</span>
              <span className="text-[10px] text-fd-muted-foreground line-through">$58.00</span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between px-3 py-1.5 text-xs gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src="/assets/mockup/skincare.jpg"
                alt=""
                width={20}
                height={20}
                className="size-5 rounded object-cover shrink-0 opacity-80"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-fd-foreground truncate">Eye Cream × 1</span>
                <span className="text-[10px] text-green-500">Save $5.00</span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-fd-foreground font-medium">$19.00</span>
              <span className="text-[10px] text-fd-muted-foreground line-through">$24.00</span>
            </div>
          </div>

          {/* Add-on */}
          <div className="flex items-center justify-between px-3 py-1.5 text-xs gap-2">
            <div className="flex flex-col">
              <span className="text-fd-muted-foreground">Warranty</span>
            </div>
            <span className="text-fd-foreground">$9.00</span>
          </div>

          {/* Coupon */}
          <div className="flex items-center justify-between px-3 py-1.5 text-xs text-green-500">
            <span>Coupon (SAVE10)</span>
            <span className="font-semibold">−$7.40</span>
          </div>

          {/* Shipping */}
          <div className="flex items-center justify-between px-3 py-1.5 text-xs gap-2">
            <div className="flex flex-col">
              <span className="text-fd-muted-foreground">Shipping</span>
              <span className="text-[10px] text-green-500">Free over $60</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-semibold text-green-500">Free</span>
              <span className="text-[10px] text-fd-muted-foreground line-through">$9.99</span>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t border-fd-border bg-fd-muted/20 px-3 py-2.5 text-xs">
          <span className="font-semibold text-fd-foreground">Total</span>
          <span className="text-base font-bold text-fd-foreground">$66.60</span>
        </div>

        {/* Today you save */}
        <div className="flex items-center justify-between bg-green-500/10 border-t border-green-500/20 px-3 py-2 text-xs">
          <span className="font-semibold text-green-500">Today you save</span>
          <span className="font-bold text-green-500">$34.39</span>
        </div>
      </div>
    </div>
  );
}
