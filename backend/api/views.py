from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Lists': '/patient/list/',
        'Detail View': '/patient/detail/<str:pk>/',
        'Create': '/patient/create/',
        'Update': '/patient/update/<str:pk>/',
        'Delete': '/patient/delete/<str:pk>/',
    }

    return Response(api_urls)