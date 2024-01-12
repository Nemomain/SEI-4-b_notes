from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Note
from .serializers.common import NoteSerializer
from lib.views import UserIdListCreateAPIView

# Create your views here.
class NoteListCreateView(UserIdListCreateAPIView):
  serializer_class = NoteSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    if self.request.method == "GET":
      return Note.objects.filter(user_id=self.request.user)
    return Note.objects.all()

class NoteRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
  queryset = Note.objects.all()
  permission_classes = [IsAuthenticatedOrReadOnly]
  serializer_class = NoteSerializer
