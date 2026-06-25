import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "../generated/prisma/client.js"

const adapter = new PrismaMariaDb(process.env.DATABASE_URL)
const prisma = new PrismaClient({ adapter })

console.log("Clearing...")
await prisma.order_items.deleteMany()
await prisma.orders.deleteMany()
await prisma.product_images.deleteMany()
await prisma.products.deleteMany()
await prisma.categories.deleteMany()
await prisma.customers.deleteMany()

console.log("Seeding...")
await prisma.categories.createMany({ data: [
  { id: 1, name: "\u0E2A\u0E21\u0E32\u0E23\u0E4C\u0E17\u0E42\u0E1F\u0E19" },
  { id: 2, name: "\u0E41\u0E25\u0E47\u0E1B\u0E17\u0E47\u0E2D\u0E1B" },
  { id: 3, name: "\u0E2B\u0E39\u0E1F\u0E31\u0E07" },
  { id: 4, name: "\u0E41\u0E17\u0E47\u0E1A\u0E40\u0E25\u0E47\u0E15" },
  { id: 5, name: "\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C\u0E40\u0E2A\u0E23\u0E34\u0E21" },
]})
// products
await prisma.products.createMany({ data: [
  { id: 1, name: "iPhone 16 Pro", description: "\u0E2A\u0E21\u0E32\u0E23\u0E4C\u0E17\u0E42\u0E1F\u0E19 Apple \u0E08\u0E2D 6.3 \u0E19\u0E34\u0E49\u0E27 \u0E0A\u0E34\u0E1B A18 Pro", price: 45900.00, category_id: 1 },
  { id: 2, name: "Samsung Galaxy S25", description: "\u0E2A\u0E21\u0E32\u0E23\u0E4C\u0E17\u0E42\u0E1F\u0E19 Samsung \u0E08\u0E2D 6.2 \u0E19\u0E34\u0E49\u0E27 \u0E0A\u0E34\u0E1B Snapdragon 8 Elite", price: 32900.00, category_id: 1 },
  { id: 3, name: "MacBook Air M3", description: "\u0E41\u0E25\u0E47\u0E1B\u0E17\u0E47\u0E2D\u0E1B Apple \u0E08\u0E2D 15 \u0E19\u0E34\u0E49\u0E27 RAM 16GB SSD 512GB", price: 44900.00, category_id: 2 },
  { id: 4, name: "AirPods Pro 2", description: "\u0E2B\u0E39\u0E1F\u0E31\u0E07\u0E44\u0E23\u0E49\u0E2A\u0E32\u0E22 Apple \u0E15\u0E31\u0E14\u0E40\u0E2A\u0E35\u0E22\u0E07\u0E23\u0E1A\u0E01\u0E27\u0E19 USB-C", price: 8990.00, category_id: 3 },
  { id: 5, name: "iPad Air M2", description: "\u0E41\u0E17\u0E47\u0E1A\u0E40\u0E25\u0E47\u0E15 Apple \u0E08\u0E2D 13 \u0E19\u0E34\u0E49\u0E27 \u0E0A\u0E34\u0E1B M2", price: 33900.00, category_id: 4 },
]})
// product_images
await prisma.product_images.createMany({ data: [
  { id: 1, product_id: 1, image_name: "iphone16pro-front.jpg" },
  { id: 2, product_id: 1, image_name: "iphone16pro-back.jpg" },
  { id: 3, product_id: 2, image_name: "galaxy-s25-front.jpg" },
  { id: 4, product_id: 3, image_name: "macbook-air-m3-silver.jpg" },
  { id: 5, product_id: 4, image_name: "airpods-pro2-case.jpg" },
]})
// customers
await prisma.customers.createMany({ data: [
  { id: 1, name: "\u0E2A\u0E21\u0E0A\u0E32\u0E22 \u0E43\u0E08\u0E14\u0E35", address: "123 \u0E16.\u0E2A\u0E38\u0E02\u0E38\u0E21\u0E27\u0E34\u0E17 \u0E41\u0E02\u0E27\u0E07\u0E04\u0E25\u0E2D\u0E07\u0E40\u0E15\u0E22 \u0E40\u0E02\u0E15\u0E04\u0E25\u0E2D\u0E07\u0E40\u0E15\u0E22 \u0E01\u0E23\u0E38\u0E07\u0E40\u0E17\u0E1E\u0E2F 10110", phone: "081-234-5678" },
  { id: 2, name: "\u0E2A\u0E21\u0E2B\u0E0D\u0E34\u0E07 \u0E23\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19", address: "456 \u0E16.\u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48-\u0E25\u0E33\u0E1B\u0E32\u0E07 \u0E15.\u0E0A\u0E49\u0E32\u0E07\u0E40\u0E1C\u0E37\u0E2D\u0E01 \u0E2D.\u0E40\u0E21\u0E37\u0E2D\u0E07 \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48 50300", phone: "089-876-5432" },
  { id: 3, name: "\u0E27\u0E34\u0E0A\u0E31\u0E22 \u0E42\u0E04\u0E49\u0E14\u0E40\u0E01\u0E48\u0E07", address: "789 \u0E16.\u0E21\u0E34\u0E15\u0E23\u0E20\u0E32\u0E1E \u0E15.\u0E43\u0E19\u0E40\u0E21\u0E37\u0E2D\u0E07 \u0E2D.\u0E40\u0E21\u0E37\u0E2D\u0E07 \u0E19\u0E04\u0E23\u0E23\u0E32\u0E0A\u0E2A\u0E35\u0E21\u0E32 30000", phone: "092-345-6789" },
  { id: 4, name: "\u0E19\u0E20\u0E32 \u0E2A\u0E38\u0E02\u0E2A\u0E31\u0E19\u0E15\u0E4C", address: "321 \u0E16.\u0E2D\u0E38\u0E1B\u0E23\u0E32\u0E0A \u0E15.\u0E43\u0E19\u0E40\u0E21\u0E37\u0E2D\u0E07 \u0E2D.\u0E40\u0E21\u0E37\u0E2D\u0E07 \u0E2D\u0E38\u0E1A\u0E25\u0E23\u0E32\u0E0A\u0E18\u0E32\u0E19\u0E35 34000", phone: "063-456-7890" },
  { id: 5, name: "\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E43\u0E08 \u0E14\u0E35\u0E44\u0E0B\u0E19\u0E4C", address: "654 \u0E16.\u0E23\u0E32\u0E0A\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19 \u0E15.\u0E1B\u0E23\u0E30\u0E15\u0E39\u0E0A\u0E31\u0E22 \u0E2D.\u0E1E\u0E23\u0E30\u0E19\u0E04\u0E23\u0E28\u0E23\u0E35\u0E2D\u0E22\u0E38\u0E18\u0E22\u0E32 13000", phone: "095-567-8901" },
]})
// orders
await prisma.orders.createMany({ data: [
  { id: 1, date: new Date("2026-06-01T09:30:00"), customer_id: 1, status: "delivered", total_amount: 100790.00 },
  { id: 2, date: new Date("2026-06-01T14:15:00"), customer_id: 2, status: "delivered", total_amount: 53890.00 },
  { id: 3, date: new Date("2026-06-02T10:00:00"), customer_id: 3, status: "processing", total_amount: 41890.00 },
  { id: 4, date: new Date("2026-06-02T16:45:00"), customer_id: 4, status: "received", total_amount: 78800.00 },
  { id: 5, date: new Date("2026-06-03T08:20:00"), customer_id: 5, status: "processing", total_amount: 79800.00 },
]})
// order_items
await prisma.order_items.createMany({ data: [
  { id: 1, order_id: 1, product_id: 1, quantity: 2, price: 45900.00 },
  { id: 2, order_id: 1, product_id: 4, quantity: 1, price: 8990.00 },
  { id: 3, order_id: 2, product_id: 3, quantity: 1, price: 44900.00 },
  { id: 4, order_id: 2, product_id: 4, quantity: 1, price: 8990.00 },
  { id: 5, order_id: 3, product_id: 2, quantity: 1, price: 32900.00 },
  { id: 6, order_id: 3, product_id: 4, quantity: 1, price: 8990.00 },
  { id: 7, order_id: 4, product_id: 3, quantity: 1, price: 44900.00 },
  { id: 8, order_id: 4, product_id: 5, quantity: 1, price: 33900.00 },
  { id: 9, order_id: 5, product_id: 1, quantity: 1, price: 45900.00 },
  { id: 10, order_id: 5, product_id: 5, quantity: 1, price: 33900.00 },
]})
console.log("Done!")
await prisma.$disconnect()