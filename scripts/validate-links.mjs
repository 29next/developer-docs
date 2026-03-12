import path from 'node:path';
import { getTableOfContents } from 'fumadocs-core/content/toc';
import { getSlugs } from 'fumadocs-core/source';
import { printErrors, readFiles, scanURLs, validateFiles } from 'next-validate-link';

async function checkLinks() {
  const docsFiles = await readFiles('content/docs/**/*.{md,mdx}');

  const scanned = await scanURLs({
    populate: {
      'docs/[[...slug]]': docsFiles.map((file) => ({
        value: getSlugs(path.relative('content/docs', file.path)),
        hashes: getTableOfContents(file.content).map((item) => item.url.slice(1)),
      })),
    },
  });

  printErrors(
    await validateFiles(docsFiles, { scanned }),
    true,
  );
}

void checkLinks();
