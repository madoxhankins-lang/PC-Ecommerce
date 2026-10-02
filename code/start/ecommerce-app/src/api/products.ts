import type { Product } from '../types';

export const fetchProducts = async (): Promise<Product[]> => {
  const url = new URL('/api/products', window.location.origin);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not load products (${response.status})`);
  }

  const data: { products: Product[] } = await response.json();
  return data.products;
};

export const fetchProduct = async (productId: string): Promise<Product> => {
  const url = new URL(`/api/products/${encodeURIComponent(productId)}`, window.location.origin);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not load product (${response.status})`);
  }

  const data: { product: Product } = await response.json();
  return data.product;
};
