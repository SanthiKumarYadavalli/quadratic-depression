from .serializers import StudentSerializer
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
