from django.db import models
from django.utils.timezone import now
from .managers import CustomUserManager
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# Create your models here.


# class Usuario(AbstractBaseUser):
#     #insertar campos  #hashear contraseña
#     user_id = models.AutoField(primary_key=True)
#     nombre = models.CharField(max_length=50, unique=True)
#     contrasena = models.CharField(max_length=128)
#     correo = models.CharField(max_length=50, unique=True)
#     ventas_semana = models.IntegerField(default=0)
#     supermodel = models.BooleanField(default=False)
#     active = models.BooleanField(default=True)
#     token = models.CharField(max_length=50, null=True)
#     token_expiration = models.DateTimeField(null=True)
    
#     def save(self, *args, **kwargs):
#         self.contrasena = make_password(self.contrasena)
#         super().save(*args, **kwargs)
    

class Usuario(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True, default=None)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    ventas_semana = models.IntegerField(default=0)
    
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
    def as_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "email": self.email,
            "ventas_semana": self.ventas_semana,
            "is_superuser": self.is_superuser,
            "is_active": self.is_active
        }
        
class Venta(models.Model):
    #insertar campos
    sale_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Usuario, editable=False, default=None, on_delete=models.DO_NOTHING) 
    amount = models.FloatField(default=0)
    quantity = models.IntegerField(default=0)
    date = models.DateTimeField(default=now, editable=False)
    is_active = models.BooleanField(default=True)
    
    def as_dict(self):
        return { 
                "amount": self.amount,
                "user_id": self.user_id.id,
                "quantity": self.quantity,
                "date": self.date,
                "sale_id": self.sale_id,
                "is_active": self.is_active
                }

