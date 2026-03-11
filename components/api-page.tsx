import { createOpenAPI } from 'fumadocs-openapi/server';
import { createAPIPage } from 'fumadocs-openapi/ui';

const openapi = createOpenAPI({
  input: [
    'public/api/admin/2024-04-01.yaml',
    'public/api/admin/2023-02-10.yaml',
    'public/api/admin/unstable.yaml',
    'public/api/campaigns/v1.yaml',
  ],
});

export const APIPage = createAPIPage(openapi, {
  content: {
    renderOperationLayout(slots) {
      return (
        <div className="flex flex-col gap-x-8 gap-y-4 @2xl:flex-row @2xl:items-start">
          <div className="min-w-0 flex-1">
            {slots.header}
            {slots.apiPlayground}
            {slots.description}
            {slots.authSchemes}
            {slots.paremeters}
            {slots.body}
            {slots.responses}
            {slots.callbacks}
          </div>
          <div className="min-w-0 flex-1 @2xl:sticky @2xl:top-[calc(var(--fd-docs-row-1,2rem)+1rem)]">
            {slots.apiExample}
          </div>
        </div>
      );
    },
  },
});
