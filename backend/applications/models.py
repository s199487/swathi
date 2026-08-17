from django.db import models
from django.conf import settings
from requirements_app.models import Requirement


class Application(models.Model):
    """
    Covers both 'apply' and 'enquire' actions across all four branches.
    action distinguishes a formal application (e.g. for a job) from a
    lighter-weight enquiry (e.g. 'tell me more about this franchise').
    """

    class Action(models.TextChoices):
        APPLIED = "applied", "Applied"
        ENQUIRED = "enquired", "Enquired"
        SAVED = "saved", "Saved"

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        SHORTLISTED = "shortlisted", "Shortlisted"
        REJECTED = "rejected", "Rejected"
        ACCEPTED = "accepted", "Accepted"

    applicant = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="applications"
    )
    requirement = models.ForeignKey(
        Requirement, on_delete=models.CASCADE, related_name="applications"
    )
    action = models.CharField(max_length=20, choices=Action.choices, default=Action.APPLIED)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        unique_together = ["applicant", "requirement", "action"]

    def __str__(self):
        return f"{self.applicant} -> {self.requirement} ({self.action})"
