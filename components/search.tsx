'use client';

import AlgoliaSearchDialog from 'fumadocs-ui/components/dialog/search-algolia';
import { liteClient } from 'algoliasearch/lite';
import type { SharedProps } from 'fumadocs-ui/contexts/search';

const searchOptions = {
  indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX!,
  client: liteClient(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
  ),
};

export function AlgoliaDialog(props: SharedProps) {
  return <AlgoliaSearchDialog searchOptions={searchOptions} {...props} />;
}
