from .serializers import StudentSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Student
from events.utils import send_mail


class StudentCreate(generics.CreateAPIView):
    serializer_class = StudentSerializer

    def perform_create(self, serializer):
        mail = self.request.data.get('email')
        if mail:
            send_mail(name=self.request.user.name, to=mail, fr='register')


class StudentList(generics.ListAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return Student.objects.filter(id=self.request.user.id)
