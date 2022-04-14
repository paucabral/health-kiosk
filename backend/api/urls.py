from django.urls import path
from django.urls.resolvers import URLPattern
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('nearest-hospitals/', views.apiNearestHospitals, name="nearest-hospitals"),
    path('differential-diagnosis/', views.apiDifferentialDiagnosis,
         name="differential-diagnosis"),
    path('patient/list/', views.apiPatientList, name="patient-list"),
    path('patient/detail/<pk>/', views.apiPatientDetail, name="patient-detail"),
    path('patient/update/<pk>/', views.apiPatientUpdate, name="patient-update"),
    path('patient/delete/<pk>/', views.apiPatientDelete, name="patient-delete"),
]
