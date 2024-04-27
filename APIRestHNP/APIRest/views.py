import pdb
from .utils import *
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import permissions, viewsets, views, status
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.authentication import JWTAuthentication


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
    
    def perform_create(self, serializer):
        # Extraer la contraseña del serializer
        password = serializer.validated_data.get('password')

        # Modificar el serializer para establecer la contraseña hasheada
        serializer.validated_data['password'] = make_password(password)

        # Guardar el usuario con la contraseña hasheada
        serializer.save()
    
    
class SalesViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SalesSerializer
 
# ============= Sales Per User ====================
    
class SalesPerUser(views.APIView):
    permission_classes = [permissions.AllowAny]
        
    def get(self, request):
        query_id = self.request.query_params.get('id')
        queryset = Sale.objects.filter(user_id=query_id)
        serializer = SalesSerializer(queryset, many=True)
        return Response(serializer.data)
        
    
# ============= Ranking =========================

class Ranking(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self,request):
        queryset = callRanking()
        data = [{"user": item[0], "amount": float(item[1])} for item in queryset]
        serializer = RankingSerializer(data=data, many=True)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
# =====================================================
# ======== Estatistics Requests Views =================
# =====================================================




# ==========  With Date (Start - End) =================        
    
class SalesDateRangeQuantityView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        query_start_date = self.request.query_params.get('start-date')
        query_end_date = self.request.query_params.get('end-date')
        queryset = callSalesDateRangeQuantity(query_start_date, query_end_date)
        data = [{"day": item[1], "day_quantity": float(item[0])} for item in queryset]
        serializer = DayQuantitySalesSerializer(data=data, many=True)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class SalesDateRangeAmountView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        query_start_date = self.request.query_params.get('start-date')
        query_end_date = self.request.query_params.get('end-date')
        queryset = callSalesDateRangeAmount(query_start_date, query_end_date)
        data = [{"day": item[1], "day_amount": float(item[0])} for item in queryset]
        serializer = DayAmountSalesSerializer(data=data, many=True)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  

# ==========  With Date (Start - End) & Seller ID =================
    
class SalesDateRangeSellerQuantityView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        query_id = self.request.query_params.get('id')
        query_start_date = self.request.query_params.get('start-date')
        query_end_date = self.request.query_params.get('end-date')
        queryset = callSalesDateRangeSellerQuantity(query_start_date, query_end_date, query_id)
        data = [{"day": item[1], "day_quantity": float(item[0])} for item in queryset]
        serializer = DayQuantitySalesSerializer(data=data, many=True)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class SalesDateRangeSellerAmountView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        query_id = self.request.query_params.get('id')
        query_start_date = self.request.query_params.get('start-date')
        query_end_date = self.request.query_params.get('end-date')
        queryset = callSalesDateRangeSellerAmount(query_start_date, query_end_date, query_id)
        data = [{"day": item[1], "day_amount": float(item[0])} for item in queryset]
        serializer = DayAmountSalesSerializer(data=data, many=True)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)