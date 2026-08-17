from django.db import models
from django.conf import settings


class IndividualProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="individual_profile"
    )
    full_name = models.CharField(max_length=150, blank=True)
    location = models.CharField(max_length=150, blank=True)
    education = models.CharField(max_length=255, blank=True)
    profession = models.CharField(max_length=150, blank=True)
    experience_years = models.PositiveIntegerField(null=True, blank=True)
    skills = models.TextField(blank=True, help_text="Comma-separated skills")
    preferred_location = models.CharField(max_length=150, blank=True)
    investment_capacity_min = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    investment_capacity_max = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    industry_preference = models.CharField(max_length=150, blank=True)
    resume = models.FileField(upload_to="resumes/", null=True, blank=True)

    def __str__(self):
        return self.full_name or self.user.username


class CompanyProfile(models.Model):
    class VerificationStatus(models.TextChoices):
        PENDING = "pending", "Pending Verification"
        VERIFIED = "verified", "Verified"
        REJECTED = "rejected", "Rejected"

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="company_profile"
    )
    company_name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=150, blank=True)
    website = models.URLField(blank=True)
    industry = models.CharField(max_length=150, blank=True)
    location = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    business_type = models.CharField(max_length=150, blank=True)
    registration_number = models.CharField(max_length=100, blank=True, help_text="GST / company registration")
    logo = models.ImageField(upload_to="logos/", null=True, blank=True)
    verification_status = models.CharField(
        max_length=20, choices=VerificationStatus.choices, default=VerificationStatus.PENDING
    )

    def __str__(self):
        return self.company_name
