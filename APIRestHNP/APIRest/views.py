from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .models import *
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.
@csrf_exempt
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
    
    if Usuario.objects.filter(nombre=info["nombre"]).exists():
        response = {"message": "Error, ya existe un usuario con ese nombre"}
        return JsonResponse(response, status=400, content_type="application/json")
    
    if Usuario.objects.filter(correo=info["correo"]).exists():
        response = {"message": "Error, ya existe el correo"}
        return JsonResponse(response, status=400, content_type="application/json")

    if info["supermodel"] in info:
        registro = Usuario.objects.create(nombre = info["nombre"],contrasena = info["contrasena"], correo = info["correo"], supermodel = info["supermodel"])
    else: registro = Usuario.objects.create(nombre = info["nombre"],contrasena = info["contrasena"], correo = info["correo"])
    
    response = {"message": "Registro exitoso"}
    return JsonResponse(response, status=200, content_type="application/json")

@csrf_exempt
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

    usuario = Usuario.objects.get(user_id=int(info["usuario"]))
    registro = Venta.objects.create(user_id = usuario ,monto = int(info["monto"]),cantidad = int(info["cantidad"]))

    # Assuming you want to return the parsed JSON data
    response = {"message": "Registro exitoso"}
    return JsonResponse(response, status=200, content_type="application/json")

@csrf_exempt
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
def eliminarusuario(request, user_id):
    response = {}
    
    if request.method != "DELETE":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=400, content_type="application/json")
    
    try:
        usuario = Usuario.objects.get(user_id=user_id)
        usuario.active = False 
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
def eliminarventa(request, venta_id):
    response = {}
    
    if request.method != "DELETE":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=400, content_type="application/json")
    

    try:
        venta = Venta.objects.get(venta_id=venta_id)
        venta.active = False 
        venta.save()
        response = {"message": "Usuario Eliminado"}
        return JsonResponse(response, status=200, content_type="application/json")
    except ObjectDoesNotExist:
        response = {"message": "El usuario a eliminar no existe"}
        return JsonResponse(response, status="400", content_type="application/json")
    except Exception as e:
        response = {"message": str(e)}
        return JsonResponse(response, status="400", content_type="application/json")
    
@csrf_exempt    
def ventasusuario(request, user_id):
    response = {}
    
    if request.method != "GET":
        response = {"message": "Operacion no valida"}
        return JsonResponse(response, status=400, content_type="application/json")
    
    try:
        # Get all data of venta table
        registros = Venta.objects.filter(user_id=user_id)
        # Convertir objetos de modelo a diccionarios
        registros_dict = [registro.as_dict() for registro in registros]

        # Assuming you want to return the parsed JSON data
        response = { "message": "Consulta Exitosa" , "registros": registros_dict}
        return JsonResponse(response, status=200, content_type="application/json")
    
    except Exception as e:
        response = {"message": str(e)}
        return JsonResponse(response, status="400", content_type="application/json")
    
@csrf_exempt
def actualizarusuario(request, usuario_id):
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
        usuario = Usuario.objects.get(usuario_id=usuario_id)
        usuario.active = info["active"] 
        usuario.nombre = info["nombre"]
        usuario.contrasena = info["contrasena"]
        usuario.correo = info["correo"]
        usuario.ventas_semana = info["ventas_semana"]
        usuario.supermodel = info["supermodel"]
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
        venta = Venta.objects.get(venta_id=venta_id)
        venta.active = info["active"]
        venta.monto = info["monto"]
        venta.cantidad = info["cantidad"]
        venta.fecha = info["fecha"]
        venta.user_id = info["user_id"]
        venta.save()
        response = {"message": "Venta Actualizado"}
        return JsonResponse(response, status=200, content_type="application/json")
    except ObjectDoesNotExist:
        response = {"message": "La venta a actualizar no existe"}
        return JsonResponse(response, status="400", content_type="application/json")
    except Exception as e:
        response = {"message": str(e)}
        return JsonResponse(response, status="400", content_type="application/json")