from django.urls import path
from . import views

urlpatterns = [
    path("registroventa/", views.registroventa, name="registroventa"),
]