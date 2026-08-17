from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import RegisterView, LoginView, MeView

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/auth/register/", RegisterView.as_view(), name="register"),
    path("api/auth/login/", LoginView.as_view(), name="login"),
    path("api/auth/me/", MeView.as_view(), name="me"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("api/profiles/", include("profiles.urls")),
    path("api/requirements/", include("requirements_app.urls")),
    path("api/matching/", include("matching.urls")),
    path("api/applications/", include("applications.urls")),
    path("api/workshops/", include("workshops.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
