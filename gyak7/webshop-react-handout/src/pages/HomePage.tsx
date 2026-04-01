// TODO (React Router): A "Termékek böngészése" gombot kösd össze a /termekek útvonallal

import productsData from '../data/products.json';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import heroImage from '../assets/hero.png';

const products = productsData as Product[];
const featuredProducts = products.slice(0, 4);

const categories = [
  { name: 'Laptopok',     icon: '💻', color: 'bg-blue-50   border-blue-100   text-blue-700'   },
  { name: 'Telefonok',    icon: '📱', color: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
  { name: 'Audio',        icon: '🎧', color: 'bg-violet-50  border-violet-100  text-violet-700'  },
  { name: 'Kiegészítők',  icon: '🖱️', color: 'bg-amber-50   border-amber-100   text-amber-700'   },
];

export default function HomePage() {
  return (
    <div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              <span className="inline-block bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/20">
                🛍️ Üdvözlünk a WebShop-ban
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Fedezd fel a legjobb{' '}
                <span className="text-violet-200">ajánlatokat</span>
              </h1>
              <p className="text-violet-100 text-lg md:text-xl mb-8 leading-relaxed">
                Több ezer termék egy helyen. Gyors szállítás, megbízható minőség, versenyképes árak.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="bg-white text-violet-700 hover:bg-violet-50 px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg"
                >
                  Termékek böngészése
                </a>
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors border border-white/20"
                >
                  Akciók megtekintése
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 pt-10 border-t border-white/20">
                <div>
                  <p className="text-2xl font-bold">1 200+</p>
                  <p className="text-violet-200 text-sm">Termék</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">50 000+</p>
                  <p className="text-violet-200 text-sm">Elégedett vevő</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">1-3 nap</p>
                  <p className="text-violet-200 text-sm">Kiszállítás</p>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <img
                src={heroImage}
                alt="WebShop hero"
                className="w-full rounded-2xl shadow-2xl shadow-black/30 ring-1 ring-white/10"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Kategóriák</h2>
          <p className="text-slate-500 mt-1">Böngéssz kategóriánként</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className={`flex flex-col gap-3 p-6 rounded-2xl border hover:shadow-sm transition-all ${cat.color}`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <p className="font-semibold">{cat.name}</p>
                <p className="text-sm opacity-70 mt-0.5">
                  {products.filter((p) => p.category === cat.name).length} termék
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Kiemelt termékek</h2>
            <p className="text-slate-500 mt-1">A legjobb ajánlataink</p>
          </div>
          <a href="#" className="text-violet-600 hover:text-violet-700 font-medium text-sm flex items-center gap-1 transition-colors">
            Összes termék
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-violet-200 text-sm font-medium uppercase tracking-wide mb-2">Korlátozott ideig</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Ingyenes szállítás 30 000 Ft felett</h3>
            <p className="text-violet-200">Minden megrendelésre érvényes, automatikusan.</p>
          </div>
          <a
            href="#"
            className="shrink-0 bg-white text-violet-700 hover:bg-violet-50 font-semibold px-8 py-3.5 rounded-xl transition-colors whitespace-nowrap shadow-lg"
          >
            Vásárolj most
          </a>
        </div>
      </section>

    </div>
  );
}
