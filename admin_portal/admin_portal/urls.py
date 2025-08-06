from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Root welcome message
def home(request):
    return HttpResponse("Welcome to the College Food Court API!")

urlpatterns = [
    path('', home, name='home'),  # Root URL
    path('admin/', admin.site.urls),

    # App-level routers
    path('api/users/', include('users.urls')),
    path('api/outlets/', include('outlets.urls')),

    # JWT Authentication endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login (use this for consistency)
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # refresh token
]
