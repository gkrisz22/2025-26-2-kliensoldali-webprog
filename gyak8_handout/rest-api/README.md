# Webshop API

A webshop oktatási projekt backendje. [Hono](https://hono.dev/), Prisma és SQLite alapokon.

---

## Gyors kezdés

```bash
npm install
cp .env.example .env        # Mac/Linux
copy .env.example .env      # Windows
npm run db:setup
npm run dev
```

A szerver elérhető: **http://localhost:3000**

Swagger UI (az összes végpont kipróbálható kód nélkül): **http://localhost:3000/docs**

---

## Admin fiók

| Email | Jelszó |
|---|---|
| `admin@webshop.dev` | `admin` |

---

## API áttekintés

Alap URL: `http://localhost:3000/api`

| Metódus | Útvonal | Védelem | Leírás |
|---|---|---|---|
| `GET` | `/products` | — | Összes termék listázása |
| `POST` | `/orders` | — | Rendelés leadása |
| `GET` | `/orders` | Admin | Összes rendelés listája |
| `GET` | `/orders/:id` | — | Egyetlen rendelés lekérése |
| `POST` | `/auth/login` | — | Bejelentkezés → `{ token, user }` |
| `POST` | `/auth/logout` | Bearer | Token érvénytelenítése |
| `GET` | `/auth/me` | Bearer | Bejelentkezett felhasználó adatai |

### POST /api/orders — kérés törzse

```json
{
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 3, "quantity": 1 }
  ]
}
```

### Hitelesítés

A `/api/auth/login` válasza tartalmaz egy `token` mezőt. Védett végpontoknál ezt az `Authorization` fejlécben kell elküldeni:

```
Authorization: Bearer <token>
```

A Swagger UI „Authorize" gombjánál is megadható.

---

## Parancsok

| Parancs | Mit csinál |
|---|---|
| `npm run dev` | Fejlesztői szerver indítása (automatikus újratöltéssel) |
| `npm run db:setup` | Adatbázis létrehozása + seed adatok betöltése |
| `npm run db:seed` | Csak a seed újrafuttatása (törli a meglévő adatokat) |
| `npm run db:studio` | Prisma Studio — vizuális adatbázis böngésző |

---

## Hibakeresés

**Prisma kliens hiba** — futtasd: `npm run db:generate`

**CORS hiba** — a `.env`-ben lévő `FRONTEND_URL` egyezzen a React app URL-jével, majd indítsd újra a szervert.

**Port foglalt** — módosítsd a `PORT` értékét a `.env`-ben.
