from django.db import models
from django.utils.timezone import now

# Create your models here.


class Usuario(models.Model):
    #insertar campos  #hashear contraseña
    user_id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50)
    contrasena = models.CharField(max_length=50)
    correo = models.CharField(max_length=50)
    ventas_semana = models.IntegerField(default=0)
    supermodel = models.BooleanField(default=False)
        
class Venta(models.Model):
    #insertar campos
    venta_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(Usuario, editable=False, on_delete=models.DO_NOTHING) ##
    monto = models.IntegerField(default=0)
    cantidad = models.IntegerField(default=0)
    fecha = models.TimeField(default=now, editable=False)

