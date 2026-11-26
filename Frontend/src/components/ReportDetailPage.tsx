import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Phone, User } from "lucide-react";
import { getReportById } from "../services/api";
import type { Category, Clue, ReportDetail } from "../types";

interface ReportDetailPageProps {
  reportId: number;
  onBack: () => void;
}

const CATEGORY_LABEL: Record<Category, string> = {
  PERSON: "คนหาย",
  PET: "สัตว์เลี้ยงหาย",
  ITEM: "สิ่งของหาย",
};

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** รูปภาพพร้อม fallback เป็นกล่อง PlaceHolder เมื่อไม่มีรูปหรือโหลดไม่ได้ */
function Photo({
  src,
  alt,
  className,
}: {
  src?: string | null;
  alt: string;
  className: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`${className} bg-[#d5d5d5] flex items-center justify-center`}
      >
        <span className="text-white font-bold text-xl tracking-wide select-none drop-shadow-sm">
          PlaceHolder
        </span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`${className} object-cover`}
    />
  );
}

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-x-4 gap-y-0.5 py-3 border-t border-blue-100 first:border-t-0">
      <dt className="text-sm font-semibold text-gray-700">{label}</dt>
      <dd className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">
        {children}
      </dd>
    </div>
  );
}

function ClueCard({ clue }: { clue: Clue }) {
  return (
    <article className="bg-[#f0f8ff] rounded-[28px] border border-blue-100/60 p-5 md:p-6">
      {clue.imageUrl && (
        <Photo
          src={clue.imageUrl}
          alt={`ภาพเบาะแสจาก ${clue.user.name}`}
          className="w-full max-w-xs h-56 mx-auto rounded-[18px] mb-4"
        />
      )}

      <p className="text-sm text-gray-900 leading-relaxed">{clue.message}</p>

      {clue.location && (
        <p className="mt-3 flex items-start gap-1.5 text-sm text-gray-700">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
          <span>
            <span className="font-semibold">เจอที่:</span> {clue.location}
          </span>
        </p>
      )}

      <footer className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between gap-3 text-xs text-gray-600">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
            <User className="w-3.5 h-3.5" aria-hidden />
          </span>
          จาก {clue.user.name}
        </span>
        <time dateTime={clue.createdAt}>{formatDateTime(clue.createdAt)}</time>
      </footer>
    </article>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200/60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      <ArrowLeft className="w-4 h-4" aria-hidden />
      กลับ
    </button>
  );
}

/** ปุ่มกลับอยู่มุมซ้ายบนของพื้นที่ content ส่วนเนื้อหาจัดกึ่งกลางอยู่ด้านล่าง */
function DetailLayout({
  onBack,
  children,
}: {
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 pb-16">
      <BackButton onBack={onBack} />
      <div className="mx-auto max-w-3xl">{children}</div>
    </div>
  );
}

export default function ReportDetailPage({
  reportId,
  onBack,
}: ReportDetailPageProps) {
  const {
    data: report,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ReportDetail>({
    queryKey: ["report", reportId],
    queryFn: () => getReportById(reportId),
  });

  if (isLoading) {
    return (
      <DetailLayout onBack={onBack}>
        <div className="bg-[#f0f8ff] rounded-[32px] p-8 animate-pulse space-y-4">
          <div className="h-6 bg-blue-100 rounded w-1/2 mx-auto" />
          <div className="h-64 bg-blue-100 rounded-[18px] w-64 mx-auto" />
          <div className="h-4 bg-blue-100 rounded w-3/4" />
          <div className="h-4 bg-blue-100 rounded w-2/3" />
        </div>
      </DetailLayout>
    );
  }

  if (isError || !report) {
    const notFound = error instanceof Error && error.message === "NOT_FOUND";
    return (
      <DetailLayout onBack={onBack}>
        <div className="text-center py-12 bg-white/70 rounded-3xl border border-gray-200">
          <p className="font-semibold text-gray-800">
            {notFound ? "ไม่พบรายการแจ้งหายนี้" : "โหลดรายละเอียดไม่สำเร็จ"}
          </p>
          {!notFound && (
            <>
              <p className="text-sm text-gray-500 mt-1">
                ตรวจสอบว่า Backend ทำงานอยู่ที่ http://localhost:3000
                แล้วลองอีกครั้ง
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 px-5 py-2 rounded-xl text-sm font-medium bg-[#1a1a1a] text-white hover:bg-black transition-colors cursor-pointer"
              >
                ลองอีกครั้ง
              </button>
            </>
          )}
        </div>
      </DetailLayout>
    );
  }

  const isFound = report.status === "FOUND";

  return (
    <DetailLayout onBack={onBack}>
      {/* การ์ดรายละเอียดเคส */}
      <section className="bg-[#f0f8ff] rounded-[32px] p-6 md:p-8 border border-blue-100/60 shadow-sm">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] leading-snug">
            {report.title}
          </h2>
          <span
            className={`inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-semibold ${
              isFound
                ? "bg-green-600 text-white"
                : "bg-amber-100 text-amber-900"
            }`}
          >
            {isFound ? "พบแล้ว" : "กำลังตามหา"}
          </span>
        </div>

        <Photo
          src={report.imageUrl}
          alt={report.title}
          className="w-full max-w-sm h-72 mx-auto mt-5 rounded-[18px]"
        />

        <dl className="mt-6">
          <InfoRow label="ประเภทสิ่งที่หาย">
            {CATEGORY_LABEL[report.category]}
          </InfoRow>
          <InfoRow label="วันที่หาย">{formatDateTime(report.lostDate)}</InfoRow>
          <InfoRow label="รายละเอียด">{report.description}</InfoRow>
          <InfoRow label="พบเห็นล่าสุด">{report.lastSeenLocation}</InfoRow>
          <InfoRow label="ติดต่อหากพบ">
            <a
              href={`tel:${report.contactTel.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-1.5 font-medium text-blue-700 hover:underline"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden />
              {report.contactTel}
            </a>
          </InfoRow>
          <InfoRow label="ผู้แจ้ง">{report.user.name}</InfoRow>
        </dl>
      </section>

      {/* เบาะแสที่ได้รับ */}
      <section className="mt-8" aria-labelledby="clues-heading">
        <div className="flex items-center justify-between mb-4">
          <h3 id="clues-heading" className="text-lg font-bold text-gray-900">
            เบาะแสที่ได้รับ
          </h3>
          <span className="text-sm text-gray-500">
            ({report.clues.length} รายการ)
          </span>
        </div>

        {report.clues.length === 0 ? (
          <div className="text-center py-10 bg-white/60 rounded-2xl border border-dashed border-gray-300 text-gray-500">
            ยังไม่มีเบาะแสสำหรับรายการนี้
          </div>
        ) : (
          <div className="space-y-4">
            {report.clues.map((clue) => (
              <ClueCard key={clue.id} clue={clue} />
            ))}
          </div>
        )}
      </section>
    </DetailLayout>
  );
}
