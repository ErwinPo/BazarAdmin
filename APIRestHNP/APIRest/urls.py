from django.urls import path
from . import views

urlpatterns = [
    path("registrousuario/", views.registrousuario, name="registrousuario"),
    path("usuarios/", views.usuarios, name="usuarios"),
    path("registroventa/", views.registroventa, name="registroventa"),
    path("ventas/", views.ventas, name="ventas"),
    path("eliminarusuario/<int:user_id>", views.eliminarusuario, name="eliminarusuario"),
    path("eliminarventa/<int:venta_id>", views.eliminarventa, name="eliminarventa"),
    path("ventasusuario/<int:user_id>", views.ventasusuario, name="ventasusuario"),
    path("actualizarusuario/<int:user_id>", views.actualizarusuario, name="actualizarusuario"),
    path("actualizarventa/<int:venta_id>", views.actualizarVenta, name="actualizarventa")
    # path("login/", views.login, name="login"),
    # path("logout/", views.logout, name="logout"),
    # path("recoverpassword/", views.recoverpassword, name="recoverpassword")
]