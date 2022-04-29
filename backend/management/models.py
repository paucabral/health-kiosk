from django.db import models
from django.contrib.auth.models import User
from api.models import Patient
from ckeditor.fields import RichTextField

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    profile_pic = models.ImageField(null=True, blank=True)
    affiliation = models.CharField(max_length=200, null=True, blank=True)
    position = models.CharField(max_length=200, null=True, blank=True)
    contact_no = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return ("{} {}".format(self.user.first_name, self.user.last_name))


class Appointment(models.Model):
    APPOINTMENT_STATUS = (
        ('PENDING', 'PENDING'),
        ('COMPLETE', 'COMPLETE'),
        ('DISCARDED', 'DISCARDED')
    )
    patient = models.ForeignKey(Patient, null=True, on_delete=models.CASCADE)
    assigned_personnel = models.ForeignKey(
        Profile, null=True, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    appointment_status = models.CharField(
        max_length=200, null=True, choices=APPOINTMENT_STATUS)
    message = models.TextField(null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)


class Note(models.Model):
    patient = models.ForeignKey(Patient, null=True, on_delete=models.CASCADE)
    notes = RichTextField(blank=True, null=True)
