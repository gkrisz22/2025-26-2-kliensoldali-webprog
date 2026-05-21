import { z } from '@hono/zod-openapi'

// ─── Models ─────────────────────────────────────────────────────────────────

export const UserSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: 'Admin' }),
    email: z.string().openapi({ example: 'admin@webshop.dev' }),
    role: z.enum(['user', 'admin']).openapi({ example: 'admin' }),
  })
  .openapi('User')

export const ProductSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: 'Mechanical Keyboard' }),
    price: z.number().openapi({ example: 29900 }),
    emoji: z.string().openapi({ example: '⌨️' }),
  })
  .openapi('Product')

export const OrderItemSchema = z
  .object({
    productId: z.number().openapi({ example: 1 }),
    productName: z.string().openapi({ example: 'Mechanical Keyboard' }),
    quantity: z.number().openapi({ example: 2 }),
    price: z.number().openapi({ example: 29900 }),
  })
  .openapi('OrderItem')

export const OrderSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    createdAt: z.string().openapi({ example: '2026-05-15T10:00:00.000Z' }),
    total: z.number().openapi({ example: 59800 }),
    itemCount: z.number().openapi({ example: 2 }),
    items: z.array(OrderItemSchema),
  })
  .openapi('Order')

export const OrderSummarySchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    createdAt: z.string().openapi({ example: '2026-05-15T10:00:00.000Z' }),
    total: z.number().openapi({ example: 59800 }),
    itemCount: z.number().openapi({ example: 2 }),
  })
  .openapi('OrderSummary')

// ─── Request bodies ──────────────────────────────────────────────────────────

export const LoginBodySchema = z.object({
  email: z.string().email().openapi({ example: 'admin@webshop.dev' }),
  password: z.string().min(1).openapi({ example: 'admin' }),
})

export const PlaceOrderItemSchema = z.object({
  productId: z.number().int().min(1).openapi({ example: 1 }),
  quantity: z.number().int().min(1).openapi({ example: 2 }),
})

export const PlaceOrderBodySchema = z
  .object({
    items: z.array(PlaceOrderItemSchema).min(1),
  })
  .openapi('PlaceOrderBody')

// ─── Path params ─────────────────────────────────────────────────────────────

export const IdParamSchema = z.object({
  id: z.coerce.number().int().openapi({ param: { name: 'id', in: 'path' }, example: 1 }),
})

// ─── Errors ──────────────────────────────────────────────────────────────────

export const ErrorSchema = z.object({ message: z.string() }).openapi('Error')
