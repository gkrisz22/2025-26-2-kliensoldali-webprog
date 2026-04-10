import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'

const Navbar = (props: { cartCount: number }) => {
  return (
    <header className='border-b sticky top-0 bg-background z-10'>
        <div className='max-w-5xl mx-auto px-4 h-16 flex items-center justify-between '>
            <span>📊 Webshop</span>
            <span>Középen vagyok</span>
            <Button>
                <ShoppingCart />
                Kosár
                ({props.cartCount})
            </Button>

        </div>
    </header>
  )
}

export default Navbar