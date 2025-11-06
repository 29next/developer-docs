import os
import yaml
from algoliasearch.search_client import SearchClient

from config import SITE_DOMAIN, BASE_API_FILES_PATH

APP_ID = 'WDDPJKSDHF'
API_KEY = os.environ['ALGOLIA_API_KEY']
INDEX_NAME = 'Developer Docs Crawler'


def create_index_object(api_type, api_type_title, tag, object_id, description, anchor):
    # object structure follow docusaurus algolia default structure
    url = SITE_DOMAIN + anchor
    navigation = {
        'lvl0': 'Documentation',
        'lvl1': api_type_title,
        'lvl2': tag,
        'lvl3': object_id,
        'lvl4': description,
        'lvl5': None,
        'lvl6': None
    }
    object = {
        'objectID': '{}-{}'.format(api_type, object_id),
        'name': object_id,
        'content': description,
        'docusaurus_tag': 'docs-default-current',
        'category': api_type_title,
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


def generate_api_objects(api_type, api_type_title, version):
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
                # use redirect instead of reference to fix ui state not updating
                anchor = '/docs/api/{}/redirect/?v={}#/operations/{}'.format(api_type, version, object_id)
                apis.append(
                    create_index_object(api_type, api_type_title, tag, object_id, description, anchor)
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
            api_type_title = 'Webhooks'
            tag = webhook[1]['post']['tags'][0]
            object_id = webhook[0]
            description = webhook[1]['post']['description']
            # use redirect instead of reference to fix ui state not updating
            anchor = '/docs/api/admin/redirect/?v={}#/webhooks/{}/post'.format(version, object_id)
            webhooks.append(
                create_index_object('admin', api_type_title, tag, object_id, description, anchor)
            )
    return webhooks


def add_to_index():

    client = SearchClient.create(APP_ID, API_KEY)
    index = client.init_index(INDEX_NAME)

    indexed_apis = [
        {
            'type': 'admin',
            'type_title': 'Admin API',
            'version': '2024-04-01'
        },
        {
            'type': 'campaigns',
            'type_title': 'Campaigns API',
            'version': 'v1'
        }
    ]

    for each in indexed_apis:
        objects = generate_api_objects(each['type'], each['type_title'], each['version'])
        print('Pushing {} objects to search index...'.format(len(objects)))
        index.save_objects(objects)

    webhook_objects = generate_webhook_objects()
    print('Pushing {} webhook objects to search index...'.format(len(webhook_objects)))
    index.save_objects(webhook_objects)


add_to_index()
