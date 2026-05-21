import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { db } from '../db.js'
import { ProductSchema } from '../schemas.js'
import type { AppEnv } from '../types.js'

export const productsRouter = new OpenAPIHono<AppEnv>()

// ─── GET /products ────────────────────────────────────────────────────────────

productsRouter.openapi(
  createRoute({
    method: 'get',
    path: '/',
    tags: ['Products'],
    summary: 'List all products',
    responses: {
      200: {
        description: 'List of products',
        content: { 'application/json': { schema: z.array(ProductSchema) } },
      },
    },
  }),
  async (c) => {
    const products = await db.product.findMany({ orderBy: { id: 'asc' } })
    return c.json(products, 200)
  },
)
