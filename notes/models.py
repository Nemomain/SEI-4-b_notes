from django.db import models

# Create your models here.
class Note(models.Model):
  title = models.CharField(max_length=100)
  text = models.CharField(max_length=2000)
  type = models.CharField(max_length=100, null=True)
  user_id = models.ForeignKey(
    to='users.User',
    on_delete = models.CASCADE,
    related_name='notes',
    null=True # this is important, otherwise user_id is required as a field in the request
  )
  book = models.ForeignKey(
    to='books.Book',
    on_delete = models.CASCADE,
    related_name='notes',
    null=True # this is important, otherwise user_id is required as a field in the request
  )