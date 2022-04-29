from django.db import models
from django.contrib.auth.models import User
from api.models import Patient

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    profile_pic = models.ImageField(null=True, blank=True)
    affiliation = models.CharField(max_length=200, null=True, blank=True)
    position = models.CharField(max_length=200, null=True, blank=True)
    contact_no = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.user.username


class Appointment(models.Model):
    APPOINTMENT_STATUS = (
        ('COMPLETE', 'COMPLETE'),
        ('PENDING', 'PENDING'),
    )
    patient = models.ForeignKey(Patient, null=True, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    appointment_status = models.CharField(
        max_length=200, null=True, choices=APPOINTMENT_STATUS)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
