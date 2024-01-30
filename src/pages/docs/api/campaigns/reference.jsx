import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useHistory } from '@docusaurus/router';
import clsx from 'clsx';
import SectionsMenu from '../../../../components/SectionsMenu'

function APIElement({ layout = 'responsive', currentVersion = 'v1' }) {
    return (
        <BrowserOnly fallback={<div className="loading-container">Loading...</div>}>
            {() => {
                // eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
                const { API } = require('@stoplight/elements');

                return (
                    <div className={clsx('elements-container', layout)}>
                        <API
                            className="stacked"
                            apiDescriptionUrl={`/api/campaigns/${currentVersion}.yaml`}
                            basePath="/"
                            router="hash"
                            layout={layout}
                            hideSchemas
                            hideInternal
                        />
                    </div>
                );
            }}
        </BrowserOnly>
    );
}

export default function Home() {
    const router = useHistory();
    const location = router.location;

    const url = new URL(
        `https://developers.29next.com${location.pathname}${location.search}`
    );

    const currentVersion = url.searchParams.get('v') || 'v1';
    return (
        <Layout
            title="Campaigns API Reference"
            description="29 Next Campaigns API Reference Docs"
            noFooter
            wrapperClassName="api-reference campaigns-api"
        >
            <Head>
                {/* Load styles for Stoplight Elements */}
                <link rel="preload" href="/assets/css/elements.min.css" as="style" />
                <link rel="stylesheet" href="/assets/css/elements.min.css" />
            </Head>

            <div className="header">
                <h1 className="mb-0 flex items-center gap-2 text-sm font-semibold lg:text-lg" id="top">
                    Campaigns API Reference
                </h1>
                <div className="aside">
                    Version
                    <SectionsMenu
                        defaultValue={currentVersion}
                        values={[
                            { name: 'v1', docId: 'v1' }
                        ]}
                        onValueChange={(version) => {
                            router.push(`/docs/api/campaigns/reference/?v=${version}`);
                        }}
                        className=""
                    />
                </div>
            </div>
            <APIElement
                currentVersion={currentVersion}
            />
        </Layout>
    );
}
