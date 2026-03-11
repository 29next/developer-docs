'use client';
import * as Select from '@radix-ui/react-select';
import { useRouter } from 'next/navigation';
import { ChevronDown, Check } from 'lucide-react';

interface Version {
  value: string;
  label: string;
  /** The root path for this version, e.g. "/docs/admin-api/reference/2023-02-10" */
  path: string;
}

interface VersionSelectorProps {
  versions: Version[];
  currentVersion: string;
}

export function VersionSelector({ versions, currentVersion }: VersionSelectorProps) {
  const router = useRouter();

  function handleVersionChange(value: string) {
    const version = versions.find((v) => v.value === value);
    if (version) router.push(version.path);
  }

  return (
    <Select.Root value={currentVersion} onValueChange={handleVersionChange}>
      <Select.Trigger className="inline-flex items-center gap-1 rounded border border-fd-border bg-fd-background px-2 py-1 text-sm text-fd-foreground hover:bg-fd-muted">
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="h-3 w-3" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-50 rounded border border-fd-border bg-fd-popover shadow-md">
          <Select.Viewport className="p-1">
            {versions.map((v) => (
              <Select.Item
                key={v.value}
                value={v.value}
                className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm text-fd-popover-foreground outline-none hover:bg-fd-accent data-[highlighted]:bg-fd-accent"
              >
                <Select.ItemText>{v.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check className="h-3 w-3" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
