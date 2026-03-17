'use client';

import type React from 'react';
import { useState } from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { ChevronDown } from 'lucide-react';

/* ── Types ─────────────────────────────────────────────────────────────── */

export interface GraphQLField {
  name: string;
  type: string;
  description?: string;
  badges?: string[];
  fields?: GraphQLField[];
}

interface GraphQLOperationProps {
  type: string;
  name: string;
  signature: string;
  variablesExample?: string;
  responseExample?: string;
  args?: GraphQLField[];
  returnFields?: GraphQLField[];
  returnType?: string;
  description?: string;
  children?: React.ReactNode;
}

/* ── Badge ─────────────────────────────────────────────────────────────── */

function Badge({ label }: { label: string }) {
  const isDeprecated = label.toUpperCase() === 'DEPRECATED';
  const color = isDeprecated
    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
    : 'bg-fd-muted text-fd-muted-foreground';
  return (
    <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-medium ${color}`}>
      {label}
    </span>
  );
}

/* ── Expandable field ──────────────────────────────────────────────────── */

function FieldItem({ field, depth = 0 }: { field: GraphQLField; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = field.fields && field.fields.length > 0;

  return (
    <div className={depth > 0 ? 'border-l-2 border-fd-border pl-4 ml-2' : ''}>
      <div className="py-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <code className="text-sm font-medium text-fd-foreground underline decoration-fd-primary decoration-[1.5px] underline-offset-[3.5px]">{field.name}</code>
          <span className="text-fd-muted-foreground text-sm">&middot;</span>
          <code className={`text-sm ${hasChildren ? 'font-medium text-fd-foreground underline decoration-fd-primary decoration-[1.5px] underline-offset-[3.5px]' : 'text-fd-muted-foreground'}`}>{field.type}</code>
          {field.badges?.map((b) => <Badge key={b} label={b} />)}
        </div>
        {field.description && (
          <p className="mt-1 text-sm text-fd-muted-foreground">{field.description}</p>
        )}
        {hasChildren && (
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="mt-1.5 flex items-center gap-1 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            <ChevronDown
              className={`size-3.5 transition-transform ${open ? 'rotate-0' : '-rotate-90'}`}
            />
            {open ? 'Hide' : 'Show'} fields
          </button>
        )}
      </div>
      {hasChildren && open && (
        <div className="pb-2">
          {field.fields!.map((child) => (
            <FieldItem key={child.name} field={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main layout ───────────────────────────────────────────────────────── */

export function GraphQLOperation({
  type,
  name,
  signature,
  variablesExample,
  responseExample,
  args,
  returnFields,
  returnType,
  description,
  children,
}: GraphQLOperationProps) {
  const hasStructuredData = args || returnFields;

  return (
    <div className="not-prose max-w-none @container">
      <div className="flex flex-col gap-x-8 gap-y-6 @2xl:flex-row @2xl:items-start">
        {/* Left column: documentation */}
        <div className="min-w-0 flex-1">
          {hasStructuredData ? (
            <>
              {description && (
                <p className="text-fd-muted-foreground mb-6">{description}</p>
              )}

              {/* Arguments */}
              {args && args.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Arguments</h3>
                  <div className="divide-y divide-fd-border">
                    {args.map((arg) => (
                      <FieldItem key={arg.name} field={arg} />
                    ))}
                  </div>
                </div>
              )}

              {/* Return type */}
              {returnType && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">
                    {type === 'mutation' ? 'Return type' : 'Returns'}
                  </h3>
                  <div className="py-2 flex items-center gap-2 flex-wrap border-b border-fd-border mb-1">
                    <code className="text-sm font-medium text-fd-foreground underline decoration-fd-primary decoration-[1.5px] underline-offset-[3.5px]">{returnType}</code>
                    <Badge label="object" />
                  </div>
                  {returnFields && returnFields.length > 0 && (
                    <div className="divide-y divide-fd-border">
                      {returnFields.map((f) => (
                        <FieldItem key={f.name} field={f} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            children
          )}
        </div>

        {/* Right column: sticky code panels */}
        <div
          className="min-w-0 flex-1 @2xl:sticky @2xl:top-[calc(var(--fd-docs-row-1,2rem)+1rem)] flex flex-col gap-4"
          data-api-requests
        >
          <DynamicCodeBlock
            lang="graphql"
            code={signature}
            codeblock={{
              title: `${type === 'mutation' ? 'Mutation' : 'Query'} Reference`,
            }}
          />

          {variablesExample && (
            <DynamicCodeBlock
              lang="json"
              code={variablesExample}
              codeblock={{
                title: 'Variables',
              }}
            />
          )}

          {responseExample && (
            <DynamicCodeBlock
              lang="json"
              code={responseExample}
              codeblock={{
                title: 'JSON Response',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
