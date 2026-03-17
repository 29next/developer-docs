/**
 * Custom MDX formatter for @graphql-markdown/cli → fumadocs integration.
 *
 * Maps graphql-markdown's admonition and badge primitives to fumadocs
 * components so the generated MDX pages render correctly without MUI.
 */

const mdxDeclaration = `
import { Callout } from 'fumadocs-ui/components/callout';
`;

const formatMDXAdmonition = ({ text, title, type }) => {
  const calloutType = type === "warning" ? "warn" : "info";
  return `<Callout type="${calloutType}" title="${title}">${text}</Callout>`;
};

const formatMDXBadge = ({ text, classname }) => {
  const isDeprecated = classname === "DEPRECATED";
  const color = isDeprecated
    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  return `<span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${color}">${text}</span>`;
};

module.exports = {
  mdxDeclaration,
  formatMDXAdmonition,
  formatMDXBadge,
};
