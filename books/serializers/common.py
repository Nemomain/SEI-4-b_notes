from rest_framework.serializers import ModelSerializer
from ..models import Book
from notes.serializers.common import NoteSerializer

class BookSerializer(ModelSerializer):
  notes = NoteSerializer(many=True, read_only=True)

  class Meta:
    model = Book
    fields = '__all__'