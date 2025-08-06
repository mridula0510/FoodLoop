from rest_framework import serializers
from .models import Outlet
import logging

logger = logging.getLogger(__name__)

class OutletSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Outlet
        fields = ['id', 'name', 'description', 'image', 'is_trending', 'is_new']

    def get_image(self, obj):
        try:
            request = self.context.get('request')
            if obj.image and hasattr(obj.image, 'url'):
                url = request.build_absolute_uri(obj.image.url) if request else obj.image.url
                logger.debug(f"Serialized image URL: {url}")
                return url
            return None
        except Exception as e:
            logger.error(f"Error serializing image: {e}")
            raise
