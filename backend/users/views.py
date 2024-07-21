from .serializers import StudentSerializer
from events.serializer import EventSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Student
from events.utils import send_mail


class StudentCreate(generics.CreateAPIView):
    serializer_class = StudentSerializer
    
    def perform_create(self, serializer):
        mail = self.request.data.get('email')
        if mail:
            send_mail(name=self.request.data.get(
                'name'), to=mail, fr='register')
    
    
class StudentList(generics.ListAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated, ]
    
    def get_queryset(self):
        return Student.objects.filter(id=self.request.user.id)    


class VolunteeringList(generics.ListAPIView):
    serializer_class = EventSerializer
    
    def get_queryset(self):
        return Student.objects.get(pk=self.request.user.id).volunteered.all()

class ParticipatingList(generics.ListAPIView):
    serializer_class = EventSerializer
    
    def get_queryset(self):
        return Student.objects.get(pk=self.request.user.id).participated.all()

class HostingList(generics.ListAPIView):
    serializer_class = EventSerializer
    
    def get_queryset(self):
        return Student.objects.get(pk=self.request.user.id).hosted.all()
