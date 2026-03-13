'use client';

/**
 * Docusaurus @theme/Tabs and @theme/TabItem compatibility shims.
 * Maps the Docusaurus API onto fumadocs-ui Tabs/Tab components.
 */

import { Children, isValidElement, type ReactNode } from 'react';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

interface TabItemProps {
  value: string;
  label?: string;
  children: ReactNode;
}

interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
}

export default function DocusaurusTabs({ children, defaultValue }: TabsProps) {
  const validChildren = Children.toArray(children).filter(isValidElement) as any[];

  // Build items array with a guaranteed non-empty string per child (fallback to index)
  const items: string[] = validChildren
    .map((child: any, i: number) => {
      const raw = child.props.label ?? child.props.value;
      return typeof raw === 'string' && raw.length > 0 ? raw : String(i);
    });

  const defaultIndex = defaultValue
    ? Math.max(0, validChildren.findIndex((child: any) => child?.props?.value === defaultValue))
    : 0;

  return (
    <Tabs items={items} defaultIndex={defaultIndex}>
      {validChildren.map((child: any, i: number) => {
        const tabValue = typeof (child.props.label ?? child.props.value) === 'string'
          && (child.props.label ?? child.props.value).length > 0
          ? (child.props.label ?? child.props.value)
          : String(i);
        return (
          <Tab key={tabValue} value={tabValue}>
            {child.props.children}
          </Tab>
        );
      })}
    </Tabs>
  );
}

