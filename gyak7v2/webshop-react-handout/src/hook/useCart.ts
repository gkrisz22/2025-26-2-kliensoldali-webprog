import { useState } from 'react'
import type { CartItem, Product } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product:Product, quantity:number = 1) => {
    console.log(`Adding product ${product.id} | quantity: ${quantity}` )
    setCartItems(prev => {
      const existing = prev.find((item) => item.product.id === product.id);
      if(existing) {
        return prev.map((item) => item.product.id === product.id ? {...item, quantity: item.quantity + quantity} : item);
      }
      return [...prev, { product, quantity: quantity}];
    });
  }

  const removeFromCart = (productId:number) => {
    setCartItems(prev => prev.filter((item) => item.product.id !== productId));
  }

  const updateQuantity = (productId:number, quantity: number) => {
    if(quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) => prev.map((item) => item.product.id === productId? {...item, quantity } : item))
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity , 0);
  const clearCart = () => setCartItems([]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    clearCart
  };
}

export default useCart