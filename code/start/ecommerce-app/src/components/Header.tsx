// src/components/Header.tsx
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/useCartStore';

const Header = () => {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo Link */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition-colors">
          E-Commerce App
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link 
            to="/products" 
            className="hover:text-gray-200 transition-colors"
          >
            Products
          </Link>
          
          {/* Updated Cart Link */}
          <Link 
            to="/cart" 
            className="relative hover:text-gray-200 transition-colors"
          >
            Cart {totalItems > 0 && `(${totalItems})`} {/* Changed this line */}
          </Link>
          <Link  to="/profile" className="hover:text-gray-200 transition-colors">
          Profile
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;