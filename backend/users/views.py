from .serializers import StudentSerializer
from events.serializer import EventSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Student

class StudentCreate(generics.CreateAPIView):
    serializer_class = StudentSerializer
    
    
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
