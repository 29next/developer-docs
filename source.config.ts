import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins/remark-mdx-mermaid';
import { z } from 'zod';
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { Transformer } from 'unified';

const LANG_ALIASES: Record<string, string> = {
  django: 'jinja',
  shell: 'bash',
};

/**
 * Remark plugin: normalise Docusaurus code fences for Shiki compatibility.
 * - Unwraps `mdx-code-block` fences into raw MDX
 * - Strips meta from language field (title="…", showLineNumbers, etc.)
 * - Maps language aliases (django → jinja, shell → bash)
 */
function remarkDocusaurusCompat(): Transformer<Root> {
  return (tree) => {
    visit(tree, 'code', (node: any, index: number | undefined, parent: any) => {
      if (node.lang === 'mdx-code-block') {
        if (index !== undefined && parent) {
          parent.children.splice(index, 1, {
            type: 'mdxjsEsm',
            value: node.value,
            data: { estree: null },
          });
        }
        return;
      }

      if (node.lang) {
        const firstWord = node.lang.split(/\s/)[0];
        if (firstWord.startsWith('title=') || firstWord.startsWith('{')) {
          node.meta = node.lang;
          node.lang = null;
        } else {
          node.meta = node.lang.slice(firstWord.length).trim() || node.meta;
          node.lang = LANG_ALIASES[firstWord] ?? firstWord;
        }
      }
    });
  };
}

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string().optional().default(''),
      full: z.boolean().optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    providerImportSource: '@/components/mdx',
    remarkPlugins: [remarkDocusaurusCompat, remarkMdxMermaid],
    rehypeCodeOptions: {
      themes: { light: 'github-light', dark: 'github-dark' },
      langs: [
        'python',
        'bash',
        'json',
        'yaml',
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'html',
        'css',
        'sql',
      ],
    },
  },
});
