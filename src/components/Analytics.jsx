import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart as PieChartIcon,
  Calendar,
  CreditCard,
  Plus,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Download,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Custom Tooltip for Charts
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        {label && (
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            {label}
          </p>
        )}
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// KPI Card Component
function KPICard({ title, amount, change, isPositive, icon: Icon, color }) {
  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            ${amount.toLocaleString()}
          </h3>
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-rose-500" />
              )}
              <span className={`text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                {Math.abs(change).toFixed(1)}%
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

// Time Series Chart Component
function TimeSeriesChart({ data }) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorIncome)"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#f59e0b"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorExpenses)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Expense Breakdown Pie Chart
function ExpenseBreakdownChart({ data }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.slice(0, 6).map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-slate-600 dark:text-slate-400 truncate">{item.name}</span>
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200 ml-auto">
              ${item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Card Component
function BankCard({ card, onDelete }) {
  return (
    <div className={`relative rounded-2xl p-5 text-white overflow-hidden bg-gradient-to-br ${card.color} shadow-lg transition-transform duration-300 hover:scale-[1.02]`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-10" />

      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-white/80 text-xs font-medium mb-0.5">{card.type}</p>
            <p className="text-white font-semibold">{card.name}</p>
          </div>
          <CreditCard className="w-8 h-8 text-white/80" />
        </div>

        <p className="text-lg font-mono tracking-wider mb-4">{card.number}</p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-white/60 text-xs mb-0.5">Balance</p>
            <p className="text-xl font-bold">${card.balance.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-xs mb-0.5">Expires</p>
            <p className="text-sm font-medium">{card.expiry}</p>
          </div>
        </div>

        <button
          onClick={() => onDelete(card.id)}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/20 opacity-0 hover:opacity-100 transition-opacity"
        >
          <Trash2 className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

// Add Card Modal
function AddCardModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    expiry: '',
    type: 'Debit',
    color: 'from-emerald-500 to-teal-600',
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.name || !formData.number || !formData.expiry) return;
    onAdd({
      ...formData,
      number: `**** **** **** ${formData.number.slice(-4)}`,
    });
    setFormData({ name: '', number: '', expiry: '', type: 'Debit', color: 'from-emerald-500 to-teal-600' });
    onClose();
  };

  const colorOptions = [
    { value: 'from-emerald-500 to-teal-600', label: 'Green' },
    { value: 'from-blue-500 to-indigo-600', label: 'Blue' },
    { value: 'from-purple-500 to-pink-600', label: 'Purple' },
    { value: 'from-rose-500 to-orange-600', label: 'Orange' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Add New Card</h3>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cardholder Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Card Number</label>
              <input
                type="text"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Expiry</label>
              <input
                type="text"
                value={formData.expiry}
                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Color</label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                {colorOptions.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg transition-all"
          >
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Analytics Component
export default function Analytics() {
  const {
    analytics,
    cards,
    addCard,
    deleteCard,
    timeFilter,
    setTimeFilter,
  } = useApp();

  const [showAddCardModal, setShowAddCardModal] = useState(false);

  const {
    totalIncome,
    totalExpenses,
    netBalance,
    monthlyData,
    expenseBreakdown,
    highestSpendingCategory,
    incomeChange,
    expenseChange,
  } = analytics;

  const timeFilterOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'year', label: 'This Year' },
    { value: 'month', label: 'This Month' },
    { value: 'week', label: 'This Week' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Analytics Dashboard</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time financial insights and trends
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          >
            {timeFilterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Income"
          amount={totalIncome}
          change={incomeChange}
          isPositive={incomeChange >= 0}
          icon={TrendingUp}
          color="from-emerald-500 to-teal-600"
        />
        <KPICard
          title="Total Expenses"
          amount={totalExpenses}
          change={expenseChange}
          isPositive={expenseChange < 0}
          icon={TrendingDown}
          color="from-rose-500 to-pink-600"
        />
        <KPICard
          title="Net Balance"
          amount={netBalance}
          icon={Wallet}
          color="from-blue-500 to-indigo-600"
        />
        <KPICard
          title="Top Category"
          amount={highestSpendingCategory.value || 0}
          icon={PieChartIcon}
          color="from-amber-500 to-orange-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Series Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Income vs Expenses</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Monthly trend analysis</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Income
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Expense
              </span>
            </div>
          </div>
          <TimeSeriesChart data={monthlyData} />
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Expense Breakdown</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">By category</p>
            </div>
            <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-medium">
              {/* View Details */}
            </button>
          </div>
          {expenseBreakdown.length > 0 ? (
            <ExpenseBreakdownChart data={expenseBreakdown} />
          ) : (
            <div className="h-72 flex items-center justify-center text-slate-500">
              No expense data available
            </div>
          )}
        </div>
      </div>
1
      {/* My Cards Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">My Cards</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage your payment cards</p>
          </div>
          <button
            onClick={() => setShowAddCardModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Card
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <BankCard key={card.id} card={card} onDelete={deleteCard} />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Financial Health Score</h3>
            <p className="text-emerald-100 text-sm">
              Your savings rate is {totalIncome > 0 ? ((netBalance / totalIncome) * 100).toFixed(1) : 0}% — {netBalance > 0 ? 'Great job!' : 'Keep improving!'}
            </p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{expenseBreakdown.length}</p>
              <p className="text-xs text-emerald-100">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{cards.length}</p>
              <p className="text-xs text-emerald-100">Active Cards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      <AddCardModal
        isOpen={showAddCardModal}
        onClose={() => setShowAddCardModal(false)}
        onAdd={addCard}
      />
    </div>
  );
}
