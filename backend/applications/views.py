from rest_framework import viewsets, permissions
from django.db.models import Q
from .models import Application
from .serializers import ApplicationSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ["action", "status", "requirement"]

    def get_queryset(self):
        user = self.request.user
        # Applicant sees their own applications; requirement owner sees
        # applications made against their posted requirements.
        return Application.objects.filter(
            Q(applicant=user) | Q(requirement__user=user)
        ).distinct()

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)
