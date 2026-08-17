from rest_framework import viewsets, permissions
from .models import Workshop, WorkshopRegistration
from .serializers import WorkshopSerializer, WorkshopRegistrationSerializer


class WorkshopViewSet(viewsets.ModelViewSet):
    queryset = Workshop.objects.all().order_by("date", "time")
    serializer_class = WorkshopSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class WorkshopRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = WorkshopRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkshopRegistration.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
