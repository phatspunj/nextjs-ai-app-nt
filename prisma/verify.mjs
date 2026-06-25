import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) })

const cats = await prisma.categories.findMany()
console.log("Categories:", cats.map((c) => c.name).join(", "))

const custs = await prisma.customers.findMany()
console.log("Customers:", custs.map((c) => c.name).join(", "))

const prods = await prisma.products.findMany()
console.log("Products:", prods.map((p) => p.name).join(", "))

const stats = {
  orders: await prisma.orders.count(),
  orderItems: await prisma.order_items.count(),
  productImages: await prisma.product_images.count(),
}
console.log("Counts:", stats)

await prisma.$disconnect()
