"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface PositionChartProps {
  data: Array<{
    position: string;
    total_hands: number;
    wins: number;
    losses: number;
    ties: number;
    win_rate: number;
  }>;
}

const COLORS: Record<string, string> = {
  early:  "#a78bfa",
  middle: "#d4af37",
  late:   "#10b981",
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; payload: { total_hands: number } }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const entry = payload[0].payload;
  return (
    <div className="bg-[#0e1117] border border-[#2a3040] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-[10px] text-slate-500 mb-1 capitalize">{label} position</p>
      <p className="text-sm font-semibold text-white">{payload[0].value.toFixed(1)}% win rate</p>
      <p className="text-xs text-slate-500 mt-0.5">{entry.total_hands} hands</p>
    </div>
  );
}

export default function PositionChart({ data }: PositionChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-600 text-sm">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 4 }} barSize={40}>
        <CartesianGrid strokeDasharray="2 4" stroke="#1e2530" vertical={false} />
        <XAxis
          dataKey="position"
          stroke="#2a3040"
          tick={{ fill: "#4b5563", fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: "#1e2530" }}
          tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)}
        />
        <YAxis
          stroke="#2a3040"
          tick={{ fill: "#4b5563", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Bar dataKey="win_rate" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={COLORS[entry.position] ?? "#6b7280"} opacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}