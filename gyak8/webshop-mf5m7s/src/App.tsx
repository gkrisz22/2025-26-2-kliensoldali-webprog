import { useState } from "react"
import Navbar from "./components/Navbar"
import ProductCard from "./components/ProductCard"
import { products, type Product } from "./data/products"
 
export function App() {
  const [cartItems, setCartItems] = useState<Product[]>([])

  function addToCart(id:number) : void {
    const product = products.find(x => x.id === id);
    if(!product) return;

    setCartItems(state => [...state, product])
  }

  return (
      <div className="min-h-screen bg-background">
        <Navbar cartCount={cartItems.length} />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Termékek</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
              products.map((product:Product) => {
                return (
                  <ProductCard key={product.id} addToCart={addToCart} id={product.id} name={product.name} price={product.price} emoji={product.emoji} />
                )
              })
            }
          </div>
        </main>

      </div>
  )
}

export default App
