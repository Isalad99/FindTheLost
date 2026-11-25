# FindTheLost

ระบบเว็บแอปพลิเคชันสำหรับแจ้งคนหาย สัตว์เลี้ยงหาย และสิ่งของสูญหาย (Lost and Found Platform) เพื่อเป็นศูนย์กลางในการช่วยเหลือ ส่งต่อข้อมูล และแจ้งเบาะแสระหว่างผู้ใช้งาน

---

## ฟังก์ชันการทำงานหลัก

1. ระบบจัดการผู้ใช้และการยืนยันตัวตน (Authentication)
   - ลงทะเบียน (Register) และเข้าสู่ระบบ (Login)
   - ระบุตัวตนของผู้แจ้งหายและผู้แจ้งเบาะแส
   - จัดการสิทธิ์การใช้งานผ่าน Role (USER, ADMIN)

2. ระบบแจ้งหาย (Lost Reports)
   - รองรับการแจ้ง 3 ประเภท: คน (PERSON), สัตว์เลี้ยง (PET), สิ่งของ (ITEM)
   - บันทึกข้อมูลสำคัญ: ชื่อ, ประเภท, วันที่หาย, รายละเอียด, สถานที่พบเห็นล่าสุด, เบอร์โทรติดต่อ, ลิงก์รูปภาพ
   - จัดการสถานะเคส: กำลังตามหา (LOST), พบแล้ว/ปิดเคส (FOUND)

3. ระบบแจ้งเบาะแส (Clues / Tips)
   - ผู้ใช้สามารถส่งข้อความเบาะแส สถานที่พบเห็น และรูปถ่ายยืนยัน
   - ทุกคนสามารถดูเบาะแสที่เข้ามาช่วยตอบใต้แต่ละโพสต์ได้

4. ระบบประวัติ (History)
   - ผู้ใช้สามารถตรวจสอบประวัติเบาะแสทั้งหมดที่ตนเองเคยส่งได้
   - ตรวจสอบรายการที่ตนเองเคยโพสต์แจ้งหายไว้

---

## เทคโนโลยีที่ใช้ (Tech Stack)

### Backend
- Node.js (Runtime Environment)
- Express.js (RESTful API Framework)
- TypeScript (Language)
- Prisma ORM (Database ORM)
- PostgreSQL / Supabase (Relational Database)

### Frontend
- React 19
- Vite (Build Tool & Dev Server)
- Tailwind CSS v4 (Styling)
- TanStack Query v5 (Data Fetching & Caching)
- Zustand (State Management)
- Lucide React (Icons)

---

## โครงสร้างโปรเจกต์ (Project Structure)

```text
FindTheLost/
├── Backend/
│   ├── prisma/
│   │   ├── schema.prisma      # กำหนดโครงสร้างตารางและ Enums
│   │   └── seed.ts            # จำลองข้อมูล Mock Data 40 รายการ
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.ts      # กำหนดการเชื่อมต่อ Prisma Client และ Pg Pool
│   │   └── server.ts          # Express REST API Server
│   ├── .env                   # ตัวแปรสภาพแวดล้อม (DATABASE_URL, DIRECT_URL)
│   ├── prisma7.config.ts      # การตั้งค่า Prisma 7
│   ├── tsconfig.json
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx     # แถบเมนูด้านบนและช่องค้นหา
│   │   │   ├── Sidebar.tsx    # เมนูด้านข้าง (Dashboard, My lost, History)
│   │   │   ├── HeroBanner.tsx # แบนเนอร์แนะนำระบบและปุ่มแจ้งหาย
│   │   │   ├── ReportCard.tsx # การ์ดแสดงรายการของหาย
│   │   │   ├── ReportSection.tsx # แสดงรายการแยกหมวดหมู่และปุ่มแสดงเพิ่มเติม
│   │   │   └── Dashboard.tsx  # หน้าหลักแดชบอร์ด
│   │   ├── services/
│   │   │   └── api.ts         # ฟังก์ชันเชื่อมต่อกับ Backend API
│   │   ├── types/
│   │   │   └── index.ts       # TypeScript Interfaces
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── vite.config.ts
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## การติดตั้งและการเริ่มใช้งาน (Getting Started)

### 1. ความต้องการของระบบ (Prerequisites)
- Node.js เวอร์ชั่น 18 หรือใหม่กว่า
- บัญชีฐานข้อมูล PostgreSQL (เช่น Supabase)

### 2. ติดตั้งและตั้งค่า Backend

1. เข้าสู่โฟลเดอร์ Backend และติดตั้ง Dependencies:
   ```bash
   cd Backend
   npm install
   ```

2. สร้างไฟล์ `.env` ในโฟลเดอร์ `Backend/` โดยระบุค่า Connection String:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-1-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-1-[REGION].pooler.supabase.com:5432/postgres"
   ```

3. ซิงค์โครงสร้างตารางขึ้นฐานข้อมูล:
   ```bash
   npx prisma db push
   ```

4. นำเข้าข้อมูลจำลอง (Mock Data 40 รายการ):
   ```bash
   npx prisma db seed
   ```

5. เริ่มต้นรันเซิร์ฟเวอร์ Backend:
   ```bash
   npm run dev
   ```
   เซิร์ฟเวอร์จะเริ่มทำงานที่ `http://localhost:3000`

---

### 3. ติดตั้งและตั้งค่า Frontend

1. เปิด Terminal ใหม่ เข้าสู่โฟลเดอร์ Frontend และติดตั้ง Dependencies:
   ```bash
   cd Frontend
   npm install
   ```

2. เริ่มต้นรัน Frontend Dev Server:
   ```bash
   npm run dev
   ```
   เปิดเบราว์เซอร์และเข้าไปที่ URL ที่แสดงบนหน้าจอ (เช่น `http://localhost:5173`)

---

## รายการ API Endpoints (REST API Reference)

| Method | Endpoint | รายละเอียด |
| :--- | :--- | :--- |
| GET | `/api/reports` | ดึงรายการแจ้งหายทั้งหมด (รองรับ Filter: `category`, `status`, `search`) |
| GET | `/api/reports/:id` | ดึงรายละเอียดเคสพร้อมรายการเบาะแสทั้งหมด |
| POST | `/api/reports` | บันทึกการแจ้งหายใหม่ |
| PATCH | `/api/reports/:id/status` | อัปเดตสถานะของเคส (`LOST` หรือ `FOUND`) |
| POST | `/api/clues` | ส่งเบาะแสให้กับเคส |
| GET | `/api/users/:userId/history` | ดึงประวัติเบาะแสและโพสต์ของผู้ใช้ |
| POST | `/api/auth/register` | สมัครสมาชิกผู้ใช้ใหม่ |
| POST | `/api/auth/login` | เข้าสู่ระบบ |
| GET | `/api/users` | ดึงรายชื่อผู้ใช้ทั้งหมด |

---

## โครงสร้างฐานข้อมูล (Database Schema)

- **User**: จัดเก็บข้อมูลผู้ใช้งาน (`id`, `email`, `password`, `name`, `tel`, `role`, `createdAt`)
- **LostReport**: จัดเก็บข้อมูลการแจ้งหาย (`id`, `title`, `category`, `lostDate`, `description`, `lastSeenLocation`, `contactTel`, `imageUrl`, `status`, `userId`, `createdAt`)
- **Clue**: จัดเก็บเบาะแส (`id`, `message`, `imageUrl`, `location`, `reportId`, `userId`, `createdAt`)
- **Enums**:
  - `Role`: `USER`, `ADMIN`
  - `Category`: `PERSON`, `PET`, `ITEM`
  - `ReportStatus`: `LOST`, `FOUND`
