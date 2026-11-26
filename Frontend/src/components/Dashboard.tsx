import { useQuery } from '@tanstack/react-query';
import { getReports } from '../services/api';
import HeroBanner from './HeroBanner';
import ReportSection from './ReportSection';
import type { LostReport } from '../types';

export default function Dashboard() {
  const { data: reports = [], isLoading } = useQuery<LostReport[]>({
    queryKey: ['reports'],
    queryFn: () => getReports(),
  });

  // แยกข้อมูลตามประเภท 3 หมวดหมู่
  const personReports = reports.filter((r) => r.category === 'PERSON');
  const petReports = reports.filter((r) => r.category === 'PET');
  const itemReports = reports.filter((r) => r.category === 'ITEM');

  return (
    <div className="flex-1 pb-16">
      {/* 1. กล่องแนะนำ Website ด้านบน */}
      <HeroBanner />

      {/* 2. รายการแจ้งของหาย แยก 3 ประเภท (4 รายการต่อแถว) */}
      <ReportSection
        title="คนหาย"
        reports={personReports}
        isLoading={isLoading}
      />

      <ReportSection
        title="สัตว์หาย"
        reports={petReports}
        isLoading={isLoading}
      />

      <ReportSection
        title="สิ่งของหาย"
        reports={itemReports}
        isLoading={isLoading}
      />
    </div>
  );
}
