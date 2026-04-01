// TODO (useState): A cartItems legyen state változó (App.tsx-ből prop-ként kapja)
// TODO (useState): A mennyiség +/- gombok és a törlés gomb módosítsák a state-et

import productsData from '../data/products.json';
import type { Product, CartItem } from '../types';
import { formatPrice } from '../utils/formatPrice';

const SHIPPING_THRESHOLD = 30000;
const SHIPPING_COST = 1990;

interface CartPageProps {
  cart: CartItem[]
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}

//props = { cart, setCart}
export default function CartPage({cart, setCart}:CartPageProps) {
  const isEmpty = cart.length === 0;
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  console.log(cart)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Kosaram</h1>

      {isEmpty ? (

        /* Empty state */
        <div className="text-center py-24">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">A kosár üres</h2>
          <p className="text-slate-500 mb-8">Adj hozzá termékeket a vásárlás megkezdéséhez!</p>
          <a
            href="#"
            className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            Termékek böngészése
          </a>
        </div>

      ) : (

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex gap-5">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-violet-600 font-medium uppercase tracking-wide">{product.category}</p>
                      <h3 className="font-semibold text-slate-900 mt-0.5">{product.name}</h3>
                    </div>
                    {/* Delete button */}
                    <button className="text-slate-300 hover:text-red-500 transition-colors p-1 shrink-0 rounded-lg hover:bg-red-50">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <button className="px-3 py-1.5 hover:bg-slate-50 transition-colors text-slate-600 text-sm font-medium">−</button>
                      <span className="px-4 py-1.5 text-slate-900 font-semibold text-sm border-x border-slate-200">{quantity}</span>
                      <button className="px-3 py-1.5 hover:bg-slate-50 transition-colors text-slate-600 text-sm font-medium">+</button>
                    </div>
                    {/* Line price */}
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{formatPrice(product.price * quantity)}</p>
                      {quantity > 1 && (
                        <p className="text-xs text-slate-400">{formatPrice(product.price)} / db</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
              <h2 className="font-bold text-slate-900 text-lg mb-6">Rendelés összesítő</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Részösszeg ({cart.reduce((s, i) => s + i.quantity, 0)} termék)</span>
                  <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Szállítás</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {shipping === 0 ? 'Ingyenes' : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < SHIPPING_THRESHOLD && (
                  <div className="bg-amber-50 text-amber-700 text-xs rounded-xl px-3 py-2.5 leading-relaxed border border-amber-100">
                    Még <strong>{formatPrice(SHIPPING_THRESHOLD - subtotal)}</strong> hiányzik az ingyenes szállításhoz!
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">Összesen</span>
                  <span className="font-bold text-2xl text-slate-900">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">ÁFA-val együtt</p>
              </div>

              <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md shadow-violet-200 mb-3">
                Megrendelés leadása
              </button>
              <a href="#" className="w-full flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors py-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Vásárlás folytatása
              </a>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
