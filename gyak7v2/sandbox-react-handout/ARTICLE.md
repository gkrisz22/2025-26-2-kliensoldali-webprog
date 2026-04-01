# React Sandbox – Útmutató kezdőknek

> Ebben az útmutatóban lépésről lépésre megírjuk a `src/App.tsx` fájlban lévő sandbox összes komponensét. A cél nem csupán az, hogy a kód működjön – hanem az, hogy megértsd, **miért** működik úgy, ahogy.
>
> Mielőtt elkezded: futtasd a projektet egy terminálban (`npm install`, majd `npm run dev`), és tartsd nyitva a böngésző fejlesztői eszköztárát (F12 → Console).

---

## Tartalom

1. [Mi az a React?](#1-mi-az-a-react)
2. [Komponensek és JSX](#2-komponensek-és-jsx)
3. [useState – az állapot fogalma](#3-usestate--az-állapot-fogalma)
   - [3.1 Számláló](#31-számláló)
   - [3.2 Be/Ki kapcsoló](#32-beki-kapcsoló)
   - [3.3 Kontrollált input](#33-kontrollált-input)
4. [useEffect – mellékhatások kezelése](#4-useeffect--mellékhatások-kezelése)
   - [4.1 Minden renderkor lefut](#41-minden-renderkor-lefut)
   - [4.2 Csak mountoláskor fut le](#42-csak-mountoláskor-fut-le)
   - [4.3 State figyelése](#43-state-figyelése)
   - [4.4 Cleanup – időzítő leállítása](#44-cleanup--időzítő-leállítása)
5. [Összefoglalás](#5-összefoglalás)

---

## 1. Mi az a React?

A React egy JavaScript könyvtár, amelyet Facebook fejlesztett ki felhasználói felületek építéséhez. Két dologban különbözik a hagyományos DOM-manipulációtól:

**Deklaratív szemlélet.** Ahelyett, hogy megmondanánk a böngészőnek, *hogyan* változtassa meg az oldalt (`document.getElementById(...).textContent = ...`), csak azt írjuk le, *milyennek kell kinéznie* az oldalnak az aktuális adatok alapján. A React maga kigondolja, mit kell frissíteni.

**Komponens-alapú felépítés.** Az alkalmazást kis, önálló, újrafelhasználható egységekre – komponensekre – bontjuk. Minden komponens a saját állapotát és megjelenítési logikáját tartalmazza.

---

## 2. Komponensek és JSX

Nyisd meg az `src/App.tsx` fájlt. Látod, hogy az egész fájl függvényekből áll – ezek a **React komponensek**. A `Szamlalo`, `Kapcsolo`, `KontrollaltInput` mind-mind egy-egy önálló egység.

Egy React komponens lényegében egy **JavaScript függvény, amely JSX-et ad vissza**.

```tsx
function Szamlalo() {
  return (
    <div className="card">
      <h3>Számláló</h3>
    </div>
  )
}
```

**Mi az a JSX?** HTML-re hasonlít, de valójában JavaScript. A böngésző nem érti egyenesen – a Vite (a dev szervered) fordítja le JavaScriptté a háttérben. Néhány fontos különbség a HTML-hez képest:

- `class` helyett `className` (mert a `class` foglalt kulcsszó JavaScriptben)
- Eseménykezelők camelCase-ben: `onClick`, `onChange`, `onSubmit`
- JavaScript kifejezéseket kapcsos zárójelbe kell tenni: `{count}`, `{2 + 2}`
- Minden JSX-nek egyetlen gyökérelembe kell foglalva lennie

**Hogyan kerülnek a komponensek az oldalra?** Görgess az `App.tsx` aljára – az `App` komponens `return`-jében látod, hogy a `<Szamlalo />`, `<Kapcsolo />` stb. úgy szerepelnek, mint HTML tagek. A React ebből tudja, hogy ezeket a komponenseket kell megjeleníteni.

---

## 3. useState – az állapot fogalma

### Mi az az állapot?

Képzeld el, hogy az oldaladon van egy számláló, amelynek értéke 0. Megnyomod a „+" gombot – az értéknek 1-re kellene változnia. De honnan tudja a React, hogy az értéket frissíteni kell? Valahol el kell tárolni az aktuális értéket, és valahogy értesíteni kell a Reactet, ha az változik.

Erre való az **állapot** (state). Az állapot olyan adat, amely:
- a komponenshez tartozik,
- idővel változhat,
- és ha változik, a React automatikusan újrarendereli a komponenst.

A `useState` az a **hook**, amivel állapotot hozhatunk létre funkcionális komponensekben.

> **Mi az a hook?** A hookokat a React 16.8-ban vezették be. Olyan függvények, amelyek React-specifikus funkcionalitást (állapot, mellékhatás stb.) adnak a funkcionális komponensekhez. A nevük mindig `use`-zal kezdődik.

A `useState` szintaxisa:

```tsx
const [ertek, setErtek] = useState(kezdoErtek)
```

- `ertek` – az aktuális érték (ezt olvasod)
- `setErtek` – egy függvény, amellyel az értéket frissíted
- `kezdoErtek` – az érték, amivel a komponens először létrejön

Ez **array destructuring**: a `useState` egy két elemű tömböt ad vissza, és mi egyszerre adjuk nekik a nevüket.

**Nagyon fontos:** Soha ne módosítsd az állapot értékét közvetlenül (`ertek = 5` – ez rossz!). Mindig a setter függvényt használd (`setErtek(5)`). Ha közvetlenül módosítanád, a React nem tudna róla, és nem frissítené az oldalt.

Mielőtt bármelyik `useState` példát elkezded, add hozzá az importot a fájl elejéhez:

```tsx
import { useState } from 'react'
```

---

### 3.1 Számláló

**Cél:** A „+" gomb növelje a számot, a „-" csökkentse.

**1. lépés – Hozd létre az állapotot**

A `Szamlalo` függvényen belül, a `return` elé, add hozzá:

```tsx
const [count, setCount] = useState(0)
```

`0` a kezdőérték – a számláló nulláról indul.

**2. lépés – Jelenítsd meg az értéket**

A `return`-ben cseréld le a hardcoded `0`-t a `{count}` kifejezésre:

```tsx
<p className="value">{count}</p>
```

Mentés után a böngészőben továbbra is 0-t fogsz látni – de most már az állapotból jön, nem egy hardcoded számból.

**3. lépés – Kösd össze a gombokat**

Add hozzá az `onClick` eseménykezelőket:

```tsx
<button onClick={() => setCount(count - 1)}>-</button>
<button onClick={() => setCount(count + 1)}>+</button>
```

Az `onClick` értéke egy nyílfüggvény, amely meghívja a `setCount`-ot. Azért kell nyílfüggvénybe csomagolni, mert különben a `setCount(count + 1)` azonnal lefutna, ahelyett hogy a kattintásra várna.

**Teszteld:** Kattints a gombokra – a szám változik. Figyelj meg valamit: amikor a `setCount`-ot hívod, a React újrarendereli a `Szamlalo` komponenst, és az új `count` értékkel futtatja le újra a függvényt.

**Kísérletezz:**
- Változtasd meg a kezdőértéket: `useState(10)`
- Adj hozzá egy „Reset" gombot: `onClick={() => setCount(0)}`

---

### 3.2 Be/Ki kapcsoló

**Cél:** Egy gomb megmutat vagy elrejt egy szöveget. A gomb felirata az aktuális állapotot tükrözze.

**1. lépés – Boolean állapot**

```tsx
const [visible, setVisible] = useState(false)
```

A `false` azt jelenti: kezdetben a szöveg rejtett.

**2. lépés – Gomb felirata**

A gomb felirata attól függ, hogy `visible` igaz vagy hamis. Erre **ternary operátort** használunk:

```tsx
<button onClick={() => setVisible(!visible)}>
  {visible ? 'Elrejt' : 'Megmutat'}
</button>
```

A `!visible` megfordítja az értéket: ha `false`, `true`-vá teszi, és fordítva.

**3. lépés – Feltételes megjelenítés**

A `{visible && <p>...</p>}` szintaxis azt jelenti: „ha `visible` igaz, rendereld a `<p>`-t". Ez a leggyakoribb React minta feltételes megjelenítésre – a `&&` rövidre zárja a kiértékelést: ha az első rész hamis, a második rész meg sem jelenik.

```tsx
{visible && <p className="message">Helló! Látható vagyok!</p>}
```

Ezt a sort a `</button>` után, de még a `</div>` előtt helyezd el.

**Teszteld:** Kattints a gombra – a szöveg megjelenik és eltűnik.

**Kísérletezz:**
- Változtasd a kezdőértéket `true`-ra – most betöltéskor látható lesz
- Adj hozzá egy második `useState`-et, pl. `const [piros, setPiros] = useState(false)`, és kattintáskor változtasd a szöveg színét is

---

### 3.3 Kontrollált input

**Cél:** Egy szövegmező, amely karakterszámlálót mutat, és megjeleníti a beírt szöveget.

**Mi az a kontrollált input?**

Reaktban a beviteli mezőknek két fajtája van:
- **Uncontrolled (nem kontrollált):** Az input a saját értékét tárolja a DOM-ban. A React nem tud róla közvetlenül.
- **Controlled (kontrollált):** Az input értékét React state tárolja. Az input `value` attribútuma a state-re mutat, és minden billentyűleütéskor a state frissül.

A kontrollált input ajánlott, mert teljes kontrollt ad az érték felett (validálás, formázás, limit stb.).

**1. lépés – String állapot**

```tsx
const [text, setText] = useState('')
```

A kezdőérték üres string – a mező üresen indul.

**2. lépés – Kösd az inputot a state-hez**

Keresd meg a `<input>` taget, és adj hozzá `value` és `onChange` attribútumot:

```tsx
<input
  type="text"
  value={text}
  onChange={(e) => setText(e.target.value)}
  maxLength={limit}
  placeholder="Írj valamit..."
/>
```

- `value={text}` – az input értéke mindig a `text` state tükrözi
- `onChange={(e) => setText(e.target.value)}` – minden billentyűleütésnél frissíti a state-et. Az `e` az eseményobjektum, `e.target` maga az input DOM-elem, `e.target.value` a jelenlegi értéke.

**3. lépés – Karakterszámláló**

```tsx
<p className="hint">
  {text.length} / {limit} karakter
</p>
```

**4. lépés – Beírt szöveg megjelenítése**

Jelenítsd meg a szöveget, ha nem üres:

```tsx
{text && <p className="message">Beírtad: „{text}"</p>}
```

**Teszteld:** Gépelj a mezőbe – a számláló frissül, a szöveg megjelenik.

**Kísérletezz:**
- Ha `text.length >= limit`, add hozzá a `hint` paragrafushoz egy extra CSS osztályt, ami pirossá teszi

---

## 4. useEffect – mellékhatások kezelése

### Mi az a mellékhatás?

A React komponensek fő feladata a megjelenítés: adatokat kap (state, props), és JSX-et ad vissza. De mi van azokkal a dolgokkal, amik kívül esnek ezen? Például:

- Adatok betöltése egy API-ból
- Időzítők (`setInterval`, `setTimeout`)
- Konzolba írás
- Feliratkozás eseményekre (WebSocket, resize stb.)

Ezeket **mellékhatásoknak** (side effects) nevezzük. A `useEffect` hook arra való, hogy ezeket a renderelési cikluson kívül, kontrollált módon végezzük el.

A `useEffect` szintaxisa:

```tsx
useEffect(() => {
  // itt fut le a mellékhatás
}, [/* dependency array */])
```

A másodikként megadott tömb – a **dependency array** – szabályozza, hogy az effect mikor fusson le. Ez a kulcsa az egész `useEffect` megértésének.

| Dependency array | Mikor fut le? |
|---|---|
| Nincs megadva | Minden render után |
| `[]` (üres tömb) | Csak egyszer, mountoláskor |
| `[a, b]` | Akkor, ha `a` vagy `b` megváltozott az előző render óta |

Add hozzá az importhoz a `useEffect`-et is:

```tsx
import { useState, useEffect } from 'react'
```

---

### 4.1 Minden renderkor lefut

**Cél:** Megfigyelni, hogy dependency array nélkül az effect minden render után lefut – bármelyik state változik is.

**1. lépés – State-ek**

```tsx
const [count, setCount] = useState(0)
const [text, setText] = useState('')
```

**2. lépés – Effect dependency array nélkül**

```tsx
useEffect(() => {
  console.log('Effect lefutott - count:', count, '| text:', text)
}) // nincs dependency array!
```

**3. lépés – Kösd össze a JSX-et**

```tsx
<button onClick={() => setCount(count + 1)}>Kattints ({count})</button>
<input
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Gépelj..."
/>
```

**Teszteld:** Nyisd meg a konzolt (F12). Kattints a gombra – megjelenik a log. Gépelj a mezőbe – minden billentyűleütés után megjelenik a log. Mindkettő triggereli az effectet, mert bármelyik state változik, a komponens újrarenderelődik, és az effect lefut.

**Miért nem jó ez általában?** Ha az effect valami drága műveletet végez (pl. API hívás), ez nagyon hamar teljesítményproblémát okoz. Ezért szinte mindig meg kell adni a dependency array-t.

---

### 4.2 Csak mountoláskor fut le

**Cél:** Szimulálni egy API-hívást, amely csak egyszer, az oldal betöltésekor hajtódik végre.

> **mountolás** = a komponens először jelenik meg az oldalon. Az ellentéte az **unmountolás** = a komponens eltűnik az oldalról.

**1. lépés – State-ek**

```tsx
const [adat, setAdat] = useState<string | null>(null)
const [tolt, setTolt] = useState(true)
```

A `string | null` TypeScript típusjelölés: az `adat` kezdetben `null` (még nincs adat), majd betöltés után string lesz.

**2. lépés – Effect üres dependency array-jel**

```tsx
useEffect(() => {
  console.log('Csak egyszer fut le - mint egy componentDidMount')

  // API hívás szimulálása
  const timer = setTimeout(() => {
    setAdat('Betöltött adat: React 19')
    setTolt(false)
  }, 1500)

  return () => clearTimeout(timer) // cleanup
}, []) // üres array: csak mountoláskor fut
```

A `return () => clearTimeout(timer)` a **cleanup függvény** – erről részletesebben a [4.4-es fejezetben](#44-cleanup--időzítő-leállítása). Most csak annyit: ha a komponens eltűnik az oldalról, mielőtt az 1500 ms letelik, a timer le fog állni, és nem fog hibát dobni.

**3. lépés – Feltételes megjelenítés**

```tsx
{tolt ? <p className="hint">Betöltés...</p> : <p className="message">{adat}</p>}
```

Ez egy ternary: ha `tolt` igaz, mutasd a „Betöltés..." szöveget; ha hamis, mutasd az adatot.

**Teszteld:** Az oldal betöltésekor 1,5 másodpercig „Betöltés..." látszódik, aztán megjelenik az adat.

**Kísérletezz:**
- Változtasd `1500`-at `3000`-re – lassabb betöltés
- Mi történik, ha kiveszed a `[]`-t? Az effect minden render után lefut, minden render újabb `setTimeout`-ot indít, ami újabb render, ami újabb timeout... végtelen ciklus!

---

### 4.3 State figyelése

**Cél:** Automatikusan kideríteni, hogy egy szám páros-e, valahányszor az megváltozik.

Ez a minta nagyon hasznos, ha valami értékből automatikusan szeretnél kiszámítani valami mást – anélkül, hogy minden egyes helyen, ahol a count-ot módosítod, kézzel kellene frissíteni a `paros` értéket is.

**1. lépés – State-ek**

```tsx
const [count, setCount] = useState(0)
const [paros, setParos] = useState(true)
```

**2. lépés – Effect count-ra figyelve**

```tsx
useEffect(() => {
  console.log(`count megváltozott: ${count}`)
  setParos(count % 2 === 0)
}, [count]) // csak akkor fut, ha count változik
```

A `count % 2 === 0` true, ha a szám páros.

**3. lépés – JSX**

```tsx
<p className="value">{count}</p>
<button onClick={() => setCount(count + 1)}>Növel</button>
<p className="message">{paros ? 'Páros' : 'Páratlan'}</p>
```

**Teszteld:** Kattints a „Növel" gombra – a szám nő, és a „Páros/Páratlan" felirat automatikusan frissül.

**Kísérletezz:**
- Mi történik, ha a dependency arrayt `[]`-re cseréled? Az effect csak egyszer fut le (mountoláskor), ezután a `paros` sosem frissül – mindig „Páros" marad.
- Mi történik, ha teljesen kiveszed a dependency arrayt? Minden renderkor lefut az effect, ami `setParos`-t hív, ami újra rendert triggerel... ami ismét lefuttatja az effectet. Próbáld ki, mielőtt `[]`-t raksz vissza!

> **Megjegyzés:** Ebben a konkrét esetben egy `useEffect` valójában túlzás – a `paros` értékét simán ki lehetne számolni közvetlenül a renderből (`const paros = count % 2 === 0`). A `useEffect` célja mellékhatások kezelése, nem értékek kiszámítása. Ezt a példát azért írjuk így, hogy a deps array működését jól lássuk.

---

### 4.4 Cleanup – időzítő leállítása

**Cél:** Egy start/stop gombbal vezérelt másodpercmérő. Megtanulni, mi a cleanup függvény, és miért nélkülözhetetlen.

**Mi a cleanup?**

Az `useEffect` visszatérhet egy **cleanup függvénnyel**. Ez a függvény lefut:
- mielőtt az effect újra lefutna (ha a deps megváltoztak),
- és akkor is, ha a komponens unmountolódik (eltűnik az oldalról).

Ha elindítasz egy intervalt (`setInterval`), és nem állítod le, az a háttérben tovább fut – akkor is, ha a komponens már rég eltűnt. Ez memóriaszivárgást és kiszámíthatatlan viselkedést okoz.

**1. lépés – State-ek**

```tsx
const [masodperc, setMasodperc] = useState(0)
const [fut, setFut] = useState(false)
```

**2. lépés – Effect cleanup-pal**

```tsx
useEffect(() => {
  if (!fut) return // ha nem fut, ne indítson intervalt

  const interval = setInterval(() => {
    setMasodperc((s) => s + 1) // funkcionális update!
  }, 1000)

  return () => {
    clearInterval(interval) // cleanup: leállítja az intervalt
    console.log('Cleanup: interval törölve')
  }
}, [fut]) // fut változásakor újraindul az effect
```

Figyeld meg a `setMasodperc((s) => s + 1)` szerkezetet – ez a **funkcionális update**. Ahelyett, hogy `masodperc + 1`-et írnánk, egy függvényt adunk át, amelynek paramétere az előző érték (`s`). Ez azért szükséges, mert a `setInterval` callbackje bezáródik az eredeti `masodperc` értékére – ha nem funkcionális update-et használunk, a callback mindig a mountoláskor érvényes értéket látná, és a számláló soha nem menne 1 fölé.

**3. lépés – JSX**

```tsx
<p className="value">{masodperc}s</p>
<div className="row">
  <button onClick={() => setFut(!fut)}>
    {fut ? 'Megállít' : 'Elindít'}
  </button>
  <button onClick={() => { setFut(false); setMasodperc(0) }}>
    Visszaállít
  </button>
</div>
```

**A cleanup pontos folyamata:**

1. `fut` értéke `false` → rákattintasz az „Elindít" gombra
2. `fut` `true`-ra vált → React újrarendereli a komponenst
3. A `useEffect` felismeri, hogy `fut` megváltozott → lefuttatja az effectet
4. Az effect elindítja az intervalt
5. Rákattintasz a „Megállít" gombra → `fut` `false`-ra vált
6. A React újrarendereli a komponenst
7. Mielőtt az effect újra lefutna: lefut a cleanup → `clearInterval(interval)` leállítja az előző intervalt
8. Az effect újra lefut, de `if (!fut) return` → azonnal kilép

**Teszteld:** Indítsd el a számlálót, állítsd meg, indítsd újra. Figyeld a konzolban a cleanup üzeneteket.

**Kísérletezz:**
- Töröld ki a `return () => clearInterval(interval)` sort, majd indítsd el, állítsd meg, és indítsd újra a számlálót – mi fog történni? (Minden egyes „Start" egy új intervalt indít, a régieket nem állítja le. A számláló egyre gyorsabban fog nőni.)
- Próbáld meg `masodperc + 1`-re cserélni a `(s) => s + 1`-et – mi változik?

---

## 5. Összefoglalás

Gratulálok – ha idáig eljutottál és minden komponens működik, már érted a React alapjait!

### useState

```
const [ertek, setErtek] = useState(kezdoErtek)
```

- Állapotot tárol egy komponensben
- A setter hívása → újrarenderelés
- Sosem módosítsd közvetlenül az értéket

### useEffect

```
useEffect(() => {
  // mellékhatás
  return () => { /* cleanup */ }
}, [/* deps */])
```

| Használat | Mikor fut? |
|---|---|
| `useEffect(fn)` | Minden render után |
| `useEffect(fn, [])` | Csak mountoláskor |
| `useEffect(fn, [a, b])` | Ha `a` vagy `b` változott |
| `return () => ...` | Cleanup: következő effect előtt + unmountoláskor |

### Amire figyelj

- Ha egy `useEffect`-en belül használt változó nincs benne a deps array-ben, a linter figyelmeztetni fog – és joggal. A deps array-ben legyenek benne mindazok az értékek, amelyeket az effect olvas vagy felhasznál.
- A `useEffect` nem arra való, hogy értékeket számíts ki belőle (azt tedd közvetlenül a renderbe). Mellékhatásokra való.
- Ha egy effect végtelen ciklusba kerül, elsőként a deps arrayt ellenőrizd.

---

### Következő lépés

Ha ez a sandbox megvan, nyisd meg a `webshop-react-handout` projektet, és olvasd el a `TASKS.md`-t. Ott ugyanezeket az eszközöket fogod használni egy valódi mini webáruházban: props átadás, kosár state kezelése, routing-közeli állapot – mind itt kezdődött.
