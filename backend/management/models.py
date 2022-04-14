from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    profile_pic = models.ImageField(null=True, blank=True)
    affiliation = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.user.username
