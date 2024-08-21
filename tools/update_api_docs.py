import requests
import yaml

from config import BASE_API_FILES_PATH, API_VERSIONS
from webhooks import webhook_schema_generator


def download_and_update_spec_file(type, source, version, description, additions):
    api_file = BASE_API_FILES_PATH + "/{}/{}.yaml".format(type, version)
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
