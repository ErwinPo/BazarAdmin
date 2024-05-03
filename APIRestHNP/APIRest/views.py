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
        print(queryset)
        data = [{"user": item[0], "username": item[1], "amount": item[2]} for item in queryset]
        serializer = RankingSerializer(data=data, many=True)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# =========== IsSuperuser =====================

class IsSuperuserView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        return Response({"is_superuser":request.user.is_superuser}, status=status.HTTP_200_OK)    
    
# =====================================================
# ======== Estatistics Requests Views =================
# =====================================================




# ==========  With Date (Start - End) =================        
    
class SalesDateRangeQuantityView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        query_start_date = self.request.query_params.get('start-date')
        query_end_date = self.request.query_params.get('end-date')
        query_temporality = self.request.query_params.get('temporality')
        queryset = callSalesDateRangeQuantity(query_start_date, query_end_date, query_temporality)
        data = [{"interval_time": str(item[0]), "total_quantity": item[1]} for item in queryset]
        serializer = IntervalQuantitySalesSerializer(data=data, many=True)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class SalesDateRangeAmountView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        query_start_date = self.request.query_params.get('start-date')
        query_end_date = self.request.query_params.get('end-date')
        query_temporality = self.request.query_params.get('temporality')
        queryset = callSalesDateRangeAmount(query_start_date, query_end_date,query_temporality)
        data = [{"interval_time": str(item[0]), "total_amount": item[1]} for item in queryset]
        serializer = IntervalAmountSalesSerializer(data=data, many=True)
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
        query_temporality = self.request.query_params.get('temporality')
        queryset = callSalesDateRangeSellerQuantity(query_start_date, query_end_date, query_id, query_temporality)
        data = [{"interval_time": str(item[0]), "total_quantity": item[1]} for item in queryset]
        serializer = IntervalQuantitySalesSerializer(data=data, many=True)
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
        query_temporality = self.request.query_params.get('temporality')
        queryset = callSalesDateRangeSellerAmount(query_start_date, query_end_date, query_id, query_temporality)
        data = [{"interval_time": str(item[0]), "total_amount": item[1]} for item in queryset]
        serializer = IntervalAmountSalesSerializer(data=data, many=True)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def ventas(request):
    # Initialize response
    response = {}

    # Check if the request method is POST
    if request.method != "GET":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=405, content_type="application/json")  # Method Not Allowed


    # Get all data of venta table
    registros = Sale.objects.all()
    # Convertir objetos de modelo a diccionarios
    registros_dict = [registro.as_dict() for registro in registros]

    # Assuming you want to return the parsed JSON data
    response = { "message": "Consulta Exitosa" , "registros": registros_dict}
    return JsonResponse(response, status=200, content_type="application/json")

@csrf_exempt
def registroventa(request):
    # Initialize response
    response = {}

    # Check if the request method is POST
    if request.method != "POST":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=405)  # Method Not Allowed

    # Get the request body
    try:
        info = json.loads(request.body)
    except json.JSONDecodeError:
        response = {"message": "Error de formato en los datos"}
        return JsonResponse(response, status=400)  # Bad Request

    registro = Sale.objects.create(user_id_id = int(info["user_id"]) ,amount = int(info["amount"]),quantity = int(info["quantity"]))

    # Assuming you want to return the parsed JSON data
    response = {"message": "Registro exitoso"}
    return JsonResponse(response, status=200, content_type="application/json")