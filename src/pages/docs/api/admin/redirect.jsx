import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

/*
This is a hack to create a redirect view for algolia search to work
*/
export default function redirectAPI() {
    return (
        <BrowserOnly>
            {() => {
                const location = window.location;
                const hash = location.hash;
                const version = '?v=2024-04-01'
                const newPath = location.pathname.replace('redirect', 'reference') + version + hash;
                window.location = newPath;
            }}
        </BrowserOnly>
    );
}
