from rest_framework import serializers
from .models import IndividualProfile, CompanyProfile


class IndividualProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndividualProfile
        fields = "__all__"
        read_only_fields = ["user"]


class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = "__all__"
        read_only_fields = ["user", "verification_status"]
