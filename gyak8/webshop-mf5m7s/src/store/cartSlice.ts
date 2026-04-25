import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { CartItem, Product } from '@/data/products'

// Define a type for the slice state
export interface CartState {
  items: CartItem[]
}

// Define the initial state using that type
const initialState2: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState2,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
        const product = action.payload;
        const existingProduct = state.items.find(p => p.id === product.id);
        if(existingProduct) {
            existingProduct.quantity += 1;
        }
        else {
            state.items.push({
                ...product,
                /*id: product.id,
                name: product.name,
                price: product.price,
                emoji: product.emoji,*/
                quantity: 1
            })
        }
    }

    
    /*increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }*/
  }
})


export const { addItem } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCart = (state: RootState) => state.cart.items;

export default cartSlice.reducer