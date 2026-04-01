// TODO (useState): A searchQuery és activeCategory legyen state változó
// TODO (useState): Szűrd a termékeket a searchQuery és activeCategory alapján
// TODO (useEffect): Szimuláld a termékek betöltését (loading állapot + setTimeout)

import productsData from '../data/products.json';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

const products = productsData as Product[];
const categories = ['Összes', ...Array.from(new Set(products.map((p) => p.category)))];

// TODO: ezt a változót cseréld le useState-re
const activeCategory = 'Összes';
const searchQuery = '';

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Termékek</h1>
        <p className="text-slate-500 mt-1">{products.length} termék elérhető</p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Termék keresése..."
            value={searchQuery}
            readOnly
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
        <select className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer">
          <option>Relevancia szerint</option>
          <option>Ár: növekvő</option>
          <option>Ár: csökkenő</option>
          <option>Értékelés szerint</option>
        </select>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              cat === activeCategory
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}
