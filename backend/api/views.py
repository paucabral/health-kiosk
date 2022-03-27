from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from googleplaces import GooglePlaces, types, lang
import requests
import json
from django.conf import settings
from api.predictions import getPredictions

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Lists': 'api/patient/list/',
        'Detail View': 'api/patient/detail/<str:pk>/',
        'Create': 'api/patient/create/',
        'Update': 'api/patient/update/<str:pk>/',
        'Delete': 'api/patient/delete/<str:pk>/',
        'Google Places': 'api/nearest-hospitals',
        'Predict': 'api/differential-diagnosis',
    }

    return Response(api_urls)

@api_view(['GET'])
def apiNearestHospitals(request):
    lat = request.GET.get('lat')
    lng = request.GET.get('lng')
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={},{}&type=hospital&rankby=distance&key={}".format(lat, lng, settings.GOOGLE_MAPS_API_KEY)
    query_result = requests.get(url)
    return Response(query_result.json())


@api_view(['POST'])
def apiDifferentialDiagnosis(request):
    data = json.loads(request.body)
    symptoms = data['symptoms']
    result = getPredictions(symptoms)
    print(result)
    return Response(result)
