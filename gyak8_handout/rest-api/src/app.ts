import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { authRouter } from './routes/auth.js'
import { productsRouter } from './routes/products.js'
import { ordersRouter } from './routes/orders.js'
import type { AppEnv } from './types.js'

export function createApp() {
  const app = new OpenAPIHono<AppEnv>()

  // ─── CORS ──────────────────────────────────────────────────────────────────
  app.use(
    '*',
    cors({
      origin: (origin) => {
        const allowed = [
          'http://localhost:5173',
          process.env.FRONTEND_URL,
        ].filter(Boolean) as string[]
        return allowed.includes(origin) ? origin : allowed[0]
      },
      allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }),
  )

  // ─── Security scheme ───────────────────────────────────────────────────────
  app.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
    type: 'http',
    scheme: 'bearer',
    description: 'Paste the token received from POST /api/auth/login.',
  })

  app.use(logger())
  app.use(prettyJSON())

  // ─── Routes ────────────────────────────────────────────────────────────────
  const api = new OpenAPIHono<AppEnv>()
  api.route('/auth', authRouter)
  api.route('/products', productsRouter)
  api.route('/orders', ordersRouter)
  app.route('/api', api)

  // ─── OpenAPI spec ──────────────────────────────────────────────────────────
  app.doc('/openapi.json', {
    openapi: '3.0.0',
    info: {
      title: 'Webshop API',
      version: '1.0.0',
      description: 'REST API for the teaching webshop project.',
    },
    servers: [{ url: `http://localhost:${process.env.PORT ?? 3000}` }],
  })

  // ─── Swagger UI ────────────────────────────────────────────────────────────
  app.get('/docs', swaggerUI({ url: '/openapi.json' }))

  // ─── Health check ──────────────────────────────────────────────────────────
  app.get('/', (c) => c.json({ status: 'ok', version: '1.0.0' }))

  // ─── Error handling ────────────────────────────────────────────────────────
  app.onError((err, c) => {
    console.error(err)
    return c.json({ message: 'Internal server error' }, 500)
  })

  app.notFound((c) => c.json({ message: 'Not found' }, 404))

  return app
}
