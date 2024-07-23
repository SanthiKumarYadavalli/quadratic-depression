from rest_framework import generics, status
from .serializer import EventSerializer, FeedbackSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Event, Feedback
from users.serializers import StudentSerializer
from users.models import Student
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import get_ai_name, send_mail, get_ai_img


class EventList(generics.ListCreateAPIView):  # /events/
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        events = Event.objects.all()
        return events

    def perform_create(self, serializer):
        # serializer.participants.add(self.request.user)
        user = Student.objects.get(id=self.request.user)
        mail = user.email
        if mail:
            send_mail(name=user.name, to=mail, fr='new_event')
        serializer.save(host=user)


class EventDetails(generics.RetrieveUpdateAPIView):  # /events/pk
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'pk'

    def get_queryset(self):
        events = Event.objects.filter(host=self.request.user)
        return events

    # def perform_update(self, serializer):
    #     serializer.save()
        

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

@api_view(["POST"])
def ai_img(request):
    prompt = request.data['prompt']
    print(request.data['prompt'])
    url = get_ai_img(prompt)
    return Response({'url': url}, status=status.HTTP_200_OK)


class FeedbackList(generics.ListAPIView):  # events/get-feedback/pk
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        event = Event.objects.get(pk=self.kwargs.get('pk'))
        return Feedback.objects.filter(event=event)
