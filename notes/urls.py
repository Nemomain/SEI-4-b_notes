from django.urls import path
from .views import NoteListCreateView, NoteRetrieveUpdateDestroyView

urlpatterns= [
  path('', NoteListCreateView.as_view()),
  path('<int:pk>/', NoteRetrieveUpdateDestroyView.as_view())
]