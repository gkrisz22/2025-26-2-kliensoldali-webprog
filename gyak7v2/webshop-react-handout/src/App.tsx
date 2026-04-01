// TODO (React Router): Importáld a BrowserRouter, Routes, Route komponenseket
// TODO (React Router): Cseréld le a <main> tartalmát útvonalakra
// TODO (useState): Hozd létre a cart state-et, és add át propként a komponenseknek

import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import { Route, Routes } from 'react-router';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import useCart from './hook/useCart';
// import ProductsPage from './pages/ProductsPage';
// import ProductDetailPage from './pages/ProductDetailPage';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';

function App() {
  const { cartItems, cartCount, addToCart, removeFromCart, updateQuantity, clearCart} = useCart();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar cartCount={cartCount} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
          <Route path="/termekek" element={<ProductsPage onAddToCart={addToCart} />} />
          <Route path="/termekek/:id" element={<ProductDetailPage onAddToCart={addToCart} />} />

          <Route path="/kosar" element={<CartPage cartItems={cartItems} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />} />
          <Route path="/fizetes" element={<CheckoutPage cartItems={cartItems} onOrderComplete={() => clearCart()} />} />
        </Routes>
        {/*
         * Jelenleg csak a HomePage látható.
         * Feladat: add hozzá a React Router-t, és irányítsd a megfelelő oldalakra!
         */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
