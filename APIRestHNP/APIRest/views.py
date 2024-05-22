import pdb
import json
from .utils import *
from .models import *
from .serializers import *
from .permissions import *
from django.http import JsonResponse
from django.db import transaction
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import permissions, viewsets, views, status
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.views.decorators.csrf import csrf_exempt


class UserData(views.APIView):
    permission_classes = [IsNotSuperuser]
    
    def get(self, request):
        return Response({"user_id": request.user.id, "username" : request.user.username} , status=status.HTTP_200_OK)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsSuperuser]
    serializer_class = UserSerializer
    
    def perform_create(self, serializer):
        # Extraer la contraseña del serializer
        password = serializer.validated_data.get('password')

        # Modificar el serializer para establecer la contraseña hasheada
        serializer.validated_data['password'] = make_password(password)

        # Guardar el usuario con la contraseña hasheada
        serializer.save()    
        
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)  # Determine si la actualización debe ser parcial
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        if 'password' in request.data:  # Verificar si se proporcionó una nueva contraseña
            password = request.data['password']
            serializer.validated_data['password'] = make_password(password)  # Hashear la nueva contraseña
        self.perform_update(serializer)
        return Response(serializer.data)
    
class SalesViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    permission_classes = [IsNotSuperuser]
    serializer_class = SalesSerializer
    
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)
    
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # Agregar el nombre del usuario a cada objeto en la lista
        for obj in data:
            obj['username'] = get_username(obj['user_id'])

        return Response(data)

