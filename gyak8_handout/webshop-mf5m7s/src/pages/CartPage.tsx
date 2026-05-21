import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CartItem } from '@/data/products'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearCart, selectCart, selectCartTotal } from '@/store/cartSlice'
import type { RootState } from '@/store/store'
import { usePlaceOrderMutation } from '@/store/webshopApi'
// TODO [1]: import { useAppDispatch, useAppSelector } from '@/store/hooks'
// TODO [1]: import { selectCart, selectCartTotal, removeItem, clearCart } from '@/store/cartSlice'
// TODO [3]: import { usePlaceOrderMutation } from '@/store/webshopApi'

const CartPage = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state: RootState) => state.cart.items); // selectCart
  const total = useAppSelector(selectCartTotal)
  //const items: CartItem[] = [] // placeholder — töröld, ha kész a TODO [1]
  //const total = 0 // placeholder — töröld, ha kész a TODO [1]

  const [placeOrder, { isLoading, data: confirmedOrder, reset }] = usePlaceOrderMutation()

  // TODO [3]: Rendelés visszaigazolása — add hozzá a return előtt:
   if (confirmedOrder) {
     return (
       <main className="max-w-5xl mx-auto px-4 py-8">
         <div className="rounded-lg border p-8 text-center space-y-4">
          <p className="text-4xl">✅</p>
           <h2 className="text-2xl font-bold">Rendelés leadva!</h2>
           <p className="text-muted-foreground">
             Azonosító: <span className="font-mono font-bold">#{confirmedOrder.id}</span>
          </p>
          <p className="text-muted-foreground">
             Összeg: <span className="font-bold">{confirmedOrder.total.toLocaleString('hu-HU')} Ft</span>
           </p>
           <Button onClick={() => reset()} variant="outline">Új rendelés</Button>
         </div>
       </main>
     )
  }

  if (items.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Kosár</h1>
        <p className="text-muted-foreground">
          A kosár üres.{' '}
          <Link to="/" className="underline">
            Vissza a termékekhez
          </Link>
        </p>
      </main>
    )
  }

  async function handlePlaceOrder() {
     await placeOrder({ items: items.map((i) => ({ productId: i.id, quantity: i.quantity })) })
     dispatch(clearCart())


  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Kosár</h1>

      <div className="space-y-3 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.quantity} db</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-bold">{(item.price * item.quantity).toLocaleString('hu-HU')} Ft</p>
              <Button
                variant="ghost"
                size="icon"
                // TODO [1]: onClick={() => dispatch(removeItem(item.id))}
                aria-label="Eltávolítás"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-3 mb-6">
        <span className="font-semibold">Összesen</span>
        <span className="text-xl font-bold">{total.toLocaleString('hu-HU')} Ft</span>
      </div>

      {/* TODO [3]: onClick={handlePlaceOrder} disabled={isLoading} */}
      <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={isLoading}>
        Rendelés leadása
      </Button>
    </main>
  )
}

export default CartPage
