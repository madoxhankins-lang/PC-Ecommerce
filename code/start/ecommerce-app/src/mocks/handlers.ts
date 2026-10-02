import { http, HttpResponse } from 'msw';
import { demoProducts } from '../data/products';

export const handlers = [
  http.get('*/api/products', () => {
    return HttpResponse.json({ products: demoProducts });
  }),
  http.get('*/api/products/:productId', ({ params }) => {
    const product = demoProducts.find((item) => item.id === params.productId);

    if (!product) {
      return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return HttpResponse.json({ product });
  }),
];