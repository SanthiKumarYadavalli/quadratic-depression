from rest_framework import serializers
from .models import Event, Feedback


class EventSerializer(serializers.ModelSerializer):
    model = Event
    fields = '__all__'


class FeedbackSerializer(serializers.ModelSerializer):
    model = Feedback
    fields = '__all__'
