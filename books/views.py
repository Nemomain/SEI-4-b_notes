from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Book
from .serializers.common import BookSerializer
from lib.views import UserIdListCreateAPIView

# Create your views here.
class BookListCreateView(UserIdListCreateAPIView):
  serializer_class = BookSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    if self.request.method == "GET":
      return Book.objects.filter(user_id=self.request.user)
    return Book.objects.all()

class BookRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
  queryset = Book.objects.all()
  permission_classes = [IsAuthenticatedOrReadOnly]
  serializer_class = BookSerializer