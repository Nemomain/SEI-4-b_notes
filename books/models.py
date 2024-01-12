from django.db import models

# Create your models here.
class Book(models.Model):
  google_id = models.CharField(max_length=20)
  name = models.CharField(max_length=100)
  author = models.CharField(max_length=100)
  cover = models.CharField(max_length=1000)
  libraries_id = models.ManyToManyField(
    to='libraries.Library',
    related_name='books',
    blank=True
  )
  user_id = models.ForeignKey(
    to='users.User',
    on_delete = models.CASCADE,
    related_name='books',
    null=True
  )