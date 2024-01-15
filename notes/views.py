from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
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

class NoteRetrieveFromBookView(RetrieveAPIView):
  queryset = Note.objects.all()
  serializer_class = NoteSerializer
  permission_classes = [IsAuthenticated]

  def get(self, request, book_id):
    queryset = Note.objects.filter(book=book_id)
    serializer = self.serializer_class(queryset, many=True)
    return Response(serializer.data)