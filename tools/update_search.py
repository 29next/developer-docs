import os
import yaml
from algoliasearch.search_client import SearchClient

BASE_API_FILES_PATH = '../static/api/'

app_id = 'GNSJUJD786'
api_key = os.environ['ALGOLIA_API_KEY']
index_name = 'docs'
api_base_url = 'https://developers.29next.com/docs/api/admin/reference/#/operations/'


def generate_objects():
    apis = []

    type = 'admin'
    version = '2024-04-01'
    api_file = BASE_API_FILES_PATH + '/{}/{}.yaml'.format(type, version)
    with open(api_file, 'r+') as f:
        spec = yaml.safe_load(f.read())
        for path, methods in spec['paths'].items():

            for each in methods.items():
                operation_id = each[1].get('operationId', '')
                tag = each[1]['tags'][0]
                description = each[1].get('description', '')
                url = '{}{}{}'.format(api_base_url, operation_id, '?ref=search')
                navigation = {
                        'lvl0': 'Documentation',
                        'lvl1': 'Admin API',
                        'lvl2': None,
                        'lvl3': tag,
                        'lvl4': operation_id,
                        'lvl5': description,
                        'lvl6': None
                }
                apis.append(
                    {
                        'objectID': operation_id,
                        'name': operation_id,
                        'content': description,
                        'docusaurus_tag': 'docs-default-current',
                        'category': 'API',
                        'language': 'en',
                        'type': 'lvl4',
                        'anchor': '/operations/{}'.format(operation_id),
                        'url': url,
                        'url_without_variables': url,
                        'url_without_anchor': url,
                        'weight': {
                            'page_rank': 100,
                            'level': 100,
                            'position': 1
                        },
                        'hierarchy': navigation,
                        'hierarchy_radio': navigation,
                        'hierarchy_camel': [navigation],
                        'hierarchy_radio_camel': navigation
                    }
                )
    return apis


def add_to_index():

    client = SearchClient.create(app_id, api_key)
    index = client.init_index(index_name)

    objects = generate_objects()

    index.save_objects(objects)

add_to_index()
