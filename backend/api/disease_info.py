import json
from django.conf import settings

DISEASE_INFO = "{}/json/disease_info.json".format(
    settings.STATIC_DIR)


def getDiseaseInfo(disease_name):
    with open(DISEASE_INFO, 'r', encoding='utf-8') as f:
        data = json.load(f)

    output = data[disease_name]

    return output
