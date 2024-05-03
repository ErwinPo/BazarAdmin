from .models import *
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'is_superuser', 'email']
        read_only_fields = ('id',)
        extra_kwargs = {
            'password': {'required': False},  # Para asegurar que el password no sea visible en la respuesta
            'email': {'required': False},  # Hacer el campo email opcional durante la actualización
        }
            
        
        
class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ['id', 'user_id', 'amount', 'quantity', 'date']
        read_only_fields = ('date', 'id',)  
        
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

class IntervalAmountSalesSerializer(serializers.Serializer):
    interval_time = serializers.DateField()
    total_amount = serializers.FloatField()
    
class IntervalQuantitySalesSerializer(serializers.Serializer):
    interval_time = serializers.DateField()
    total_quantity = serializers.IntegerField()
    
class RankingSerializer(serializers.Serializer):
    user = serializers.CharField()
    username = serializers.CharField()
    amount = serializers.FloatField()