import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import authReducer from './authSlice'
import { webshopApi } from './webshopApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [webshopApi.reducerPath]: webshopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webshopApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
