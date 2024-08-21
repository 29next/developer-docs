import { useHistory } from '@docusaurus/router';
/*
This is a hack to create a redirect view for algolia search to work
*/

export default function redirectAPI() {
    const router = useHistory();
    const location = router.location;
    const queryParams = new URLSearchParams(location.search)

    const apiType = queryParams.get('type')
    const operation = '#/' + queryParams.get('operation')
    const version = queryParams.get('v')

    let destination = '/docs/api/' + apiType + '/reference/?v=' + version + operation

    return window.location = destination;
}
// http://localhost:3000/docs/api/redirect/?type=admin&operation=operations/cartsList&v=2024-04-01
