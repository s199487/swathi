from rest_framework import serializers
from .models import Workshop, WorkshopRegistration


class WorkshopSerializer(serializers.ModelSerializer):
    registered_count = serializers.SerializerMethodField()

    class Meta:
        model = Workshop
        fields = "__all__"

    def get_registered_count(self, obj):
        return obj.registrations.count()


class WorkshopRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkshopRegistration
        fields = "__all__"
        read_only_fields = ["user", "registered_at"]
