from django.db import models
# from user.models import Student

# Create your models here.


class Event(models.Model):
    name = models.CharField(max_length=32)
    # host = models.ForeignKey(Student, on_delete=models.CASCADE)
    description = models.TextField()
    start_time = models.DateTimeField()
    # category = models.CharField(max_length=23)
    status = models.CharField(max_length=23)
    # participants = models.ManyToManyField(Student, blank=True, related_name='participants')
    # volunteers = models.ManyToManyField(Student, blank=True, related_name='volunteers')
    # eligibility = models.CharField(max_length=23)

    def __str__(self) -> str:
        return self.name


class Feedback(models.Model):
    # user = models.ForeignKey(Student, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    review = models.TextField()
    rating = models.IntegerField()

    def __str__(self) -> str:
        return self.review[:23]
