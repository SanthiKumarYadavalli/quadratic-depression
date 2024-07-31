from rest_framework import generics, status
from .serializers import EventSerializer, FeedbackSerializer
from users.serializers import StudentSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.files.base import ContentFile
from .models import Event, Feedback
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import get_ai_name, send_mail, generate_ai_image
from django.utils import timezone


@api_view(['GET'])
def add_participant(request, pk):
    event = Event.objects.get(id=pk)
    event.participants.add(request.user)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def add_volunteers(request, pk):
    event = Event.objects.get(id=pk)
    event.volunteers.add(request.user)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def add_feedback(request, pk):
    event = Event.objects.get(id=pk)
    feedback = Feedback.objects.create(
        user=request.user,
        review=request.POST.get('review'),
        rating = request.POST.get('rating'),
        event=event
    )
    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
def ai_name(request):
    prompt = f"""Just give me your response in a single word.
A creative name for {request.data.get('prompt')}"""
    print(request.data)
    name = get_ai_name(prompt)
    return Response({'name': name}, status=status.HTTP_200_OK)


class EventList(generics.ListCreateAPIView):  # /events/
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        status = self.kwargs.get("status")
        now = timezone.now()
        if status == 'upcoming':
            events = Event.objects.filter(start_time__gt=now)
        elif status == 'ended':
            events = Event.objects.filter(end_time__lt=now)
        elif status == 'ongoing':
            events = Event.objects.filter(start_time__lte=now, end_time__gte=now)
        else:
            events = Event.objects.all()
        return events

    def perform_create(self, serializer):
        user = self.request.user
        mail = user.email
        if mail:
            send_mail(name=user.name, to=mail, fr='new_event')
        if self.request.data.get("imageType") == "generate":
            image_file = ContentFile(generate_ai_image(self.request.data.get("description")), name="temp.jpg")
        else:
            image_file = self.request.data.get('fileUpload')
        serializer.save(host=user, image=image_file)


class EventDetails(generics.RetrieveUpdateAPIView):  # /events/pk
    serializer_class = EventSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        events = Event.objects.filter(host=self.request.user)
        return events
    
    
class FeedbackList(generics.ListAPIView):  # events/get-feedback/pk
    serializer_class = FeedbackSerializer

    def get_queryset(self):
        event = Event.objects.get(pk=self.kwargs.get('pk'))
        return Feedback.objects.filter(event=event)


class VolunteerList(generics.ListAPIView): # events/volunteers/<pk>
    serializer_class = StudentSerializer
    
    def get_queryset(self):
        return Event.objects.get(pk=self.kwargs.get('pk')).volunteers.all()
    