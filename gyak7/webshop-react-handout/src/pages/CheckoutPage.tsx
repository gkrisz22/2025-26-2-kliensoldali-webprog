// TODO (Formok): Hozz létre formData state-et az összes mezőhöz
// TODO (Formok): Kösd össze az input mezőket onChange handlerekkel
// TODO (Formok): Az onSubmit-ban hívd az e.preventDefault()-ot, majd validáld az adatokat
// TODO (Formok): Sikeres küldés után mutass visszaigazoló képernyőt

// TODO (React Router): A "Vissza a kosárhoz" linket kösd össze a /kosar útvonallal
// TODO (useState): A cartItems-t és onOrderComplete-et prop-ként kapja a komponens

import { formatPrice } from '../utils/formatPrice';

// TODO: cseréld le props-ra
const SHIPPING_THRESHOLD = 30000;
const SHIPPING_COST = 1990;
const subtotal = 629970;
const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
const total = subtotal + shipping;

// TODO: ezt a változót cseréld le useState-re
const formData = {
  nev: '',
  email: '',
  telefon: '',
  iranyitoszam: '',
  varos: '',
  cim: '',
  fizetesiMod: 'kartya',
  megjegyzes: '',
};

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-8">
        <a href="#" className="text-sm text-slate-500 hover:text-violet-600 transition-colors flex items-center gap-1 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Vissza a kosárhoz
        </a>
        <h1 className="text-3xl font-bold text-slate-900">Rendelés leadása</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Form */}
        <div className="lg:col-span-2">
          <form>

            {/* Personal data */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
              <h2 className="font-bold text-slate-900 text-lg mb-5">Személyes adatok</h2>
              <div className="grid sm:grid-cols-2 gap-4">

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Teljes név <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nev"
                    value={formData.nev}
                    readOnly
                    placeholder="Kovács János"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                  {/* TODO: ide kerül a hibaüzenet, ha a mező üres */}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email cím <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    placeholder="kovacs.janos@email.hu"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Telefonszám
                  </label>
                  <input
                    type="tel"
                    name="telefon"
                    value={formData.telefon}
                    readOnly
                    placeholder="+36 30 123 4567"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

              </div>
            </div>

            {/* Shipping address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
              <h2 className="font-bold text-slate-900 text-lg mb-5">Szállítási cím</h2>
              <div className="grid sm:grid-cols-3 gap-4">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Irányítószám <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="iranyitoszam"
                    value={formData.iranyitoszam}
                    readOnly
                    placeholder="1051"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Város <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="varos"
                    value={formData.varos}
                    readOnly
                    placeholder="Budapest"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Cím (utca, házszám) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="cim"
                    value={formData.cim}
                    readOnly
                    placeholder="Példa utca 12. 3/A"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
              <h2 className="font-bold text-slate-900 text-lg mb-5">Fizetési mód</h2>
              <div className="space-y-3">

                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  formData.fizetesiMod === 'kartya' ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="fizetesiMod"
                    value="kartya"
                    checked={formData.fizetesiMod === 'kartya'}
                    readOnly
                    className="accent-violet-600 w-4 h-4"
                  />
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Bankkártyás fizetés</p>
                    <p className="text-xs text-slate-500 mt-0.5">Visa, Mastercard, American Express</p>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  formData.fizetesiMod === 'utanvet' ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="fizetesiMod"
                    value="utanvet"
                    checked={formData.fizetesiMod === 'utanvet'}
                    readOnly
                    className="accent-violet-600 w-4 h-4"
                  />
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Utánvét</p>
                    <p className="text-xs text-slate-500 mt-0.5">Fizetés átvételkor, készpénzzel</p>
                  </div>
                </label>

              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
              <h2 className="font-bold text-slate-900 text-lg mb-5">Megjegyzés</h2>
              <textarea
                name="megjegyzes"
                value={formData.megjegyzes}
                readOnly
                placeholder="Egyéb kérés a futárnak vagy a csomagolással kapcsolatban..."
                rows={3}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 rounded-xl transition-colors shadow-md shadow-violet-200 text-base"
            >
              Rendelés megerősítése
            </button>

          </form>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
            <h2 className="font-bold text-slate-900 text-lg mb-5">Rendelés összesítő</h2>

            {/* TODO: térképezd fel a cartItems prop-ot */}
            <div className="space-y-3 mb-5">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">ProBook Laptop 15"</p>
                  <p className="text-xs text-slate-400">2 db</p>
                </div>
                <p className="text-sm font-semibold text-slate-900 shrink-0">{formatPrice(599980)}</p>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">SoundMax fejhallgató</p>
                  <p className="text-xs text-slate-400">1 db</p>
                </div>
                <p className="text-sm font-semibold text-slate-900 shrink-0">{formatPrice(49990)}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Részösszeg</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Szállítás</span>
                <span className={`font-medium ${shipping === 0 ? 'text-emerald-600' : ''}`}>
                  {shipping === 0 ? 'Ingyenes' : formatPrice(shipping)}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-slate-900">Összesen</span>
                <span className="font-bold text-2xl text-slate-900">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">ÁFA-val együtt</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
