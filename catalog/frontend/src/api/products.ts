import axios from "axios";
import type { Product } from "../types/products";

const API_URL = "http://127.0.0.1:8000/api/products/";

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProduct = async (product: Product) => {
  const formData = new FormData();
  
  formData.append("name", product.name);
  formData.append("description", product.description || "");
  formData.append("price", product.price.toString());
  formData.append("category", product.category.toString());

  if (product.image instanceof File) {
    formData.append("image", product.image);
  }

  const response = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data;
};
