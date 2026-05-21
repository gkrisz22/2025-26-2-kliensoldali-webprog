import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { db } from '../db.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import {
  OrderSchema,
  OrderSummarySchema,
  PlaceOrderBodySchema,
  IdParamSchema,
  ErrorSchema,
} from '../schemas.js'
import type { AppEnv } from '../types.js'

export const ordersRouter = new OpenAPIHono<AppEnv>()

function serializeOrder(order: {
  id: number
  createdAt: Date
  total: number
  items: { productId: number; product: { name: string }; quantity: number; price: number }[]
}) {
  return {
    id: order.id,
    createdAt: order.createdAt.toISOString(),
    total: order.total,
    itemCount: order.items.reduce((sum, i) => sum + i.quantity, 0),
    items: order.items.map((i) => ({
      productId: i.productId,
      productName: i.product.name,
      quantity: i.quantity,
      price: i.price,
    })),
  }
}

const orderInclude = {
  items: {
    include: { product: true },
  },
}

// ─── POST /orders ─────────────────────────────────────────────────────────────

ordersRouter.openapi(
  createRoute({
    method: 'post',
    path: '/',
    tags: ['Orders'],
    summary: 'Place an order (no auth required)',
    request: {
      body: { content: { 'application/json': { schema: PlaceOrderBodySchema } } },
    },
    responses: {
      201: {
        description: 'Order placed',
        content: { 'application/json': { schema: OrderSummarySchema } },
      },
      400: {
        description: 'Invalid product or out of stock',
        content: { 'application/json': { schema: ErrorSchema } },
      },
    },
  }),
  async (c) => {
    const { items } = c.req.valid('json')

    // Fetch all referenced products in one query
    const productIds = items.map((i) => i.productId)
    const products = await db.product.findMany({ where: { id: { in: productIds } } })

    if (products.length !== productIds.length) {
      return c.json({ message: 'One or more products not found' }, 400)
    }

    const productMap = new Map(products.map((p) => [p.id, p]))

    const total = items.reduce((sum, i) => {
      const p = productMap.get(i.productId)!
      return sum + p.price * i.quantity
    }, 0)

    const order = await db.order.create({
      data: {
        total,
        items: {
          create: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: productMap.get(i.productId)!.price,
          })),
        },
      },
      include: orderInclude,
    })

    return c.json(serializeOrder(order), 201)
  },
)

// ─── GET /orders (admin only) ─────────────────────────────────────────────────

ordersRouter.openapi(
  createRoute({
    method: 'get',
    path: '/',
    tags: ['Orders'],
    summary: 'List all orders (admin only)',
    middleware: [requireAuth, requireAdmin],
    security: [{ Bearer: [] }],
    responses: {
      200: {
        description: 'All orders',
        content: { 'application/json': { schema: z.array(OrderSchema) } },
      },
      401: {
        description: 'Unauthorized',
        content: { 'application/json': { schema: ErrorSchema } },
      },
      403: {
        description: 'Forbidden',
        content: { 'application/json': { schema: ErrorSchema } },
      },
    },
  }),
  async (c) => {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: orderInclude,
    })
    return c.json(orders.map(serializeOrder), 200)
  },
)

// ─── GET /orders/:id ──────────────────────────────────────────────────────────

ordersRouter.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    tags: ['Orders'],
    summary: 'Get a single order by ID',
    request: { params: IdParamSchema },
    responses: {
      200: {
        description: 'Order details',
        content: { 'application/json': { schema: OrderSchema } },
      },
      404: {
        description: 'Order not found',
        content: { 'application/json': { schema: ErrorSchema } },
      },
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const order = await db.order.findUnique({ where: { id }, include: orderInclude })
    if (!order) return c.json({ message: 'Order not found' }, 404)
    return c.json(serializeOrder(order), 200)
  },
)
