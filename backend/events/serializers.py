from rest_framework import serializers
from .models import Event, Feedback


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['name', 'description', 'category', 'eligibility', 'venue',
                  'id', 'status', 'image', 'start_time']


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
