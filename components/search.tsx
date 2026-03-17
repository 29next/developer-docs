'use client';

import { DocSearch } from '@docsearch/react';
import '@docsearch/css';
import { Search } from 'lucide-react';

const dsProps = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX!,
  apiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
  askAi: 'yP4tu24PWhOU',
} as const;

/** Full search bar for the desktop sidebar. */
export function AlgoliaDocSearch() {
  return <DocSearch {...dsProps} />;
}

/** Icon-only search button for the mobile header — clicks the hidden DocSearch button. */
export function AlgoliaDocSearchMobile() {
  return (
    <>
      <div className="hidden"><DocSearch {...dsProps} /></div>
      <button
        type="button"
        aria-label="Search"
        className="p-2 rounded-md text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
        onClick={() => {
          // DocSearch renders a hidden button — click it to open the modal
          const btn = document.querySelector<HTMLButtonElement>('.DocSearch-Button');
          btn?.click();
        }}
      >
        <Search className="size-4.5" />
      </button>
    </>
  );
}
