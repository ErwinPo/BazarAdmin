import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from django.urls import reverse

@pytest.mark.django_db
def test_password_reset():
    user = User.objects.create_user(username='testuser', email='testuser@example.com', password='testpassword')
    client = APIClient()
    url = reverse('password-reset')
    data = {'email': 'testuser@example.com'}
    response = client.post(url, data, format='json')
    assert response.status_code == 200
    assert 'success' in response.data
