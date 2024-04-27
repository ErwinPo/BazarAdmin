from .models import *
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'is_superuser', 'email']
            
        
        
class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ['sale_id', 'user_id', 'amount', 'quantity', 'date']
        read_only_fields = ('date',)  
        

class DayAmountSalesSerializer(serializers.Serializer):
    day = serializers.DateField()
    day_amount = serializers.FloatField()
    
class DayQuantitySalesSerializer(serializers.Serializer):
    day = serializers.DateField()
    day_quantity = serializers.IntegerField()
    
class RankingSerializer(serializers.Serializer):
    user = serializers.CharField()
    amount = serializers.FloatField()