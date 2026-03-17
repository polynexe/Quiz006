from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User
from .serializers import (
    MyTokenObtainPairSerializer,
    RegisterSerializer,
    UserSerializer,
    UserSerializerWithToken,
    SellerApplicationSerializer,
)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            UserSerializerWithToken(user).data,
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class AdminUserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    queryset = User.objects.all().order_by('-date_joined')


class ApplySellerView(generics.GenericAPIView):
    serializer_class = SellerApplicationSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        
        # Check if user already applied
        if user.seller_status in [User.SellerStatus.PENDING, User.SellerStatus.APPROVED]:
            return Response(
                {'detail': 'You have already applied or are already a seller.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Update user with seller application
        user.seller_status = User.SellerStatus.PENDING
        user.seller_application_reason = serializer.validated_data.get('seller_application_reason')
        user.save()
        
        return Response(
            UserSerializer(user).data,
            status=status.HTTP_200_OK
        )