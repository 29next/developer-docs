import type { ReactNode } from 'react';

interface TabItemProps {
  value: string;
  label?: string;
  children: ReactNode;
}

// Rendered by DocusaurusTabs shim — this component is a passthrough
export default function TabItem({ children }: TabItemProps) {
  return <>{children}</>;
}
