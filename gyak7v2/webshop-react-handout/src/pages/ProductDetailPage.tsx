// TODO (React Router): Használd a useParams() hook-ot a termék ID lekéréséhez
// TODO (useState): A quantity legyen state változó, a +/- gombok módosítsák
// TODO (useState): A "Kosárba helyezés" gomb hívja meg az addToCart függvényt

import productsData from '../data/products.json';
import type { Product } from '../types';
import { formatPrice } from '../utils/formatPrice';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router';
import { useState } from 'react';

const products = productsData as Product[];

// TODO: ezt a sort cseréld le useParams() + products.find(...) hívásra
//const product = products[0];

const relatedProducts = (product) => products
  .filter((p) => p.category === product.category && p.id !== product.id)
  .slice(0, 4);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductDetailPage({onAddToCart} : {onAddToCart: (product: Product, quantity: number) => void}) {
  // TODO: ezt a változót cseréld le useState-re
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if(!product) {
    return <p>Ez a termék nem található ({id})</p>
  }

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <a href="#" className="hover:text-violet-600 transition-colors">Főoldal</a>
        <span>/</span>
        <a href="#" className="hover:text-violet-600 transition-colors">Termékek</a>
        <span>/</span>
        <a href="#" className="hover:text-violet-600 transition-colors">{product.category}</a>
        <span>/</span>
        <span className="text-slate-900 font-medium truncate">{product.name}</span>
      </nav>

      {/* Detail layout */}
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16">

        {/* Image */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && product.badge !== 'Elfogyott' && (
              <span className={`absolute top-4 left-4 text-sm font-semibold px-3 py-1.5 rounded-full ${
                product.badge === 'Akció'   ? 'bg-red-500 text-white'    :
                product.badge === 'Prémium' ? 'bg-violet-600 text-white' :
                                              'bg-emerald-500 text-white'
              }`}>
                {product.badge}
              </span>
            )}
          </div>
          {/* Thumbnail row */}
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                  i === 0 ? 'border-violet-500' : 'border-transparent hover:border-slate-300'
                }`}
              >
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-violet-600 text-sm font-medium uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <StarRating rating={product.rating} />
            <span className="text-sm font-semibold text-slate-900">{product.rating}</span>
            <span className="text-sm text-slate-500">({product.reviewCount} értékelés)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-slate-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="bg-red-100 text-red-600 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2 mb-6">
            <span className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-400'}`} />
            <span className={`text-sm font-medium ${product.inStock ? 'text-emerald-600' : 'text-red-500'}`}>
              {product.inStock ? 'Raktáron - azonnal szállítható' : 'Elfogyott'}
            </span>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8">{product.description}</p>

          {/* Quantity + Cart button */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-slate-50 transition-colors text-slate-600 font-medium text-lg leading-none">
                -
              </button>
              <span className="px-5 py-3 text-slate-900 font-semibold border-x border-slate-200 min-w-[3rem] text-center">
                {quantity}
              </span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-slate-50 transition-colors text-slate-600 font-medium text-lg leading-none">
                +
              </button>
            </div>
            <button
              disabled={!product.inStock}
              onClick={() => onAddToCart(product, quantity)}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-colors ${
                product.inStock
                  ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Kosárba helyezés
            </button>
          </div>

          {/* Trust badges */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
            {[
              { icon: '🚚', text: 'Ingyenes szállítás 30 000 Ft felett' },
              { icon: '↩️', text: '30 napos visszaküldési garancia' },
              { icon: '🛡️', text: '2 év gyártói garancia' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-slate-600">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Related products */}
      {relatedProducts(product).length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Hasonló termékek</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {relatedProducts(product).map((p) => (
              <ProductCard onAddToCart={onAddToCart} key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
