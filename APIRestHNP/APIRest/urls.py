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
    path("ranking/", RankingView.as_view(), name='Ranking'),
    path("sales-per-user/", SalesPerUserView.as_view(), name="SalesPerUser"),
    path("delete-users/", DeleteManyUsersView.as_view(), name="DeleteManyUsers"),
    path("delete-sales/", DeleteManySalesView.as_view(), name="DeleteManySales"),
    path("change-password/", ChangePassword.as_view(), name="ChangePassword"),
    path("password-reset/", PasswordRestView.as_view(), name="PasswordReset"), # Email to reset password
    path("is-superuser/", IsSuperuserView.as_view(), name="IsSuperuser"),
    path("user-data/", UserData.as_view(), name="UserData"),
    path("password-reset-confirm/<uidb64>/<token>/", PasswordResetConfirm.as_view(), name="PasswordResetConfirm"),
    path("download-apk-hnp/", ApplicationDownloadView.as_view(), name="ApplicationDownload"),
    path("summary-sales/", SalesSummaryView.as_view(), name="SalesSummary")
]


urlpatterns += router.urls

