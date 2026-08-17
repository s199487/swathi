from django.db import models
from django.conf import settings


class Requirement(models.Model):
    """
    A single model covers all four branches (franchise, dealer, associate, job)
    on both sides (posted_by_type). Keeping it unified avoids duplicating four
    near-identical tables now; split later only if the branches diverge enough
    to need it.
    """

    class OpportunityType(models.TextChoices):
        FRANCHISE = "franchise", "Franchise"
        DEALER = "dealer", "Dealer"
        ASSOCIATE = "associate", "Associate"
        JOB = "job", "Job"

    class PostedByType(models.TextChoices):
        COMPANY = "company", "Company"
        INDIVIDUAL = "individual", "Individual"

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        ACTIVE = "active", "Active"
        CLOSED = "closed", "Closed"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="requirements"
    )
    posted_by_type = models.CharField(max_length=20, choices=PostedByType.choices)
    opportunity_type = models.CharField(max_length=20, choices=OpportunityType.choices)

    title = models.CharField(max_length=255)
    industry = models.CharField(max_length=150, blank=True)
    location = models.CharField(max_length=150, blank=True)

    # Franchise / Dealer / Associate fields
    investment_min = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    investment_max = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    number_required = models.PositiveIntegerField(default=1)

    # Job fields
    salary_min = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    salary_max = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    skills = models.TextField(blank=True, help_text="Comma-separated skills")
    experience_required = models.CharField(max_length=100, blank=True)

    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["opportunity_type", "posted_by_type", "status"]),
            models.Index(fields=["location"]),
            models.Index(fields=["industry"]),
        ]

    def __str__(self):
        return f"{self.title} ({self.opportunity_type}, {self.posted_by_type})"
