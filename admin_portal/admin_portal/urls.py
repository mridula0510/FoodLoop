from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

def home(request):
    return HttpResponse("Welcome to the College Food Court API!")

urlpatterns = [
    path('', home),  # Root URL now handled
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/outlets/', include('outlets.urls')),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
