from django.urls import path
from . import views

urlpatterns = [
    path("registrousuario/", views.registrousuario, name="registrousuario"),
    path("registroventa/", views.registroventa, name="registroventa"),
    path("ventas/", views.ventas, name="ventas")
]