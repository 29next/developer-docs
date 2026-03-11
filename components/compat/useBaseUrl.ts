// Docusaurus compatibility shim — @docusaurus/useBaseUrl
// Next.js has no base URL concept; just return the path as-is.
export default function useBaseUrl(url: string): string {
  return url;
}
