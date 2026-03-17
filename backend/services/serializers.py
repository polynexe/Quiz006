from rest_framework import serializers
from .models import Service
from users.serializers import UserSerializer


class ServiceSerializer(serializers.ModelSerializer):
    seller = UserSerializer(read_only=True)
    seller_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Service
        fields = [
            'id',
            'seller',
            'seller_id',
            'service_name',
            'description',
            'price',
            'duration_of_service',
            'sample_image',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']
