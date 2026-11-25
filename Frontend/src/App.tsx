import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PlaceholderPage from './components/PlaceholderPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'my-lost' | 'history'>('dashboard');

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col font-sans">
      {/* 1. Navbar ด้านบน */}
      <Navbar />

      {/* 2. ส่วนกลาง: Sidebar + Content */}
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 flex gap-6 mt-4">
        {/* Sidebar ทางซ้าย */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* พื้นที่แสดงผลเนื้อหาหลัก */}
        <main className="flex-1 min-w-0 pt-2">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'my-lost' && <PlaceholderPage title="My lost" />}
          {activeTab === 'history' && <PlaceholderPage title="History" />}
        </main>
      </div>
    </div>
  );
}
