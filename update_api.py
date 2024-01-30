import requests
import yaml

API_VERSIONS = [
    '2023-02-10',
    'unstable'
]

API_SPEC_HOST_URL = 'https://sandbox.29next.store/api/schema/admin/'

OUTPUT_PATH = 'static/api/admin/'

API_DESCRIPTION = """
## Authentication
The Admin API uses Oauth 2 Bearer Access Tokens to manage access to your store's resources. Oauth Apps (and associated access tokens) can be tailored with object-level permission to ensure that each integrated service only has access to necessary objects.

Before using the Admin API, you'll need to create a store and create an OAuth App necessary for API access.

To create an OAuth App, navigate to **Settings > API Access** and create a new Oauth App with applicable [permission scopes](https://developers.29next.com/docs/api/admin/permissions/) to retrieve your Access Token.

It's recommended to create unique Oauth Apps per external system so that you can revoke as needed.

## Versioning

API versioning allows 29 Next to continuously evolve the platform while maintaining predictable behavior for existing APIs with a path for upgrades and deprecations.

To specify a version, pass the `X-29Next-Api-Version` header with your desired API version.

## Rate Limiting

Admin APIs are rate-limited to maintain the stability and equity of our platform for all users. We employ a number of methods to enforce rate limits including API Access Token and IP Address.

| Identifier | Rate Limit Method | Limit |
| ---- | ---- | ---- |
| Access Token | Request-based | 4 requests/second |

### Sample

The following sample shows the API response for the status code 429.

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 1
```

### Why Rate Limits?

Rate limiting is required to prevent the network and application services from becoming overloaded.

Setting a rate limit helps to prevent API abuse and provide overall fairness of use across the platform.
"""

def download_file(version):
    destination = OUTPUT_PATH + version + '.yaml'
    params = {
        'version': version
    }
    url = API_SPEC_HOST_URL
    response = requests.get(url, params)
    with open(destination, 'wb') as f:
        f.write(response.content)
    f.close()

def update_spec_file(version):
    api_file = OUTPUT_PATH + version + '.yaml'
    with open(api_file, 'r+') as f:
        spec = yaml.safe_load(f.read())
        spec['info']['description'] = API_DESCRIPTION
        additions = {
            'servers': [
                {
                    'url': 'https://{store}.29next.store/api/admin/',
                    'description': '',
                    'variables': {
                        'store': {
                            'default': 'example',
                            'description': 'Store unique subdomain used to identify the store.'
                        }
                    }
                }
            ],
            'security': [
                {
                    'AccessToken': []
                }
            ]
        }
        spec.update(additions)
        yaml.safe_dump(spec, f)
    f.close()

def update_api_spec():

    for version in API_VERSIONS:
        print('Updating version {}'.format(version))
        download_file(version)
        update_spec_file(version)

update_api_spec()
