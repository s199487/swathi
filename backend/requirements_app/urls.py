from rest_framework.routers import DefaultRouter
from .views import RequirementViewSet

router = DefaultRouter()
router.register("", RequirementViewSet, basename="requirement")

urlpatterns = router.urls
