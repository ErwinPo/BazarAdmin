from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.test import TestCase
from APIRest.models import User
from faker import Faker

class SaleTestCase(TestCase):
    def setUp(self):
        
        faker = Faker()
        
        self.client = APIClient()

        # Generación de datos de usuario falsos
        user_data = {
            'username': faker.user_name(),
            'email': faker.email(),
            'password': faker.password(),
        }

        # Creación de un superusuario en la base de datos
        user = User.objects.create_superuser(
            username=user_data['username'],
            password=user_data['password'],
            email=user_data['email']
        )
        
        refresh = RefreshToken.for_user(user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        
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
        
        
    def test_sale(self):
        """Ensure we can create a sale
        """
        
        # import pdb
        # pdb.set_trace()
        response = self.client.post('/bazar/sales//', self.sale_correct)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
    
    def test_sale_without_amount(self):
        """Ensure we can't create a sale without amount
        """
        response = self.client.post('/bazar/sales/', self.sale_without_amount)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_sale_without_quantity(self):
        """Ensure we can't create a sale without quantity
        """
        response = self.client.post('/bazar/sales/', self.sale_without_quantity)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_sale_clar(self):
        """Ensure we can create a sale with empty data
        """
        response = self.client.post('/bazar/sales/', self.sale_clar)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_sale_bad_formats_one(self):
        """Ensure we can't create a sale with bad data format (string instead of integer)
        """
        response = self.client.post('/bazar/sales/', self.sale_bad_formats_one)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_sale_bad_formats_two(self):
        """Ensure we can't create a sale with bad data format (invalid characters)
        """
        response = self.client.post('/bazar/sales/', self.sale_bad_formats_two)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
             
        
        