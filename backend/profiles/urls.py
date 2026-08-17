from django.urls import path
from .views import IndividualProfileView, CompanyProfileView

urlpatterns = [
    path("individual/", IndividualProfileView.as_view(), name="individual-profile"),
    path("company/", CompanyProfileView.as_view(), name="company-profile"),
]
