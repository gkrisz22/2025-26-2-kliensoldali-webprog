import { useAppDispatch } from "@/store/hooks";
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import type { Product } from "@/data/products"
import { addItem } from "@/store/cartSlice";


interface ProductCardProps extends Product  {
    addToCart: (id:number) => void;
}

const ProductCard = ({id, name, price, emoji, addToCart} :ProductCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardHeader>
        <div className="mb-2 text-5xl">{emoji}</div>
        <CardTitle className="text-[24px]">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{price} Ft</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => dispatch(addItem({ id, name, price, emoji}))}>Kosárba</Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
