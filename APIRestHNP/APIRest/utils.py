from django.db import connection, DatabaseError

def callRanking():
    with connection.cursor() as cursor:
        try:
            cursor.callproc('Ranking')
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()
            
def callSalesLastWeekAmount():
    with connection.cursor() as cursor:
        try:
            cursor.callproc('SalesLastWeekAmount')
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()


def callSalesLastWeekQuantity():
    with connection.cursor() as cursor:
        try:
            cursor.callproc('SalesLastWeekQuantity')
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()


def callSalesLastWeekAmountSeller(seller):
    with connection.cursor() as cursor:
        try: 
            cursor.callproc('SalesLastWeekAmountSeller', [seller])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()


def callSalesLastWeekQuantitySeller(seller):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('SalesLastWeekQuantitySeller', [seller])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()


def callSalesDateRangeAmount(date_start, date_end):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('SalesDateRangeAmount', [date_start, date_end])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()


def callSalesDateRangeQuantity(date_start, date_end):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('SalesDateRangeQuantity', [date_start, date_end])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()


def callSalesDateRangeSellerAmount(date_start, date_end, seller):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('SalesDateRangeSellerAmount', [date_start, date_end, seller])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()


def callSalesDateRangeSellerQuantity(date_start, date_end, seller):
    with connection.cursor() as cursor:
        try:
            cursor.callproc('SalesDateRangeSellerQuantity', [date_start, date_end, seller])
            result = cursor.fetchall()
            return result
        finally:
            cursor.close()