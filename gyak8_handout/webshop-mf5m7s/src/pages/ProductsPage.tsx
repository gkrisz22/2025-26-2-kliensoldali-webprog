import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'
import { useGetProductsQuery } from '@/store/webshopApi'

const ProductsPage = () => {
  const data = "asd";
  // TODO [2]: const { data: products = [], isLoading, isError } = useGetProductsQuery()
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  // SELECT name AS nev * users

  if (isLoading) {
     return (
       <main className="max-w-5xl mx-auto px-4 py-8">
         <p className="text-muted-foreground">Termékek betöltése...</p>
      </main>
    )
  }
  // TODO [2]: if (isError) {
  //   return (
  //     <main className="max-w-5xl mx-auto px-4 py-8">
  //       <p className="text-destructive">Hiba a termékek betöltésekor. Elindult a szerver?</p>
  //     </main>
  //   )
  // }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Termékek</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </main>
  )
}

export default ProductsPage
