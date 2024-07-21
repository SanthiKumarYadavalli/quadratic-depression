from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("register/", views.StudentCreate.as_view(), name="register"),
    path("get/", views.StudentList.as_view(), name="user"),
]