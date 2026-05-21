import { Button } from '@/components/ui/button'
import RequireAuth from '@/components/RequireAuth'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectUser, logout } from '@/store/authSlice'
import { useGetOrdersQuery, useLogoutUserMutation } from '@/store/webshopApi'

// Cookie alapú megoldás: useGetMeQuery-t használnánk a felhasználó adataihoz
// import { useGetOrdersQuery, useGetMeQuery, useLogoutUserMutation } from '@/store/webshopApi'

const AdminPage = () => (
  <RequireAuth>
    <OrderList />
  </RequireAuth>
)

function OrderList() {
  const dispatch = useAppDispatch()
  // Bearer token: a felhasználó adatai már a Redux store-ban vannak (setCredentials után)
  const user = useAppSelector(selectUser)
  // Cookie alapú megoldás: a szerver validálja a sütit és visszaadja a felhasználót
  // const { data: user } = useGetMeQuery()

  const [logoutUser] = useLogoutUserMutation()
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery()

  async function handleLogout() {
    await logoutUser()       // érvényteleníti a tokent a szerveren
    dispatch(logout())       // törli a tokent a Redux store-ból
    // Cookie alapú megoldás: csak logoutUser() kell, dispatch nem szükséges
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Rendelések</h1>
          <p className="text-sm text-muted-foreground mt-1">Bejelentkezve: {user?.email}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Kijelentkezés
        </Button>
      </div>

      {isLoading && <p className="text-muted-foreground">Betöltés...</p>}
      {isError && <p className="text-destructive">Hiba a rendelések betöltésekor.</p>}

      {!isLoading && !isError && orders.length === 0 && (
        <p className="text-muted-foreground">Még nincs egyetlen rendelés sem.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-semibold">
                #{order.id} — {new Date(order.createdAt).toLocaleString('hu-HU')}
              </p>
              <p className="font-bold">{order.total.toLocaleString('hu-HU')} Ft</p>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              {order.items.map((item) => (
                <li key={item.productId}>
                  {item.productName} × {item.quantity} —{' '}
                  {(item.price * item.quantity).toLocaleString('hu-HU')} Ft
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  )
}

export default AdminPage
