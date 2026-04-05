import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  RefreshCw,
  MoreHorizontal,
  DollarSign,
  TrendingUp,
  CreditCard,
  Percent,
  Activity,
  Flame,
  Clock,
} from "lucide-react";

// ==================== DATA ====================
const metricCards = [
  {
    id: 1,
    title: "Accounts Receivable",
    value: "$3.76M",
    icon: DollarSign,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    title: "Revenue",
    value: "$11.30M",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    id: 3,
    title: "Accounts Payable",
    value: "$1.30M",
    icon: CreditCard,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    id: 4,
    title: "Equity Ratio",
    value: "65.26%",
    icon: Percent,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: 5,
    title: "Current Ratio",
    value: "2.79%",
    icon: Activity,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    id: 6,
    title: "Burn Rate",
    value: "$219.42",
    icon: Flame,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const payableData = [
  { category: "Current", value: 450000 },
  { category: "91+", value: 180000 },
  { category: "61–90", value: 320000 },
  { category: "31–60", value: 280000 },
  { category: "1–30", value: 70000 },
];

const inventoryData = [
  { month: "Mar", value: 7620 },
  { month: "Apr", value: 3320 },
  { month: "May", value: 3960 },
  { month: "Jun", value: 2040 },
  { month: "Jul", value: 5450 },
  { month: "Aug", value: 2060 },
];

const turnoverData = [
  { month: "Mar", ar: 31, ap: 17 },
  { month: "Apr", ar: 44, ap: 22 },
  { month: "May", ar: 32, ap: 21 },
  { month: "Jun", ar: 35, ap: 35 },
  { month: "Jul", ar: 13, ap: 12 },
  { month: "Aug", ar: 2, ap: 6 },
];

// ==================== COMPONENTS ====================

function StatCard({ title, value, icon: Icon, color, bgColor }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl font-semibold text-slate-800 mt-0.5">{value}</p>
        </div>
      </div>
    </div>
  );
}

function GaugeChart({ value = 39.29 }) {
  // Calculate needle position
  const percentage = Math.min(Math.max(value, 0), 100);
  const angle = (percentage / 100) * 180 - 90;
  const needleX = 50 + 35 * Math.cos((angle * Math.PI) / 180);
  const needleY = 50 + 35 * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">
        Gross Profit Margin
      </h3>
      <div className="relative h-48 flex items-end justify-center">
        <svg viewBox="0 0 100 55" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Red zone (0-40%) */}
          <path
            d="M 10 50 A 40 40 0 0 1 38 17.6"
            fill="none"
            stroke="#ef4444"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Yellow zone (40-70%) */}
          <path
            d="M 38 17.6 A 40 40 0 0 1 70.6 26.4"
            fill="none"
            stroke="#eab308"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Green zone (70-100%) */}
          <path
            d="M 70.6 26.4 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#22c55e"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Needle */}
          <line
            x1="50"
            y1="50"
            x2={needleX}
            y2={needleY}
            stroke="#1e293b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Center dot */}
          <circle cx="50" cy="50" r="4" fill="#1e293b" />
        </svg>
        {/* Value display */}
        <div className="absolute bottom-2 text-center">
          <p className="text-3xl font-bold text-slate-800">{value.toFixed(2)}%</p>
        </div>
      </div>
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-slate-500">0-40%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="text-slate-500">40-70%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-slate-500">70-100%</span>
        </div>
      </div>
    </div>
  );
}

function PayableBarChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">
        Accounts Payable by Payment Target
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={payableData} layout="vertical" barSize={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              tickFormatter={(value) => `$${value / 1000}K`}
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="category"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "12px",
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]}
            />
            <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function InventoryLineChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">
        Expeses 
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={inventoryData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "12px",
              }}
              formatter={(value) => [`${value.toLocaleString()}`, "Inventory"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0891b2"
              strokeWidth={3}
              dot={{ fill: "#0891b2", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#0891b2", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ComparisonBarChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">
        Weekly expese vs Monthly expense
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={turnoverData} barGap={4} barSize={12}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="ar" name="Monthly Expense" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ap" name="Weekly Expense" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-500" />
          <span className="text-xs text-slate-600">Monthly Expense</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-orange-500" />
          <span className="text-xs text-slate-600">Weekly Expense</span>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN DASHBOARD ====================
export default function FinancialDashboard() {
  const refreshTime = "Sep 11, 2025 09:03 AM";

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-800">
            Financial Management Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>Data refreshed at {refreshTime}</span>
            </div>
            <button className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 hover:shadow-sm transition-all">
              <RefreshCw className="w-4 h-4 text-slate-600" />
            </button>
            <button className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 hover:shadow-sm transition-all">
              <MoreHorizontal className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Metric Cards */}
        <div className="space-y-4">
          {metricCards.map((card) => (
            <StatCard key={card.id} {...card} />
          ))}
        </div>

        {/* Center Column - Gauge Chart */}
        <div>
          <GaugeChart value={39.29} />
        </div>

        {/* Right Column - Payable Bar Chart */}
        <div>
          <PayableBarChart />
        </div>

        {/* Bottom Row - Inventory Chart */}
        <div className="lg:col-span-1">
          <InventoryLineChart />
        </div>

        {/* Bottom Row - Comparison Chart */}
        <div className="lg:col-span-2">
          <ComparisonBarChart />
        </div>
      </div>
    </div>
  );
}
