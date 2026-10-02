import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function ProfilePage() {
  const profile = useUserStore((state) => state.profile);
  const addresses = useUserStore((state) => state.addresses);
  const orders = useUserStore((state) => state.orders);
  const updateProfile = useUserStore((state) => state.updateProfile);
  const addAddress = useUserStore((state) => state.addAddress);
  const removeAddress = useUserStore((state) => state.removeAddress);

  const [formData, setFormData] = useState(profile);
  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const recentOrders = useMemo(
    () => [...orders].sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()).slice(0, 3),
    [orders],
  );

  const handleProfileSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile(formData);
  };

  const handleAddAddress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newAddress.label || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      return;
    }

    addAddress({
      id: `${newAddress.label.toLowerCase()}-${Date.now()}`,
      ...newAddress,
    });
    setNewAddress({ label: '', street: '', city: '', state: '', zipCode: '' });
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Account</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Profile</h1>
        </div>
        <Link to="/orders" className="rounded border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-200 hover:bg-sky-500/20">
          My Orders
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-white">Account details</h2>
          <form onSubmit={handleProfileSave} className="mt-5 space-y-4">
            <label className="block text-sm text-zinc-300">
              <span className="mb-2 block font-medium text-zinc-100">Name</span>
              <input
                type="text"
                value={formData.name}
                onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-sky-500"
              />
            </label>

            <label className="block text-sm text-zinc-300">
              <span className="mb-2 block font-medium text-zinc-100">Email</span>
              <input
                type="email"
                value={formData.email}
                onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-sky-500"
              />
            </label>

            <button type="submit" className="rounded bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400">
              Save profile
            </button>
          </form>
        </section>

        <section className="rounded border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-white">Recent order history</h2>
          <div className="mt-5 space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="rounded border border-white/10 bg-zinc-950 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{order.id}</p>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    {order.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">{new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                <p className="mt-2 text-lg font-bold text-white">{currency.format(order.total)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded border border-white/10 bg-zinc-900 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-white">Saved addresses</h2>
          <Link to="/orders" className="text-sm font-medium text-sky-300 hover:text-sky-200">View all orders</Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <div key={address.id} className="rounded border border-white/10 bg-zinc-950 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">{address.label}</p>
                <button
                  type="button"
                  onClick={() => removeAddress(address.id)}
                  className="text-xs font-medium text-red-300 hover:text-red-200"
                >
                  Remove
                </button>
              </div>
              <p className="mt-3 text-sm text-zinc-300">{address.street}</p>
              <p className="text-sm text-zinc-300">{address.city}, {address.state} {address.zipCode}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddAddress} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block text-sm text-zinc-300">
            <span className="mb-2 block font-medium text-zinc-100">Label</span>
            <input
              type="text"
              value={newAddress.label}
              onChange={(event) => setNewAddress((current) => ({ ...current, label: event.target.value }))}
              placeholder="Home"
              className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-sky-500"
            />
          </label>
          <label className="block text-sm text-zinc-300">
            <span className="mb-2 block font-medium text-zinc-100">Street</span>
            <input
              type="text"
              value={newAddress.street}
              onChange={(event) => setNewAddress((current) => ({ ...current, street: event.target.value }))}
              placeholder="123 Main St"
              className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-sky-500"
            />
          </label>
          <label className="block text-sm text-zinc-300">
            <span className="mb-2 block font-medium text-zinc-100">City</span>
            <input
              type="text"
              value={newAddress.city}
              onChange={(event) => setNewAddress((current) => ({ ...current, city: event.target.value }))}
              placeholder="Seattle"
              className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-sky-500"
            />
          </label>
          <label className="block text-sm text-zinc-300">
            <span className="mb-2 block font-medium text-zinc-100">State</span>
            <input
              type="text"
              value={newAddress.state}
              onChange={(event) => setNewAddress((current) => ({ ...current, state: event.target.value }))}
              placeholder="WA"
              className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-sky-500"
            />
          </label>
          <label className="block text-sm text-zinc-300 md:col-span-2">
            <span className="mb-2 block font-medium text-zinc-100">ZIP code</span>
            <input
              type="text"
              value={newAddress.zipCode}
              onChange={(event) => setNewAddress((current) => ({ ...current, zipCode: event.target.value }))}
              placeholder="98101"
              className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-sky-500"
            />
          </label>
          <div className="md:col-span-2">
            <button type="submit" className="rounded bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-white">
              Add address
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ProfilePage;
