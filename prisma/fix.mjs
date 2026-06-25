// Fix: \u0E2A\u0E21\u0E32\u0E23\u0E4C\u0E17\u0E42\u0E1F\u0E19 = "สมาร์ทโฟน" (no thanthakat on "ท")
import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) })

await prisma.categories.update({
  where: { id: 1 },
  data: { name: "\u0E2A\u0E21\u0E32\u0E23\u0E4C\u0E17\u0E42\u0E1F\u0E19" },
})

console.log("Fixed!")
await prisma.$disconnect()
