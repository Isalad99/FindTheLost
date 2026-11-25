import { useState } from 'react';
import type { LostReport } from '../types';
import ReportCard from './ReportCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ReportSectionProps {
  title: string;
  reports: LostReport[];
  isLoading?: boolean;
}

export default function ReportSection({ title, reports, isLoading }: ReportSectionProps) {
  const [showAll, setShowAll] = useState(false);

  // เริ่มต้นแสดง 4 รายการต่อแถว ตามที่กำหนด
  const visibleReports = showAll ? reports : reports.slice(0, 4);

  return (
    <section className="mb-10">
      {/* หัวข้อประเภท */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        <span className="text-sm text-gray-500">
          ({reports.length} รายการ)
        </span>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-[24px] border border-gray-200 p-2.5 animate-pulse"
            >
              <div className="w-full h-44 rounded-[18px] bg-gray-200" />
              <div className="pt-3 pb-1 px-1.5 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-10 bg-white/60 rounded-2xl border border-dashed border-gray-300 text-gray-500">
          ยังไม่มีรายการแจ้งหายในหมวดหมู่นี้
        </div>
      ) : (
        <>
          {/* ตารางแสดง 4 รายการต่อแถว */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {visibleReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>

          {/* ปุ่มแสดงเพิ่มเติม (ถ้ามีมากกว่า 4 รายการ) */}
          {reports.length > 4 && (
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm cursor-pointer"
              >
                {showAll ? (
                  <>
                    <span>ย่อรายการ</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>แสดงเพิ่มเติม ({reports.length - 4} รายการ)</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
