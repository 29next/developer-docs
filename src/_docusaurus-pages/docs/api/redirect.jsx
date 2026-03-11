import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

/*
This is a hack to create a redirect view for algolia search to work
Example:
http://localhost:3000/docs/api/redirect/?type=admin&operation=operations/cartsList&v=2024-04-01
*/
export default function redirectAPI() {
    return (
        <BrowserOnly>
            {() => {
                const location = window.location;
                const queryParams = new URLSearchParams(location.search)
                const apiType = queryParams.get('type')
                const operation = '#/' + queryParams.get('operation')
                const version = queryParams.get('v')
                const destination = '/docs/api/' + apiType + '/reference/?v=' + version + operation

                window.location = destination;
            }}
        </BrowserOnly>
    );
}
