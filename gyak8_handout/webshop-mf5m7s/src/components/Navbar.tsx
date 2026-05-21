import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/hooks'
import { selectCart } from '@/store/cartSlice'
import type { RootState } from '@/store/store'
// TODO [1]: import { useAppSelector } from '@/store/hooks'
// TODO [1]: import { selectCart } from '@/store/cartSlice'

const Navbar = () => {
  const cartItems = useAppSelector((state : RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0)

  //const totalItems = 0 // placeholder — töröld, ha kész a TODO [1]

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        {/* Link: React Router navigáció, nem tölt újra oldalt */}
        <Link to="/" className="font-bold text-lg">
          📊 Webshop
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <Button asChild>
            <Link to="/cart">
              <ShoppingCart />
              Kosár ({totalItems})
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
