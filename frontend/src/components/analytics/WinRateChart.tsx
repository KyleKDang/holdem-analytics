"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface WinRateChartProps {
  data: Array<{
    hand_number: number;
    date: string;
    win_rate: number;
    cumulative_wins: number;
    cumulative_hands: number;
  }>;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0e1117] border border-[#2a3040] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-[10px] text-slate-500 mb-1">Hand #{label}</p>
      <p className="text-sm font-semibold text-white">
        {payload[0].value.toFixed(1)}% win rate
      </p>
    </div>
  );
}

export default function WinRateChart({ data }: WinRateChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-600 text-sm">
        No data available
      </div>
    );
  }

  const sampledData =
    data.length > 100
      ? data.filter(
          (_, i) =>
            i % Math.ceil(data.length / 100) === 0 || i === data.length - 1,
        )
      : data;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart
        data={sampledData}
        margin={{ top: 4, right: 4, left: -10, bottom: 4 }}
      >
        <CartesianGrid
          strokeDasharray="2 4"
          stroke="#1e2530"
          vertical={false}
        />
        <XAxis
          dataKey="hand_number"
          stroke="#2a3040"
          tick={{ fill: "#4b5563", fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: "#1e2530" }}
        />
        <YAxis
          stroke="#2a3040"
          tick={{ fill: "#4b5563", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "#2a3040", strokeWidth: 1 }}
        />
        <ReferenceLine y={50} stroke="#2a3040" strokeDasharray="4 4" />
        <Line
          type="monotone"
          dataKey="win_rate"
          stroke="#d4af37"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#d4af37", strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
