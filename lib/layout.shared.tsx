import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { siteConfig } from '@/lib/config';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img src="/logo-light.png" alt={siteConfig.companyName} width={105} height={21} className="dark:hidden" />
          <img src="/logo-dark.png" alt={siteConfig.companyName} width={105} height={21} className="hidden dark:block" />
        </>
      ),
    },
    githubUrl: siteConfig.githubUrl,
  };
}
