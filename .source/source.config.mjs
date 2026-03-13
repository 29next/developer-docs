// source.config.ts
import { defineDocs, defineConfig, frontmatterSchema } from "fumadocs-mdx/config";
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins/remark-mdx-mermaid";
import { z } from "zod";
import { visit } from "unist-util-visit";
var LANG_ALIASES = {
  django: "jinja",
  shell: "bash"
};
function remarkDocusaurusCompat() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang === "mdx-code-block") {
        if (index !== void 0 && parent) {
          parent.children.splice(index, 1, {
            type: "mdxjsEsm",
            value: node.value,
            data: { estree: null }
          });
        }
        return;
      }
      if (node.lang) {
        const firstWord = node.lang.split(/\s/)[0];
        if (firstWord.startsWith("title=") || firstWord.startsWith("{")) {
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
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string().optional().default(""),
      full: z.boolean().optional()
    })
  },
  mdxOptions: {
    includeProcessedMarkdown: true
  }
});
var source_config_default = defineConfig({
  mdxOptions: {
    providerImportSource: "@/components/mdx",
    remarkPlugins: [remarkDocusaurusCompat, remarkMdxMermaid],
    rehypeCodeOptions: {
      themes: { light: "github-light", dark: "github-dark" },
      langs: [
        "python",
        "bash",
        "json",
        "yaml",
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "html",
        "css",
        "sql"
      ]
    }
  }
});
export {
  source_config_default as default,
  docs
};
