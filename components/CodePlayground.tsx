import { parsePlaygroundFile } from '@/lib/playground/parseFile';
import { CodePlaygroundUI } from './CodePlaygroundUI';

interface CodePlaygroundProps {
  src: string;
  layout?: string;
  height?: number;
}

export async function CodePlayground({ src, layout, height }: CodePlaygroundProps) {
  const { content, meta } = parsePlaygroundFile(src);
  return (
    <CodePlaygroundUI
      content={content}
      layout={layout ?? meta.layout ?? ''}
      height={height ?? 420}
      src={src}
    />
  );
}
