// TODO (React Router): Az <a href="#"> linkeket cseréld le <Link to="..."> elemekre

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </div>
              <span className="font-bold text-white text-lg">WebShop</span>
            </div>
            <p className="text-sm leading-relaxed">
              A legjobb termékek egy helyen. Megbízható minőség, gyors szállítás.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigáció</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Főoldal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termékek</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kosár</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Kategóriák</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Laptopok</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Telefonok</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Audio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kiegészítők</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Kapcsolat</h4>
            <ul className="space-y-2.5 text-sm">
              <li>info@webshop.hu</li>
              <li>+36 1 234 5678</li>
              <li>1051 Budapest, Példa u. 1.</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 WebShop. Minden jog fenntartva.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Adatvédelem</a>
            <a href="#" className="hover:text-white transition-colors">ÁSZF</a>
            <a href="#" className="hover:text-white transition-colors">Sütik</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
