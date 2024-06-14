from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase
from APIRest.models import Sale

class SaleTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        self.sale_correct = {
            "amount": 100,
            "quantity": 1
        }
        
        self.sale_without_amount = {
            "quantity": 1
        }
        
        self.sale_without_quantity = {
            "amount": 100
        }
        
        self.sale_clar = {}
        
        self.sale_bad_formats_one = {
            "amount": "100",
            "quantity": "1"
        }
        
        self.sale_bad_formats_two = {
            "amount": "#490408",
            "quantity": "#4535"
        }
        
        