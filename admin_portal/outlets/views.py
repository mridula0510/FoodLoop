import logging
from rest_framework import viewsets
from .models import Outlet
from .serializers import OutletSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

logger = logging.getLogger(__name__)

class OutletViewSet(viewsets.ModelViewSet):
    queryset = Outlet.objects.all()
    serializer_class = OutletSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        logger.debug("OutletViewSet.list() called")
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        logger.debug(f"OutletViewSet.retrieve() called with pk={kwargs.get('pk')}")
        return super().retrieve(request, *args, **kwargs)
