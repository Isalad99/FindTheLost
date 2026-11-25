interface SidebarProps {
  activeTab: 'dashboard' | 'my-lost' | 'history';
  onTabChange: (tab: 'dashboard' | 'my-lost' | 'history') => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems: { id: 'dashboard' | 'my-lost' | 'history'; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'my-lost', label: 'My Lost' },
    { id: 'history', label: 'History' },
  ];

  return (
    <aside className="w-52 shrink-0 py-6 pr-4">
      <nav className="flex flex-col space-y-2 sticky top-20">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#d9d9d9] text-black font-semibold'
                  : 'text-gray-700 hover:bg-gray-200/60'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
