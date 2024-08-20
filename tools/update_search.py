import os
import yaml
from algoliasearch.search_client import SearchClient

BASE_API_FILES_PATH = '../static/api/'

app_id = 'GNSJUJD786'
api_key = os.environ['ALGOLIA_API_KEY']
index_name = 'docs'
api_base_url = 'https://developers.29next.com/docs/api/admin/reference/?v=2024-04-01#/operations/'


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
                navigation = {
                        'lvl0': 'Documentation',
                        'lvl1': 'Admin API',
                        'lvl2': tag,
                        'lvl3': operation_id,
                        'lvl4': None,
                        'lvl5': None,
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
                        'type': 'lvl3',
                        'url': '{}{}{}'.format(api_base_url, operation_id, '?v=2024-04-01&ref=search'),
                        'url_without_anchor': '{}{}'.format(api_base_url, operation_id),
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
