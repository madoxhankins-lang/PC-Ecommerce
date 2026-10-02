import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/useCartStore';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="relative z-30 border-b border-white/10 bg-zinc-950 text-zinc-100">
      <nav className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded border border-white/15 px-3 py-2 text-sm md:hidden"
          >
            Menu
          </button>
          <Link to="/" className="text-lg font-bold tracking-wide text-white">
            PC Parts
          </Link>
        </div>

        <div className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
          <Link to="/products" className="transition-colors hover:text-white">Products</Link>
          <Link to="/orders" className="transition-colors hover:text-white">My Orders</Link>
        </div>

        <div className="flex items-center justify-self-end gap-4 text-sm text-zinc-300">
          <Link to="/cart" className="transition-colors hover:text-white">
            Cart{totalItems > 0 && ` (${totalItems})`}
          </Link>
          <Link to="/profile" className="hidden transition-colors hover:text-white sm:inline">
            Profile
          </Link>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <aside
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="relative h-full w-72 max-w-[85vw] border-r border-white/10 bg-zinc-900 p-6 shadow-xl"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-semibold text-white">Browse</span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="rounded border border-white/15 px-3 py-2 text-sm text-zinc-200"
              >
                Close
              </button>
            </div>
            <div className="flex flex-col gap-5 text-sm text-zinc-300">
              <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link to="/orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>Cart</Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

export default Header;