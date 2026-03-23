'use client';

import { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';

const STEPS = ['Contact', 'Shipping', 'Payment'];

const STEP_FIELDS: Record<number, { label: string; placeholder: string }[]> = {
  0: [
    { label: 'Email', placeholder: 'jane@example.com' },
    { label: 'Phone', placeholder: '+1 (555) 000-0000' },
  ],
  1: [
    { label: 'Address', placeholder: '123 Main Street' },
    { label: 'City / ZIP', placeholder: 'New York, 10001' },
  ],
  2: [
    { label: 'Card Number', placeholder: '4242 4242 4242 4242' },
    { label: 'Expiry / CVV', placeholder: '12 / 26  •  •••' },
  ],
};

export function MultiStepPreview() {
  const [step, setStep] = useState(0);
  return (
    <div className="flex flex-col gap-3 p-4">
      {/* Step bar */}
      <div className="flex items-center gap-0">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <button onClick={() => setStep(i)} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`flex size-5 items-center justify-center rounded-full text-[9px] font-bold transition-colors ${
                  i < step
                    ? 'bg-amber-500 text-white'
                    : i === step
                    ? 'bg-amber-500 text-white ring-2 ring-amber-500/30'
                    : 'border border-fd-border bg-fd-card text-fd-muted-foreground'
                }`}
              >
                {i < step ? <Check size={9} strokeWidth={3} aria-hidden="true" /> : i + 1}
              </div>
              <span
                className={`text-[9px] font-medium ${
                  i === step ? 'text-amber-500' : i < step ? 'text-fd-foreground' : 'text-fd-muted-foreground'
                }`}
              >
                {s}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`mb-3.5 h-px flex-1 mx-1 ${i < step ? 'bg-amber-500' : 'bg-fd-border'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-1.5">
        {STEP_FIELDS[step].map(f => (
          <div key={f.label} className="flex flex-col gap-0.5">
            <label className="text-[9px] font-semibold uppercase tracking-wide text-fd-muted-foreground">
              {f.label}
            </label>
            <div className="rounded border border-fd-border bg-fd-background/60 px-2 py-1.5 text-[10px] text-fd-muted-foreground">
              {f.placeholder}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-2">
        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="flex-1 rounded-md border border-fd-border py-1.5 text-[10px] font-medium text-fd-muted-foreground hover:bg-fd-muted transition-colors"
          >
            Back
          </button>
        )}
        <button
          onClick={() => setStep(s => Math.min(s + 1, STEPS.length - 1))}
          className="flex flex-1 items-center justify-center gap-1 rounded-md bg-amber-500 py-1.5 text-[10px] font-semibold text-white hover:bg-amber-600 transition-colors"
        >
          {step < STEPS.length - 1 ? (
            <>Next: {STEPS[step + 1]} <ChevronRight size={10} aria-hidden="true" /></>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </div>
  );
}
