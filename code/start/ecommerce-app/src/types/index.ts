export type ProductCategory =
  | 'cpu'
  | 'gpu'
  | 'ram'
  | 'motherboard'
  | 'ssd'
  | 'power-supply'
  | 'case'
  | 'cooler';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  image: string;
  description: string;
  stock: number;
  rating: number;
  specifications: Record<string, string | number>;
  popularityRank?: number;
}

export interface UserProfile {
  name: string;
  email: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
}