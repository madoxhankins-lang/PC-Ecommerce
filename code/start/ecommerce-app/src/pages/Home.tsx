import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import type { Product } from '../types';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function Home() {
  const productsQuery = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const featuredProducts = productsQuery.data ? [...productsQuery.data].sort((first, second) => (first.popularityRank ?? 999) - (second.popularityRank ?? 999)).slice(0, 3) : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-500/15 via-zinc-950 to-zinc-950 p-8 shadow-2xl shadow-sky-950/30 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Performance. Precision. Power.</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Build the rig that keeps up with your ambitions.
            </h1>
            <p className="mt-5 max-w-xl text-base text-zinc-300">
              From elite GPUs to the latest DDR5 kits, discover premium PC parts curated for creators, gamers, and builders.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products" className="rounded bg-sky-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-400">
                Browse products
              </Link>
              <Link to="/profile" className="rounded border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                Manage profile
              </Link>
            </div>
            <div className="mt-8 grid gap-4 text-sm text-zinc-300 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-bold text-white">2-day</p>
                <p>Shipping on select builds</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">48+</p>
                <p>Top-tier components</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4.9/5</p>
                <p>Builder satisfaction</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Featured build</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
              <img
                src={featuredProducts[0]?.image ?? 'https://images.unsplash.com/...'}
                alt={featuredProducts[0]?.name ?? 'Featured gaming PC component'}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-zinc-400">Starting at</p>
                <p className="text-2xl font-bold text-white">{currency.format(featuredProducts[0]?.price ?? 799)}</p>
              </div>
              <Link to="/products" className="text-sm font-semibold text-sky-300 hover:text-sky-200">
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Popular picks</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Trending hardware</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-sky-300 hover:text-sky-200">
            View all products
          </Link>
        </div>

        {productsQuery.isLoading ? (
          <p className="rounded border border-white/10 bg-zinc-900 p-8 text-center text-zinc-300">Loading featured products...</p>
        ) : productsQuery.isError ? (
          <p className="rounded border border-red-500/30 bg-red-500/5 p-8 text-center text-red-200">Could not load featured products.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <article key={product.id} className="overflow-hidden rounded border border-white/10 bg-zinc-900">
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
                </Link>
                <div className="space-y-3 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.18em] text-sky-300">{product.category}</span>
                    <span className="text-xs text-zinc-400">{product.brand}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    <Link to={`/products/${product.id}`} className="hover:text-sky-200">{product.name}</Link>
                  </h3>
                  <p className="text-sm text-zinc-300">{product.description}</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-lg font-bold text-white">{currency.format(product.price)}</span>
                    <span className="text-xs text-emerald-300">{product.stock} in stock</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
