from django.urls import path
from .views import *

urlpatterns = [
    path('services/list/', ServiceListView.as_view(), name='service-list'),
    path('services/<int:pk>/', ServiceDetailView.as_view(), name='service-detail'),
    path('services/manage/', SellerServiceManageView.as_view(), name='seller-service-manage'),
    path('services/manage/<int:pk>/', SellerServiceDetailView.as_view(), name='seller-service-detail'),
]
