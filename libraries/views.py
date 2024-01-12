from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .serializers.common import LibrarySerializer
from .models import Library
from lib.views import UserIdListCreateAPIView

# Create your views here.
# Created a new view class to make the user ib be provided
class LibraryListCreateView(UserIdListCreateAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = LibrarySerializer

  def get_queryset(self):
    if self.request.method == "GET":
      return Library.objects.filter(user_id=self.request.user)
    return Library.objects.all()

class LibraryRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
  queryset = Library.objects.all()
  permission_classes = [IsAuthenticatedOrReadOnly]
  serializer_class = LibrarySerializer