import { parsePlaygroundFile } from '@/lib/playground/parseFile';
import { CodePlaygroundUI } from './CodePlaygroundUI';

interface CodePlaygroundProps {
  src: string;
  layout?: string;
  height?: number;
}

export async function CodePlayground({ src, layout, height }: CodePlaygroundProps) {
  const { html, css, js, meta } = parsePlaygroundFile(src);
  return (
    <CodePlaygroundUI
      html={html}
      css={css}
      js={js}
      layout={layout ?? meta.layout ?? ''}
      height={height ?? 420}
    />
  );
}
