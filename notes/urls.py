from django.urls import path
from .views import NoteListCreateView, NoteRetrieveUpdateDestroyView, NoteRetrieveFromBookView

urlpatterns= [
  path('', NoteListCreateView.as_view()),
  path('<int:pk>/', NoteRetrieveUpdateDestroyView.as_view()),
  path('book/<int:book_id>/', NoteRetrieveFromBookView.as_view()) #changeview
]