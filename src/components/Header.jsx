import { Search, Bell, Mail, Sun, Moon, User, Shield, Eye, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const { userRole, setUserRole } = useApp();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRoleDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleChange = (role) => {
    setUserRole(role);
    setShowRoleDropdown(false);
  };

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Welcome, User!
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Here's what's happening with your finances today.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Search */}
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Role Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
          >
            {userRole === 'admin' ? (
              <Shield className="w-4 h-4 text-emerald-500" />
            ) : (
              <Eye className="w-4 h-4 text-blue-500" />
            )}
            <span className="capitalize">{userRole}</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showRoleDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50 animate-fade-in">
              <button
                onClick={() => handleRoleChange('viewer')}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                  userRole === 'viewer'
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Eye className="w-4 h-4" />
                Viewer
                {userRole === 'viewer' && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
              <button
                onClick={() => handleRoleChange('admin')}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                  userRole === 'admin'
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Shield className="w-4 h-4" />
                Admin
                {userRole === 'admin' && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Messages */}
        <button className="hidden sm:flex p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105">
          <Mail className="w-5 h-5" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 p-1.5 pl-2 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"
          >
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-200">
            John Doe
          </span>
        </button>
      </div>
    </header>
  );
}
