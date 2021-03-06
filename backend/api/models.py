from django.db import models

# Create your models here.


class Patient(models.Model):
    SEX_CHOICES = [
        ('MALE', 'MALE'),
        ('FEMALE', 'FEMALE')
    ]

    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    birth_date = models.DateField(null=True)
    sex = models.CharField(max_length=6, choices=SEX_CHOICES)
    symptoms = models.JSONField()
    differentials = models.JSONField()
    contact_no = models.CharField(max_length=20)
    temperature = models.FloatField(null=True)
    pulse_rate = models.FloatField(null=True)
    systolic_bp = models.FloatField(null=True)
    diastolic_bp = models.FloatField(null=True)
    o2_saturation = models.FloatField(null=True)
    date_added = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        ordering = ['-date_added']

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
