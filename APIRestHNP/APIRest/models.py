from django.db import models
from django.utils.timezone import now

# Create your models here.


class Usuario(models.Model):
    #insertar campos  #hashear contraseña
    user_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    contrasena = models.CharField(max_length=50)
    correo = models.CharField(max_length=50)
    ventas_semana = models.IntegerField(default=0)
    supermodel = models.BooleanField(default=False)
    
    def as_dict(self):
        return {
            "user_id": self.user_id,
            "nombre": self.nombre,
            "contraseña": self.contrasena,
            "correo": self.correo,
            "ventas_semana": self.ventas_semana,
            "supermodel": self.supermodel
        }
        
class Venta(models.Model):
    #insertar campos
    venta_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Usuario, editable=False, on_delete=models.DO_NOTHING) ##
    monto = models.IntegerField(default=0)
    cantidad = models.IntegerField(default=0)
    fecha = models.DateField(default=now, editable=False)
    
    def as_dict(self):
        return { 
                "monto": self.monto,
                "user_id": self.user_id.user_id,
                "cantidad": self.cantidad,
                "fecha": self.fecha,
                "venta_id": self.venta_id
                }

