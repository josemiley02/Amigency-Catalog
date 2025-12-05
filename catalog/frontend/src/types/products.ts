export interface ProductCategory {
  id: number;
  name: string;
  icon: string | null;
}

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  image?: File | string;
  category: number;        // category ID
  category_name?: string;  // category name from API
  created_at?: string;
}
