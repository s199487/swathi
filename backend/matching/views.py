from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from requirements_app.models import Requirement
from requirements_app.serializers import RequirementSerializer
from .services import find_matches


class MatchesForRequirementView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, requirement_id):
        requirement = get_object_or_404(Requirement, id=requirement_id, user=request.user)
        min_score = int(request.query_params.get("min_score", 0))
        matches = find_matches(requirement, min_score=min_score)
        data = [
            {
                "requirement": RequirementSerializer(m["requirement"]).data,
                "score": m["score"],
                "breakdown": m["breakdown"],
            }
            for m in matches
        ]
        return Response(data)
