from rest_framework import serializers
from .models import Requirement


class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = "__all__"
        read_only_fields = ["user", "created_at", "updated_at"]
