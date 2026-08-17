from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user. user_type decides which profile (Individual/Company)
    gets created and which requirement flows apply.
    """
    class UserType(models.TextChoices):
        INDIVIDUAL = "individual", "Individual"
        COMPANY = "company", "Company"
        ADMIN = "admin", "Admin"

    user_type = models.CharField(max_length=20, choices=UserType.choices)
    phone = models.CharField(max_length=20, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} ({self.user_type})"
