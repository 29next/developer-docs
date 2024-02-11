import requests
import yaml

from webhooks import webhook_schema_generator

from api_enums import (
    CAMPAIGNS_API_SPEC_SOURCE,
    CAMPAIGNS_API_DESCRIPTION,
    CAMPAIGNS_API_SPEC_ADDITIONS,
    ADMIN_API_SPEC_SOURCE,
    ADMIN_API_DESCRIPTION,
    ADMIN_API_SPEC_ADDITIONS,
)

BASE_OUTPUT_PATH = "../static/api/"

API_VERSIONS = [
    {
        "type": "campaigns",
        "version": "v1",
        "source": CAMPAIGNS_API_SPEC_SOURCE,
        "additions": CAMPAIGNS_API_SPEC_ADDITIONS,
        "description": CAMPAIGNS_API_DESCRIPTION,
    },
    {
        "type": "admin",
        "version": "2023-02-10",
        "source": ADMIN_API_SPEC_SOURCE,
        "additions": ADMIN_API_SPEC_ADDITIONS,
        "description": ADMIN_API_DESCRIPTION,
    },
    {
        "type": "admin",
        "version": "2024-04-01",
        "source": ADMIN_API_SPEC_SOURCE,
        "additions": ADMIN_API_SPEC_ADDITIONS,
        "description": ADMIN_API_DESCRIPTION,
    },
    {
        "type": "admin",
        "version": "unstable",
        "source": ADMIN_API_SPEC_SOURCE,
        "additions": ADMIN_API_SPEC_ADDITIONS,
        "description": ADMIN_API_DESCRIPTION,
    },
]


def download_and_update_spec_file(type, source, version, description, additions):
    api_file = BASE_OUTPUT_PATH + "/{}/{}.yaml".format(type, version)
    response = requests.get(source, {"version": version})

    with open(api_file, "wb") as f:
        f.write(response.content)
    f.close()

    with open(api_file, "r+") as f:
        spec = yaml.safe_load(f.read())
        spec["info"]["description"] = description
        if type == "admin":
            spec["webhooks"] = webhook_schema_generator(spec)
        spec.update(additions)
        f.seek(0)  # find first line to replace content
        yaml.safe_dump(spec, f)
    f.close()


def update_api_spec():

    for version in API_VERSIONS:
        print("Updating {} api version: {}".format(version["type"], version["version"]))
        download_and_update_spec_file(
            version["type"],
            version["source"],
            version["version"],
            version["description"],
            version["additions"],
        )


update_api_spec()
