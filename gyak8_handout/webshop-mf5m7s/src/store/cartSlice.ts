import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { CartItem, Product } from '@/data/products'

export interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const product = action.payload
      const existing = state.items.find((p) => p.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },

    // TODO: removeItem — törölje ki az adott id-jű terméket a kosárból
    // removeItem(state, action: PayloadAction<number>) {
    //   state.items = state.items.filter((i) => i.id !== action.payload)
    // },

    // TODO: clearCart — ürítse ki a teljes kosarat
     clearCart(state) {
       state.items = []
     },
  },
})

export const { addItem, clearCart } = cartSlice.actions
// TODO: exportáld a removeItem és clearCart akciókat is


// TODO: selectCart — adja vissza a kosár tartalmát
export const selectCart = (state: RootState) => state.cart.items

// TODO: selectCartTotal — számítsa ki a végösszeget
 export const selectCartTotal = (state: RootState) =>  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

export default cartSlice.reducer
