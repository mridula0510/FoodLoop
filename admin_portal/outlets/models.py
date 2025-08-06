from django.db import models

class Outlet(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='outlet_images/', null=True, blank=True)
    is_trending = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)

    def __str__(self):
        return self.name
