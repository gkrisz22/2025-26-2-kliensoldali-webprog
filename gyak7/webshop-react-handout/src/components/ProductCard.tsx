// TODO (useState): Az "onClick" eseményt kösd össze a kosárba helyező függvénnyel

import type { Product } from '../types';
import { formatPrice } from '../utils/formatPrice';

interface ProductCardProps {
  product: Product;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-slate-100 flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && product.badge !== 'Elfogyott' && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              product.badge === 'Akció'   ? 'bg-red-500 text-white'     :
              product.badge === 'Új'      ? 'bg-emerald-500 text-white' :
              product.badge === 'Prémium' ? 'bg-violet-600 text-white'  :
                                            'bg-slate-700 text-white'
            }`}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-400 text-amber-900">
              -{discount}%
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-white text-slate-600 text-sm font-semibold px-4 py-2 rounded-full shadow-sm border border-slate-200">
              Elfogyott
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-medium text-violet-600 uppercase tracking-wide mb-1">
          {product.category}
        </span>
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-slate-400">({product.reviewCount})</span>
        </div>

        {/* Price + Button */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            disabled={!product.inStock}
            className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors ${
              product.inStock
                ? 'bg-violet-600 hover:bg-violet-700 text-white cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Kosárba' : 'Elfogyott'}
          </button>
        </div>
      </div>

    </div>
  );
}
