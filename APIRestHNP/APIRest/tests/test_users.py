from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase
from APIRest.models import User
from faker import Faker


class UserTestCase(TestCase):

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
       
        # Registro de Usuario Administrador
        self.user_admin = {
            "username": "usuario1",
            "password": "prueba",
            "is_superuser": True,
            "email": "usuario1@gamil.com"
        }

        # Registro de Usuario Vendedor
        self.user_salesman = {
            "username": "usuario2",
            "password": "prueba",
            "is_superuser": False,
            "email": "usuario2@gamil.com"
        }

        # Registro de Usuario con Campos Opcionales Omitidos
        self.user_without_optional_values = {
            "username": "usuario3",
            "password": "prueba",
            "email": "usuario3@gamil.com"
        }

        # Registro de Usuario con Campos Opcionales Sin Omitir
        self.user_optional_values = {
            "username": "usuario4",
            "password": "prueba",
            "is_superuser": True,
            "email": "usuario4@gamil.com"
        }

        # Registro de Usuario sin Username
        self.user_bad_one = {
            "password": "prueba",
            "is_superuser": True,
            "email": "usuario5@gamil.com"
        }

        # Registro de Usuario sin Password
        self.user_bad_two = {
            "username": "usuario6",
            "is_superuser": True,
            "email": "usuario6@gamil.com"
        }

        # Registro de Usuario sin Email
        self.user_bad_three = {
            "password": "prueba",
            "username": "usuario6",
            "is_superuser": True,
        }

        # Registro de Usuario con Username Duplicado
        self.user_bad_four = {
            "password": "prueba",
            "username": "usuario1",
            "is_superuser": True,
            "email": "usuario6@gamil.com"
        }

        # Registro de Usuario con Email Duplicado
        self.user_bad_five = {
            "password": "prueba",
            "username": "usuario7",
            "is_superuser": True,
            "email": "usuario1@gamil.com"
        }

        # Registro de Usuario con Email Invalido
        self.user_bad_six = {
            "password": "prueba",
            "username": "usuario8",
            "is_superuser": True,
            "email": "usuario8&gmail.com"
        }

        # Registro de Usuario con Campos Adicionales No Permitidos
        self.user_bad_seven = {
            "password": "prueba",
            "username": "usuario9",
            "is_superuser": True,
            "email": "usuario9@gmail.com",
            "age": 17
        }
        
    def test_admin(self):
        """Ensure we can create an admin user
        """
        
        response = self.client.post('/bazar/users//', self.user_admin)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_salesman(self):
        """Ensure we can create a salesman user
        """
        
        response = self.client.post('/bazar/users//', self.user_salesman)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
    def test_user_without_optional_values(self):
        """Ensure we can create a user without optional values
        """
        
        response = self.client.post('/bazar/users//', self.user_without_optional_values)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
    def test_user_optional_values(self):
        """Ensure we can create a user using optional values
        """
        
        response = self.client.post('/bazar/users//', self.user_optional_values)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_user_without_username(self):
        """Ensure we can't create a user without username
        """
        
        response = self.client.post('/bazar/users//', self.user_bad_one)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_user_without_password(self):
        """Ensure we can't create a user without password
        """
        
        response = self.client.post('/bazar/users//', self.user_bad_two)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_without_email(self):
        """Ensure we can't create a user without email
        """
        
        response = self.client.post('/bazar/users//', self.user_bad_three)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_with_duplicate_username(self):
        """Ensure we can't create a user with a duplicate username
        """
        
        
        response = self.client.post('/bazar/users//', self.user_bad_four)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_with_duplicate_email(self):
        """Ensure we can't create a user with a duplicate email
        """
        
        response = self.client.post('/bazar/users//', self.user_bad_five)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_with_invalid_email(self):
        """Ensure we can't create a user with an invalid email
        """
        
        response = self.client.post('/bazar/users//', self.user_bad_six)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_with_additional_fields(self):
        """Ensure we can't create a user with additional non-permitted fields
        """
        
        response = self.client.post('/bazar/users//', self.user_bad_seven)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
