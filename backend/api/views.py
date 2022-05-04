from traceback import print_tb
from urllib import response
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .models import *
import requests
import json
from django.conf import settings
from api.predictions import getPredictions
from api.disease_info import getDiseaseInfo
from decouple import config

# Create your views here.


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Add and Predict': 'api/differential-diagnosis/',
        'Lists': 'api/patient/list/',
        'Details': 'api/patient/details/<str:pk>/',
        'Update': 'api/patient/update/<str:pk>/',
        'Delete': 'api/patient/delete/<str:pk>/',
        'Google Places': 'api/nearest-hospitals/',
        'Location': 'api/location',
        'SMS': 'api/sms',
    }

    return Response(api_urls)


@api_view(['GET'])
def apiNearestHospitals(request):
    lat = request.GET.get('lat')
    lng = request.GET.get('lng')
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={},{}&type=hospital&key={}".format(
        lat, lng, settings.GOOGLE_MAPS_API_KEY)
    try:
        keyword = request.GET.get('keyword').replace(" ", "%20")
        url += "&keyword={}".format(keyword)
    except:
        url = url
    try:
        rankby = request.GET.get('rankby')
        if rankby:
            url += "&rankby={}".format(rankby)
        if rankby == 'prominence':
            url += "&radius=50000"
        else:
            url += "&rankby=distance"
    except:
        url += "&rankby=distance"
    query_result = requests.get(url, timeout=1)
    return Response(query_result.json())


@api_view(['GET'])
def apiGpsCoordinates(request):
    if config('ENVIRONMENT', default='production') == 'development':
        # dummy coordinates for development
        coordinates = {
            "lat": 14.6507,
            "lng": 121.1029
        }
    else:
        try:
            from api.gpshandler import location
            coordinates = location()
        except:
            data = {"message": "There was an error with the GPS module."}
            response_code = 503
            return Response(data, response_code)
    return Response(coordinates)


@api_view(['GET', 'POST'])
def apiSms(request):
    if request.method == 'POST':
        data = dict(request.data)
        if config('ENVIRONMENT', default='production') == 'development':
            response_code = 200
        else:
            try:
                from api.sms import sendSms
                response_code = sendSms(data)
            except:
                data = {"message": "There was an error with the SMS module."}
                response_code = 503
        return Response(data, response_code)
    elif request.method == 'GET':
        data = {"message": "Initiating status..."}
        if config('ENVIRONMENT', default='production') == 'development':
            response_code = 200
        else:
            try:
                from api.sms import sendSms
                data = {"message": "There GPS module was instantiated successfully"}
                response_code = 200
            except:
                data = {"message": "There was an error with the SMS module."}
                response_code = 503
        return Response(data, response_code)


@api_view(['POST'])
def apiDifferentialDiagnosis(request):
    first_name = request.data['first_name']
    last_name = request.data['last_name']
    sex = request.data['sex']
    birth_date = request.data['birth_date']

    if Patient.objects.filter(first_name=first_name, last_name=last_name, sex=sex, birth_date=birth_date):
        patient = Patient.objects.get(
            first_name=first_name, last_name=last_name, sex=sex, birth_date=birth_date)
        serializer = PatientSerializer(instance=patient, data=request.data)

    else:
        serializer = PatientSerializer(data=request.data)

    if serializer.is_valid():
        instance = serializer.save()
        data = serializer.validated_data
        symptoms = data['symptoms']
        response = data
        if symptoms:
            result = getPredictions(symptoms)
            response['predictions'] = result
            predictions = list(
                serializer.validated_data.get('predictions'))[:5]
            instance.differentials = predictions
            instance.save()
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


@api_view(['PUT'])
def apiPatientUpdate(request, pk):
    patient = Patient.objects.get(id=pk)
    serializer = PatientSerializer(instance=patient, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def apiPatientDelete(request, pk):
    patient = Patient.objects.get(id=pk)
    if patient.delete():
        response = {
            "response": "Record ID #{} successfully deleted".format(pk)}
        return Response(response)


@api_view(['GET'])
def apiDiseaseInfo(request):
    disease_name = request.data.get("disease")
    data = getDiseaseInfo(disease_name)
    return Response(data)
