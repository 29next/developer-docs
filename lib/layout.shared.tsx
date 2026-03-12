import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src="/logo-light.png" alt="Next Commerce" width={105} height={21} className="dark:hidden" />
          <Image src="/logo-dark.png" alt="Next Commerce" width={105} height={21} className="hidden dark:block" />
        </>
      ),
    },
    githubUrl: 'https://github.com/29next/developer-docs',
  };
}
