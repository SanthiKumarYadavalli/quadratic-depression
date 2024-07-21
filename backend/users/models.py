from django.db import models
from django.contrib.auth.models import AbstractUser

class Student(AbstractUser):
    name = models.CharField(max_length=50)
    branch = models.CharField(max_length=10)
    phone = models.CharField(max_length=10)
