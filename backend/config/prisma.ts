import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.DB_CA
    }
})

const prisma = new PrismaClient({
    adapter,
    log: ["query"]
});

export default prisma;