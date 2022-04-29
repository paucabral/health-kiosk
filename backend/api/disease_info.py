import json
from django.conf import settings

DISEASE_INFO = "{}/json/disease_info.json".format(
    settings.STATIC_DIR)


def getDiseaseInfo():
    with open(DISEASE_INFO, 'r') as f:
        data = json.load(f)

    return data
