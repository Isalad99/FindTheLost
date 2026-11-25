import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  // กำหนดไฟล์ Schema โมเดลตาราง
  schema: "prisma/schema.prisma",
  migrations: {
    // โฟลเดอร์เก็บประวัติ SQL Migration
    path: "prisma/migrations",
    // คำสั่งที่ให้ทำงานอัตโนมัติเมื่อสั่ง 'npx prisma db seed'
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    // ใช้ DIRECT_URL (พอร์ต 5432 / Session mode) สำหรับ Prisma CLI (db push, migrate)
    // เพื่อป้องกันปัญหา PgBouncer: prepared statement "s1" already exists
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"] ?? "",
  },
});