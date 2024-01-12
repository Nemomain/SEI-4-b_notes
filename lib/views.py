from rest_framework.generics import ListCreateAPIView

class UserIdListCreateAPIView(ListCreateAPIView):

  def perform_create(self, serializer):
    serializer.save(user_id=self.request.user)