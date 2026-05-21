import 'dotenv/config'
import { PrismaClient } from './generated/prisma/client.js'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcryptjs'

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
})
const db = new PrismaClient({ adapter })

async function main() {
  await db.orderItem.deleteMany()
  await db.order.deleteMany()
  await db.token.deleteMany()
  await db.product.deleteMany()
  await db.user.deleteMany()

  await db.user.create({
    data: {
      name: 'Admin',
      email: 'admin@webshop.dev',
      passwordHash: await bcrypt.hash('admin', 10),
      role: 'ADMIN',
    },
  })

  await db.product.createMany({
    data: [
      { name: 'Mechanical Keyboard', price: 29900, emoji: '⌨️' },
      { name: 'Wireless Mouse',      price: 12900, emoji: '🖱️' },
      { name: 'USB-C Hub',           price:  8900, emoji: '🔌' },
      { name: 'Monitor Stand',       price: 15900, emoji: '🖥️' },
      { name: 'Webcam HD',           price: 19900, emoji: '📷' },
      { name: 'LED Desk Lamp',       price:  6900, emoji: '💡' },
    ],
  })

  console.log('✅ Seed complete')
  console.log('   Admin: admin@webshop.dev / admin')
  console.log('   Products: 6 seeded')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => db.$disconnect())
