from rest_framework import generics, permissions
from .models import IndividualProfile, CompanyProfile
from .serializers import IndividualProfileSerializer, CompanyProfileSerializer


class IndividualProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = IndividualProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj, _ = IndividualProfile.objects.get_or_create(user=self.request.user)
        return obj


class CompanyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = CompanyProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj, _ = CompanyProfile.objects.get_or_create(user=self.request.user)
        return obj
