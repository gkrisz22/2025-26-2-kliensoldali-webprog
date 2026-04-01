// TODO (React Router): Az <a href="#"> linkeket cseréld le <Link to="..."> elemekre
// TODO (useState): A cartCount értékét kösd össze a kosár state-tel

const cartCount = 0;

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">WebShop</span>
          </a>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
              Főoldal
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
              Termékek
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <button className="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Keresés...</span>
            </button>

            {/* Cart */}
            <a href="#" className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}
