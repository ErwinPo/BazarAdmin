import pdb
import json
from .utils import *
from .models import *
from .serializers import *
from .permissions import *
from django.db import transaction
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.core.mail import send_mail
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
        
    def perform_update(self, serializer):
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
    
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)
        

class PasswordRestView(views.APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):    
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
            except Exception as e:
                return Response({"error": f"Hubo un error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_link = f"http://example.com/reset-password/{uid}/{token}/"
            send_mail(
                'Password Rest',
                f'Please click the following link to reset your password: {reset_link}',
                'from@example.com',
                [email],
                fail_silently=False
            )
            
            return Response({"success":"Password reset email sent"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        
# ============= Delete Many Users =================
class DeleteManyUsersView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def delete(self, request):
        date = json.loads(request.body)
        users = date.get('users', [])
        
        try:
            with transaction.atomic():
                deleted_count, _ = User.objects.filter(id__in=users).delete()  
        except Exception as e:
            transaction.rollback()
            return Response({"message": f"Hubo un error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if deleted_count > 0:
            transaction.commit()
            return Response({"message": f"{deleted_count} usuario(s) eliminado(s) correctamente"}, status=status.HTTP_200_OK)
        else:
            transaction.rollback()
            return Response({"message": "No se encontraron usuarios para eliminar"}, status=status.HTTP_404_NOT_FOUND)
        

# ============= Delete Many Sales =================
class DeleteManySalesView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def delete(self, request):
        date = json.loads(request.body)
        sales = date.get('sales', [])
        
        try:
            with transaction.atomic():
                deleted_count, _ = Sale.objects.filter(id__in=sales).delete()  
        except Exception as e:
            transaction.rollback()
            return Response({"message": f"Hubo un error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if deleted_count > 0:
            transaction.commit()
            return Response({"message": f"{deleted_count} venta(s) eliminada(s) correctamente"}, status=status.HTTP_200_OK)
        else:
            transaction.rollback()
            return Response({"message": "No se encontraron ventas para eliminar"}, status=status.HTTP_404_NOT_FOUND)
 
# ============= Sales Per User ====================
    
class SalesPerUserView(views.APIView):
    permission_classes = [permissions.AllowAny]
        
    def get(self, request):
        query_id = self.request.query_params.get('id')
        queryset = Sale.objects.filter(user_id=query_id)
        serializer = SalesSerializer(queryset, many=True)
        return Response(serializer.data)
        
    
# ============= Ranking =========================

class RankingView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self,request):
        print(request.user.id)
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
        print(request.user.id)
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
        