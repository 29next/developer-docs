import { createOpenAPI } from 'fumadocs-openapi/server';
import type { ReactNode } from 'react';

export const openapi = createOpenAPI({
  renderer: {
    API({ children, ...props }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
      return (
        <div
          {...props}
          className={`flex flex-col gap-x-6 gap-y-4 lg:grid lg:grid-cols-2 lg:items-start${props.className ? ` ${props.className}` : ''}`}
          style={{
            '--fd-api-info-top': 'calc(var(--fd-nav-height) + var(--fd-banner-height) + var(--fd-tocnav-height, 0px))',
            ...props.style,
          } as React.CSSProperties}
        >
          {children}
        </div>
      );
    },
    APIExample({ children, ...props }: { children: ReactNode; className?: string }) {
      return (
        <div
          {...props}
          className={`prose-no-margin md:sticky md:top-[--fd-api-info-top]${props.className ? ` ${props.className}` : ''}`}
        >
          {children}
        </div>
      );
    },
  },
});
