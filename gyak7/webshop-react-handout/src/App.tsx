// TODO (React Router): Importáld a BrowserRouter, Routes, Route komponenseket
// TODO (React Router): Cseréld le a <main> tartalmát útvonalakra
// TODO (useState): Hozd létre a cart state-et, és add át propként a komponenseknek

import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { useState } from 'react';
import type { CartItem, Product } from './types';
import CartPage from './pages/CartPage';
// import ProductsPage from './pages/ProductsPage';
// import ProductDetailPage from './pages/ProductDetailPage';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';

import productsJson from './data/products.json';

/*
let a = [1,2,3]
let b = [4, 5, 6]
let c = [...a, 10 ,...b] = [1,2,3,4,5,6]
*/

const products = productsJson as Product[];
function App() {

  const [cart, setCart] = useState<CartItem[]>([{product: products[1], quantity: 1} ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        {/*
         * Jelenleg csak a HomePage látható.
         * Feladat: add hozzá a React Router-t, és irányítsd a megfelelő oldalakra!
         */}
        <CartPage cart={cart} setCart={setCart} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
