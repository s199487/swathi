from rest_framework.routers import DefaultRouter
from .views import WorkshopViewSet, WorkshopRegistrationViewSet

router = DefaultRouter()
router.register("registrations", WorkshopRegistrationViewSet, basename="workshop-registration")
router.register("", WorkshopViewSet, basename="workshop")

urlpatterns = router.urls
