import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import PlaceholderPage from "./components/PlaceholderPage";
import ReportDetailPage from "./components/ReportDetailPage";

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "my-lost" | "history"
  >("dashboard");
  // ถ้ามีค่า = กำลังเปิดหน้ารายละเอียดของเคสนั้น (ยังไม่ใช้ router จึงเก็บเป็น state)
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  const handleTabChange = (tab: "dashboard" | "my-lost" | "history") => {
    setSelectedReportId(null);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col font-sans">
      {/* 1. Navbar ด้านบน */}
      <Navbar onLogoClick={() => handleTabChange("dashboard")} />

      {/* 2. ส่วนกลาง: Sidebar + Content */}
      <div className="w-full px-4 md:px-6 flex gap-6 mt-4">
        {/* Sidebar ชิดซ้ายของจอ */}
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

        {/* พื้นที่แสดงผลเนื้อหาหลัก: จัดกึ่งกลางจอ */}
        <main className="flex-1 min-w-0 pt-2">
          <div className="mx-auto w-full max-w-6xl">
            {selectedReportId !== null ? (
              <ReportDetailPage
                reportId={selectedReportId}
                onBack={() => setSelectedReportId(null)}
              />
            ) : (
              <>
                {activeTab === "dashboard" && (
                  <Dashboard onSelectReport={setSelectedReportId} />
                )}
                {activeTab === "my-lost" && <PlaceholderPage title="My lost" />}
                {activeTab === "history" && <PlaceholderPage title="History" />}
              </>
            )}
          </div>
        </main>

        {/* ตัวถ่วงฝั่งขวา กว้างเท่า Sidebar เพื่อให้เนื้อหาอยู่กลางจอพอดี */}
        <div className="hidden xl:block w-52 shrink-0" aria-hidden />
      </div>
    </div>
  );
}
