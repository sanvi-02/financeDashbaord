import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
} from "recharts";
import { useApp } from "../context/AppContext";

/* ================= TOOLTIP FIX ================= */
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const income = payload.find((p) => p.dataKey === "income")?.value ?? 0;

    const expenses = payload.find((p) => p.dataKey === "expenses")?.value ?? 0;

    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
          {label || "N/A"}
        </p>

        <p className="text-sm text-teal-500">Income: ${income}</p>

        <p className="text-sm text-rose-500">Expenses: ${expenses}</p>

        <p className="text-sm font-semibold mt-1 text-slate-800 dark:text-white">
          Net: ${income - expenses}
        </p>
      </div>
    );
  }
  return null;
}

/* ================= DONUT ================= */
export function ExpenseDonutChart() {
  const { analytics } = useApp();
  const { expenseBreakdown = [] } = analytics || {};

  const data =
    expenseBreakdown.length > 0
      ? expenseBreakdown.slice(0, 6)
      : [{ name: "No Data", value: 1, color: "#e2e8f0" }];

  const total = data.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value">
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color || "#8884d8"} />
            ))}
          </Pie>

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-700 dark:fill-white text-sm font-semibold">
            ${total}
          </text>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* LEGEND FIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-4 px-2">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between text-sm min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600 dark:text-slate-400 truncate">
                {item.name}
              </span>
            </div>

            <span className="text-slate-800 dark:text-white font-medium shrink-0 ml-2">
              ${item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= BAR CHART ================= */
export function WeeklyBarChart() {
  const { analytics } = useApp();
  const { monthlyData = [] } = analytics || {};

  const weeklyData =
    monthlyData.length > 0
      ? monthlyData.slice(-7).map((m) => ({
          day: m.month || m.day || "N/A",
          income: Number(m.income) || 0,
          expenses: Number(m.expenses) || 0,
          net: (Number(m.income) || 0) - (Number(m.expenses) || 0),
        }))
      : [
          { day: "Jun", income: 100, expenses: 50, net: 50 },
          { day: "Jul", income: 200, expenses: 80, net: 120 },
        ];

  return (
    <div className="h-72 min-h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyData} barGap={8}>
          {/* GRID */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            vertical={false}
          />

          {/* X AXIS */}
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          {/* Y AXIS */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />

          {/* TOOLTIP */}
          <Tooltip content={<CustomTooltip />} />

          {/* LEGEND */}
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: "12px" }}
          />

          {/* GRADIENTS */}
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>

            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>

          {/* BARS */}
          <Bar
            dataKey="income"
            name="Income"
            fill="url(#incomeGradient)"
            radius={[6, 6, 0, 0]}
            maxBarSize={35}
          />

          <Bar
            dataKey="expenses"
            name="Expenses"
            fill="url(#expenseGradient)"
            radius={[6, 6, 0, 0]}
            maxBarSize={35}
          />

          {/* NET LINE FIX */}
          <Line
            type="monotone"
            dataKey="net"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ================= MAIN ================= */
export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Expense Breakdown */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          Expense Breakdown
        </h3>
        <ExpenseDonutChart />
      </div>

      {/* Monthly Overview */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          Monthly Overview
        </h3>
        <WeeklyBarChart />
      </div>
    </div>
  );
}
