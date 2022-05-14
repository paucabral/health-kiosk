import json
from django.conf import settings

DISEASE_INFO = "{}/json/disease_info.json".format(
    settings.STATIC_DIR)


def getDiseaseInfo(disease_name):
    try:
        with open(DISEASE_INFO, 'r', encoding='utf-8') as f:
            data = json.load(f)

            output = data[disease_name]

            return output
    except:
        output = {
            "Overview": "",
            "Diagnosis": "",
            "Symptoms": [],
            "Causes": "",
            "Precaution": [],
            "Source": []
        }
        return output
