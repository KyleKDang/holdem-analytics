"use client";

import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
} from "recharts";

interface ActionChartProps {
  data: Array<{
    action: string;
    total_hands: number;
    wins: number;
    losses: number;
    ties: number;
    win_rate: number;
    distribution: number;
  }>;
}

const COLORS: Record<string, string> = {
  fold:  "#6b7280",
  check: "#3b82f6",
  call:  "#d4af37",
  raise: "#10b981",
};

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: { name: string; value: number; count: number } }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[#0e1117] border border-[#2a3040] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-[10px] text-slate-500 mb-1">{d.name}</p>
      <p className="text-sm font-semibold text-white">{d.value.toFixed(1)}%</p>
      <p className="text-xs text-slate-500 mt-0.5">{d.count} hands</p>
    </div>
  );
}

function CustomLegend({ payload }: { payload?: { color: string; value: string }[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
      {payload?.map((entry, i: number) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-xs text-slate-400">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function ActionChart({ data }: ActionChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-600 text-sm">
        No data available
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: item.action.charAt(0).toUpperCase() + item.action.slice(1),
    value: item.distribution,
    count: item.total_hands,
    color: COLORS[item.action] ?? "#6b7280",
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {chartData.map((entry, i) => (
            <Cell key={i} fill={entry.color} opacity={0.9} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}