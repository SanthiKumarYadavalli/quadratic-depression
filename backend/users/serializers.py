from rest_framework import serializers
from .models import Student
    
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'username', 'password', 'name', 'email', 'branch', 'phone']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return Student.objects.create_user(**validated_data)
    