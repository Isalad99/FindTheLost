import pg from "pg";
const { Pool } = pg;
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// โหลดค่า DATABASE_URL จากไฟล์ .env
dotenv.config();

// 1. สร้าง Connection Pool เชื่อมต่อไปยัง PostgreSQL (ใช้ DIRECT_URL หรือ DATABASE_URL)
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

// 2. หุ้ม pg Pool ด้วย Driver Adapter ของ Prisma 7
const adapter = new PrismaPg(pool);

// 3. สร้างและ export PrismaClient ตัวเดียว (Single Instance) ไปใช้ทั่วทั้งโปรเจกต์
export const prisma = new PrismaClient({ adapter });
