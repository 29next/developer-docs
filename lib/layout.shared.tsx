import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src="/logo-light.png" alt={siteConfig.companyName} width={105} height={21} className="dark:hidden" />
          <Image src="/logo-dark.png" alt={siteConfig.companyName} width={105} height={21} className="hidden dark:block" />
        </>
      ),
    },
    githubUrl: siteConfig.githubUrl,
  };
}
