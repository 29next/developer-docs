import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import apiMethods from '@/lib/generated/api-methods.json';

const methods = apiMethods as Record<string, string>;

const METHOD_COLORS: Record<string, string> = {
  GET: 'text-green-600 dark:text-green-400',
  POST: 'text-blue-600 dark:text-blue-400',
  PUT: 'text-orange-600 dark:text-orange-400',
  PATCH: 'text-yellow-600 dark:text-yellow-400',
  DELETE: 'text-red-600 dark:text-red-400',
};

export const source = loader({
  baseUrl: '/docs',
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
  source: docs.toFumadocsSource(),
  pageTree: {
    transformers: [
      {
        file(node) {
          const method = methods[node.url];
          if (method) {
            node.name = createElement(
              'span',
              { className: 'flex items-center justify-between w-full gap-2' },
              createElement('span', { className: 'truncate' }, node.name),
              createElement(
                'span',
                {
                  className: `shrink-0 text-[10px] font-bold font-mono ${METHOD_COLORS[method] ?? ''}`,
                },
                method,
              ),
            );
          }
          return node;
        },
      },
    ],
  },
});
