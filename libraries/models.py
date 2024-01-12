from django.db import models

# Create your models here.
class Library(models.Model):
  name = models.TextField(max_length=20)
  user_id = models.ForeignKey(
    to='users.User',
    on_delete =models.CASCADE,
    related_name='libraries'
  )