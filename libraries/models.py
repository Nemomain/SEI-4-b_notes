from django.db import models

# Create your models here.
class Library(models.Model):
  name = models.TextField(max_length=20)
  user_id = models.ForeignKey(
    to='users.User',
    on_delete = models.CASCADE,
    related_name='libraries',
    null=True # this is important, otherwise user_id is required as a field in the request
  )
