from django.urls import path
from .views import BookListCreateView, BookRetrieveUpdateDestroyView, BookLibraryRelations

urlpatterns= [
  path('', BookListCreateView.as_view()),
  path('<int:pk>/', BookRetrieveUpdateDestroyView.as_view()),
  path('<int:pk>/<int:lib>/', BookLibraryRelations.as_view()),
  path('library/<int:lib>/', BookLibraryRelations.as_view()),#'library/<int:lib>/'
  path('modlibrary/<int:pk>/<int:lib>/', BookLibraryRelations.as_view())#'library/<int:lib>/'
]