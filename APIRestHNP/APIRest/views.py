import json
from .models import *
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_http_methods

# Create your views here.
@csrf_exempt
@require_http_methods(["POST"])
def registrousuario(request):
    response = {}
    
    if request.method != "POST":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=405, content_type="application/json")  # Method Not Allowed

    try:
        info = json.loads(request.body)
    except json.JSONDecodeError:
        response = {"message": "Error de formato en los datos"}
        return JsonResponse(response, status=400, content_type="application/json")  # Bad Request
    
    if Usuario.objects.filter(username=info["username"]).exists():
        response = {"message": "Error, ya existe un usuario con ese nombre"}
        return JsonResponse(response, status=400, content_type="application/json")
    
    if Usuario.objects.filter(email=info["email"]).exists():
        response = {"message": "Error, ya existe el correo"}
        return JsonResponse(response, status=400, content_type="application/json")
    
    if (info["superuser"]):
        registro = Usuario.objects.create_superuser(username = info["username"], password = info["password"], email = info["email"])
    else:
        registro = Usuario.objects.create_user(username = info["username"], password = info["password"], email = info["email"])

    
    response = {"message": "Registro exitoso"}
    return JsonResponse(response, status=200, content_type="application/json")

@csrf_exempt
@require_http_methods(["GET"])
def ventas(request):
    # Initialize response
    response = {}

    # Check if the request method is POST
    if request.method != "GET":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=405, content_type="application/json")  # Method Not Allowed


    # Get all data of venta table
    registros = Venta.objects.all()
    # Convertir objetos de modelo a diccionarios
    registros_dict = [registro.as_dict() for registro in registros]

    # Assuming you want to return the parsed JSON data
    response = { "message": "Consulta Exitosa" , "registros": registros_dict}
    return JsonResponse(response, status=200, content_type="application/json")

@csrf_exempt
@require_http_methods(["POST"])
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

    registro = Venta.objects.create(user_id_id = int(info["user_id"]) ,amount = int(info["amount"]),quantity = int(info["quantity"]))

    # Assuming you want to return the parsed JSON data
    response = {"message": "Registro exitoso"}
    return JsonResponse(response, status=200, content_type="application/json")

@csrf_exempt
@require_http_methods(["GET"])
def usuarios(request):
    
    response = {}
    
    if request.method != "GET":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=405, content_type="application/json")
    
    registros = Usuario.objects.all()
    registros_dict = [registro.as_dict() for registro in registros]
    
    response = { "message": "Consulta Exitosa" , "registros": registros_dict}
    return JsonResponse(response, status=200, content_type="application/json")

@csrf_exempt
@require_http_methods(["DELETE"])
def eliminarusuario(request, user_id):
    response = {}
    
    if request.method != "DELETE":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=400, content_type="application/json")
    
    try:
        usuario = Usuario.objects.get(id=user_id)
        usuario.is_active = False 
        usuario.save()
        response = {"message": "Usuario Eliminado"}
        return JsonResponse(response, status=200, content_type="application/json")
    except ObjectDoesNotExist:
        response = {"message": "El usuario a eliminar no existe"}
        return JsonResponse(response, status="400", content_type="application/json")
    except Exception as e:
        response = {"message": str(e)}
        return JsonResponse(response, status="400", content_type="application/json")
    
@csrf_exempt
@require_http_methods(["DELETE"])
def eliminarventa(request, venta_id):
    response = {}
    
    if request.method != "DELETE":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=400, content_type="application/json")
    

    try:
        venta = Venta.objects.get(sale_id=venta_id)
        venta.is_active = False 
        venta.save()
        response = {"message": "Venta Eliminada"}
        return JsonResponse(response, status=200, content_type="application/json")
    except ObjectDoesNotExist:
        response = {"message": "La venta a eliminar no existe"}
        return JsonResponse(response, status="400", content_type="application/json")
    except Exception as e:
        response = {"message": str(e)}
        return JsonResponse(response, status="400", content_type="application/json")
    
@csrf_exempt   
@require_http_methods(["GET"]) 
def ventasusuario(request, user_id):
    response = {}
    
    if request.method != "GET":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=400, content_type="application/json")
    
    try:
        # Get all data of venta table
        registros = Venta.objects.filter(user_id_id=user_id)
        # Convertir objetos de modelo a diccionarios
        registros_dict = [registro.as_dict() for registro in registros]

        # Assuming you want to return the parsed JSON data
        response = { "message": "Consulta Exitosa" , "registros": registros_dict}
        return JsonResponse(response, status=200, content_type="application/json")
    
    except Exception as e:
        response = {"message": str(e)}
        return JsonResponse(response, status="400", content_type="application/json")
    
