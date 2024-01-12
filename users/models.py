from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
  name = models.TextField(max_length=20)
  email = models.TextField(max_length=40)
  password = models.TextField(max_length=40)

  def __str__(self) -> str:
    return f'Name: {self.name} - Email: {self.email}'