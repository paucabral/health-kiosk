from traceback import print_tb
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .models import *
import requests
import json
from django.conf import settings
from api.predictions import getPredictions

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Lists': 'api/patient/list/',
        'Detailed View': 'api/patient/details/<str:pk>/',
        'Add': 'api/patient/add/',
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
    serializer = PatientSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        data = serializer.validated_data
        symptoms = data['symptoms']
        response = data
        if symptoms:
            result = getPredictions(symptoms)
            response['predictions'] = result
        return Response(response)

@api_view(['GET'])
def apiPatientList(request):
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def apiPatientDetail(request, pk):
    patient = Patient.objects.get(id=pk)
    serializer = PatientSerializer(patient, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def apiPatientUpdate(request, pk):
    patient = Patient.objects.get(id=pk)
    serializer = PatientSerializer(instance=patient, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

