import axios from "axios";

const API_URL = "http://localhost:8000/api/products/";

export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  category: number;
  image: File;
}

export async function createProduct(data: ProductPayload) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description || "");
  formData.append("price", data.price.toString());
  formData.append("category", data.category.toString());
  formData.append("image", data.image);

  return axios.post(API_URL + "create/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function listProducts() {
  return axios.get(API_URL);
}

export async function listCategories() {
  return axios.get(API_URL + "categories/");
}
