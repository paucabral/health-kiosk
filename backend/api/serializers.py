from dataclasses import fields
from django.db import models
from rest_framework import serializers
from .models import *

class PatientSerializer(serializers.ModelSerializer):
  class Meta:
    model = Patient
    fields = '__all__'