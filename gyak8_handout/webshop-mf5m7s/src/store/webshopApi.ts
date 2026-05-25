import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from './store'
import type { Product } from '@/data/products'

// ─── Típusok ─────────────────────────────────────────────────────────────────

export interface OrderItem {
  productId: number
  productName: string
  quantity: number
  price: number
}

export interface Order {
  id: number
  createdAt: string
  total: number
  itemCount: number
  items: OrderItem[]
}

export interface AuthUser {
  id: number
  name: string
  email: string
  role: string
}

// ─── API ─────────────────────────────────────────────────────────────────────

export const webshopApi = createApi({
  reducerPath: 'webshopApi',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',

    // Bearer token: minden védett kérésnél az Authorization fejlécbe kerül a token
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },

    // Cookie alapú megoldás (alternatíva a Bearer tokenhez):
    credentials: 'include',
  }),
  endpoints: (builder) => ({

    // baseUrl/products -> http://localhost:3000/api/products GET
    getProducts: builder.query<Product[], void>({
      query: () => `/products`
    }),

    // Body: { items: { productId: number; quantity: number }[] }
    // Válasz: Order

    // http://localhost:3000/api/orders POST (PUT, PATCH)
    placeOrder: builder.mutation<Order, { items: { productId: number; quantity: number }[] }>({
      query: (body) => ({ url: "/orders", method: "POST", body }) // body: body
    }),
    // ── Auth (kész, infrastruktúraként adott) ────────────────────────────────

    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
    }),

    login: builder.mutation<{ token: string; user: AuthUser }, { email: string; password: string }>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      invalidatesTags: ['Auth'],
    }),

    // Cookie alapú megoldás: a szerver validálja a sütit és visszaadja a felhasználót
    getMe: builder.query<AuthUser, void>({
       query: () => '/auth/me',
       providesTags: ['Auth'],
    }),

    logoutUser: builder.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useLoginMutation,
  useGetMeQuery,
  useLogoutUserMutation,
  useGetProductsQuery, // GET - query
  usePlaceOrderMutation // POST - mutation
} = webshopApi
