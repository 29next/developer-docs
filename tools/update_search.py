import os
import yaml
from algoliasearch.search_client import SearchClient

BASE_API_FILES_PATH = '../static/api/'

app_id = 'GNSJUJD786'
api_key = os.environ['ALGOLIA_API_KEY']
index_name = 'docs'
domain = 'https://developers.29next.com'


def create_index_object(api_type, tag, object_id, description, anchor):
    url = domain + anchor

    navigation = {
        'lvl0': 'Documentation',
        'lvl1': '{} API'.format(api_type.capitalize()),
        'lvl2': None,
        'lvl3': tag,
        'lvl4': object_id,
        'lvl5': description,
        'lvl6': None
    }
    object = {
        'objectID': object_id,
        'name': object_id,
        'content': description,
        'docusaurus_tag': 'docs-default-current',
        'category': 'API',
        'language': 'en',
        'type': 'lvl4',
        'anchor': anchor,
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

    return object


def generate_api_objects(api_type, version):
    print('Generating {} api index objects...'.format(api_type))
    apis = []

    api_file = BASE_API_FILES_PATH + '/{}/{}.yaml'.format(api_type, version)

    with open(api_file, 'r+') as f:
        spec = yaml.safe_load(f.read())
        for path, methods in spec['paths'].items():

            for each in methods.items():
                object_id = each[1].get('operationId', '')
                tag = each[1]['tags'][0]
                description = each[1].get('description', '')
                anchor = '/docs/api/{}/reference/?v={}#/operations/{}'.format(api_type, version, object_id)
                apis.append(
                    create_index_object(api_type, tag, object_id, description, anchor)
                )
    return apis


def generate_webhook_objects():
    print('Generating webhook index objects...')
    webhooks = []

    api_type = 'admin'
    version = '2024-04-01'
    api_file = BASE_API_FILES_PATH + '/{}/{}.yaml'.format(api_type, version)

    with open(api_file, 'r+') as f:
        spec = yaml.safe_load(f.read())
        for webhook in spec['webhooks'].items():
            tag = webhook[1]['post']['tags'][0]
            object_id = webhook[0]
            description = webhook[1]['post']['description']
            anchor = '/docs/api/admin/reference/?v={}#/webhooks/{}/post'.format(version, object_id)
            webhooks.append(
                create_index_object('admin', tag, object_id, description, anchor)
            )
    return webhooks



def add_to_index():

    client = SearchClient.create(app_id, api_key)
    index = client.init_index(index_name)

    indexed_apis = [
        {
            'type': 'admin',
            'version': '2024-04-01'
        },
        {
            'type': 'campaigns',
            'version': 'v1'
        }
    ]

    for each in indexed_apis:
        objects = generate_api_objects(each['type'], each['version'])
        print('Pushing {} objects to search index...'.format(len(objects)))
        index.save_objects(objects)

    webhook_objects = generate_webhook_objects()
    print('Pushing webhook objects to search index...'.format(len(webhook_objects)))
    index.save_objects(webhook_objects)


add_to_index()
