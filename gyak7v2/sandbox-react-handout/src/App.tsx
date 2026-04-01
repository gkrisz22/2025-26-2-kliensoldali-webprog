import React, { useState, useEffect } from 'react'
import './App.css'

// =============================================================
//  SANDBOX - useState és useEffect
//  Futtasd: npm run dev
//  Nyisd meg a böngésző konzolját is! (F12 → Console)
//
//  Olvasd el az ARTICLE.md fájlt, és kövesd lépésről lépésre!
// =============================================================


// ─────────────────────────────────────────────
//  1. Számláló
// ─────────────────────────────────────────────
function Szamlalo() {
  // TODO: hozz létre egy `count` state-et, kezdőértéke 0
  const [ertek, setErtek] = useState<number>(1);
  // ertek: csak olvasásra használható
  // setErtek: az érték módosítására használható: setErtek(2)

  function csokkentes() {
    //setErtek(ertek - 1);
    setErtek(x => x - 1); // setErtek(prev => prev - 1);
  }


  return (
    <div className="card">
      <span className="hook-badge">useState</span>
      <h3>Számláló</h3>
      <p className="value">{ertek}</p>
      <div className="row">
        <button onClick={csokkentes}>-</button>
        <button onClick={() => csokkentes()}>-</button>
        <button onClick={() => {
          setErtek(ertek + 1);
        }}>+</button>
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────
//  2. Be/Ki kapcsoló
// ─────────────────────────────────────────────
function Kapcsolo() {
  // TODO: hozz létre egy `visible` boolean state-et, kezdőértéke false
  const [visible, setVisible] = useState<boolean>(false); 

  return (
    <div className="card">
      <span className="hook-badge">useState</span>
      <h3>Be/Ki kapcsoló</h3>
      <button onClick={() => setVisible(!visible)}>{
        visible ? "Elrejtés" : "Mutatás" 
      }</button>
      {/* TODO: jelenítsd meg a "Helló! Látható vagyok!" üzenetet, ha visible === true */}
      {
        visible === true && <>
          <p>Első</p>
          <p>Helló! Látható vagyok!</p>
        </>
      }
      {/*
        visible ? <p>Helló! Látható vagyok!</p> : ""
      */}
    </div>
  )
}


// ─────────────────────────────────────────────
//  3. Kontrollált input
// ─────────────────────────────────────────────
function KontrollaltInput() {
  // TODO: hozz létre egy `text` state-et, kezdőértéke üres string
  const limit = 50

  const [text, setText] = useState("");

  function onTextChange (event: React.ChangeEvent<HTMLInputElement>) {
    const currentValue = event.target.value as string;
    if(currentValue.length <= limit)
    {
      setText(currentValue);
    }
   
  }

  return (
    <div className="card">
      <span className="hook-badge">useState</span>
      <h3>Kontrollált input</h3>
      {/* TODO: adj value={text} és onChange={(e) => setText(e.target.value)} attribútumot az inputnak */}
      <input
        type="text"
        placeholder="Írj valamit..."
        value={text}
        onChange={onTextChange}
      />
      <p className="hint">
        {text.length} / {limit} karakter
      </p>
      {/* TODO: jelenítsd meg a beírt szöveget, ha nem üres */}
      {
        text.length > 0 && text
      }
    </div>
  )
}


// ─────────────────────────────────────────────
//  4. useEffect - minden renderkor lefut
// ─────────────────────────────────────────────
function MindenRenderkor() {
  // TODO: hozz létre count és text state-eket
  // TODO: adj hozzá useEffect-et dependency array nélkül,
  //       ami console.log-olja a count és text értékét

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Hello useEffect-ből!");

    console.log(`Count is: ${count} | text is: ${text}`);
  }, [count, text]);

  return (
    <div className="card">
      <span className="hook-badge">useEffect</span>
      <h3>Minden renderkor lefut</h3>
      <p className="hint">Nézd a konzolt minden interakció után!</p>
      <div className="row">
        <button onClick={() => setCount(count + 1)}>Kattints ({count})</button>
        <input placeholder="Gépelj..." value={text} onChange={(event) => setText(event.target.value)} />
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────
//  5. useEffect - csak mountoláskor fut le
// ─────────────────────────────────────────────
function CsakMountolaskor() {
  // TODO: hozz létre `adat` (string | null) és `tolt` (boolean) state-eket
  // TODO: adj hozzá useEffect-et üres [] dependency array-jel,
  //       ami 1500 ms után beállítja az adatot és leállítja a töltést

  const [adat, setAdat] = useState<string | null>(null);
  const [tolt, setTolt] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAdat("Betöltöttem!");
      setTolt(false);
    }, 3000)

    // Clean up - tisztítás
    return () => clearTimeout(timer);
  }, []); // Üres [] -> csak a komponens mountolásakor fog lefutni

  return (
    <div className="card">
      <span className="hook-badge">useEffect</span>
      <h3>Csak mountoláskor</h3>
      
      {tolt  && <p className="hint">Betöltés...</p>}
      {/* TODO: ha tolt === false, jelenítsd meg az adat értékét */}
      {
        //tolt === false
        !tolt && adat
      }
    </div>
  )
}


// ─────────────────────────────────────────────
//  6. useEffect - state figyelése
// ─────────────────────────────────────────────
function StateFigyeles() {
  // TODO: hozz létre `count` és `paros` state-eket
  // TODO: adj hozzá useEffect-et [count] dependency array-jel,
  //       ami frissíti a `paros` state-et

  const [count, setCount] = useState(0);
  const [paros, setParos] = useState(true);

  useEffect(() => {
    if(count % 2 === 0) {
      setParos(true);
    }
    else {
      setParos(false);
    }
    // setParos(count % 2 === 0);
  }, [count]);

  return (
    <div className="card">
      <span className="hook-badge">useEffect</span>
      <h3>State figyelése</h3>
      <p className="value">{count}</p>
      <button onClick={() => setCount(count + 1)}>Növel</button>
      {/* TODO: jelenítsd meg, hogy az érték páros-e */}
      {
        count % 2 === 0 && <p>Ez egy páros szám!</p>
      }
      {
        paros && <p>Páros!</p>
      }
    </div>
  )
}


// ─────────────────────────────────────────────
//  7. useEffect - cleanup (időzítő leállítása)
// ─────────────────────────────────────────────
function Idozito() {
  // TODO: hozz létre `masodperc` és `fut` state-eket
  // TODO: adj hozzá useEffect-et [fut] dependency array-jel,
  //       ami setInterval-t indít, és cleanup-ban leállítja

  return (
    <div className="card">
      <span className="hook-badge">useEffect + cleanup</span>
      <h3>Időzítő</h3>
      <p className="value">0s</p>
      <div className="row">
        <button>Elindít</button>
        <button>Visszaállít</button>
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
