from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Book
from .serializers.common import BookSerializer
from .serializers.populated import BookSerializerPopulated
from lib.views import UserIdListCreateAPIView

# Create your views here.
class BookListCreateView(UserIdListCreateAPIView):
  serializer_class = BookSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    if self.request.method == "GET":
      return Book.objects.filter(user_id=self.request.user)
    return Book.objects.all()
  
  def get_serializer_class(self):
    if self.request.method == 'GET':
      return BookSerializerPopulated
    else:
      return BookSerializer

class BookRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
  queryset = Book.objects.all()
  permission_classes = [IsAuthenticatedOrReadOnly]
  serializer_class = BookSerializer

class BookLibraryRelations(RetrieveUpdateAPIView):
  queryset = Book.objects.all()
  permission_classes = [IsAuthenticated]
  
  def get_serializer_class(self):
    if self.request.method == 'GET':
      return BookSerializerPopulated
    else:
      return BookSerializer

  def get(self, request, pk, lib):
    queryset = Book.objects.filter(libraries_id=lib)
    serializer = self.serializer_class(queryset, many=True)
    return Response(serializer.data)
  
  def patch(self, request, pk, lib): #! Implement in frontend!!!
    book = Book.objects.get(pk=pk)

    if any(lib == library.id for library in book.libraries_id.all()):
      book.libraries_id.remove(lib)
    else:
      book.libraries_id.add(lib)

    book.save()
    data = BookSerializer(book)
    return Response(data.data)

  