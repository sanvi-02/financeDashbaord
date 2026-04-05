import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import Charts from './Charts';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { insights } = useApp();
  const { totalIncome, totalExpenses, netBalance } = insights;

  const statsCards = [
    {
      id: 1,
      title: 'Total Income',
      amount: totalIncome.toLocaleString(),
      change: '+12.5%',
      isPositive: true,
      icon: TrendingUp,
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 2,
      title: 'Total Expenses',
      amount: totalExpenses.toLocaleString(),
      change: '-8.2%',
      isPositive: false,
      icon: TrendingDown,
      iconBg: 'bg-rose-100 dark:bg-rose-900/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      id: 3,
      title: 'Net Balance',
      amount: netBalance.toLocaleString(),
      change: '+15.3%',
      isPositive: netBalance >= 0,
      icon: Wallet,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 4,
      title: 'Available Savings',
      amount: Math.max(0, netBalance * 0.3).toLocaleString(),
      change: '+5.7%',
      isPositive: true,
      icon: PiggyBank,
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
      gradient: 'from-amber-500 to-orange-600'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {card.title}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                    ${card.amount}
                  </h3>
                  <div className="flex items-center gap-1">
                    {card.isPositive ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-rose-500" />
                    )}
                    <span className={`text-sm font-medium ${card.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {card.change}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <button className="absolute top-3 right-3 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          );
        })}
      </div>


      <Charts />

      {/* Quick Actions */}
      {/* <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Want to save more?</h3>
            <p className="text-emerald-100 text-sm">
              Set up automatic savings and reach your financial goals faster.
            </p>
          </div>
          <button className="px-6 py-2.5 bg-white text-emerald-600 rounded-xl font-medium text-sm hover:bg-emerald-50 transition-all duration-200 hover:shadow-lg whitespace-nowrap">
            Setup Auto-Save
          </button>
        </div>
      </div> */}
    </div>
  );
}
