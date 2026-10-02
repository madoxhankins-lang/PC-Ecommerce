// src/App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import ProfilePage from './pages/Profile';
import OrdersPage from './pages/Orders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;