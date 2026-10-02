import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function OrdersPage() {
  const orders = useUserStore((state) => state.orders);

  const sortedOrders = useMemo(
    () => [...orders].sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()),
    [orders],
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Account</p>
          <h1 className="mt-2 text-3xl font-bold text-white">My Orders</h1>
        </div>
        <Link to="/profile" className="rounded border border-white/10 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-white/5">
          Back to profile
        </Link>
      </div>

      {sortedOrders.length === 0 ? (
        <div className="rounded border border-dashed border-white/10 bg-zinc-900 p-8 text-center text-zinc-300">
          No orders yet. Start shopping for your next build.
        </div>
      ) : (
        <div className="space-y-4">
          {sortedOrders.map((order) => (
            <article key={order.id} className="rounded border border-white/10 bg-zinc-900 p-5 shadow-sm shadow-black/20">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Order {order.id}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{new Date(order.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                    {order.status}
                  </span>
                  <span className="text-lg font-bold text-white">{currency.format(order.total)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default OrdersPage;
