from .common import BookSerializer
from notes.serializers.common import NoteSerializer
from libraries.serializers.common import LibrarySerializer

class BookSerializerPopulated(BookSerializer):
  notes = NoteSerializer(many=True, read_only=True)
  libraries_id = LibrarySerializer(many=True, read_only=True) 
