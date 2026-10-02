import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { fetchProduct } from '../api/products';
import QuantityControl from '../components/QuantityControl';
import { useCartStore } from '../stores/useCartStore';
import type { Product } from '../types';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');
  const inCartQuantity = useCartStore(
    (state) => state.items.find((item) => item.productId === productId)?.quantity ?? 0,
  );
  const addItem = useCartStore((state) => state.addItem);
  const productQuery = useQuery<Product, Error>({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId ?? ''),
    enabled: Boolean(productId),
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/products" className="text-sm text-sky-300 hover:text-sky-200">
        Back to products
      </Link>

      {productQuery.isLoading && <p role="status" className="py-12 text-zinc-300">Loading product...</p>}

      {productQuery.isError && (
        <div role="alert" className="py-12">
          <h1 className="text-2xl font-semibold text-zinc-100">Product unavailable</h1>
          <p className="mt-2 text-zinc-400">{productQuery.error.message}</p>
        </div>
      )}

      {productQuery.data && (
        <article className="mt-6 grid gap-8 md:grid-cols-2">
          <img
            src={productQuery.data.image}
            alt={productQuery.data.name}
            className="aspect-[4/3] w-full rounded border border-white/10 bg-zinc-900 object-cover"
          />
          <div>
            <p className="text-sm font-semibold uppercase text-sky-300">
              {productQuery.data.category.replace('-', ' ')} / {productQuery.data.brand}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-zinc-100">{productQuery.data.name}</h1>
            <p className="mt-4 text-zinc-300">{productQuery.data.description}</p>
            <p className="mt-5 text-2xl font-bold text-white">{currency.format(productQuery.data.price)}</p>
            <p className="mt-1 text-sm text-zinc-400">{productQuery.data.stock} in stock</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <QuantityControl
                value={quantity}
                max={Math.max(1, productQuery.data.stock - inCartQuantity)}
                label={`Quantity for ${productQuery.data.name}`}
                onChange={setQuantity}
              />
              <button
                type="button"
                disabled={productQuery.data.stock - inCartQuantity < quantity}
                onClick={() => {
                  addItem(productQuery.data.id, quantity);
                  setAddedMessage(`Added ${quantity} to cart`);
                  setQuantity(1);
                }}
                className="rounded bg-zinc-100 px-5 py-2 text-sm font-semibold text-zinc-900 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {productQuery.data.stock - inCartQuantity > 0 ? 'Add to cart' : 'Out of stock'}
              </button>
            </div>
            <p aria-live="polite" className="mt-2 min-h-4 text-xs text-emerald-300">{addedMessage}</p>

            <section className="mt-8 border-t border-white/10 pt-5">
              <h2 className="text-lg font-semibold text-zinc-100">Specifications</h2>
              <dl className="mt-3 divide-y divide-white/10">
                {Object.entries(productQuery.data.specifications).map(([name, value]) => (
                  <div key={name} className="flex justify-between gap-4 py-2 text-sm">
                    <dt className="text-zinc-400">{name}</dt>
                    <dd className="text-right text-zinc-200">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </article>
      )}
    </main>
  );
}

export default ProductDetail;