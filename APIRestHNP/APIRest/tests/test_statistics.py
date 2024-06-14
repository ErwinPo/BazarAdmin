from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.test import TestCase
from APIRest.models import User
from faker import Faker

class StatisticsTestCase(TestCase):
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
        
        self.all_good = {
            "start-date": "2022-01-01",
            "end-date": "2024-12-31",
            "temporality": "annually"
        }
        
        self.no_dates = {
            "temporality": "annually"
        }
        
        self.no_temporality = {
            "start-date": "2022-01-01",
            "end-date": "2024-12-31"
        }
        
        self.nothing = {}
        
        
        self.all_good_int = {
            "start-date": 20220101,
            "end-date": 20241231,
            "temporality": 4324
        }
        
    
    def test_sales_date_range_amount_view_no_date(self):
        """Ensure we can't get data without dates
        """

        url = '/bazar/sales-date-range-quantity/'
        
        full_url = f"{url}?{'&'.join(f'{key}={value}' for key, value in self.no_dates.items())}"

        response = self.client.get(full_url)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
        
    def test_sales_date_range_amount_view_no_temporality(self):
        """Ensure we can't get data without temporality
        """
        

        url = '/bazar/sales-date-range-quantity/'
        
        full_url = f"{url}?{'&'.join(f'{key}={value}' for key, value in self.no_temporality.items())}"

        response = self.client.get(full_url)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        
    def test_sales_date_range_amount_view_nothing(self):
        """Ensure we can't get data without anything
        """

        url = '/bazar/sales-date-range-quantity/'
        
        full_url = f"{url}?{'&'.join(f'{key}={value}' for key, value in self.nothing.items())}"

        import pdb
        pdb.set_trace()
        
        response = self.client.get(full_url)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        
    def test_sales_date_range_amount_view_bad_format(self):
        """Ensure we can't get data with bad format
        """

        url = '/bazar/sales-date-range-quantity/'
        
        full_url = f"{url}?{'&'.join(f'{key}={value}' for key, value in self.all_good_int.items())}"

        response = self.client.get(full_url)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    
    def test_sales_date_range_quantity_view(self):
        """Ensure we can get data
        """

        url = '/bazar/sales-date-range-quantity/'
        
        full_url = f"{url}?{'&'.join(f'{key}={value}' for key, value in self.all_good.items())}"

        response = self.client.get(full_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verifica que los datos de cantidad estén presentes en la respuesta
        self.assertIn("qty", response.data)
        self.assertIn("comp", response.data)
    

        