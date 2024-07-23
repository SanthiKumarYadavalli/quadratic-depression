from django.urls import path
from . import views

urlpatterns = [
    path("", views.EventList.as_view(), name="event-list"),
    path("<int:pk>/", views.EventDetails.as_view()),
    path("add-participant/<int:pk>/", views.add_participant),
    path("add-volunteer/<int:pk>/", views.add_volunteers),
    path("add-feedback/<int:pk>/", views.add_feedback),
    path("get-feedback/<int:pk>/", views.FeedbackList.as_view()),
    path("get-ai-name/", views.ai_name),
    path("get-ai-img/", views.ai_img),
]