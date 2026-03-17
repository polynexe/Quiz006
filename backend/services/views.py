from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .models import Service
from .serializers import ServiceSerializer


class ServiceListView(generics.ListCreateAPIView):
    """
    GET: List all public services (no authentication required)
    POST: Create a new service (seller only)
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class ServiceDetailView(generics.RetrieveAPIView):
    """
    GET: Retrieve a specific service by ID (public view)
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    lookup_field = 'pk'


class SellerServiceManageView(generics.ListAPIView):
    """
    GET: List all services for the authenticated seller
    """
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Service.objects.filter(seller=self.request.user)


class SellerServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Retrieve a specific service for the seller
    PUT/PATCH: Update a specific service (seller only)
    DELETE: Delete a specific service (seller only)
    """
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'
    
    def get_queryset(self):
        return Service.objects.filter(seller=self.request.user)
    
    def get_object(self):
        obj = super().get_object()
        if obj.seller != self.request.user:
            raise PermissionDenied("You do not have permission to perform this action.")
        return obj
    
    def perform_update(self, serializer):
        serializer.save(seller=self.request.user)

