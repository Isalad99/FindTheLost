import { Search } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="bg-[#f0f8ff] rounded-[32px] p-8 md:p-10 mb-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-100/60 shadow-sm">
      {/* ฝั่งซ้าย: ข้อความแนะนำเว็บ และ ปุ่มแจ้งหาย */}
      <div className="flex-1 max-w-lg">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1a1a] tracking-tight leading-snug mb-3">
          หาทุกสิ่งที่หายไปของคุณ
        </h1>

        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
          ศูนย์รวมการแจ้งคนหาย สัตว์เลี้ยงหาย และสิ่งของสูญหาย
          ร่วมส่งเบาะแสและช่วยเหลือเพื่อพาสิ่งสำคัญกลับคืนสู่ครอบครัวอย่างปลอดภัย
        </p>

        {/* ปุ่มแจ้งหาย (ทำให้กดได้ตาม Requirement) */}
        <button
          type="button"
          onClick={() => {}}
          className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-black text-white text-sm md:text-base font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
        >
          <Search className="w-4 h-4 text-white" />
          <span>แจ้งหาย</span>
        </button>
      </div>

      {/* ฝั่งขวา: รูปภาพ Placeholder (ตาม draft.png) */}
      <div className="w-full md:w-72 lg:w-80 h-56 md:h-64 rounded-[26px] bg-[#d3d3d3] flex items-center justify-center shrink-0 shadow-inner">
        <span className="text-white font-bold text-2xl tracking-wide select-none drop-shadow-sm">
          PlaceHolder
        </span>
      </div>
    </div>
  );
}