@csrf_exempt
@require_http_methods(["PUT"])
def actualizarusuario(request, user_id):
    response = {}
    
    if request.method != "PUT":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=400, content_type="application/json")
    
    try:
        info = json.loads(request.body)
    except json.JSONDecodeError:
        response = {"message": "Error de formato en los datos"}
        return JsonResponse(response, status=400)  # Bad Request
    
    try:
        usuario = Usuario.objects.get(id=user_id)
        usuario.is_active = info["is_active"] 
        usuario.username = info["username"]
        usuario.email = info["email"]
        usuario.ventas_semana = info["weekly_sells"]
        usuario.is_superuser = info["is_superuser"]
        usuario.set_password(info["password"])
        usuario.save()
        response = {"message": "Usuario Actualizado"}
        return JsonResponse(response, status=200, content_type="application/json")
    except ObjectDoesNotExist:
        response = {"message": "El usuario a actualizar no existe"}
        return JsonResponse(response, status="400", content_type="application/json")
    except Exception as e:
        response = {"message": str(e)}
        return JsonResponse(response, status="400", content_type="application/json")
    
@csrf_exempt
@require_http_methods(["PUT"])
def actualizarVenta(request, venta_id):
    response = {}
    
    if request.method != "PUT":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=400, content_type="application/json")
    
    try:
        info = json.loads(request.body)
    except json.JSONDecodeError:
        response = {"message": "Error de formato en los datos"}
        return JsonResponse(response, status=400)  # Bad Request
    
    try:
        venta = Venta.objects.get(sale_id=venta_id)
        venta.is_active = info["is_active"]
        venta.amount = info["amount"]
        venta.quantity = info["quantity"]
        venta.save()
        response = {"message": "Venta Actualizada"}
        return JsonResponse(response, status=200, content_type="application/json")
    except ObjectDoesNotExist:
        response = {"message": "La venta a actualizar no existe"}
        return JsonResponse(response, status="400", content_type="application/json")
    except Exception as e:
        response = {"message": str(e)}
        return JsonResponse(response, status="400", content_type="application/json")
    
    
# @csrf_exempt
# def login(request):
#     response = {}
    
#     if request.method != "GET":
#         response = {"message": "Operacion no valida"}
#         return JsonResponse(response, status=400, content_type="application/json")
    
#     try:
        
#         username = request.GET.get('username')
#         password = request.GET.get('password')
#         usuario = Usuario.objects.get(nombre=username)
        

#         if check_password(password, usuario.contrasena):
#             token = secrets.token_hex(16)
#             expiration_time = datetime.datetime.now() + datetime.timedelta(hours=1)
#             usuario.token = token
#             usuario.token_expiration = expiration_time
#             usuario.save()
#             response = {"message": "Inicio de sesión exitoso", "token": token, "expiration_time": expiration_time}
#             return JsonResponse(response, status=200, content_type="application/json")
#         else:
#             response = {"message": "Contraseña incorrecta"}
#             return JsonResponse(response, status=401, content_type="application/json")
        
#     except Usuario.DoesNotExist:
#         response = {"message": "Usuario no encontrado"}
#         return JsonResponse(response, status=404, content_type="application/json")
#     except Exception as e:
#         response = {"message": str(e)}
#         return JsonResponse(response, status="400", content_type="application/json")


# @csrf_exempt
# def logout(request):
    
#     response = {}
    
#     if request.method != "GET":
#         response = {"message": "Operacion no valida"}
#         return JsonResponse(response, status=400, content_type="application/json")
    
#     try:
#         username = request.GET.get('username')
#         usuario = Usuario.objects.get(nombre=username)
#         # Eliminar el token asociado al usuario
#         usuario.token = None
#         usuario.token_expiration = None
#         usuario.save()
#         response = {"message": "Cierre de sesión exitoso"}
#         return JsonResponse(response, status=200, content_type="application/json")
#     except Usuario.DoesNotExist:
#         response = {"message": "Usuario no encontrado"}
#         return JsonResponse(response, status=404, content_type="application/json")
#     except Exception as e:
#         response = {"message": str(e)}
#         return JsonResponse(response, status=400, content_type="application/json")

# @csrf_exempt
# def recoverpassword(request):
#     response = {}
    
#     return JsonResponse(response, status=400, content_type="application/json")