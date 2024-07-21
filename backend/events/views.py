from rest_framework import generics
from .serializer import EventSerializer, FeedbackSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Event, Feedback


class EventList(generics.ListCreateAPIView):  # /events
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        events = Event.objects.all()
        return events

    def perform_create(self, serializer):
        serializer.participants.add(self.request.user)
        serializer.save(host=self.request.user, status='upcoming')


class EventDetails(generics.RetrieveUpdateAPIView):  # /events/pk
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'pk'

    def get_queryset(self):
        events = Event.objects.filter(host=self.request.user)
        return events

    def perform_update(self, serializer):
        serializer.save(status='ended')
        # serializer.save(status='ended')


class ParticipantAdd(generics.RetrieveUpdateAPIView):  # /events/add-participant/pk
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return Event.objects.all()

    def perform_update(self, serializer):
        serializer.participants.add(self.request.user)
        serializer.save()


class VolunteerAdd(generics.RetrieveUpdateAPIView):  # /events/add-volunteer/pk
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return Event.objects.all()

    def perform_update(self, serializer):
        serializer.volunteers.add(self.request.user)
        serializer.save()


class EventFeedbackList(generics.ListCreateAPIView):  # events/feedback/pk
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        event = Event.objects.get(pk=self.kwargs.get('pk'))
        return Feedback.objects.filter(event=event)

    def perform_create(self, serializer):
        event = Event.objects.get(pk=self.kwargs.get('pk'))
        serializer.save(event=event, user=self.request.user)
