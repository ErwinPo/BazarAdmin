from .models import *
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'is_superuser', 'email']
            
        
        
class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ['id', 'user_id', 'amount', 'quantity', 'date']
        read_only_fields = ('date',)  
        
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
    amount = serializers.FloatField()