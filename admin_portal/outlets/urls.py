from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OutletViewSet

router = DefaultRouter()
router.register(r'', OutletViewSet)  # you could also use 'outlets' here

urlpatterns = [
    path('', include(router.urls)),
]
