from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Product, ProductCategory
from .serializers import (
    #GetProductSerializer,
    ProductSerializer,
    CreateProductSerializer,
    ProductCategorySerializer
)


class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.all().order_by('-created_at')
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CreateProductSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryListView(APIView):
    def get(self, request):
        categories = ProductCategory.objects.all()
        serializer = ProductCategorySerializer(categories, many=True)
        return Response(serializer.data)

# class GetProductView(APIView):
#     def get(self, request):
#         product_id = request.data.get('id')
#         if not product_id:
#             return Response({"error": "id required"}, status=400)
#         try:
#             product = Product.objects.get(id=product_id)
#         except Product.DoesNotExist:
#             return Response({"error": "Product not found"})
        
#         serializer = GetProductSerializer( instance= product, data= request.data)
#         serializer.is_valid(raise_exception=True)
#         return Response(serializer.data)