class ChangePassword(views.APIView):
    permission_classes = [IsSuperuser]
    
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data.get('user')
            password = serializer.validated_data.get('new_password')
            
            user = User.objects.get(id=user_id)
            user.set_password(password)
            user.save()
            
            return Response({"message": "Password has been changed"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordRestView(views.APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):    
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
            except Exception as e:
                return Response({"error": f"Hubo un error: {e}"}, status=status.HTTP_400_BAD_REQUEST)

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
    permission_classes = [IsSuperuser]
    
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
    permission_classes = [IsSuperuser]
    
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
    permission_classes = [IsNotSuperuser]
        
    def get(self, request):
        query_id = request.user.id
        print(query_id)
        queryset = Sale.objects.filter(user_id=query_id)
        serializer = SalesSerializer(queryset, many=True)
        return Response(serializer.data)
        
    
# ============= Ranking =========================

class RankingView(views.APIView):
    permission_classes = [IsNotSuperuser]
    
    def get(self,request):
        
        queryset = callRanking()
        
        data = [{"user": item[0], "username": item[1], "amount": item[2]} for item in queryset]
        serializer = RankingSerializer(data=data, many=True)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# =========== IsSuperuser =====================

class IsSuperuserView(views.APIView):
    permission_classes = [IsNotSuperuser]
    
    def get(self, request):
        return Response({"is_superuser":request.user.is_superuser}, status=status.HTTP_200_OK)    
    
# =====================================================
# ======== Estatistics Requests Views =================
# =====================================================




# ==========  With Date (Start - End) =================        
    
class SalesDateRangeQuantityView(views.APIView):
    permission_classes = [IsSuperuser]
    
    def get(self, request):
        query_start_date = self.request.query_params.get('start-date')
        query_end_date = self.request.query_params.get('end-date')
        query_temporality = self.request.query_params.get('temporality')
        
        queryset = callSalesDateRangeQuantity(query_start_date, query_end_date, query_temporality)
        data_qty = [{"interval_time": str(item[0]), "total_quantity": item[1]} for item in queryset]
        serializer_qty = IntervalQuantitySalesSerializer(data=data_qty, many=True)
        
        queryset = callCalculateSalesChangeQuantity(query_start_date, query_end_date, query_temporality)
        data_comp = [{"timeone": item[0], "timetwo": item[1], "growth_rate": item[2]} for item in queryset]
        serializer_comp = DatesComparison(data=data_comp, many=True)
        
        
        
        
        if serializer_qty.is_valid() and serializer_comp.is_valid():
            return Response({"qty":serializer_qty.data, "comp": serializer_comp.data})
        else:
            errors = {}
            if not serializer_qty.is_valid():
                errors['qty'] = serializer_qty.errors
            if not serializer_comp.is_valid():
                errors['comp'] = serializer_comp.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
    
class SalesDateRangeAmountView(views.APIView):
    permission_classes = [IsSuperuser]
    
    def get(self, request):
        query_start_date = self.request.query_params.get('start-date')
        query_end_date = self.request.query_params.get('end-date')
        query_temporality = self.request.query_params.get('temporality')
        
        queryset = callSalesDateRangeAmount(query_start_date, query_end_date,query_temporality)
        data_mnt = [{"interval_time": str(item[0]), "total_amount": item[1]} for item in queryset]
        serializer_mnt = IntervalAmountSalesSerializer(data=data_mnt, many=True)
        
        queryset = callCalculateSalesChangeAmount(query_start_date, query_end_date,query_temporality)
        data_comp = [{"timeone": item[0], "timetwo": item[1], "growth_rate": item[2]} for item in queryset]
        serializer_comp = DatesComparison(data=data_comp, many=True)
        
        if serializer_mnt.is_valid() and serializer_comp.is_valid():
            return Response({"qty":serializer_mnt.data, "comp": serializer_comp.data})
        else:
            errors = {}
            if not serializer_mnt.is_valid():
                errors['mnt'] = serializer_mnt.errors
            if not serializer_comp.is_valid():
                errors['comp'] = serializer_comp.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
  

# ==========  With Date (Start - End) & Seller ID =================
    
class SalesDateRangeSellerQuantityView(views.APIView):
    permission_classes = [IsSuperuser]
    
    def get(self, request):
        query_id = self.request.query_params.get('id')
        query_start_date = self.request.query_params.get('start-date')
        query_end_date = self.request.query_params.get('end-date')
        query_temporality = self.request.query_params.get('temporality')
        queryset = callSalesDateRangeSellerQuantity(query_start_date, query_end_date, query_id, query_temporality)
        data_qty = [{"interval_time": str(item[0]), "total_quantity": item[1]} for item in queryset]
        serializer_qty = IntervalQuantitySalesSerializer(data=data_qty, many=True)
        
        queryset = callCalculateSalesChangeQuantityUser(query_start_date, query_end_date, query_id, query_temporality)
        data_comp = [{"timeone": item[0], "timetwo": item[1], "growth_rate": item[2]} for item in queryset]
        serializer_comp = DatesComparison(data=data_comp, many=True)
        
        if serializer_qty.is_valid() and serializer_comp.is_valid():
            return Response({"qty":serializer_qty.data, "comp": serializer_comp.data})
        else:
            errors = {}
            if not serializer_qty.is_valid():
                errors['mnt'] = serializer_qty.errors
            if not serializer_comp.is_valid():
                errors['comp'] = serializer_comp.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class SalesDateRangeSellerAmountView(views.APIView):
    permission_classes = [IsSuperuser]
    
    def get(self, request):
        print(request.user.id)
        query_id = self.request.query_params.get('id')
        query_start_date = self.request.query_params.get('start-date')
        query_end_date = self.request.query_params.get('end-date')
        query_temporality = self.request.query_params.get('temporality')
        queryset = callSalesDateRangeSellerAmount(query_start_date, query_end_date, query_id, query_temporality)
        data_mnt = [{"interval_time": str(item[0]), "total_amount": item[1]} for item in queryset]
        serializer_mnt = IntervalAmountSalesSerializer(data=data_mnt, many=True)
        
        
        queryset = callCalculateSalesChangeAmountUser(query_start_date, query_end_date, query_id, query_temporality)
        data_comp = [{"timeone": item[0], "timetwo": item[1], "growth_rate": item[2]} for item in queryset]
        serializer_comp = DatesComparison(data=data_comp, many=True)
        
        if serializer_mnt.is_valid() and serializer_comp.is_valid():
            return Response({"qty":serializer_mnt.data, "comp": serializer_comp.data})
        else:
            errors = {}
            if not serializer_mnt.is_valid():
                errors['mnt'] = serializer_mnt.errors
            if not serializer_comp.is_valid():
                errors['comp'] = serializer_comp.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
