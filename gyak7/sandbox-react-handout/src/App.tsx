import { useState, useEffect, useRef } from 'react' // useState hook
import './App.css'

// =============================================================
//  SANDBOX - useState és useEffect
//  Futtasd: npm run dev
//  Nyisd meg a böngésző konzolját is! (F12 → Console)
// =============================================================


// ─────────────────────────────────────────────
//  1. Számláló — useState alapok
// ─────────────────────────────────────────────
function Szamlalo() {
  const [ertek, setErtek] = useState<number>(-5);

  // Próbáld meg:
  //  - Változtasd meg a kezdőértéket: useState(10)
  //  - Adj hozzá egy "Reset" gombot, ami visszaállítja 0-ra
  //  - Mi történik, ha setCount(count + 1) helyett setCount(count) van?

  function increaseValue() : void {
    setErtek(ertek + 1);
    //setErtek(prev => prev + 1);
  }
  
  return (
    <div className="card">
      <span className="hook-badge">useState</span>
      <h3>Számláló</h3>
      <p className="value">{ertek}</p>

      <div className="row">
        <button onClick={() => {
          setErtek(ertek - 1);
        } 
        }>-</button>
        <button onClick={increaseValue}>+</button> {/* increaseValue, és nem kell () */}
        <button onClick={() => increaseValue()}>+2</button>
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────
//  2. Be/Ki kapcsoló — boolean state
// ─────────────────────────────────────────────
function Kapcsolo() {
  const [visible, setVisible] = useState(false)

  // Próbáld meg:
  //  - Változtasd az alapértéket true-ra
  //  - Adj hozzá egy másik state-et, pl. színváltáshoz

  return (
    <div className="card">
      <span className="hook-badge">useState</span>
      <h3>Be/Ki kapcsoló</h3>
      <button onClick={() => setVisible(!visible)}>
        {
          visible ? "Elrejtés" : "Mutassa"
        }
      </button>
      { visible &&  <p className="message">Helló! Látható vagyok! 👋</p> }
    </div>
  )
}


// ─────────────────────────────────────────────
//  3. Kontrollált input — szöveg + karakterszámláló
// ─────────────────────────────────────────────
function KontrollaltInput() {
  const [text, setText] = useState('')
  const limit = 50

  // Próbáld meg:
  //  - Add hozzá, hogy a szöveg pirosra váltson, ha eléri a limitet
  //  - Mi a különbség a "controlled" és "uncontrolled" input közt?
  //    (Uncontrolled: nincs value és onChange, csak ref)

  return (
    <div className="card">
      <span className="hook-badge">useState</span>
      <h3>Kontrollált input</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={limit}
        placeholder="Írj valamit..."
      />
      <p className="hint">
        {text.length} / {limit} karakter
      </p>
      {text && <p className="message">Beírtad: „{text}"</p>}
    </div>
  )
}


// ─────────────────────────────────────────────
//  4. useEffect - minden renderkor lefut (nincs deps)
// ─────────────────────────────────────────────
function MindenRenderkor() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  useEffect(() => {
    console.log('🔄 Effect lefutott - count:', count, '| text:', text)
  }) // ← nincs dependency array!

  // Próbáld meg:
  //  - Kattints a gombra, majd gépelj a mezőbe → mindkettő triggereli
  //  - Add hozzá a [] dependency arrayt → mi változik?

  return (
    <div className="card">
      <span className="hook-badge">useEffect</span>
      <h3>Minden renderkor lefut</h3>
      <p className="hint">Nézd a konzolt minden interakció után!</p>
      <div className="row">
        <button onClick={() => setCount(count + 1)}>Kattints ({count})</button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Gépelj..."
        />
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────
//  5. useEffect - csak mountoláskor fut le (üres deps)
// ─────────────────────────────────────────────
function CsakMountolaskor() {
  const [adat, setAdat] = useState<string | null>(null)
  const [tolt, setTolt] = useState(true)
  //const inputRef = useRef<any>(undefined);

  useEffect(() => {
    console.log("Hello");
  }, [])

  useEffect(() => {
    console.log("Változott a tölt állapota: ", tolt);
  }, [tolt, adat]) // Dependency list 

  // Próbáld meg:
  //  - Változtasd 1500-at 3000-re → lassabb betöltés
  //  - Mi történik, ha kiveszed a []? (Végtelen loop!)

  return (
    <div className="card">
      <span className="hook-badge">useEffect</span>
      <h3>Csak mountoláskor</h3>

      <button onClick={() => setTolt(!tolt)}>Tölt</button>

      {tolt ? <p className="hint">Betöltés...</p> : <p className="message">{adat}</p>}
    </div>
  )
}


// ─────────────────────────────────────────────
//  6. useEffect - state figyelése (deps array)
// ─────────────────────────────────────────────
function StateFigyeles() {
  const [count, setCount] = useState(0)
  const [paros, setParos] = useState(true)

  useEffect(() => {
    console.log(`👀 count megváltozott: ${count}`)
    setParos(count % 2 === 0)
  }, [count]) // ← csak akkor fut, ha count változik

  // Próbáld meg:
  //  - Add hozzá a szöveg state-et is a deps-hez
  //  - Mi történik, ha count helyett [] áll? (Sosem frissül a "páros" állapot)

  return (
    <div className="card">
      <span className="hook-badge">useEffect</span>
      <h3>State figyelése</h3>
      <p className="value">{count}</p>
      <button onClick={() => setCount(count + 1)}>Növel</button>
      <p className="message">{paros ? 'Páros' : 'Páratlan'}</p>
    </div>
  )
}


// ─────────────────────────────────────────────
//  7. useEffect - cleanup (időzítő leállítása)
// ─────────────────────────────────────────────
function Idozito() {
  const [masodperc, setMasodperc] = useState(0)
  const [fut, setFut] = useState(false)

  useEffect(() => {
    if (!fut) return // ha nem fut, ne indítson intervalt

    const interval = setInterval(() => {
      setMasodperc((s) => s + 1) // funkcionális update!
    }, 1000)

    return () => {
      clearInterval(interval) // ← cleanup: leállítja az intervalt
      console.log('🧹 Cleanup: interval törölve')
    }
  }, [fut]) // ← fut változásakor újraindul az effect

  // Próbáld meg:
  //  - Töröld ki a return () => clearInterval(interval) sort
  //    → indítsd el, állítsd meg, indítsd újra → mi történik?
  //  - Miért kell (s) => s + 1 a setMasodperc-ben, nem pedig masodperc + 1?

  return (
    <div className="card">
      <span className="hook-badge">useEffect + cleanup</span>
      <h3>Időzítő</h3>
      <p className="value">{masodperc}s</p>
      <div className="row">
        <button onClick={() => setFut(!fut)}>
          {fut ? '⏸ Megállít' : '▶ Elindít'}
        </button>
        <button onClick={() => { setFut(false); setMasodperc(0) }}>
          ↺ Visszaállít
        </button>
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────
//  App - az összes sandbox egyben
// ─────────────────────────────────────────────
export default function App() {
  return (
    <div className="sandbox">
      <header>
        <h1>React Sandbox</h1>
        <p>Minden kártya egy önálló kísérlet. Módosítsd, törj el dolgokat, figyeld a konzolt.</p>
      </header>

      <section>
        <h2>useState - állapot kezelése</h2>
        <div className="grid">
          <Szamlalo />
          <Kapcsolo />
          <KontrollaltInput />
        </div>
      </section>

      <section>
        <h2>useEffect - mellékhatások</h2>
        <div className="grid">
          <MindenRenderkor />
          <CsakMountolaskor />
          <StateFigyeles />
          <Idozito />
        </div>
      </section>
    </div>
  )
}
