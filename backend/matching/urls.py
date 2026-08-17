from django.urls import path
from .views import MatchesForRequirementView

urlpatterns = [
    path("requirement/<int:requirement_id>/", MatchesForRequirementView.as_view(), name="matches-for-requirement"),
]
