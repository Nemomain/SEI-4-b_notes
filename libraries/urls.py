from django.urls import path
from .views import LibraryListCreateView, LibraryRetrieveUpdateDestroyView

urlpatterns= [
  path('', LibraryListCreateView.as_view()),
  path('<int:pk>/', LibraryRetrieveUpdateDestroyView.as_view())
]