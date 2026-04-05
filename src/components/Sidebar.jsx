import { useState } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  ArrowRightLeft,
  Settings,
  HelpCircle,
  Menu,
  X,
  PiggyBank
} from 'lucide-react';

const menuItems = [
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
];

const bottomMenuItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle },
];

export default function Sidebar({ activePage, onPageChange }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleMenuClick = (pageId) => {
    onPageChange(pageId);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-slate-800 shadow-md lg:hidden transition-all duration-300 hover:shadow-lg"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6 text-slate-700 dark:text-slate-200" />
        ) : (
          <Menu className="w-6 h-6 text-slate-700 dark:text-slate-200" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <PiggyBank className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-800 dark:text-white">FinDash</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Premium Banking</p>
          </div>
        </div>

        {/* Main Menu */}
        <div className="p-4">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-3">
            Main Menu
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Menu */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800">
          <nav className="space-y-1">
            {bottomMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
