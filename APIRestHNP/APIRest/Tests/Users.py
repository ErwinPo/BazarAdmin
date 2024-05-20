import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from django.urls import reverse

@pytest.mark.django_db
def test_create_user():
    client = APIClient()
    url = reverse('user-list')
    data = {
        'username': 'testuser',
        'password': 'testpassword',
        'email': 'testuser@example.com'
    }
    response = client.post(url, data, format='json')
    assert response.status_code == 201
    assert User.objects.filter(username='testuser').exists()

@pytest.mark.django_db
def test_update_user_password():
    user = User.objects.create_user(username='testuser', password='oldpassword')
    client = APIClient()
    url = reverse('user-detail', args=[user.id])
    data = {'password': 'newpassword'}
    response = client.patch(url, data, format='json')
    assert response.status_code == 200
    user.refresh_from_db()
    assert user.check_password('newpassword')