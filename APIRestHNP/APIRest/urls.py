from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers
from django.urls import path
from .views import *

router = routers.DefaultRouter()

router.register('users/', UserViewSet, "users")
router.register('sales/', SalesViewSet, "sales")

urlpatterns = [
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   
    path("sales-date-range-amount/", SalesDateRangeAmountView.as_view(), name="SalesDataRangeAmount"),
    path("sales-date-range-quantity/", SalesDateRangeQuantityView.as_view(), name="SalesDataRangeQuantity"),
    path("sales-date-range-amount-seller/", SalesDateRangeSellerAmountView.as_view(), name="SalesDataRangeAmountSeller"),
    path("sales-date-range-quantity-seller/", SalesDateRangeSellerQuantityView.as_view(), name="SalesDataRangeQuantitySeller"),
    path("ranking/", Ranking.as_view(), name='Ranking'),
    path("sales-per-user/", SalesPerUser.as_view(), name="SalesPerUser")
]


urlpatterns += router.urls

