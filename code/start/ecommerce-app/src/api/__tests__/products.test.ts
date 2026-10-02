import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { fetchProduct, fetchProducts } from '../products';

describe('fetchProducts', () => {
  it('loads the product list from the mocked API', async () => {
    const products = await fetchProducts();

    expect(products.length).toBeGreaterThan(0);
    expect(products.some((product) => product.category === 'gpu')).toBe(true);
    expect(products.some((product) => product.category === 'cpu')).toBe(true);
  });

  it('throws when the API responds with an error', async () => {
    server.use(
      http.get('*/api/products', () => {
        return HttpResponse.json({}, { status: 500 });
      }),
    );

    await expect(fetchProducts()).rejects.toThrow('Could not load products (500)');
  });

  it('loads an individual product by ID', async () => {
    const product = await fetchProduct('cpu-amd-ryzen-7-9800x3d');

    expect(product.name).toBe('AMD Ryzen 7 9800X3D');
  });

  it('throws when an individual product does not exist', async () => {
    await expect(fetchProduct('missing-product')).rejects.toThrow('Could not load product (404)');
  });
});