from django.urls import path
from .views import BookListCreateView, BookRetrieveUpdateDestroyView

urlpatterns= [
  path('', BookListCreateView.as_view()),
  path('<int:pk>/', BookRetrieveUpdateDestroyView.as_view())
]