from django.urls import path
from django.urls.resolvers import URLPattern
from . import views

urlpatterns = [
  path('', views.apiOverview, name="api-overview"),
  path('api/nearest-hospitals', views.apiNearestHospitals, name="nearest-hospitals"),
  path('api/differential-diagnosis', views.apiDifferentialDiagnosis, name="differential-diagnosis"),
  path('api/patient/list/', views.apiPatientList, name="patient-list")
]