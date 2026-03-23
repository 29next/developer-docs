export function CheckoutFormPreview() {
  return (
    <div className="flex flex-col gap-3 p-4 text-[11px] leading-tight font-sans min-w-0">

      {/* Shipping Address */}
      <div className="flex flex-col gap-1.5">
        <div>
          <p className="font-bold text-[13px] text-fd-foreground">Shipping address</p>
          <p className="text-[10px] text-fd-muted-foreground mt-0.5">Enter your shipping details</p>
        </div>

        {/* Email */}
        <div className="rounded-md border border-fd-border/60 bg-fd-background/60 px-2.5 py-1.5 text-[10px] text-fd-muted-foreground/50">
          Email*
        </div>

        {/* First / Last Name */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-md border border-fd-border/60 bg-fd-background/60 px-2.5 py-1.5 text-[10px] text-fd-muted-foreground/50">
            First Name*
          </div>
          <div className="rounded-md border border-fd-border/60 bg-fd-background/60 px-2.5 py-1.5 text-[10px] text-fd-muted-foreground/50">
            Last Name*
          </div>
        </div>

        {/* Country dropdown */}
        <div className="flex items-center justify-between rounded-md border border-fd-border/60 bg-fd-background/60 px-2.5 py-1.5">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] text-fd-muted-foreground/50">Country</span>
            <span className="text-[10px] text-fd-foreground/80">Thailand</span>
          </div>
          <svg viewBox="0 0 10 10" className="w-2 h-2 text-fd-muted-foreground/50" fill="none">
            <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Address */}
        <div className="flex items-center justify-between rounded-md border border-fd-border/60 bg-fd-background/60 px-2.5 py-1.5">
          <span className="text-[10px] text-fd-muted-foreground/50">Address*</span>
          <svg viewBox="0 0 10 10" className="w-2 h-2 text-fd-muted-foreground/40" fill="none">
            <circle cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="1" />
            <path d="M6.5 6.5L8.5 8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* Trust badge */}
        <div className="flex items-start gap-2 rounded-md border border-fd-border/40 bg-fd-background/40 px-2.5 py-2 mt-0.5">
          <div className="w-6 h-6 rounded bg-fd-muted/40 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 text-fd-muted-foreground/60" fill="none">
              <path d="M7 1.5L2 3.5v4c0 2.5 2 4.5 5 5 3-0.5 5-2.5 5-5v-4L7 1.5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              <path d="M4.5 7l1.5 1.5L9.5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[9.5px] text-fd-muted-foreground leading-[1.4]">
            <span className="font-semibold text-fd-foreground">30 Day Money-Back Guarantee:</span>{' '}
            Feel safe knowing you're protected. Return within 30 days for a full refund.
          </p>
        </div>
      </div>

      {/* Payment */}
      <div className="flex flex-col gap-1.5">
        <div>
          <p className="font-bold text-[13px] text-fd-foreground">Payment</p>
          <p className="text-[10px] text-fd-muted-foreground mt-0.5">All transactions are secure and encrypted.</p>
        </div>

        {/* Express: PayPal + Apple Pay */}
        <div className="grid grid-cols-3 gap-1.5">
          <div className="bg-black rounded-md flex items-center justify-center py-1.5 min-h-[22px]">
            <img
              src="/assets/express/google_pay.svg"
              alt="PayPal"
              className="h-5 w-auto object-contain"
              aria-hidden="true"
            />
          </div>
          <div className="bg-black rounded-md flex items-center justify-center py-1.5 min-h-[22px]">
            <img
              src="/assets/express/apple_pay.svg"
              alt="Apple Pay"
              className="h-5 w-auto object-contain"
              aria-hidden="true"
            />
          </div>
          <div className="bg-[#FFC439] rounded-md flex items-center justify-center py-1.5 min-h-[22px]">
            <img
              src="/assets/express/paypal.svg"
              alt="Apple Pay"
              className="h-5 w-auto object-contain"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-fd-border/50" />
          <span className="text-[10px] font-semibold text-fd-muted-foreground tracking-widest">OR</span>
          <div className="flex-1 h-px bg-fd-border/50" />
        </div>

        {/* Credit Card — selected */}
        <div className="rounded-lg border border-fd-border/50 overflow-hidden">
          <div className="flex items-center justify-between px-2.5 py-2 bg-fd-background/60">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border-2 border-blue-500 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              </div>
              <span className="font-semibold text-[11px] text-fd-foreground">Credit Card</span>
            </div>
            <div className="flex gap-1 items-center">
              {[
                '/assets/pm/cards/visa.svg',
                '/assets/pm/cards/mastercard.svg',
                '/assets/pm/cards/american-express.svg',
              ].map(src => (
                <img key={src} src={src} alt="" className="h-3.5 w-auto object-contain" aria-hidden="true" />
              ))}
              <span className="text-[9px] text-fd-muted-foreground/60">+5</span>
            </div>
          </div>

          {/* Card fields */}
          <div className="flex flex-col gap-1 border-t border-fd-border/40 px-2.5 py-2 bg-fd-background/30">
            <div className="flex items-center justify-between rounded-md border border-fd-border/50 bg-fd-background/70 px-2 py-1.5">
              <span className="text-[10px] text-fd-muted-foreground/60">Card Number</span>
              <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-fd-muted-foreground/40" fill="none">
                <rect x="1" y="4" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
                <path d="M4 4V3a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {['Month', 'Year', 'CVV*'].map(f => (
                <div key={f} className="flex items-center justify-between rounded-md border border-fd-border/50 bg-fd-background/70 px-1.5 py-1.5">
                  <span className="text-[9px] text-fd-muted-foreground/60">{f}</span>
                  {f !== 'CVV*' && (
                    <svg viewBox="0 0 8 8" className="w-1.5 h-1.5 text-fd-muted-foreground/40" fill="none">
                      <path d="M1.5 3l2.5 2.5L6.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-3 h-3 rounded border-2 border-blue-500 bg-blue-500 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 8 8" className="w-2 h-2" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[10px] text-fd-muted-foreground">Use shipping address as billing address</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
