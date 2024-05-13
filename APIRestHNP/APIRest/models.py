from django.db import models
from django.utils.timezone import now
from .managers import CustomUserManager
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True, default=None)
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]
    
    objects = CustomUserManager()
        
class Sale(models.Model):
    #insertar campos
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, default=None, on_delete=models.CASCADE) 
    amount = models.FloatField(default=0)
    quantity = models.IntegerField(default=0)
    date = models.DateTimeField(default=now, editable=False)