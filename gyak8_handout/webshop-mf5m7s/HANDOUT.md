# Webshop — Feladatlap

A projekt lefordul és renderel placholder adatokkal. A cél: bekötni a Reduxot és az API kommunikációt.

## Lépések

---

### TODO [1] — Redux: useSelector + cartSlice kiegészítése

**`src/store/cartSlice.ts`**
- Kommenteld ki a `removeItem` és `clearCart` reducerek törzséből a kommenteket (2 reducer)
- Exportáld a két akciót az `addItem` mellé
- Kommenteld ki a `selectCart` és `selectCartTotal` selektorokat

**`src/components/Navbar.tsx`**
- Kommenteld ki a két importot (`useAppSelector`, `selectCart`)
- Kommenteld ki a két sort, ahol `cartItems` és `totalItems` ki van számolva
- Töröld a `const totalItems = 0` placeholder sort

**`src/pages/CartPage.tsx`**
- Kommenteld ki a TODO [1] importokat (`useAppDispatch`, `useAppSelector`, stb.)
- Töröld a `const items: CartItem[] = []` és `const total = 0` placeholdereket
- Kommenteld ki a `dispatch = useAppDispatch()`, `items = useAppSelector(selectCart)`, `total = useAppSelector(selectCartTotal)` sorokat
- Kommenteld ki az `onClick={() => dispatch(removeItem(item.id))}` részt a törlés gombnál

---

### TODO [2] — RTK Query: termékek lekérése API-ból

**`src/store/webshopApi.ts`**
- Kommenteld ki a `getProducts` endpoint blokköt
- Add hozzá a `useGetProductsQuery` hook exporthoz

**`src/pages/ProductsPage.tsx`**
- Importáld a `useGetProductsQuery`-t
- Töröld a statikus `import { products } from '@/data/products'` importot
- Kommenteld ki a `useGetProductsQuery()` hívást és a loading/error ágakat
- Töröld a megjegyzésjeleket a `//` elől

---

### TODO [3] — RTK Query: rendelés leadása

**`src/store/webshopApi.ts`**
- Kommenteld ki a `placeOrder` endpoint blokköt
- Add hozzá a `usePlaceOrderMutation` hook exporthoz

**`src/pages/CartPage.tsx`**
- Importáld a `usePlaceOrderMutation`-t
- Kommenteld ki a `[placeOrder, { isLoading, data: confirmedOrder, reset }]` sort
- Kommenteld ki a visszaigazolás view-t (`if (confirmedOrder) { ... }`)
- Kommenteld ki a `handlePlaceOrder` függvényt
- Frissítsd a Rendelés leadása gomb `onClick` és `disabled` attribútumait

---

## Fájlstruktúra (ami érdekes)

```
src/
├── store/
│   ├── cartSlice.ts     ← TODO [1]: removeItem, clearCart, selectCart, selectCartTotal
│   ├── webshopApi.ts    ← TODO [2]: getProducts | TODO [3]: placeOrder
│   ├── authSlice.ts     ← setCredentials és logout törzsei (opcionális, tanár mutatja)
│   └── store.ts         ← kész, nem kell módosítani
├── components/
│   ├── Navbar.tsx       ← TODO [1]: useAppSelector a kosár számlálóhoz
│   └── RequireAuth.tsx  ← kész, nem kell módosítani
└── pages/
    ├── ProductsPage.tsx ← TODO [2]: useGetProductsQuery bekötése
    ├── CartPage.tsx     ← TODO [1] + TODO [3]: useSelector + usePlaceOrderMutation
    └── AdminPage.tsx    ← kész, nem kell módosítani
```

## Szerver indítása

```bash
cd ../rest-api
npm install
npm run db:setup   # csak első alkalommal
npm run dev        # http://localhost:3000  |  /docs: Swagger
```

Admin belépési adatok: `admin@webshop.dev` / `admin`
