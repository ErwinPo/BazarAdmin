from django.db import connection, DatabaseError
from .models import *

def callRanking():
    with connection.cursor() as cursor:
        try:
            cursor.callproc('Ranking')
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()


def callSalesDateRangeAmount(date_start, date_end, temporality):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('SalesDateRangeAmount', [date_start, date_end, temporality])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()


def callSalesDateRangeQuantity(date_start, date_end, temporality):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('SalesDateRangeQuantity', [date_start, date_end, temporality])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()


def callSalesDateRangeSellerAmount(date_start, date_end, seller, temporality):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('SalesDateRangeSellerAmount', [date_start, date_end, seller, temporality])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()


def callSalesDateRangeSellerQuantity(date_start, date_end, seller, temporality):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('SalesDateRangeSellerQuantity', [date_start, date_end, seller, temporality])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()

def callCalculateSalesChangeAmountUser(date_start, date_end, seller, temporality):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('CalculateSalesChangeAmountUser', [date_start, date_end, seller, temporality])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()

def callCalculateSalesChangeQuantityUser(date_start, date_end, seller, temporality):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('CalculateSalesChangeQuantityUser', [date_start, date_end, seller, temporality])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()

def callCalculateSalesChangeAmount(date_start, date_end,temporality):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('CalculateSalesChangeAmount', [date_start, date_end, temporality])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()

def callCalculateSalesChangeQuantity(date_start, date_end, temporality):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('CalculateSalesChangeQuantity', [date_start, date_end, temporality])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()
            
# ==========================================================
# ================== OTHER FUNCTIONS =======================
# ==========================================================

def get_username(user_id):
    try:
        user = User.objects.get(id=user_id)
        return user.username
    except User.DoesNotExist:
        return "Usuario no encontrado"  # O manejar de alguna otra forma el caso de usuario inexistente