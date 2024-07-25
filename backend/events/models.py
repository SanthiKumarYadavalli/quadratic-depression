from django.db import models
from users.models import Student

# Create your models here.


class Event(models.Model):
    name = models.CharField(max_length=32)
    host = models.ForeignKey(Student, on_delete=models.CASCADE, null=True, related_name='hosted')
    description = models.TextField()
    start_time = models.DateTimeField(null=True)
    category = models.CharField(max_length=23)
    status = models.CharField(max_length=23, default="upcoming")
    eligibility = models.CharField(max_length=23)
    venue = models.TextField()
    image = models.ImageField(upload_to="images")
    participants = models.ManyToManyField(Student, blank=True, related_name='participated')
    volunteers = models.ManyToManyField(Student, blank=True, related_name='volunteered')

    def __str__(self) -> str:
        return self.name


class Feedback(models.Model):
    user = models.ForeignKey(Student, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    review = models.TextField()
    rating = models.IntegerField()

    def __str__(self) -> str:
        return self.review[:23]
