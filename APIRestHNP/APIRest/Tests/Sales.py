import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from models import *
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_create_sale():
    user = User.objects.create_user(username='testuser', password='testpassword')
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse('sale-list')
    data = {'amount': 100, 'quantity': 2}
    response = client.post(url, data, format='json')
    assert response.status_code == 201
    assert Sale.objects.filter(user=user).exists()

@pytest.mark.django_db
def test_list_sales():
    user = User.objects.create_user(username='testuser', password='testpassword')
    Sale.objects.create(user=user, amount=100, quantity=2)
    client = APIClient()
    url = reverse('sale-list')
    response = client.get(url)
    assert response.status_code == 200
    assert len(response.data) > 0
