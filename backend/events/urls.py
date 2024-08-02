from django.urls import path
from . import views

urlpatterns = [
    path("", views.EventList.as_view(), name="event-list"),
    path("<int:pk>/", views.EventDetails.as_view()),
    path("add-participant/<int:pk>/", views.add_participant),
    path("add-volunteer/<int:pk>/", views.add_volunteers),
    path("add-feedback/<int:pk>/", views.add_feedback),
    path("feedbacks/<int:pk>/", views.FeedbackList.as_view()),
    path("volunteers/<int:pk>/", views.VolunteerList.as_view()),
    path("get-ai-name/", views.ai_name),
    path("<str:status>/", views.EventList.as_view()),
]