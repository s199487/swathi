from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .models import Requirement
from .serializers import RequirementSerializer


class RequirementViewSet(viewsets.ModelViewSet):
    """
    Handles all four branches. Filter by opportunity_type, posted_by_type,
    location, industry via query params, e.g.
    /api/requirements/?opportunity_type=franchise&location=Hyderabad
    """
    serializer_class = RequirementSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["opportunity_type", "posted_by_type", "location", "industry", "status"]
    search_fields = ["title", "description", "skills"]
    ordering_fields = ["created_at", "investment_min", "salary_min"]

    def get_queryset(self):
        qs = Requirement.objects.all()
        if self.action == "list":
            qs = qs.filter(status=Requirement.Status.ACTIVE)
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
