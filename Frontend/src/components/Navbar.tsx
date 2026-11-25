import { Search, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-[#fffffe] border-b border-gray-200/80 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* โลโก้ / ชื่อเว็บ ทางซ้าย */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-[#1a1a1a] cursor-pointer">
            FindTheLost
          </h1>
        </div>

        {/* แถบค้นหาตรงกลาง (UI ตาม Mockup) */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              readOnly
              placeholder="ค้นหา..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#f0f8ff] text-gray-700 rounded-full border border-transparent focus:outline-none focus:border-blue-300 transition-colors cursor-text"
            />
          </div>
        </div>

        {/* ปุ่ม Profile ขวาสุด (คลิกได้) */}
        <div className="flex items-center">
          <button
            type="button"
            title="เข้าสู่ระบบ / โปรไฟล์"
            onClick={() => {}}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-900 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
