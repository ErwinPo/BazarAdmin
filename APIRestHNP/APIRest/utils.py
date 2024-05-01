from django.db import connection, DatabaseError

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