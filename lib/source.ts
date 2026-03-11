import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createElement } from 'react';
import type { PageTree } from 'fumadocs-core/server';
import apiMethodsJson from './generated/api-methods.json';

const apiMethods = apiMethodsJson as Record<string, string>;

const METHOD_COLORS: Record<string, { background: string; color: string }> = {
  GET:    { background: '#dcfce7', color: '#15803d' },
  POST:   { background: '#dbeafe', color: '#1d4ed8' },
  PUT:    { background: '#fef9c3', color: '#a16207' },
  PATCH:  { background: '#ffedd5', color: '#c2410c' },
  DELETE: { background: '#fee2e2', color: '#b91c1c' },
};

function methodBadge(method: string) {
  const colors = METHOD_COLORS[method] ?? { background: '#f3f4f6', color: '#374151' };
  return createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      borderRadius: '3px',
      padding: '1px 4px',
      fontSize: '9px',
      fontWeight: '700',
      fontFamily: 'monospace',
      lineHeight: '1.4',
      background: colors.background,
      color: colors.color,
      flexShrink: 0,
      marginLeft: 'auto',
      order: 1,
    },
  }, method);
}

function injectIcons(nodes: PageTree.Node[]) {
  for (const node of nodes) {
    if (node.type === 'page') {
      const method = apiMethods[node.url];
      if (method && METHOD_COLORS[method]) {
        node.icon = methodBadge(method);
      }
    } else if (node.type === 'folder') {
      injectIcons(node.children);
      if (node.index) {
        const method = apiMethods[node.index.url];
        if (method && METHOD_COLORS[method]) {
          node.index.icon = methodBadge(method);
        }
      }
    }
  }
}

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

injectIcons((source.pageTree as PageTree.Root).children);
