from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User


class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'username',
            'phone_number',
            'first_name',
            'last_name',
            'location',
            'gender',
            'role',
            'merchant_id',
            'seller_status',
            'seller_application_reason',
            'isAdmin',
        ]

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['token']

    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        return str(refresh.access_token)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD

    def validate(self, attrs):
        data = super().validate(attrs)
        data.update(UserSerializerWithToken(self.user).data)
        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = [
            'email',
            'username',
            'password',
            'phone_number',
            'first_name',
            'last_name',
            'location',
            'gender',
            'merchant_id',
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        return User.objects.create_user(
            password=password,
            role=User.Role.USER,
            **validated_data,
        )


class SellerApplicationSerializer(serializers.Serializer):
    seller_application_reason = serializers.CharField(required=True, write_only=True)

    def update(self, instance, validated_data):
        instance.seller_status = User.SellerStatus.PENDING
        instance.seller_application_reason = validated_data.get('seller_application_reason', instance.seller_application_reason)
        instance.save()
        return instance
