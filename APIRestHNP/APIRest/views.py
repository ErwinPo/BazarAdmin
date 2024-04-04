from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .models import *
from django.core import serializers

# Create your views here.
@csrf_exempt
def registrousuario(request):
    response = {}
    # Check if the request method is POST
    if request.method != "POST":
        response = {"message": "Operacion no valida"}
        return HttpResponse(json.dumps(response), status=405, content_type="application/json")  # Method Not Allowed

    # Get the request body
    try:
        info = json.loads(request.body)
    except json.JSONDecodeError:
        response = {"message": "Error de formato en los datos"}
        return HttpResponse(json.dumps(response), status=400)  # Bad Request

    if "supermodel" in info:
        registro = Usuario.objects.create(nombre = info["nombre"],contrasena = info["contrasena"], correo = info["correo"], supermodel = info["supermodel"])
    else: registro = Usuario.objects.create(nombre = info["nombre"],contrasena = info["contrasena"], correo = info["correo"])
    # Assuming you want to return the parsed JSON data
    response = {"message": "registro exitoso"
                }
    return HttpResponse(json.dumps(response), status=200, content_type="application/json")

@csrf_exempt
def ventas(request):
    # Initialize response
    response = {}

    # Check if the request method is POST
    if request.method != "GET":
        response = {"message": "Operacion no valida"}
        return HttpResponse(json.dumps(response), status=405)  # Method Not Allowed


    # Get all data of venta table
    registros = Venta.objects.all()
    # Convertir objetos de modelo a diccionarios
    registros_dict = [dict(registro) for registro in registros]

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
        return HttpResponse(json.dumps(response), status=405)  # Method Not Allowed

    # Get the request body
    try:
        info = json.loads(request.body)
    except json.JSONDecodeError:
        response = {"message": "Error de formato en los datos"}
        return HttpResponse(json.dumps(response), status=400)  # Bad Request

    usuario = Usuario.objects.get(user_id=int(info["usuario"]))
    registro = Venta.objects.create(user_id = usuario ,monto = int(info["monto"]),cantidad = int(info["cantidad"]))

    # Assuming you want to return the parsed JSON data
    response = {"message": "registro exitoso"
                }
    return HttpResponse(json.dumps(response), status=200, content_type="application/json")

